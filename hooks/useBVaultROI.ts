import { abiAdhocBribesPool } from '@/config/abi'
import { BVaultConfig } from '@/config/bvaults'
import { DECIMAL } from '@/constants'
import { getPC } from '@/providers/publicClient'
import { useStore } from '@/providers/useBoundStore'
import { calcLPPrice, useBVault } from '@/providers/useBVaultsData'
import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { Address, formatEther, parseEther } from 'viem'
import { AdditionalSupportTokens, useGetAdditionalConfig } from './useGetConfigs'
import { useReturnsIBGT } from './useReturnsIBGT'
import { getBigint } from '@/lib/utils'

export function useYTPoints(vault: Address) {
  const bvd = useBVault(vault)
  return useQuery({
    initialData: 0n,
    gcTime: 60 * 60 * 1000,
    queryKey: ['ytPoints', vault, bvd.current.adhocBribesPool],
    enabled: Boolean(vault) && Boolean(bvd.current.adhocBribesPool),
    queryFn: async () => {
      const pc = getPC()
      return pc.readContract({ abi: abiAdhocBribesPool, address: bvd.current.adhocBribesPool, functionName: 'totalSupply' })
    },
  })
}

export function calcRestakingApy(returnsIBGTByYT: bigint, ytPrice: bigint, ibgtPrice: bigint) {
  const restakingIncomesApy = ytPrice > 0n ? (returnsIBGTByYT * ibgtPrice) / ytPrice : 0n
  return restakingIncomesApy > 100n * DECIMAL ? 0n : restakingIncomesApy
}

// export const additionBERA = 400n
export function calcAdditionalApy(additionalUSD: bigint, ytPoints: bigint, ytAmount: bigint, remainTime: bigint, ytPrice: bigint) {
  const YTp = ytPoints > 0n && ytAmount > 0n ? ytPoints + ytAmount * remainTime : 0n
  const A = additionalUSD
  const B = YTp > 0n ? (A * DECIMAL) / YTp : 0n
  const P = DECIMAL * remainTime
  const I = (B * P) / DECIMAL
  const additionalRoi = ytPrice > 0n ? (I * DECIMAL) / ytPrice : 0n
  return additionalRoi
}

export function useBvaultROI(vc: BVaultConfig, ytchange: bigint = 0n, afterYtPriceBn: bigint = 0n) {
  const bvd = useBVault(vc.vault)
  const { data: perReturnsIBGT, isLoading: isLoading1 } = useReturnsIBGT(vc.vault)
  const { data: additionalConfig, isLoading: isLoading2 } = useGetAdditionalConfig()
  const endTime = bvd.current.duration + bvd.current.startTime
  const remainDur = endTime > 0n ? endTime - BigInt(_.round(_.now() / 1000)) : 0n

  const ytAmount = bvd.current.yTokenAmountForSwapYT
  const returnsIBGTByYT = ytAmount > 0n ? (perReturnsIBGT * DECIMAL * remainDur) / ytAmount : 0n

  const iBGTPrice =
    useStore((s) => s.sliceTokenStore.prices['0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b'], [`sliceTokenStore.prices.0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b`]) || 0n

  const prices = useStore((s) => s.sliceTokenStore.prices, [`sliceTokenStore.prices`]) || 0n

  const lpPrice = calcLPPrice(vc.vault, vc.asset)
  console.info('Prices:', vc.assetSymbol, formatEther(iBGTPrice), formatEther(lpPrice))
  const vualtYTokenBalance = bvd.current.vaultYTokenBalance
  const returnsIBGTByAfterYT = ytAmount + ytchange > 0n ? (perReturnsIBGT * DECIMAL * remainDur) / (ytAmount + ytchange) : 0n
  // const ptTotal = bvd.pTokenTotal
  const ytAssetPriceBn = vualtYTokenBalance > 0n ? (bvd.Y * DECIMAL) / vualtYTokenBalance : 0n
  const ytAssetPriceChanged = vualtYTokenBalance - ytchange > 0n ? (bvd.Y * DECIMAL) / (vualtYTokenBalance - ytchange) : 0n
  const ytPriceBn = (ytAssetPriceBn * lpPrice) / DECIMAL
  // const ytPriceChanged = (ytAssetPriceChanged * lpPrice) / DECIMAL
  const ytPriceChanged = (afterYtPriceBn * lpPrice) / DECIMAL
  const restakingIncomesApy = calcRestakingApy(returnsIBGTByYT, ytPriceBn, iBGTPrice)
  const restakingChangedApy = ytchange > 0n ? calcRestakingApy(returnsIBGTByAfterYT, ytPriceChanged, iBGTPrice) : 0n
  console.info('restakingapy:', vc.assetSymbol, formatEther(restakingIncomesApy), formatEther(returnsIBGTByYT), formatEther(ytAssetPriceBn), formatEther(ytPriceBn))
  const additional = additionalConfig[`${vc.vault}`]?.[parseInt(bvd.epochCount.toString())]
  const additionalUSD =
    !additional || !additional.token || !additional.amount
      ? 0n
      : (getBigint(prices, AdditionalSupportTokens[additional.token]) * parseEther(additional.amount.toFixed(6))) / DECIMAL
  // aditional airdrops
  const { data: ytPoints, isLoading: isLoading3 } = useYTPoints(vc.vault)

  const additionalRoi = calcAdditionalApy(additionalUSD, ytPoints, ytAmount, remainDur, ytPriceBn)
  const additionalRoiChanged = ytchange > 0n ? calcAdditionalApy(additionalUSD, ytPoints, ytAmount + ytchange, remainDur, ytPriceChanged) : 0n
  const isLoading = isLoading1 || isLoading2 || isLoading3
  return {
    // roi: restakingIncomesApy > 0n ? restakingIncomesApy + additionalRoi - DECIMAL : 0n,
    roi: !isLoading && ytAmount > 0n && returnsIBGTByYT > 0n ? restakingIncomesApy + additionalRoi - DECIMAL : 0n,
    // roiChange: restakingChangedApy > 0n ? restakingChangedApy + additionalRoiChanged - DECIMAL : 0n,
    roiChange: !isLoading && ytAmount > 0n && returnsIBGTByYT > 0n ? restakingChangedApy + additionalRoiChanged - DECIMAL : 0n,
    restakingIncomesApy,
    additionalRoi,
  }
}
