import { BVaultConfig, BVAULTS_CONFIG, BvaultsByEnv } from '@/config/bvaults'
import { DECIMAL, ENV } from '@/constants'
import { BVaultEpochDTO } from '@/providers/sliceBVaultsStore'
import { useBoundStore, useStore } from '@/providers/useBoundStore'
import { useQueries, useQuery } from '@tanstack/react-query'
import { keys } from 'es-toolkit/compat'
import { useMemo } from 'react'
import { Address, erc20Abi, parseAbi, parseAbiItem } from 'viem'
import { useAccount } from 'wagmi'
import { useCurrentChainId } from './useCurrentChainId'
import { useGetAdditionalConfig } from './useGetConfigs'
import { getPC } from '@/providers/publicClient'
import { abiBeraLP, abiBeraVault, abiBQuery } from '@/config/abi'
import { promiseAll, toDecimal18 } from '@/lib/utils'
import { LP_TOKENS } from '@/config/lpTokens'

export function useLoadBVaults() {
  const chainId = useCurrentChainId()
  const bvcs = BvaultsByEnv
  // useUpdateBVaultsData(bvcs)
  const { isLoading: isLoading1 } = useQuery({
    queryKey: ['UpdateBVaults', bvcs],
    queryFn: async () => {
      await Promise.all([useBoundStore.getState().sliceBVaultsStore.updateBvaults(chainId, bvcs), useBoundStore.getState().sliceBVaultsStore.updateYTokenSythetic(chainId, bvcs)])
      return true
    },
  })
  const { address } = useAccount()
  const tokens = useMemo(
    () =>
      bvcs
        .map((b) => [b.asset, b.pToken])
        .flat()
        .reduce<Address[]>((union, item) => (union.includes(item) ? union : [...union, item]), []),
    [bvcs],
  )
  const { isLoading: isLoading2 } = useQuery({
    queryKey: ['UpdateBvautlsTokens', tokens],
    queryFn: async () => {
      await Promise.all([
        useBoundStore.getState().sliceTokenStore.updateTokenTotalSupply(chainId, tokens),
        useBoundStore.getState().sliceTokenStore.updateTokenPrices(chainId, tokens),
      ])
      return true
    },
    throwOnError(error, query) {
      console.error(error)
      return false
    },
  })
  const { isLoading: isLoading3 } = useQuery({
    queryKey: ['UpdateUserBvautlsTokens', tokens, address],
    queryFn: async () => {
      if (!address) return false
      await useBoundStore.getState().sliceTokenStore.updateTokensBalance(chainId, tokens, address)
      return true
    },
  })
  const { isLoading: isLoading4 } = useGetAdditionalConfig()
  return { loading: isLoading1 || isLoading2 || isLoading3 || isLoading4 }
}

export function useLoadUserBVaults() {
  const { address } = useAccount()
  const chainId = useCurrentChainId()
  const bvcs = useMemo(() => BVAULTS_CONFIG.filter((vc) => (vc.onEnv || []).includes(ENV)), [chainId, ENV])
  const bvaultsKeys = useStore((s) => keys(s.sliceBVaultsStore.bvaults).toString(), ['sliceBVaultsStore.bvaults'])
  useQuery({
    queryKey: ['UpdateAllUserBvaults', bvcs, chainId, address, bvaultsKeys],
    queryFn: async () => {
      if (!address) return false
      const bvaults = useBoundStore.getState().sliceBVaultsStore.bvaults
      for (const bvc of bvcs) {
        if (!bvaults[bvc.vault]) return false
      }
      await Promise.all(bvcs.map((bvc) => useBoundStore.getState().sliceBVaultsStore.updateEpoches(chainId, bvc)))
      const getEpochesParams = (bvc: BVaultConfig) => {
        const bvd = useBoundStore.getState().sliceBVaultsStore.bvaults[bvc.vault]!
        const epoches: BVaultEpochDTO[] = []
        for (let epocheId = parseInt(bvd.epochCount.toString()); epocheId > 0; epocheId--) {
          const epoch = useBoundStore.getState().sliceBVaultsStore.epoches[`${bvc.vault}_${epocheId}`]!
          epoches.push(epoch)
        }
        return epoches
      }
      await Promise.all(bvcs.map((bvc) => useBoundStore.getState().sliceUserBVaults.updateEpoches(chainId, bvc, address, getEpochesParams(bvc))))
      return true
    },
  })
}

function genBvaultQuery(vc: BVaultConfig) {
  return {
    queryKey: ['QueryBvault:', vc.vault, vc.chain],
    queryFn: async () => {
      const pc = getPC(vc.chain)
      const getLpData = async () => {
        const lp = LP_TOKENS[vc.asset]
        if (lp && lp.poolId) {
          const [[tokens, balances], totalSupply] = await Promise.all([
            pc.readContract({
              abi: abiBeraVault,
              address: '0x4Be03f781C497A489E3cB0287833452cA9B9E80B',
              functionName: 'getPoolTokens',
              args: [lp.poolId],
            }),
            pc.readContract({
              abi: abiBeraLP,
              address: vc.asset,
              functionName: lp.isStable ? 'getActualSupply' : 'totalSupply',
            }),
          ])
          const baseIndex = tokens.findIndex((item) => item == lp.base)
          const quoteIndex = tokens.findIndex((item) => item == lp.quote)
          return {
            baseBalance: balances[baseIndex],
            quoteBalance: balances[quoteIndex],
            totalSupply,
          }
        }
        if (lp && lp.isKodiak) {
          const abi = parseAbi(['function getUnderlyingBalances() external view returns(uint256,uint256)'])
          const [[baseBalance, quoteBalance], totalSupply] = await Promise.all([
            pc.readContract({
              abi: abi,
              address: vc.asset,
              functionName: 'getUnderlyingBalances',
            }),
            pc.readContract({
              abi: erc20Abi,
              address: vc.asset,
              functionName: 'totalSupply',
            }),
          ])
          return {
            baseBalance,
            quoteBalance,
            totalSupply,
          }
        }
        return null
      }
      const vd = await promiseAll({
        data: pc.readContract({ abi: abiBQuery, address: vc.bQueryAddres, functionName: 'queryBVault', args: [vc.vault] }),
        dataLp: getLpData(),
        ptRebaseRate: vc.pTokenV2
          ? pc.readContract({ abi: [parseAbiItem('function rebaseRate() view returns (uint256)')], address: vc.pToken, functionName: 'rebaseRate' })
          : Promise.resolve(0n),
        lockedAssetTotal: pc.readContract({ abi: erc20Abi, functionName: 'balanceOf', address: vc.asset, args: [vc.vault] }),
      })
      if (vd.dataLp) {
        vd.data.lpLiq = vd.lockedAssetTotal
        const shareLp = (vd.data.lpLiq * DECIMAL) / vd.dataLp.totalSupply
        vd.data.lpBase = toDecimal18((vd.dataLp.baseBalance * shareLp) / DECIMAL, LP_TOKENS[vc.asset]!.baseDecimal)
        vd.data.lpQuote = toDecimal18((vd.dataLp.quoteBalance * shareLp) / DECIMAL, LP_TOKENS[vc.asset]!.quoteDecimal)
      }
      return { ...vd.data, ptRebaseRate: vd.ptRebaseRate, lockedAssetTotal: vd.lockedAssetTotal }
    },
  }
}
export function useBvault(vc: BVaultConfig) {
  return useQuery(genBvaultQuery(vc))
}

export function useBvaults(vcs: BVaultConfig[]) {
  return useQueries({
    queries: vcs.map((vc) => genBvaultQuery(vc)),
  })
}
