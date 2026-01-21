import { Token } from '@/config/tokens'

import { useFet } from '@/lib/useFet'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { fetBalance, fetErc721Balance, fetTotalSupply } from './fetsToken'
import { fetRouter } from '@/lib/fetRouter'
import { getTokensPriceByPyth } from '@/config/api'
import { DECIMAL } from '@/constants'

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
    fetfn: () => fetRouter('/api/token', { fet: 'fetBalance', token: JSON.stringify(token), byUser }) as ReturnType<typeof fetBalance>,
  })
}


export function useTotalSupply(token?: Token) {
  return useFet({
    key: FET_KEYS.TokenSupply(token),
    initResult: 0n,
    fetfn: () => fetRouter('/api/token', { fet: 'fetTotalSupply', token: JSON.stringify(token) }) as ReturnType<typeof fetTotalSupply>,
  })
}

export function useErc721Balance(chainId: number, token?: Address, by: 'Moralis' | 'alchemy' | 'zoofi' | 'rpc' | 'rpc-amount' | 'anker' = 'rpc', user?: Address) {
  const { address } = useAccount()
  // const address: Address = "0x89D07bF06674f1eAc72bAcE3E16B9567bA1197f9"
  const byUser = user ?? address
  return useFet({
    key: FET_KEYS.Erc721Balance(token, chainId, byUser),
    initResult: [] as string[],
    fetfn: () => fetRouter('/api/token', { fet: 'fetErc721Balance', token, chainId, by, byUser }) as ReturnType<typeof fetErc721Balance>,
  })
}

const defPrices: { [k: Address]: bigint } = {
  '0x549943e04f40284185054145c6E4e9568C1D3241': DECIMAL,
  '0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce': DECIMAL,
  '0x688e72142674041f8f6Af4c808a4045cA1D6aC82': DECIMAL,
}
export function useTokenPrices() {
  return useFet({
    key: `tokenPrices`,
    initResult: defPrices,
    fetfn: () => getTokensPriceByPyth().then(data => ({ ...defPrices, ...data }))
  }).data
}