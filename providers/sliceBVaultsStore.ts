import { abiBeraLP, abiBeraVault, abiBQuery, abiBQueryOld } from '@/config/abi'
import { getBvaultsPtSynthetic } from '@/config/api'
import { BVaultConfig } from '@/config/bvaults'
import { LP_TOKENS } from '@/config/lpTokens'
import { berachain } from '@/config/network'
import { DECIMAL } from '@/constants'
import { toDecimal18 } from '@/lib/utils'
import { mapValues, range } from 'es-toolkit'
import { filter, keys, now } from 'es-toolkit/compat'
import { Address, erc20Abi, parseAbi, parseAbiItem, PublicClient } from 'viem'
import { getPC } from './publicClient'
import { SliceFun } from './types'

export type BVaultEpochDTO = {
  epochId: bigint
  startTime: bigint
  duration: bigint
  redeemPool: Address
  yTokenTotal: bigint
  vaultYTokenBalance: bigint
  assetTotalSwapAmount: bigint
  yTokenAmountForSwapYT: bigint
  totalRedeemingBalance: bigint
  settled: boolean
  stakingBribesPool: Address
  adhocBribesPool: Address
}

export type BVaultDTO = {
  epochCount: bigint
  pTokenTotal: bigint
  lockedAssetTotal: bigint
  f2: bigint
  closed: boolean
  lpLiq: bigint
  lpBase: bigint
  lpQuote: bigint
  Y: bigint
  current: BVaultEpochDTO
  ptRebaseRate: bigint
}
export type BVaultsStore = {
  bvaults: {
    [vault: Address]: BVaultDTO | undefined
  }
  epoches: {
    [vaultEpocheId: `${Address}_${number}`]: BVaultEpochDTO | undefined
  }
  yTokenSythetic: {
    [k: Address]: bigint
  }

  updateBvaults: (chainId: number, bvcs: BVaultConfig[]) => Promise<BVaultsStore['bvaults']>
  updateEpoches: (chainId: number, bvc: BVaultConfig, ids?: bigint[]) => Promise<BVaultsStore['epoches']>

  updateYTokenSythetic: (chainId: number, bvcs?: BVaultConfig[]) => Promise<BVaultsStore['yTokenSythetic']>
}
export const sliceBVaultsStore: SliceFun<BVaultsStore> = (set, get, init = {}) => {
  const getBvaultLpData = async (pc: PublicClient, vc: BVaultConfig) => {
    const lp = vc.asset
    const [[tokens, balances], totalSupply] = await Promise.all([
      pc.readContract({
        abi: abiBeraVault,
        address: '0x4Be03f781C497A489E3cB0287833452cA9B9E80B',
        functionName: 'getPoolTokens',
        args: [LP_TOKENS[lp]!.poolId!],
      }),
      pc.readContract({
        abi: abiBeraLP,
        address: lp,
        functionName: LP_TOKENS[lp].isStable ? 'getActualSupply' : 'totalSupply',
      }),
    ])
    const baseIndex = tokens.findIndex((item) => item == LP_TOKENS[lp]!.base)
    const quoteIndex = tokens.findIndex((item) => item == LP_TOKENS[lp]!.quote)
    return {
      lp,
      vault: vc.vault,
      baseBalance: balances[baseIndex],
      quoteBalance: balances[quoteIndex],
      totalSupply,
    }
  }
  const getKodiakLpData = async (pc: PublicClient, vc: BVaultConfig) => {
    const lp = vc.asset
    const abi = parseAbi(['function getUnderlyingBalances() external view returns(uint256,uint256)'])
    const [[baseBalance, quoteBalance], totalSupply] = await Promise.all([
      pc.readContract({
        abi: abi,
        address: lp,
        functionName: 'getUnderlyingBalances',
      }),
      pc.readContract({
        abi: erc20Abi,
        address: lp,
        functionName: 'totalSupply',
      }),
    ])
    return {
      lp,
      vault: vc.vault,
      baseBalance,
      quoteBalance,
      totalSupply,
    }
  }
  const updateBvaults = async (chainId: number, bvcs: BVaultConfig[]) => {
    const start = now()
    console.info('timeStart:updateBvaults', start)
    const pc = getPC(chainId)
    const [datas, lpdatas, ptRates] = await Promise.all([
      Promise.all(
        bvcs.map((bvc) =>
          pc
            .readContract({ abi: bvc.isOld ? abiBQueryOld : abiBQuery, address: bvc.bQueryAddres, functionName: 'queryBVault', args: [bvc.vault] })
            .then((item) => ({ vault: bvc.vault, item })),
        ),
      ),
      berachain.id == chainId
        ? Promise.all(
            bvcs.map((bvc) => (LP_TOKENS[bvc.asset]?.poolId ? getBvaultLpData(pc, bvc) : LP_TOKENS[bvc.asset]?.isKodiak ? getKodiakLpData(pc, bvc) : Promise.resolve(null))),
          )
        : Promise.resolve(null),
      Promise.all(
        bvcs.map((vc) =>
          vc.pTokenV2 ? pc.readContract({ abi: [parseAbiItem('function rebaseRate() view returns (uint256)')], address: vc.pToken, functionName: 'rebaseRate' }) : 0n,
        ),
      ),
    ])
    console.info('timeEND:updateBvaults', now() - start)
    const map = filter(datas, (item) => item != null).reduce<BVaultsStore['bvaults']>(
      (map, item, i) => ({ ...map, [item.vault]: { ...item.item, ptRebaseRate: ptRates[i] } }),
      {},
    )

    await Promise.all(
      bvcs
        .filter((vc) => map[vc.vault]?.closed)
        .map((vc) =>
          pc.readContract({ abi: erc20Abi, functionName: 'balanceOf', address: vc.asset, args: [vc.vault] }).then((balance) => {
            map[vc.vault]!.lockedAssetTotal = balance
          }),
        ),
    )
    if (lpdatas) {
      for (const lpdata of lpdatas) {
        if (lpdata) {
          const bvd = map[lpdata.vault]!
          bvd.lpLiq = bvd.lockedAssetTotal
          const shareLp = (bvd.lpLiq * DECIMAL) / lpdata.totalSupply
          bvd.lpBase = toDecimal18((lpdata.baseBalance * shareLp) / DECIMAL, LP_TOKENS[lpdata.lp]!.baseDecimal)
          bvd.lpQuote = toDecimal18((lpdata.quoteBalance * shareLp) / DECIMAL, LP_TOKENS[lpdata.lp]!.quoteDecimal)
        }
      }
    }

    set({ bvaults: { ...get().bvaults, ...map } })

    return map
  }

  const updateEpoches = async (chainId: number, bvc: BVaultConfig, ids?: bigint[]) => {
    const mIds = ids || range(1, parseInt(((get().bvaults[bvc.vault]?.epochCount || 0n) + 1n).toString())).map((num) => BigInt(num))
    if (mIds.length == 0) return {}
    const pc = getPC(chainId)
    const datas = await Promise.all(
      mIds.map((epochId) =>
        pc.readContract({ abi: bvc.isOld ? abiBQueryOld : abiBQuery, address: bvc.bQueryAddres, functionName: 'queryBVaultEpoch', args: [bvc.vault, epochId] }),
      ),
    )
    const map = datas.reduce<BVaultsStore['epoches']>((map, item) => ({ ...map, [`${bvc.vault}_${item!.epochId.toString()}`]: item }), {})
    set({ epoches: { ...get().epoches, ...map } })
    return map
  }

  const updateYTokenSythetic = async (chainId: number, bvcs?: BVaultConfig[]) => {
    const vaults = bvcs?.map((b) => b.vault) || (keys(get().bvaults) as Address[])
    // const data = await Promise.all(vaults.map((vault) => getBvaultPtSynthetic(vault, 100n))).then((data) =>
    //   data.reduce<{ [k: Address]: bigint }>((map, item, i) => ({ ...map, [vaults[i]]: BigInt(item) }), {}),
    // )
    const data = await getBvaultsPtSynthetic(chainId, vaults)
    const datas = mapValues(data, (v) => BigInt(v))
    set({ yTokenSythetic: { ...get().yTokenSythetic, ...datas } })
    return datas
  }

  // init
  return {
    bvaults: {},
    epoches: {},
    yTokenSythetic: {},
    ...init,
    updateBvaults,
    updateEpoches,
    updateYTokenSythetic,
  }
}
