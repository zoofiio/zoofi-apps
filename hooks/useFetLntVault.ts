import { getLntVaultSwapFee7Days } from '@/config/api'
import { LntVaultConfig } from '@/config/lntvaults'
import { getTokenBy } from '@/config/tokens'
import { YEAR_SECONDS } from '@/constants'
import { fetRouter } from '@/lib/fetRouter'
import { useFet } from '@/lib/useFet'
import { aarToNumber, FMT, fmtDate, fmtDuration, nowUnix } from '@/lib/utils'
import { round } from 'es-toolkit'
import { now, toNumber } from 'es-toolkit/compat'
import { fetLntHookPoolkey, fetLntVault, fetLntVaultLogs, fetLntWithdrawWindows } from './fetsLnt'
import { useTotalSupply } from './useToken'

export const FET_KEYS = {
  LntVault: (vc: LntVaultConfig) => `fetLntVault:${vc.vault}`,
  LntVaultLogs: (vc: LntVaultConfig) => `LntVaultLogs:${vc.vault}`,
  LntHookPoolkey: (vc: LntVaultConfig) => `LntHookPoolkey:${vc.vault}`,
  LntWithdrawWindows: (vc: LntVaultConfig) => (vc.RedeemStrategy ? `LntWithdrawWindows:${vc.vault}` : ''),
}

export function useLntVault(vc: LntVaultConfig) {
  return useFet({
    key: FET_KEYS.LntVault(vc),
    fetfn: () => fetRouter('/api/lnt', { chain: vc.chain, vault: vc.vault, fet: 'fetLntVault' }) as ReturnType<typeof fetLntVault>,
  })
}

export function useLntHookPoolkey(vc: LntVaultConfig) {
  return useFet({
    key: FET_KEYS.LntHookPoolkey(vc),
    fetfn: () => fetRouter('/api/lnt', { chain: vc.chain, vault: vc.vault, fet: 'fetLntHookPoolkey' }) as ReturnType<typeof fetLntHookPoolkey>,
  })
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
    fetfn: () => fetRouter('/api/lnt', { chain: vc.chain, vault: vc.vault, fet: 'fetLntVaultLogs' }) as ReturnType<typeof fetLntVaultLogs>,
  })
}

export function useLntVaultSwapFee7Days(vc: LntVaultConfig) {
  return useFet({
    key: `LntVaultSwapFee7Days:${vc.vault}`,
    initResult: 0n,
    fetfn: () => getLntVaultSwapFee7Days(vc.chain, vc.vault),
  })
}



export function useLntVaultWithdrawWindows(vc: LntVaultConfig) {
  return useFet({
    key: FET_KEYS.LntWithdrawWindows(vc),
    initResult: [],
    fetfn: () => fetRouter('/api/lnt', { chain: vc.chain, vault: vc.vault, fet: 'fetLntWithdrawWindows' }) as ReturnType<typeof fetLntWithdrawWindows>,
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

export function useLntVaultVTC(vc: LntVaultConfig) {
  const vtc = toNumber((vc.depositFees ?? '5%').replace('%', '')) / 100
  return vtc
}
