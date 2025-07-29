import { abiBQuery2, codeBQuery2 } from '@/config/abi/BQuery2'
import { BVAULTS_CONFIG } from '@/config/bvaults'
import { ENV } from '@/constants'
import { getPC } from '@/providers/publicClient'
import { useQuery } from '@tanstack/react-query'
import { mapKeys } from 'es-toolkit'
import { toPlainObject } from 'es-toolkit/compat'
import { useCurrentChainId } from './useCurrentChainId'

export function useBVaultDatas() {
  const chainId = useCurrentChainId()
  const vcs = (BVAULTS_CONFIG[chainId] || []).filter((item) => item.onEnv && item.onEnv.includes(ENV))
  return useQuery({
    queryKey: ['queryBVaults', chainId, vcs],
    queryFn: async () => {
      const pc = getPC(chainId)
      const datas = await Promise.all(vcs.map((vc) => pc.readContract({ abi: abiBQuery2, code: codeBQuery2, functionName: 'queryBVault', args: [vc.vault] })))
      const map = mapKeys(toPlainObject(datas) as { [k: number]: (typeof datas)[number] }, (_item, i) => vcs[i].vault)
      console.info('bvauts:data:', map)
      return map
    },
  })
}
