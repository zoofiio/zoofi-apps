import { abiBVault } from '@/config/abi'
import { BVaultConfig, BVAULTS_CONFIG } from '@/config/bvaults'
import { LntVaultConfig } from '@/config/lntvaults'
import { ENV } from '@/constants'
import { fmtDate, shortStr } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useSetState } from 'react-use'
import { Address } from 'viem'
import { useCurrentChainId } from './useCurrentChainId'

type OptionItem<T, type> = { label: string; value: Address; data: T; type: type }
type OptionsItem = OptionItem<BVaultConfig, 'B-Vault'> | OptionItem<LntVaultConfig, 'Lnt-Vault'>

export function useVaultsConfigs() {
  const chainId = useCurrentChainId()

  const bvcs = useMemo(() => (BVAULTS_CONFIG || []).filter((vc) => vc.onEnv && vc.onEnv.includes(ENV)), [chainId])

  const options: OptionsItem[] = useMemo(() => {
    const bvcsOpt = bvcs.map<OptionItem<BVaultConfig, 'B-Vault'>>((bvc) => ({
      label: bvc.assetSymbol,
      value: bvc.vault,
      data: bvc,
      type: 'B-Vault',
    }))

    return [...bvcsOpt].map((item) => ({ ...item, label: `${item.label}     (${item.type}: ${shortStr(item.data.vault)})` }))
  }, [bvcs])
  const bsQuery = useQuery({
    queryKey: ['queryBvualts', chainId, bvcs],
    queryFn: async () => {
      const pc = getPC(chainId)
      const closedPromise = Promise.all(bvcs.map((vc) => pc.readContract({ abi: abiBVault, functionName: 'closed', address: vc.vault })))
      const epochCountPromise = Promise.all(bvcs.map((vc) => pc.readContract({ abi: abiBVault, functionName: 'epochIdCount', address: vc.vault })))

      const [closed, epochcount] = await Promise.all([closedPromise, epochCountPromise])
      const currentEpoch = await Promise.all(
        bvcs.map((vc, i) =>
          epochcount[i] > 0n ? pc.readContract({ abi: abiBVault, functionName: 'epochInfoById', address: vc.vault, args: [epochcount[i]] }) : Promise.resolve(undefined),
        ),
      )
      const data: { [k: Address]: string } = {}
      for (let index = 0; index < bvcs.length; index++) {
        const vc = bvcs[index]
        if (epochcount[index] > 0n) {
          data[vc.vault] = `${closed[index] ? 'Closed' : 'Active'}    Epoch${epochcount[index]}   (${fmtDate(currentEpoch[index]!.startTime * 1000n)})`
        } else {
          data[vc.vault] = 'UnStart'
        }
      }
      return data
    },
  })
  const stateOptions = useMemo(() => {
    if (!bsQuery.data) return []
    return options.map((item) => (item.type === 'B-Vault' ? { ...item, label: `${item.label} ${bsQuery.data[item.data.vault]}` } : item))
  }, [options, bsQuery.data])
  const [{ current }, setState] = useSetState<{ current: OptionsItem }>({
    current: options[0],
  })

  return { current, setState, options, bsQuery, stateOptions }
}
