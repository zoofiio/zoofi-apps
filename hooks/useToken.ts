import { Token } from '@/config/tokens'

import { getNftsByAlchemy, getNftsByAnker, getNftsByMoralis, getNftsByZoofi } from '@/config/api'
import { useFet } from '@/lib/useFet'
import { getPC } from '@/providers/publicClient'
import { range } from 'es-toolkit'
import { Address, erc20Abi, erc721Abi, parseAbi } from 'viem'
import { useAccount } from 'wagmi'

export const FET_KEYS = {
  TokenBalance: (token?: Token, user?: Address) => (user && token ? `tokenBalance:${token.chain}-${token.address}-by-${user}` : ''),
  TokenSupply: (token?: Token) => (token ? `tokenTotalSupply:${token.chain}-${token.address}` : ''),
  Erc721Balance: (token?: Address, chainId?: number, user?: Address) => (token && chainId && user ? `erc721Balance:${chainId}-${token}-${user}` : ''),
}
export function useBalance(token?: Token, user?: Address) {
  const { address } = useAccount()
  const byUser = user ?? address
  return useFet({
    key: FET_KEYS.TokenBalance(token, byUser),
    initResult: 0n,
    fetfn: async () =>
      token!.isNative
        ? getPC(token!.chain).getBalance({ address: byUser! })
        : getPC(token!.chain).readContract({ abi: erc20Abi, functionName: 'balanceOf', address: token!.address, args: [byUser!] }),
  })
}

export function useTotalSupply(token?: Token) {
  return useFet({
    key: FET_KEYS.TokenSupply(token),
    initResult: 0n,
    fetfn: async () => (token!.isNative ? 0n : getPC(token!.chain).readContract({ abi: erc20Abi, functionName: 'totalSupply', address: token!.address })),
  })
}

const abiErc721Enumerable = parseAbi([
  'function tokenIdsOfOwnerByAmount(address owner, uint256 index) view returns(uint256[])',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns(uint256)',
])
export function useErc721Balance(chainId: number, token?: Address, by: 'Moralis' | 'alchemy' | 'zoofi' | 'rpc' | 'rpc-amount' | 'anker' = 'rpc', user?: Address) {
  const { address } = useAccount()
  // const address: Address = "0x89D07bF06674f1eAc72bAcE3E16B9567bA1197f9"
  const byUser = user ?? address
  return useFet({
    key: FET_KEYS.Erc721Balance(token, chainId, byUser),
    initResult: [] as string[],
    fetfn: async () => {
      if (!token || !byUser) return [] as string[]
      if (by === 'rpc') {
        const pc = getPC(chainId)
        const nftCount = await pc.readContract({ abi: erc721Abi, address: token!, functionName: 'balanceOf', args: [byUser!] })
        if (nftCount == 0n) return []
        const nfts = await Promise.all(
          range(parseInt(nftCount.toString())).map((i) =>
            pc.readContract({ abi: abiErc721Enumerable, functionName: 'tokenOfOwnerByIndex', address: token!, args: [byUser!, BigInt(i)] }),
          ),
        )
        return nfts.map((id) => id.toString())
      } else if (by === 'rpc-amount') {
        const pc = getPC(chainId)
        const nftCount = await pc.readContract({ abi: erc721Abi, address: token!, functionName: 'balanceOf', args: [byUser!] })
        if (nftCount == 0n) return []
        const nfts = await pc.readContract({ abi: abiErc721Enumerable, functionName: 'tokenIdsOfOwnerByAmount', address: token!, args: [byUser!, nftCount] })
        return nfts.map((id) => id.toString())
      } else if (by == 'zoofi') {
        return getNftsByZoofi(chainId, token, byUser)
      } else if (by == 'alchemy') {
        return getNftsByAlchemy(chainId, token, byUser)
      } else if (by == 'Moralis') {
        return getNftsByMoralis(chainId, token, byUser)
      } else {
        return getNftsByAnker(chainId, token, byUser)
      }
    },
  })
}
