import { BVaultConfig } from '@/config/bvaults'
import api from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

export function useReturnsIBGT(vc: BVaultConfig) {
  return useQuery({
    initialData: 0n,
    queryKey: ['getReturnsIBGT', vc.vault],
    queryFn: async () => {
      const data = await api.get<{ yield: string; dur: number }>(`/api/bvault/getYieldiBGT/${vc.vault}`)
      const per = BigInt(data.yield) / BigInt(data.dur)
      return per
    },
  })
}
