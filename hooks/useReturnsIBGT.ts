import { BVaultConfig } from '@/config/bvaults'
import api from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { Address } from 'viem'

export function useReturnsIBGT(vault: Address) {
  return useQuery({
    initialData: 0n,
    queryKey: ['getReturnsIBGT', vault],
    queryFn: async () => {
      const data = await api.get<{ yield: string; dur: number }>(`/api/bvault/getYieldiBGT/${vault}`)
      const per = BigInt(data.yield) / BigInt(data.dur)
      return per
    },
  })
}
