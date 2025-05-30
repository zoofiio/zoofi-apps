import { DECIMAL, ENV } from '@/constants'
import { useCurrentChainId } from './useCurrentChainId'

import { BVAULTS_CONFIG } from '@/config/bvaults'
import { LP_TOKENS } from '@/config/lpTokens'
import { useStore } from '@/providers/useBoundStore'
import _ from 'lodash'
import { Address } from 'viem'

export function useTVL() {
  const chainId = useCurrentChainId()

  const bvcs = BVAULTS_CONFIG[chainId].filter((item) => (item.onEnv || []).includes(ENV))
  const bvaults = useStore((s) => s.sliceBVaultsStore.bvaults)
  const tprices = useStore((s) => s.sliceTokenStore.prices)

  const tvlItems = ([] as { name: string; symbol: string; address: Address; price: bigint; amount: bigint; usdAmount: bigint }[])
    // const tvlItems = [{ name: USBSymbol, symbol: USBSymbol, address: USB_ADDRESS[chainId] }]
    .concat(
      _.chain(bvcs)
        .mapValues((bvc) => {
          const isLP = LP_TOKENS[bvc.asset]

          const bvd = bvaults[bvc.vault]
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
        .values()
        .reduce((uniqList: any[], item) => {
          const uItem = uniqList.find((u) => u.symbol == item.symbol)
          if (uItem) {
            uItem.amount += item.amount
            uItem.usdAmount += item.usdAmount
            return uniqList
          }
          return [...uniqList, item]
        }, [])
        .value(),
    )

  const tvl = tvlItems.reduce((_sum, item) => _sum + item.usdAmount, 0n)
  return { tvl, tvlItems }
}
