import { NATIVE_TOKEN_ADDRESS, OLD_VAULTS_CONFIG, PLAIN_VAULTS_CONFIG, USBSymbol, USB_ADDRESS, VAULTS_CONFIG, VAULT_QUERY_ADDRESS } from '@/config/swap'
import { useCurrentChainId } from './useCurrentChainId'
import { useContext } from 'react'
import { FetcherContext } from '@/providers/fetcher'
import { DECIMAL, ENV } from '@/constants'
import { useWandContractReads } from './useWand'

import { abiPtyPool, abiVaultQuery } from '@/config/abi'
import { getBigint } from '@/lib/utils'
import { useBoundStore, useStore } from '@/providers/useBoundStore'
import _ from 'lodash'
import { BVAULTS_CONFIG } from '@/config/bvaults'
import { LP_TOKENS } from '@/config/lpTokens'

export function useTVLV1() {
  const chainId = useCurrentChainId()
  const ethVC = OLD_VAULTS_CONFIG[chainId]?.[0]
  const usdbVC = OLD_VAULTS_CONFIG[chainId]?.[1]
  const { prices } = useContext(FetcherContext)
  const { data } = useWandContractReads({
    contracts: [
      {
        abi: abiVaultQuery,
        address: VAULT_QUERY_ADDRESS[chainId],
        functionName: 'getVaultState',
        args: [ethVC?.vault],
      },
      {
        abi: abiVaultQuery,
        address: VAULT_QUERY_ADDRESS[chainId],
        functionName: 'getStableVaultState',
        args: [usdbVC?.vault],
      },
      {
        abi: abiPtyPool,
        address: ethVC?.ptyPoolAboveAddress,
        functionName: 'totalStakingBalance',
      },
    ],
  })

  const depositETH = getBigint(data, [0, 'result', 'M_ETH'])
  const depositUSDB = getBigint(data, [1, 'result', 'M_USDC'])
  const stakingETH = getBigint(data, [2, 'result'])
  return ((depositETH + stakingETH) * prices[NATIVE_TOKEN_ADDRESS]) / DECIMAL + (depositUSDB * prices[usdbVC?.assetTokenAddress]) / DECIMAL
}

export function useTVL() {
  const chainId = useCurrentChainId()
  const vcs = VAULTS_CONFIG[chainId] || []
  const bvcs = BVAULTS_CONFIG[chainId].filter((item) => (item.onEnv || []).includes(ENV))
  // const pvcs = PLAIN_VAULTS_CONFIG[chainId] || []
  const { prices } = useContext(FetcherContext)
  const lvaults = useStore((s) => s.sliceLVaultsStore.lvaults)
  const totalSupply = useStore((s) => s.sliceTokenStore.totalSupply)
  const vaultUsbTotal = vcs.map((v) => lvaults[v.vault]?.usbTotalSupply || 0n).reduce((a, b) => a + b, 0n)
  const bvaults = useStore((s) => s.sliceBVaultsStore.bvaults)
  const tprices = useStore((s) => s.sliceTokenStore.prices)

  const tvlItems = [{ name: USBSymbol, symbol: USBSymbol, address: USB_ADDRESS[chainId] }]
    .concat(
      vcs.map((v) => ({
        name: v.xTokenSymbol + v.version,
        symbol: v.xTokenSymbol,
        address: v.xTokenAddress,
      })),
    )
    .map((item) => {
      const price = prices[item.address]
      const amount = item.symbol == USBSymbol ? vaultUsbTotal : totalSupply[item.address] || 0n
      const usdAmount = (price * amount) / DECIMAL
      return {
        ...item,
        price,
        amount,
        usdAmount,
      }
    })
    .concat(
      vcs
        .filter((vc) => !vc.isStable)
        .map((vc) => {
          const lvd = lvaults[vc.vault]
          const amount = (lvd?.sellPoolTotalStaking || 0n) + (lvd?.buyPoolBalance || 0n)
          const price = prices[vc.assetTokenAddress]
          const usdAmount = (price * amount) / DECIMAL
          return {
            name: vc.assetTokenSymbol + vc.version,
            symbol: vc.assetTokenSymbol,
            address: vc.assetTokenAddress,
            price,
            amount,
            usdAmount,
          }
        }),
    )
    .concat(
      _.chain(bvcs)
        .mapValues((bvc) => {
          const isLP = LP_TOKENS[bvc.asset]

          const bvd = bvaults[bvc.vault]
          const lpEnable = isLP && bvd && bvd.lpLiq && bvd.lpBase && bvd.lpQuote && tprices[isLP.base] && tprices[isLP.quote]
          const price = lpEnable ? (tprices[isLP.base] * bvd.lpBase! + tprices[isLP.quote] * bvd.lpQuote!) / bvd.lpLiq! : tprices[bvc.asset] || DECIMAL
          // const amount = lpEnable ? bvd.lpLiq! : 0n
          // const price = tprices[bvc.asset] || DECIMAL
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
