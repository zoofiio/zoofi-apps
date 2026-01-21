import { Token } from '@/config/tokens'

import { getNftsByAlchemy, getNftsByAnker, getNftsByMoralis, getNftsByZoofi } from '@/config/api'
import { getPC } from '@/providers/publicClient'
import { range } from 'es-toolkit'
import { Address, erc20Abi, erc721Abi, parseAbi } from 'viem'



export async function fetBalance(token: Token, byUser: Address) {
    return token!.isNative
        ? getPC(token!.chain).getBalance({ address: byUser! })
        : getPC(token!.chain).readContract({ abi: erc20Abi, functionName: 'balanceOf', address: token!.address, args: [byUser!] })
}

export async function fetTotalSupply(token: Token) {
    return (token!.isNative ? 0n : getPC(token!.chain).readContract({ abi: erc20Abi, functionName: 'totalSupply', address: token!.address }))
}

const abiErc721Enumerable = parseAbi([
    'function tokenIdsOfOwnerByAmount(address owner, uint256 index) view returns(uint256[])',
    'function tokenOfOwnerByIndex(address owner, uint256 index) view returns(uint256)',
])

export async function fetErc721Balance(chainId: number, token: Address, by: 'Moralis' | 'alchemy' | 'zoofi' | 'rpc' | 'rpc-amount' | 'anker' = 'rpc', byUser: Address) {
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
}