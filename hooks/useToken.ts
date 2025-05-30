import { Token } from '@/config/tokens'

import { getPC } from '@/providers/publicClient'
import { Address, erc20Abi } from 'viem'
import { useAccount } from 'wagmi'
import { useCurrentChainId } from './useCurrentChainId'
import { useFet } from '@/lib/useFet'
import { getNftsByAlchemy } from '@/config/api'

export const FET_KEYS = {
  TokenBalance: (token?: Token, user?: Address) => (user && token ? `tokenBalance:${token.chain}-${token.address}-by-${user}` : ''),
  TokenSupply: (token?: Token) => (token ? `tokenTotalSupply:${token.chain}-${token.address}` : ''),
  Erc721Balance: (token?: Address, user?: Address) => (token ? `erc721Balance:${token}-${user}` : ''),
}
export function useBalance(token?: Token) {
  const { address } = useAccount()
  const chainId = useCurrentChainId()
  return useFet({
    key: FET_KEYS.TokenBalance(token, address),
    initResult: 0n,
    fetfn: async () =>
      token!.isNative
        ? getPC(chainId).getBalance({ address: address! })
        : getPC(chainId).readContract({ abi: erc20Abi, functionName: 'balanceOf', address: token!.address, args: [address!] }),
  })
}

export function useTotalSupply(token?: Token) {
  const chainId = useCurrentChainId()
  return useFet({
    key: FET_KEYS.TokenSupply(token),
    initResult: 0n,
    fetfn: async () => (token!.isNative ? 0n : getPC(chainId).readContract({ abi: erc20Abi, functionName: 'totalSupply', address: token!.address })),
  })
}

export function useErc721Balance(token?: Address) {
  const { address } = useAccount()
  const chainId = useCurrentChainId()
  return useFet({
    key: FET_KEYS.Erc721Balance(token, address),
    initResult: [] as string[],
    fetfn: async () => (token && address ? getNftsByAlchemy(chainId, token, address) : [] as string[]),
  })
}
