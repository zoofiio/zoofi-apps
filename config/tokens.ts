import { Address, isAddressEqual, zeroAddress } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { zeroGTestnet } from './network'

export type Token = {
  chain: number[]
  address: Address
  symbol: string
  decimals: number
  isNative?: boolean
}

export const TOKENS: Token[] = [
  { address: zeroAddress, symbol: 'ETH', decimals: 18, chain: [mainnet.id, sepolia.id], isNative: true },
  { address: zeroAddress, symbol: 'A0GI', decimals: 18, chain: [zeroGTestnet.id], isNative: true },
  // { address: zeroAddress, symbol: 'IP', decimals: 18, chain: [story.id], isNative: true },
  { address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', symbol: 'ETH', decimals: 18, chain: [mainnet.id, sepolia.id], isNative: true },
  // { address: '0x5267F7eE069CEB3D8F1c760c215569b79d0685aD', symbol: 'vIP', decimals: 18, chain: [story.id] },
  // { address: '0xADb174564F9065ce497a2Ff8BEC62b21e8b575d4', symbol: 'pvIP', decimals: 18, chain: [story.id] },
  // { address: '0xADb174564F9065ce497a2Ff8BEC62b21e8b575d7', symbol: 'yvIP', decimals: 18, chain: [story.id] },
  // { address: '0xADb174564F9065ce497a2Ff8BEC62b21e8b575d5', symbol: 'LPvIP', decimals: 18, chain: [story.id] },
  // { address: '0xADb174564F9065ce497a2Ff8BEC62b21e8b575d6', symbol: 'bvIP', decimals: 18, chain: [story.id] },
  // { address: '0x5267F7eE069CEB3D8F1c760c215569b79d0685aE', symbol: 'WIP', decimals: 18, chain: [story.id] },

  { address: '0xb09a8ba59615a552231cefcee80c3b88706597ed', symbol: 'YTK', decimals: 18, chain: [sepolia.id] },
  { address: '0xf37b6ec18cee80634de01aef83701d6e726e7fc9', symbol: 'BT-INFRA', decimals: 18, chain: [sepolia.id] },

  // for 0G
  /*
  
  T: "0xD3Baf6025975e5fc33dDab5A21B42713aD55Cf09"
  VT: "0x8EA6bf9B97F7ebc4f8c347608f274ceB5995EC0A"
  YT: "0x2AFC0f7C7417645fD4E9BC85Aa98028B18B12Af0"
  vtSwapPoolHook: "0x53509Ccd440Df9df70561D715b932AE1a29f7aC8"
  */

  { address: '0xe01C85599300f9ED5DE2d7D4FE3Dc2Dc4c5c3877', symbol: '0G', decimals: 18, chain: [zeroGTestnet.id] },
  { address: '0x4F3c65cba6cb148B294CC7Eb51f6aFCce24762b4', symbol: 'v0G', decimals: 18, chain: [zeroGTestnet.id] },
  { address: '0x58578B894D719bBFdFb8A261A8fE2fa2C1826278', symbol: 'y0G', decimals: 18, chain: [zeroGTestnet.id] },
  { address: '0x52A7504930cE4FC70aBeD6Ff0af633a6CFa03ac8', symbol: 'lp0G', decimals: 18, chain: [zeroGTestnet.id] },
]

export const TOKENS_MAP: { [k: `${number}_${Address}`]: Token } = TOKENS.reduce((map, item) => {
  return item.chain.reduce((itemmap, chainId) => ({ ...itemmap, [`${chainId}_${item.address.toLowerCase()}`]: item }), map)
}, {})

export function getTokenBy(address?: Address, chainId?: number, defOpt?: Partial<Exclude<Token, 'address' | 'chain'>>) {
  if (!address || !chainId) return undefined
  const token = TOKENS_MAP[`${chainId}_${address.toLowerCase() as Address}`]
  if (!token) {
    const { symbol = 'Token', decimals = 18, isNative } = defOpt ?? {}
    return { address, chain: [chainId], symbol, decimals, isNative } as Token
  }
  return token
}

export function isNativeToken(token: Address) {
  return isAddressEqual(token, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') || token == zeroAddress
}
