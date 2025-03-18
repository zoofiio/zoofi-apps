import { abiAdhocBribesPool } from '@/config/abi'
import { DECIMAL, YEAR_SECONDS } from '@/constants'
import { getPC } from '@/providers/publicClient'
import { useBoundStore, useStore } from '@/providers/useBoundStore'
import { useBVault, useBVaultApy } from '@/providers/useBVaultsData'
import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { Address, formatEther } from 'viem'
import { useReturnsIBGT } from './useReturnsIBGT'

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

export function calcRestakingApy(underlyingApy: bigint, ptTotal: bigint, remainTime: bigint, ytAmount: bigint, ytPrice: bigint, ibgtPrice: bigint) {
  const S = (underlyingApy * ibgtPrice) / 1000n / DECIMAL
  const restakingIncomesApy = ytPrice > 0n ? (S * DECIMAL) / ytPrice : 0n
  // const finApy = ibgtPrice > 0n ? (restakingIncomesApy * DECIMAL) / ibgtPrice : 0n
  return restakingIncomesApy
}

export function calcAdditionalApy(ytPoints: bigint, ytAmount: bigint, remainTime: bigint, ytPrice: bigint, ibgtPrice: bigint) {
  const YTp = ytPoints + ytAmount * remainTime
  const A = 0n * DECIMAL
  const B = YTp > 0n ? (A * DECIMAL) / YTp : 0n
  const P = DECIMAL * remainTime
  const I = (B * P) / DECIMAL
  const additionalRoi = ytPrice > 0n ? (I * DECIMAL) / ytPrice : 0n
  const finRoi = ibgtPrice > 0n ? (additionalRoi * DECIMAL) / ibgtPrice : 0n
  return finRoi
}

export function useBvaultROI(vault: Address, ytchange: bigint = 0n) {
  const bvd = useBVault(vault)
  const { data: perReturnsIBGT } = useReturnsIBGT(vault)
  const endTime = bvd.current.duration + bvd.current.startTime
  const remainDur = endTime > 0n ? endTime - BigInt(_.round(_.now() / 1000)) : 0n
  const expectYTAmount = bvd.current.yTokenAmountForSwapYT + 1000n
  const returnsIBGTBy1000YT = (perReturnsIBGT * DECIMAL * remainDur * 1000n) / expectYTAmount

  // restaking incomes
  const [, ptApy] = useBVaultApy(vault)
  const ptApy18 = ptApy * BigInt(1e8)

  const iBGTPrice =
    useStore((s) => s.sliceTokenStore.prices['0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b'], [`sliceTokenStore.prices.0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b`]) || 0n
  console.info('ibgtPrice:', formatEther(iBGTPrice))
  const ytAmount = bvd.current.yTokenAmountForSwapYT
  const vualtYTokenBalance = bvd.current.vaultYTokenBalance
  const remainTime = bvd.current.duration + bvd.current.startTime - BigInt(_.round(_.now() / 1000))
  const returnsIBGTByAfterYT = perReturnsIBGT * DECIMAL * remainDur * 1000n / (expectYTAmount + ytchange)
  const ptTotal = bvd.pTokenTotal
  const ytAssetPriceBn = vualtYTokenBalance > 0n ? (bvd.Y * DECIMAL) / vualtYTokenBalance : 0n
  const ytPriceChanged = vualtYTokenBalance > 0n ? (bvd.Y * DECIMAL) / (vualtYTokenBalance - ytchange) : 0n
  const restakingIncomesApy = calcRestakingApy(returnsIBGTBy1000YT, ptTotal, remainTime, ytAmount, ytAssetPriceBn, iBGTPrice)
  const restakingChangedApy = ytchange > 0n ? calcRestakingApy(returnsIBGTByAfterYT, ptTotal, remainTime, ytAmount + ytchange, ytPriceChanged, iBGTPrice) : 0n

  // aditional airdrops
  const { data: ytPoints } = useYTPoints(vault)
  const additionalRoi = calcAdditionalApy(ytPoints, ytAmount, remainTime, ytAssetPriceBn, iBGTPrice)
  const additionalRoiChanged = ytchange > 0n ? calcAdditionalApy(ytPoints, ytAmount + ytchange, remainTime, ytPriceChanged, iBGTPrice) : 0n
  return {
    roi: restakingIncomesApy > 0n ? restakingIncomesApy + additionalRoi - DECIMAL : 0n,
    // roi: restakingIncomesApy > 0n && additionalRoi > 0n ? restakingIncomesApy + additionalRoi - DECIMAL : 0n,
    roiChange: restakingChangedApy > 0n ? restakingChangedApy + additionalRoiChanged - DECIMAL : 0n,
    // roiChange: restakingChangedApy > 0n && additionalRoiChanged > 0n ? restakingChangedApy + additionalRoiChanged - DECIMAL : 0n,
    restakingIncomesApy,
    additionalRoi,
  }
}
