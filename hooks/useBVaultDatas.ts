import { BVAULTS_CONFIG } from '@/config/bvaults'
import { useCurrentChainId } from './useCurrentChainId'
import { ENV } from '@/constants'
import { useQuery } from '@tanstack/react-query'
import { getPC } from '@/providers/publicClient'
import { abiBQuery2, codeBQuery2 } from '@/config/abi/BQuery2'
import _ from 'lodash'

export function useBVaultDatas() {
  const chainId = useCurrentChainId()
  const vcs = (BVAULTS_CONFIG[chainId] || []).filter((item) => item.onEnv && item.onEnv.includes(ENV))
  return useQuery({
    queryKey: ['queryBVaults', vcs],
    queryFn: async () => {
      const pc = getPC()
      const datas = await Promise.all(vcs.map((vc) => pc.readContract({ abi: abiBQuery2, code: codeBQuery2, functionName: 'queryBVault', args: [vc.vault] })))
      const map = _.mapKeys(datas, (_item, i) => vcs[i].vault)
      console.info('bvauts:data:', map)
      return map
    },
  })
}
