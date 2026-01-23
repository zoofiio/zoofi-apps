import { getBvaultsPtSynthetic } from '@/config/api'
import { BVaultConfig, BvaultsByEnv } from '@/config/bvaults'
import { LP_TOKENS } from '@/config/lpTokens'
import { Token } from '@/config/tokens'
import { DECIMAL, YEAR_SECONDS } from '@/constants'
import { fetBVault, fetBVaultEpoches, fetUserBVault } from '@/hooks/fetsBvault'
import { useBalance, useTotalSupply } from '@/hooks/useToken'
import { fetRouter } from '@/lib/fetRouter'
import { fmtPercent, getBigint, proxyGetDef, retry } from '@/lib/utils'
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { mapValues } from 'es-toolkit'
import { useMemo } from 'react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

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

const defBvault = proxyGetDef<Exclude<BVaultDTO, undefined>>({ current: proxyGetDef<BVaultEpochDTO>({}, 0n) }, 0n)
export function useBVault(vc: BVaultConfig) {
  return useQuery({
    queryKey: ['queryBVault', vc.vault, vc.chain],
    staleTime: 2000,
    refetchOnMount: 'always',
    queryFn: () => fetRouter('/api/bvault', { chain: vc.chain, vault: vc.vault, fet: 'fetBVault' }) as ReturnType<typeof fetBVault>
  }).data ?? defBvault
}

export function useBVaults(vcs: BVaultConfig[]) {
  return useQueries({
    queries: vcs.map(vc => ({
      queryKey: ['queryBVault', vc.vault, vc.chain],
      staleTime: 2000,
      refetchOnMount: 'always',
      queryFn: () => fetRouter('/api/bvault', { chain: vc.chain, vault: vc.vault, fet: 'fetBVault' }) as ReturnType<typeof fetBVault>
    }))
  })
}

export function useBVaultEpoches(vc: BVaultConfig) {
  return (useQuery({
    queryKey: ['queryBVaultEpoches', vc.vault, vc.chain],
    staleTime: 2000,
    refetchOnMount: 'always',
    queryFn: () => fetRouter('/api/bvault', { chain: vc.chain, vault: vc.vault, fet: 'fetBVaultEpoches' }) as ReturnType<typeof fetBVaultEpoches>
  }).data ?? []).reverse()
}

export function useUserBVaultEpoches(vc: BVaultConfig) {
  const { address } = useAccount()
  return (useQuery({
    queryKey: ['queryUserBVaultEpoches', vc.vault, vc.chain, address],
    enabled: Boolean(address),
    staleTime: 2000,
    refetchOnMount: 'always',
    queryFn: () => fetRouter('/api/bvault', { chain: vc.chain, vault: vc.vault, byUser: address!, fet: 'fetUserBVault' }) as ReturnType<typeof fetUserBVault>
  }).data ?? []).reverse()
}

export function useEpochesData(vc: BVaultConfig) {
  const epochs = useBVaultEpoches(vc)
  const userEpochs = useUserBVaultEpoches(vc)
  return useMemo(() => {
    const userEpochsMap = userEpochs.reduce<{ [k: string]: (typeof userEpochs)[number] }>((map, item) => ({ ...map, [item.epochId.toString()]: item }), {})
    return epochs.map((ep) => proxyGetDef({ ...ep!, ...(userEpochsMap[ep!.epochId.toString()] || { bribes: [], sBribes: [], aBribes: [] }) }, 0n))
  }, [epochs, userEpochs])
}

export function useCalcClaimable(vc: BVaultConfig) {
  const epoches = useEpochesData(vc)
  const bvd = useBVault(vc)
  return useMemo(() => {
    const fitlerEpoches = epoches.filter((item) => item.claimableAssetBalance > 10n && (item.settled || bvd.closed))
    return {
      ids: fitlerEpoches.map((item) => item.epochId),
      claimable: fitlerEpoches.reduce((sum, item) => sum + item.claimableAssetBalance, 0n),
    }
  }, [epoches, bvd.closed])
}
export function useYTokenSynthetic(vc: BVaultConfig) {
  const { data: synthetics } = useQuery({
    queryKey: ['queryYtokenSynthetics'],
    queryFn: () => getBvaultsPtSynthetic(vc.chain, BvaultsByEnv.map(item => item.vault)).then(data => mapValues(data, (v) => BigInt(v)))
  })
  const ptTotalSupply = useTotalSupply({ chain: vc.chain, address: vc.pToken } as Token)
  const bvd = useBVault(vc)
  let pTokenSynthetic = getBigint(synthetics, vc.vault)
  if (pTokenSynthetic == 0n) pTokenSynthetic = ptTotalSupply.data * (bvd?.current.duration || 0n)
  return pTokenSynthetic
}
export function useBVaultApy(vc: BVaultConfig): [string, bigint] {
  const bvd = useBVault(vc)
  let pTokenSynthetic = useYTokenSynthetic(vc)
  let apy = 0n
  if (vc.pTokenV2) {
    apy = bvd && bvd.ptRebaseRate && bvd.pTokenTotal ? ((bvd.ptRebaseRate / DECIMAL) * YEAR_SECONDS * BigInt(1e10)) / bvd.pTokenTotal / DECIMAL : 0n
  } else {
    apy = bvd && bvd.current.assetTotalSwapAmount && pTokenSynthetic ? (bvd.current.assetTotalSwapAmount * YEAR_SECONDS * BigInt(1e10)) / pTokenSynthetic : 0n
  }
  console.info('apy:', vc.vault, apy, vc.pTokenV2, bvd?.ptRebaseRate, bvd?.pTokenTotal, pTokenSynthetic)
  return [fmtPercent(apy, 10), apy]
}

export function useUpBVaultForUserAction(bvc: BVaultConfig, onUserAction?: () => void) {
  const { address } = useAccount()
  const qc = useQueryClient()
  return () => {
    retry(
      async () => {
        onUserAction?.()
        if (!address) return
        await qc.refetchQueries({ queryKey: [bvc.vault] })
      },
      3,
      1000,
    )
  }
}

export function calcLPPrice(vc: BVaultConfig, bvd: BVaultDTO, prices: { [k: Address]: bigint }) {
  const lpt = LP_TOKENS[vc.asset]
  if (!lpt) return 0n
  if (!bvd) return 0n
  const lpTotalUSD36 = bvd.lpBase * getBigint(prices, lpt.base, 0n) + bvd.lpQuote * getBigint(prices, lpt.quote)
  return bvd.lpLiq > 0n ? lpTotalUSD36 / bvd.lpLiq : 0n
}


export function usePtBalance(vc: BVaultConfig) {
  return useBalance({ chain: vc.chain, address: vc.pToken } as Token).data
}
export function useAssetBalance(vc: BVaultConfig) {
  return useBalance({ chain: vc.chain, address: vc.asset } as Token).data
}