import { BVaultConfig, BVAULTS_CONFIG } from '@/config/bvaults'
import { ENV } from '@/constants'
import { BVaultEpochDTO } from '@/providers/sliceBVaultsStore'
import { useBoundStore, useStore } from '@/providers/useBoundStore'
import { useQuery } from '@tanstack/react-query'
import { keys } from 'es-toolkit/compat'
import { useMemo } from 'react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { useCurrentChainId } from './useCurrentChainId'
import { useGetAdditionalConfig } from './useGetConfigs'


export function useLoadBVaults() {
  const chainId = useCurrentChainId()
  const bvcs = useMemo(() => BVAULTS_CONFIG[chainId].filter((vc) => (vc.onEnv || []).includes(ENV)), [chainId, ENV])
  // useUpdateBVaultsData(bvcs)
  const { isLoading: isLoading1 } = useQuery({
    queryKey: ['UpdateBVaults', bvcs],
    queryFn: async () => {
      await Promise.all([useBoundStore.getState().sliceBVaultsStore.updateBvaults(chainId, bvcs), useBoundStore.getState().sliceBVaultsStore.updateYTokenSythetic(chainId, bvcs)])
      return true
    },
  })
  const { address } = useAccount()
  const tokens = useMemo(
    () =>
      bvcs
        .map((b) => [b.asset, b.pToken])
        .flat()
        .reduce<Address[]>((union, item) => (union.includes(item) ? union : [...union, item]), []),
    [bvcs],
  )
  const { isLoading: isLoading2 } = useQuery({
    queryKey: ['UpdateBvautlsTokens', tokens],
    queryFn: async () => {
      await Promise.all([
        useBoundStore.getState().sliceTokenStore.updateTokenTotalSupply(chainId, tokens),
        useBoundStore.getState().sliceTokenStore.updateTokenPrices(chainId, tokens),
      ])
      return true
    },
    throwOnError(error, query) {
      console.error(error)
      return false
    },
  })
  const { isLoading: isLoading3 } = useQuery({
    queryKey: ['UpdateUserBvautlsTokens', tokens, address],
    queryFn: async () => {
      if (!address) return false
      await useBoundStore.getState().sliceTokenStore.updateTokensBalance(chainId, tokens, address)
      return true
    },
  })
  const { isLoading: isLoading4 } = useGetAdditionalConfig()
  return { loading: isLoading1 || isLoading2 || isLoading3 || isLoading4 }
}

export function useLoadUserBVaults() {
  const { address } = useAccount()
  const chainId = useCurrentChainId()
  const bvcs = useMemo(() => BVAULTS_CONFIG[chainId].filter((vc) => (vc.onEnv || []).includes(ENV)), [chainId, ENV])
  const bvaultsKeys = useStore((s) => keys(s.sliceBVaultsStore.bvaults).toString(), ['sliceBVaultsStore.bvaults'])
  useQuery({
    queryKey: ['UpdateAllUserBvaults', bvcs, chainId, address, bvaultsKeys],
    queryFn: async () => {
      if (!address) return false
      const bvaults = useBoundStore.getState().sliceBVaultsStore.bvaults
      for (const bvc of bvcs) {
        if (!bvaults[bvc.vault]) return false
      }
      await Promise.all(bvcs.map((bvc) => useBoundStore.getState().sliceBVaultsStore.updateEpoches(chainId, bvc)))
      const getEpochesParams = (bvc: BVaultConfig) => {
        const bvd = useBoundStore.getState().sliceBVaultsStore.bvaults[bvc.vault]!
        const epoches: BVaultEpochDTO[] = []
        for (let epocheId = parseInt(bvd.epochCount.toString()); epocheId > 0; epocheId--) {
          const epoch = useBoundStore.getState().sliceBVaultsStore.epoches[`${bvc.vault}_${epocheId}`]!
          epoches.push(epoch)
        }
        return epoches
      }
      await Promise.all(bvcs.map((bvc) => useBoundStore.getState().sliceUserBVaults.updateEpoches(chainId, bvc, address, getEpochesParams(bvc))))
      return true
    },
  })
}
