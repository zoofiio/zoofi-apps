import { Address, isAddressEqual, zeroAddress } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { arbitrum, zeroGTestnet } from './network'

export type Token = {
  chain: number[]
  address: Address
  symbol: string
  decimals: number
  isNative?: boolean
}

export const TOKENS: Token[] = [
  { address: zeroAddress, symbol: 'ETH', decimals: 18, chain: [mainnet.id, sepolia.id], isNative: true },
  { address: zeroAddress, symbol: '0G', decimals: 18, chain: [zeroGTestnet.id], isNative: true },
  // { address: zeroAddress, symbol: 'IP', decimals: 18, chain: [story.id], isNative: true },
  { address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', symbol: 'ETH', decimals: 18, chain: [mainnet.id, sepolia.id], isNative: true },

  { address: '0xb09a8ba59615a552231cefcee80c3b88706597ed', symbol: 'YTK', decimals: 18, chain: [sepolia.id] },
  { address: '0xf37b6ec18cee80634de01aef83701d6e726e7fc9', symbol: 'BT-INFRA', decimals: 18, chain: [sepolia.id] },

  // for 0G
  { address: '0xe01C85599300f9ED5DE2d7D4FE3Dc2Dc4c5c3877', symbol: '0G', decimals: 18, chain: [zeroGTestnet.id] },
  { address: '0x78A8D4014000dF30b49eB0c29822B6C7C79D68cA', symbol: 'v0G', decimals: 18, chain: [zeroGTestnet.id] },
  { address: '0x937F60B54dA360b31D60372d2e19FE55Cb8eee53', symbol: 'y0G', decimals: 18, chain: [zeroGTestnet.id] },
  { address: '0x8D44BF9d72039C22dB4e8d7aB50d27038002fAC8', symbol: 'lp0G', decimals: 18, chain: [zeroGTestnet.id] },

  // for aethir
  { address: '0xd839962d55d9e8309f0f64c391887a33ab8cb4d0', symbol: 'ATH', decimals: 18, chain: [arbitrum.id] },
  { address: '0x01e80CC2b282D6f926605c20e5aF7D74345615Ac', symbol: 'vATH', decimals: 18, chain: [arbitrum.id] },
  { address: '0xf79f736e6787911a5167ebfac7ca5c3de4327a88', symbol: 'lpATH', decimals: 18, chain: [arbitrum.id] },

  { address: '0xc87B37a581ec3257B734886d9d3a581F5A9d056c', symbol: 'ATH', decimals: 18, chain: [arbitrum.id] },
  { address: '0x24ef95c39DfaA8f9a5ADf58edf76C5b22c34Ef46', symbol: 'vATH', decimals: 18, chain: [arbitrum.id] },
  { address: '0xbf4b4A83708474528A93C123F817e7f2A0637a88', symbol: 'lpATH', decimals: 18, chain: [arbitrum.id] },
]

export const TOKENS_MAP: { [k: `${number}_${Address}`]: Token } = TOKENS.reduce((map, item) => {
  return item.chain.reduce((itemmap, chainId) => ({ ...itemmap, [`${chainId}_${item.address.toLowerCase()}`]: item }), map)
}, {})

export function getTokenBy(address?: Address, chainId?: number, defOpt?: Partial<Exclude<Token, 'address' | 'chain'>>) {
  if (!address || !chainId) return undefined
  const key: `${number}_${Address}` = `${chainId}_${address.toLowerCase() as Address}`
  const token = TOKENS_MAP[key]
  if (!token) {
    const { symbol = 'Token', decimals = 18, isNative } = defOpt ?? {}
    TOKENS_MAP[key] = { address, chain: [chainId], symbol, decimals, isNative } as Token
    return TOKENS_MAP[key]
  }
  return token
}

export function isNativeToken(token: Address) {
  return isAddressEqual(token, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') || token == zeroAddress
}
