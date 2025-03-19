import { abiAdhocBribesPool } from '@/config/abi'
import { DECIMAL, YEAR_SECONDS } from '@/constants'
import { getPC } from '@/providers/publicClient'
import { useBoundStore, useStore } from '@/providers/useBoundStore'
import { calcLPPrice, useBVault, useBVaultApy } from '@/providers/useBVaultsData'
import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { Address, formatEther, parseEther } from 'viem'
import { useReturnsIBGT } from './useReturnsIBGT'
import { useGetAdditionalConfig } from './useGetConfigs'
import { BVaultConfig } from '@/config/bvaults'

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

export function calcRestakingApy(returnsIBGTByAfterYT: bigint, ptTotal: bigint, remainTime: bigint, ytAmount: bigint, ytPrice: bigint, ibgtPrice: bigint) {
  const S = (returnsIBGTByAfterYT * ibgtPrice) / 1000n / DECIMAL
  const restakingIncomesApy = ytPrice > 0n ? (S * DECIMAL) / ytPrice : 0n
  return restakingIncomesApy
}

// export const additionBERA = 400n
export function calcAdditionalApy(additionBERA: number, ytPoints: bigint, ytAmount: bigint, remainTime: bigint, ytPrice: bigint, beraPrice: bigint) {
  const YTp = ytPoints > 0n && ytAmount > 0n ? ytPoints + ytAmount * remainTime : 0n
  const A = additionBERA > 0 ? (parseEther(additionBERA.toFixed(6)) * beraPrice) / DECIMAL : 0n
  const B = YTp > 0n ? (A * DECIMAL) / YTp : 0n
  const P = DECIMAL * remainTime
  const I = (B * P) / DECIMAL
  const additionalRoi = ytPrice > 0n ? (I * DECIMAL) / ytPrice : 0n
  return additionalRoi
}

export function useBvaultROI(vc: BVaultConfig, ytchange: bigint = 0n) {
  const bvd = useBVault(vc.vault)
  const { data: perReturnsIBGT, isLoading: isLoading1 } = useReturnsIBGT(vc.vault)
  const { data: additionalConfig, isLoading: isLoading2 } = useGetAdditionalConfig()
  const endTime = bvd.current.duration + bvd.current.startTime
  const remainDur = endTime > 0n ? endTime - BigInt(_.round(_.now() / 1000)) : 0n
  const expectYTAmount = bvd.current.yTokenAmountForSwapYT + 1000n
  const returnsIBGTBy1000YT = (perReturnsIBGT * DECIMAL * remainDur * 1000n) / expectYTAmount

  const iBGTPrice =
    useStore((s) => s.sliceTokenStore.prices['0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b'], [`sliceTokenStore.prices.0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b`]) || 0n

  const beraPrice =
    useStore((s) => s.sliceTokenStore.prices['0x6969696969696969696969696969696969696969'], [`sliceTokenStore.prices.0x6969696969696969696969696969696969696969`]) || 0n

  const lpPrice = calcLPPrice(vc.vault, vc.asset)
  console.info('Prices:', formatEther(iBGTPrice), formatEther(beraPrice), formatEther(lpPrice))
  const ytAmount = bvd.current.yTokenAmountForSwapYT
  const vualtYTokenBalance = bvd.current.vaultYTokenBalance
  const returnsIBGTByAfterYT = (perReturnsIBGT * DECIMAL * remainDur * 1000n) / (expectYTAmount + ytchange)
  const ptTotal = bvd.pTokenTotal
  const ytAssetPriceBn = vualtYTokenBalance > 0n ? (bvd.Y * DECIMAL) / vualtYTokenBalance : 0n
  const ytPriceChanged = vualtYTokenBalance - ytchange > 0n ? (bvd.Y * DECIMAL) / (vualtYTokenBalance - ytchange) : 0n
  const restakingIncomesApy = calcRestakingApy(returnsIBGTBy1000YT, ptTotal, remainDur, ytAmount, ytAssetPriceBn, iBGTPrice)
  const restakingChangedApy = ytchange > 0n ? calcRestakingApy(returnsIBGTByAfterYT, ptTotal, remainDur, ytAmount + ytchange, ytPriceChanged, iBGTPrice) : 0n
  const additionalBera = additionalConfig[`${vc.vault}_${bvd.epochCount}_BERA`] ?? 0
  // aditional airdrops
  const { data: ytPoints, isLoading: isLoading3 } = useYTPoints(vc.vault)
  const additionalRoi = calcAdditionalApy(additionalBera, ytPoints, ytAmount, remainDur, ytAssetPriceBn, beraPrice)
  const additionalRoiChanged = ytchange > 0n ? calcAdditionalApy(additionalBera, ytPoints, ytAmount + ytchange, remainDur, ytPriceChanged, beraPrice) : 0n
  const isLoading = isLoading1 || isLoading2 || isLoading3
  return {
    // roi: restakingIncomesApy > 0n ? restakingIncomesApy + additionalRoi - DECIMAL : 0n,
    roi: !isLoading ? restakingIncomesApy + additionalRoi - DECIMAL : 0n,
    // roiChange: restakingChangedApy > 0n ? restakingChangedApy + additionalRoiChanged - DECIMAL : 0n,
    roiChange: !isLoading ? restakingChangedApy + additionalRoiChanged - DECIMAL : 0n,
    restakingIncomesApy,
    additionalRoi,
  }
}
