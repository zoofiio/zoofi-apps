import api from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { Address } from 'viem'
import { useCurrentChainId } from './useCurrentChainId'

export function useReturnsIBGT(vault: Address) {
  const chainId = useCurrentChainId()
  return useQuery({
    initialData: 0n,
    queryKey: ['getReturnsIBGT', vault, chainId],
    queryFn: async () => {
      const data = await api.get<{ yield: string; dur: number }>(chainId, `/api/bvault/getYieldiBGT/${vault}`)
      const per = BigInt(data.yield) / BigInt(data.dur)
      return per
    },
  })
}
