import { abiLntVault, abiLntVTSwapHook, abiLvtVerio, abiQueryLNT, abiRedeemStrategy } from '@/config/abi/abiLNTVault'
import { getLntVaultSwapFee7Days } from '@/config/api'
import { codeQueryLNT } from '@/config/codes'
import { LntVaultConfig } from '@/config/lntvaults'
import { getTokenBy } from '@/config/tokens'
import { DECIMAL, YEAR_SECONDS } from '@/constants'
import { useFet } from '@/lib/useFet'
import { aarToNumber, FMT, fmtDate, fmtDuration, nowUnix, promiseAll } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { round } from 'es-toolkit'
import { now, toNumber } from 'es-toolkit/compat'
import { Address, erc721Abi, PublicClient, toHex, zeroAddress } from 'viem'
import { useAccount } from 'wagmi'
import { useTotalSupply } from './useToken'

export const FET_KEYS = {
  LntVault: (vc: LntVaultConfig) => `fetLntVault:${vc.vault}`,
  LntVaultLogs: (vc: LntVaultConfig) => `LntVaultLogs:${vc.vault}`,
  LntVaultYTRewards: (vc: LntVaultConfig, yt?: Address, user?: string) => (yt && yt !== zeroAddress && user ? `fetLntVaultYTRewards:${yt}:${user}` : ''),
  LntVaultOperators: (vc: LntVaultConfig, nodeOP?: Address) => (nodeOP ? `fetLntVaultOperators:${nodeOP}` : ''),
  LntHookPoolkey: (vc: LntVaultConfig, hook?: Address) => (hook && hook !== zeroAddress ? `LntHookPoolkey:${vc.vault}:${hook}` : ''),
  LntWithdrawPrice: (vc: LntVaultConfig) => `LntWithdrawPrice:${vc.vault}`,
  LntWithdrawWindows: (vc: LntVaultConfig) => (vc.RedeemStrategy ? `LntWithdrawWindows:${vc.vault}` : ''),
}
export async function fetLntVault(vc: LntVaultConfig) {
  const pc = getPC(vc.chain)
  // if (vc.isLVT) {
  //   if (vc.isFil || vc.isSei)
  //     return promiseAll({
  //       activeDepositCount: Promise.resolve(0n),
  //       aVT: pc.readContract({ abi: abiZeroGVToracale, address: vc.vault, functionName: 'aVT' }),
  //       closed: Promise.resolve(false),
  //       NFT: Promise.resolve(vc.asset),
  //       VT: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'VT' }),
  //       YT: Promise.resolve(zeroAddress as Address),
  //       T: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'T' }),
  //       vATOracle: Promise.resolve(zeroAddress as Address),
  //       expiryTime: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' }),
  //       startTime: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }),
  //     })
  //   async function aVT() {
  //     const one = DECIMAL
  //     const [vipInRate, vipRate] = await Promise.all([
  //       pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'paramValue', args: [toHex('VerioIPInflationRate', { size: 32 })] }),
  //       pc.readContract({ abi: abiLvtVerio, address: vc.vault, functionName: 'calculateIPWithdrawal', args: [one] }),
  //     ])
  //     return (vipInRate * one * vipRate) / DECIMAL / DECIMAL
  //   }
  //   return promiseAll({
  //     activeDepositCount: pc.readContract({ abi: erc20Abi, address: vc.asset, functionName: 'balanceOf', args: [vc.vault] }),
  //     aVT: aVT(),
  //     closed: Promise.resolve(false),
  //     NFT: Promise.resolve(zeroAddress),
  //     VT: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'VT' }),
  //     YT: Promise.resolve(zeroAddress as Address),
  //     T: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'T' }),
  //     vATOracle: Promise.resolve(zeroAddress as Address),
  //     expiryTime: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' }),
  //     startTime: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }),
  //   })
  // }
  // if (vc.reppo) {
  //   return promiseAll({
  //     activeDepositCount: Promise.all(
  //       [vc.reppo.standard, vc.reppo.preminum].map((nft) => pc.readContract({ abi: erc721Abi, address: nft, functionName: 'balanceOf', args: [vc.vault] })),
  //     ).then<bigint>((counts) => counts.reduce((t, c) => t + c, 0n)),
  //     aVT: Promise.resolve(0n),
  //     closed: Promise.resolve(false),
  //     NFT: Promise.resolve(vc.asset),
  //     VT: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'VT' }),
  //     YT: Promise.resolve(zeroAddress as Address),
  //     T: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'T' }),
  //     vATOracle: Promise.resolve(zeroAddress as Address),
  //     expiryTime: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' }),
  //     startTime: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }),
  //   })
  // }

  const reppoOverwrite: { [k: string]: Promise<any> } = vc.reppo
    ? {
        activeDepositCount: Promise.all(
          [vc.reppo.standard, vc.reppo.preminum].map((nft) => pc.readContract({ abi: erc721Abi, address: nft, functionName: 'balanceOf', args: [vc.vault] })),
        ).then<bigint>((counts) => counts.reduce((t, c) => t + c, 0n)),
      }
    : {}

  const verioOverwrite: { [k: string]: Promise<any> } = vc.isVerio
    ? {
        aVT: Promise.all([
          pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'paramValue', args: [toHex('VerioIPInflationRate', { size: 32 })] }),
          pc.readContract({ abi: abiLvtVerio, address: vc.vault, functionName: 'calculateIPWithdrawal', args: [DECIMAL] }),
        ]).then(([vipInRate, vipRate]) => (vipInRate * DECIMAL * vipRate) / DECIMAL / DECIMAL),
      }
    : {}

  const { lntdata, ...other } = await promiseAll({
    lntdata: pc.readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'queryLntVault', args: [vc.vault] }),
    expiryTime: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' }),
    startTime: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }),
    ...reppoOverwrite,
    ...verioOverwrite,
  })
  return { ...lntdata, ...other }
}
export function useLntVault(vc: LntVaultConfig) {
  return useFet({
    key: FET_KEYS.LntVault(vc),
    fetfn: async () => fetLntVault(vc),
  })
}

export function useLntHookPoolkey(vc: LntVaultConfig) {
  return useFet({
    key: FET_KEYS.LntHookPoolkey(vc, vc.vtSwapHook),
    fetfn: async () => getPC(vc.chain).readContract({ abi: abiLntVTSwapHook, address: vc.vtSwapHook, functionName: 'poolKey' }),
  })
}

export async function getRewardsBy(rewradManager: Address, user: Address, pc: PublicClient) {
  return pc
    .readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'earned', args: [rewradManager, user] })
    .then((item) => item.map((r) => [r.token, r.value] as [Address, bigint]))
}
export function useLntVaultYTRewards(vc: LntVaultConfig) {
  const vd = useLntVault(vc)
  const { address } = useAccount()
  const rewards = useFet({
    key: FET_KEYS.LntVaultYTRewards(vc, vd.data?.YT, address),
    fetfn: async () => {
      const pc = getPC(vc.chain)
      return getRewardsBy(vd.data!.YT, address!, pc)
    },
  })
  if (vd.status === 'fetching') {
    rewards.status = 'fetching'
  }
  return rewards
}

export function useLntVaultTimes(vc: LntVaultConfig) {
  const vd = useLntVault(vc)
  const nowtime = round(now() / 1000)
  const startTime = toNumber((vc.startTime ?? 0n).toString())
  const endTime = toNumber((vd.data?.expiryTime ?? 0n).toString())
  const progress = endTime > startTime ? Math.min(Math.max(((nowtime - startTime) * 100) / (endTime - startTime), 0), 100) : 100
  const progressPercent = `${round(progress, 2)}%`
  const remain = fmtDuration((endTime - nowtime) * 1000)
  return { progress, progressPercent, remain, remainStr: `~ ${remain} remaining`, endTimeStr: fmtDate(endTime * 1000, FMT.DATE2) }
}

export function useLntVaultLogs(vc: LntVaultConfig) {
  return useFet({
    key: FET_KEYS.LntVaultLogs(vc),
    fetfn: async () => getPC(vc.chain).readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'getLog', args: [vc.vault, vc.vtSwapHook] }),
  })
}

export function useLntVaultSwapFee7Days(vc: LntVaultConfig) {
  return useFet({
    key: `LntVaultSwapFee7Days:${vc.vault}`,
    initResult: 0n,
    fetfn: async () => getLntVaultSwapFee7Days(vc.chain, vc.vault),
  })
}

export function useLntVaultWithdrawWindows(vc: LntVaultConfig) {
  return useFet({
    key: FET_KEYS.LntWithdrawWindows(vc),
    initResult: [],
    fetfn: async () => {
      const pc = getPC(vc.chain)
      const redeemStrategy = await pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'redeemStrategy' })
      const canRedeem = await pc.readContract({ abi: abiRedeemStrategy, address: redeemStrategy, functionName: 'canRedeem' })
      if (canRedeem) return [{ startTime: nowUnix(), duration: 10000000000n }]
      const windowCount = await pc.readContract({ abi: abiRedeemStrategy, address: redeemStrategy, functionName: 'redeemTimeWindowsCount' })
      const [sTimes, durations] = await pc.readContract({ abi: abiRedeemStrategy, address: redeemStrategy, functionName: 'redeemTimeWindows', args: [0n, windowCount] })
      return sTimes.map((st, i) => ({ startTime: st, duration: durations[i] })).sort((a, b) => (a.startTime > b.startTime ? 1 : a.startTime < b.startTime ? -1 : 0))
    },
  })
}

export function useLntVaultWithdrawState(vc: LntVaultConfig) {
  const withdarwWindows = useLntVaultWithdrawWindows(vc)
  const nowtime = nowUnix()
  const inWindowI = withdarwWindows.data.findIndex((item) => item.startTime <= nowtime && nowtime <= item.startTime + item.duration)
  const inWindow = !vc.RedeemStrategy || inWindowI >= 0
  return {
    inWindow: inWindow,
    wWindow: inWindow ? (vc.RedeemStrategy ? withdarwWindows.data[inWindowI] : undefined) : undefined,
    nWindow: inWindowI < 0 ? withdarwWindows.data.find((item) => item.startTime > nowtime) : undefined,
  }
}

export function calcTPriceVT(
  vc: LntVaultConfig,
  vd: ReturnType<typeof useLntVault>['data'],
  logs: ReturnType<typeof useLntVaultLogs>['data'],
  tChange: bigint = 0n,
  vtChange: bigint = 0n,
) {
  if (!logs || !vd) return 0
  const T = getTokenBy(vd.T, vc.chain)!
  const VT = getTokenBy(vd.VT, vc.chain)!
  const tNum = aarToNumber(logs.t + tChange, T.decimals)
  const vtNum = aarToNumber(logs.vt + vtChange, VT.decimals)
  const RNum = aarToNumber(logs.R, 18)
  const vtPecent = tNum + vtNum > 0 ? Math.min(vtNum / (tNum + vtNum), 1) : 0
  const rateScalar = aarToNumber(logs.rateScalar, 18)
  const rateAnchor = aarToNumber(logs.rateAnchor, 18)
  const tPriceVt = rateScalar != 0 && 1 - vtPecent != 0 && 1 - vtPecent != 1 ? Math.log(vtPecent / (1 - vtPecent) / RNum) / rateScalar + rateAnchor : 0
  return tPriceVt
}

export function calcLntVaultYearsExpiry(vd: ReturnType<typeof useLntVault>['data']) {
  if (!vd || vd.expiryTime <= nowUnix()) return 0
  return aarToNumber(((vd.expiryTime - nowUnix()) * 10000n) / YEAR_SECONDS, 4)
}

export function calcVtApy(
  vc: LntVaultConfig,
  vd: ReturnType<typeof useLntVault>['data'],
  logs: ReturnType<typeof useLntVaultLogs>['data'],
  tChange: bigint = 0n,
  vtChange: bigint = 0n,
) {
  if (!logs || !vd) return 0
  const tPriceVt = calcTPriceVT(vc, vd, logs, tChange, vtChange)
  const yearsExpriy = calcLntVaultYearsExpiry(vd)
  tChange !== 0n && vtChange !== 0n && console.info('tvtChange:', tChange, vtChange, tPriceVt)
  const apy = Math.pow(tPriceVt, 2 / yearsExpriy) - 1
  return apy
}

export function calcLPApy(vc: LntVaultConfig, vd: ReturnType<typeof useLntVault>['data'], logs: ReturnType<typeof useLntVaultLogs>['data'], swapfee7days: bigint = 0n) {
  let apyFromVT = 0
  let apyFromSwap = 0
  let apyFromAirdrop = 0
  if (logs && vd) {
    // from VT
    const vtApy = calcVtApy(vc, vd, logs)
    const tPriceVt = calcTPriceVT(vc, vd, logs)
    const vt = aarToNumber(logs.vt, getTokenBy(vd.VT, vc.chain)!.decimals)
    const t = aarToNumber(logs.t, getTokenBy(vd.T, vc.chain)!.decimals)
    // console.info('calcLPApy:', vt, t, tPriceVt, vtApy)
    apyFromVT = tPriceVt > 0 ? (vt / (t * tPriceVt + vt)) * vtApy : 0

    // from swap
    const C = aarToNumber(swapfee7days, 18) // last 7 days swap fee to T amount
    const D = (C / 7) * 365
    apyFromSwap = tPriceVt > 0 ? D / (vt / tPriceVt + t) : 0

    // fro airdrop
  }
  return {
    apy: apyFromVT + apyFromSwap + apyFromAirdrop,
    items: [
      { name: 'VT APY', value: apyFromVT },
      { name: 'SwapFee', value: apyFromSwap },
      { name: 'Airdrop', value: apyFromAirdrop },
    ],
  }
}

export function useVTTotalSupply(vc: LntVaultConfig) {
  const vd = useLntVault(vc)
  const vtTotalSupply = useTotalSupply(getTokenBy(vd.data?.VT, vc.chain, { symbol: 'VT' }))
  return vtTotalSupply.data
}

export function useLntDepsoitFee(vc: LntVaultConfig) {
  return useFet({
    key: `LNTVaultDepositFee:${vc.chain}-${vc.vault}`,
    fetfn: async () =>
      getPC(vc.chain).readContract({
        abi: abiLntVault,
        address: vc.vault,
        functionName: 'paramValue',
        args: [toHex('VTC', { size: 32 })],
      }),
  })
}

export function useLntVaultVTC(vc: LntVaultConfig) {
  const vtc = toNumber((vc.depositFees ?? '5%').replace('%', '')) / 100
  return vtc
}
