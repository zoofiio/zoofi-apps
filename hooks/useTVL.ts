import { DECIMAL } from '@/constants'

import { BvaultsByEnv } from '@/config/bvaults'
import { LP_TOKENS } from '@/config/lpTokens'
import { Address } from 'viem'
import { useTokenPrices } from './useToken'
import { useBVaults } from '@/providers/useBVaultsData'

export function useTVL() {
  const bvcs = BvaultsByEnv
  const bvaults = useBVaults(bvcs)
  const tprices = useTokenPrices()
  const tvlItems = ([] as { name: string; symbol: string; address: Address; price: bigint; amount: bigint; usdAmount: bigint }[])
    // const tvlItems = [{ name: USBSymbol, symbol: USBSymbol, address: USB_ADDRESS[chainId] }]
    .concat(
      bvcs
        .map((bvc, i) => {
          const isLP = LP_TOKENS[bvc.asset]

          const bvd = bvaults[i]?.data
          const lpEnable = isLP && bvd && bvd.lpLiq && bvd.lpBase && bvd.lpQuote && tprices[isLP.base] && tprices[isLP.quote]
          const price = lpEnable ? (tprices[isLP.base] * bvd.lpBase! + tprices[isLP.quote] * bvd.lpQuote!) / bvd.lpLiq! : tprices[bvc.asset] || DECIMAL
          const amount = bvd?.lpLiq || bvd?.lockedAssetTotal || 0n
          return {
            name: bvc.assetSymbol,
            symbol: bvc.assetSymbol,
            address: bvc.asset,
            price,
            amount,
            usdAmount: (price * amount) / DECIMAL,
          }
        })
        .reduce((uniqList: any[], item) => {
          const uItem = uniqList.find((u) => u.symbol == item.symbol)
          if (uItem) {
            uItem.amount += item.amount
            uItem.usdAmount += item.usdAmount
            return uniqList
          }
          return [...uniqList, item]
        }, []),
    )

  const tvl = tvlItems.reduce((_sum, item) => _sum + item.usdAmount, 0n)
  return { tvl, tvlItems }
}
