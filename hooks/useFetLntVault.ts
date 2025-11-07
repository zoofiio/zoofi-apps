import { abiRedeemStrategy, abiLntVault, abiLntVTSwapHook, abiMockNodeDelegator, abiQueryLNT } from '@/config/abi/abiLNTVault'
import { getLntVaultSwapFee7Days } from '@/config/api'
import { codeQueryLNT } from '@/config/codes'
import { LntVaultConfig } from '@/config/lntvaults'
import { getTokenBy } from '@/config/tokens'
import { YEAR_SECONDS } from '@/constants'
import { useFet } from '@/lib/useFet'
import { aarToNumber, bnMin, fmtDuration, nowUnix, promiseAll } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { round } from 'es-toolkit'
import { now, toNumber } from 'es-toolkit/compat'
import { Address, PublicClient, zeroAddress } from 'viem'
import { useAccount } from 'wagmi'

export const FET_KEYS = {
  LntVault: (vc: LntVaultConfig) => `fetLntVault:${vc.vault}`,
  LntVaultLogs: (vc: LntVaultConfig) => `LntVaultLogs:${vc.vault}`,
  LntVaultYTRewards: (vc: LntVaultConfig, yt?: Address, user?: string) => (yt && yt !== zeroAddress && user ? `fetLntVaultYTRewards:${yt}:${user}` : ''),
  LntVaultOperators: (vc: LntVaultConfig, nodeOP?: Address) => (nodeOP ? `fetLntVaultOperators:${nodeOP}` : ''),
  LntHookPoolkey: (vc: LntVaultConfig, hook?: Address) => (hook && hook !== zeroAddress ? `LntHookPoolkey:${vc.vault}:${hook}` : ''),
  LntWithdrawPrice: (vc: LntVaultConfig) => `LntWithdrawPrice:${vc.vault}`,
  LntWithdrawWindows: (vc: LntVaultConfig) => (vc.RedeemStrategy ? `LntWithdrawWindows:${vc.vault}` : ''),
}
export function useLntVault(vc: LntVaultConfig) {
  return useFet({
    key: FET_KEYS.LntVault(vc),
    fetfn: async () => {
      const pc = getPC(vc.chain)
      const { lntdata, ...other } = await promiseAll({
        lntdata: pc.readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'queryLntVault', args: [vc.vault] }),
        expiryTime: vc.isAethir ? pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' }) : Promise.resolve(1784968222n),
        startTime: vc.isAethir || vc.isZeroG ? pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }) : Promise.resolve(1750840222n),
      })
      return { ...lntdata, ...other }
    },
  })
}

export function useLntWithdrawPrice(vc: LntVaultConfig) {
  return useFet({
    key: FET_KEYS.LntWithdrawPrice(vc),
    initResult: 0n,
    fetfn: async () => getPC(vc.chain).readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'calcRedeem', args: [vc.vault, 1n] }),
  })
}

export function useLntHookPoolkey(vc: LntVaultConfig) {
  const vd = useLntVault(vc)
  return useFet({
    key: FET_KEYS.LntHookPoolkey(vc, vd.result?.vtSwapPoolHook),
    fetfn: async () => getPC(vc.chain).readContract({ abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook!, functionName: 'poolKey' }),
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
    key: FET_KEYS.LntVaultYTRewards(vc, vd.result?.YT, address),
    fetfn: async () => {
      const pc = getPC(vc.chain)
      return getRewardsBy(vd.result!.YT, address!, pc)
    },
  })
  if (vd.status === 'fetching') {
    rewards.status = 'fetching'
  }
  return rewards
}

export function useLntVaultOperators(vc: LntVaultConfig) {
  const vd = useLntVault(vc)
  const operators = useFet({
    key: FET_KEYS.LntVaultOperators(vc, vc.MockNodeDelegator),
    initResult: [],
    fetfn: async () => {
      const pc = getPC(vc.chain)
      const opaddress = await pc.readContract({ abi: abiMockNodeDelegator, address: vc.MockNodeDelegator!, functionName: 'operators' })
      return Promise.all(
        opaddress.map((item) =>
          pc
            .readContract({ abi: abiMockNodeDelegator, address: vc.MockNodeDelegator!, functionName: 'getOperatorInfo', args: [item] })
            .then(([capacity, delegations]) => ({ address: item, capacity, delegations })),
        ),
      )
    },
  })
  if (vd.status === 'fetching') {
    operators.status = 'fetching'
  }
  return operators
}

export function useLntVaultTimes(vc: LntVaultConfig) {
  const vd = useLntVault(vc)
  const nowtime = round(now() / 1000)
  const startTime = toNumber((vc.startTime ?? 0n).toString())
  const endTime = toNumber((vd.result?.expiryTime ?? 0n).toString())
  const progress = endTime > startTime ? Math.min(Math.max(((nowtime - startTime) * 100) / (endTime - startTime), 0), 100) : 100
  const progressPercent = `${round(progress, 2)}%`
  const remain = fmtDuration((endTime - nowtime) * 1000)
  return { progressPercent, remain, remainStr: `~ ${remain} remaining` }
}

export function useLntVaultLogs(vc: LntVaultConfig) {
  return useFet({
    key: FET_KEYS.LntVaultLogs(vc),
    fetfn: async () => getPC(vc.chain).readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'getLog', args: [vc.vault] }),
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
  const inWindowI = withdarwWindows.result.findIndex((item) => item.startTime <= nowtime && nowtime <= item.startTime + item.duration)
  const inWindow = !vc.RedeemStrategy || inWindowI >= 0
  return {
    inWindow: inWindow,
    wWindow: inWindow ? (vc.RedeemStrategy ? withdarwWindows.result[inWindowI] : undefined) : undefined,
    nWindow: inWindowI < 0 ? withdarwWindows.result.find((item) => item.startTime > nowtime) : undefined,
  }
}

export function calcTPriceVT(
  vc: LntVaultConfig,
  vd: ReturnType<typeof useLntVault>['result'],
  logs: ReturnType<typeof useLntVaultLogs>['result'],
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

export function calcLntVaultYearsExpiry(vd: ReturnType<typeof useLntVault>['result']) {
  if (!vd || vd.expiryTime <= nowUnix()) return 0
  return aarToNumber(((vd.expiryTime - nowUnix()) * 10000n) / YEAR_SECONDS, 4)
}

export function calcVtApy(
  vc: LntVaultConfig,
  vd: ReturnType<typeof useLntVault>['result'],
  logs: ReturnType<typeof useLntVaultLogs>['result'],
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

export function calcLPApy(vc: LntVaultConfig, vd: ReturnType<typeof useLntVault>['result'], logs: ReturnType<typeof useLntVaultLogs>['result'], swapfee7days: bigint = 0n) {
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
