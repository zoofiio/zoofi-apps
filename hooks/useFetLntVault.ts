import { LntVaultConfig } from '@/config/lntvaults'
import { useFet } from '@/lib/useFet'
import { useCurrentChainId } from './useCurrentChainId'
import { getPC } from '@/providers/publicClient'
import { abiMockNodeDelegator, abiQueryLNT } from '@/config/abi/abiLNTVault'
import { codeQueryLNT } from '@/config/codes'
import { Address, PublicClient } from 'viem'
import { useAccount } from 'wagmi'

export const FET_KEYS = {
  LntVault: (vc: LntVaultConfig) => `fetLntVault:${vc.vault}`,
  LntVaultYTRewards: (vc: LntVaultConfig, yt?: Address, user?: string) => (yt && user ? `fetLntVaultYTRewards:${yt}:${user}` : ''),
  LntVaultOperators: (vc: LntVaultConfig, nodeOP?: Address) => (nodeOP ? `fetLntVaultOperators:${nodeOP}` : ''),
}
export function useLntVault(vc: LntVaultConfig) {
  const chainId = useCurrentChainId()
  return useFet({
    key: FET_KEYS.LntVault(vc),
    fetfn: async () => getPC(chainId).readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'queryLntVault', args: [vc.vault] }),
  })
}

export async function getRewardsBy(rewradManager: Address, user: Address, pc: PublicClient) {
  return pc
    .readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'earned', args: [rewradManager, user] })
    .then((item) => item.map((r) => [r.token, r.value] as [Address, bigint]))
}
export function useLntVaultYTRewards(vc: LntVaultConfig) {
  const chainId = useCurrentChainId()
  const vd = useLntVault(vc)
  const { address } = useAccount()
  const rewards = useFet({
    key: FET_KEYS.LntVaultYTRewards(vc, vd.result?.YT, address),
    fetfn: async () => {
      const pc = getPC(chainId)
      return getRewardsBy(vd.result!.YT, address!, pc)
    },
  })
  if (vd.status === 'fetching') {
    rewards.status = 'fetching'
  }
  return rewards
}

export function useLntVaultOperators(vc: LntVaultConfig) {
  const chainId = useCurrentChainId()
  const vd = useLntVault(vc)
  const operators = useFet({
    key: FET_KEYS.LntVaultOperators(vc, vd.result?.nodeDelegator),
    initResult: [],
    fetfn: async () => {
      const pc = getPC(chainId)
      const opaddress = await pc.readContract({ abi: abiMockNodeDelegator, address: vd.result!.nodeDelegator, functionName: 'operators' })
      return Promise.all(
        opaddress.map((item) =>
          pc
            .readContract({ abi: abiMockNodeDelegator, address: vd.result!.nodeDelegator, functionName: 'getOperatorInfo', args: [item] })
            .then(([capacity, delegations]) => ({ address: item, capacity, delegations })),
        ),
      )
    },
  })
  if (vd.status === 'fetching') {
    operators.status = 'fetching'
  }
  return operators
}
