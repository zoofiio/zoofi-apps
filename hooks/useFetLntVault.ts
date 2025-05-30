import { LntVaultConfig } from '@/config/lntvaults'
import { useFet } from '@/lib/useFet'
import { useCurrentChainId } from './useCurrentChainId'
import { getPC } from '@/providers/publicClient'
import { abiQueryLNT } from '@/config/abi/abiLNTVault'
import { codeQueryLNT } from '@/config/codes'

export const FET_KEYS = {
  LntVault: (vc: LntVaultConfig) => `fetLntVault:${vc.vault}`,
}
export function useLntVault(vc: LntVaultConfig) {
  const chainId = useCurrentChainId()
  return useFet({
    key: FET_KEYS.LntVault(vc),
    fetfn: async () => getPC(chainId).readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'queryLntVault', args: [vc.vault] }),
  })
}
