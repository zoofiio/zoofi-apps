import { Address, isAddressEqual, zeroAddress } from 'viem'
import { bsc, mainnet, sepolia, story } from 'viem/chains'
import { arbitrum, base, sei, zeroGmainnet } from './network'

export type Token = {
  chain: number
  address: Address
  symbol: string
  decimals: number
  isNative?: boolean
}

export const TOKENS: Token[] = [
  { address: zeroAddress, symbol: 'ETH', decimals: 18, chain: mainnet.id, isNative: true },
  { address: zeroAddress, symbol: 'ETH', decimals: 18, chain: sepolia.id, isNative: true },
  { address: zeroAddress, symbol: '0G', decimals: 18, chain: zeroGmainnet.id, isNative: true },
  { address: zeroAddress, symbol: 'IP', decimals: 18, chain: story.id, isNative: true },

  // for 0G
  { address: '0x1Cd0690fF9a693f5EF2dD976660a8dAFc81A109c', symbol: 'W0G', decimals: 18, chain: zeroGmainnet.id },
  { address: '0xca59c46f265f1e4b01ab50dd95e350137db88c72', symbol: 'v0G', decimals: 18, chain: zeroGmainnet.id },
  { address: '0x0c9a6b7b7176e002ced0b46246ed25f9cded7a88', symbol: 'lp0G', decimals: 18, chain: zeroGmainnet.id },
  // for 0G mock
  { address: '0x3de0905b6be718dfe9e8adfb5bb0b46bac5afd00', symbol: 'v0G', decimals: 18, chain: zeroGmainnet.id },
  { address: '0xb29e56b2b4dc5de5f26c5703a6db6fcc1432fa88', symbol: 'lp0G', decimals: 18, chain: zeroGmainnet.id },

  // for aethir
  { address: '0xd839962d55d9e8309f0f64c391887a33ab8cb4d0', symbol: 'ATH', decimals: 18, chain: arbitrum.id },
  { address: '0x01e80CC2b282D6f926605c20e5aF7D74345615Ac', symbol: 'vATH', decimals: 18, chain: arbitrum.id },
  { address: '0xf79f736e6787911a5167ebfac7ca5c3de4327a88', symbol: 'lpATH', decimals: 18, chain: arbitrum.id },

  { address: '0xc87B37a581ec3257B734886d9d3a581F5A9d056c', symbol: 'ATH', decimals: 18, chain: arbitrum.id },
  { address: '0x24ef95c39DfaA8f9a5ADf58edf76C5b22c34Ef46', symbol: 'vATH', decimals: 18, chain: arbitrum.id },
  { address: '0xbf4b4A83708474528A93C123F817e7f2A0637a88', symbol: 'lpATH', decimals: 18, chain: arbitrum.id },

  // for Filecoin
  { address: '0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153', symbol: 'Fil', decimals: 18, chain: bsc.id },
  { address: '0x24ef95c39DfaA8f9a5ADf58edf76C5b22c34Ef46', symbol: 'vFil', decimals: 18, chain: bsc.id },
  { address: '0xed202a7050ee856ba9f0d3cd5eabcab6b8a23a88', symbol: 'lpFil', decimals: 18, chain: bsc.id },
  // for Reppo
  { address: '0xFf8104251E7761163faC3211eF5583FB3F8583d6', symbol: 'REPPO', decimals: 18, chain: base.id },
  { address: '0x24ef95c39DfaA8f9a5ADf58edf76C5b22c34Ef46', symbol: 'vREPPO', decimals: 18, chain: base.id },
  { address: '0x2b72494fd4f092569b87e1a10f92268384f07a88', symbol: 'lpREPPO', decimals: 18, chain: base.id },
  // for Verio
  { address: '0x1514000000000000000000000000000000000000', symbol: 'WIP', decimals: 18, chain: story.id },
  { address: '0x5267F7eE069CEB3D8F1c760c215569b79d0685aD', symbol: 'vIP', decimals: 18, chain: story.id }, // verio IP
  { address: '0x92838ccdb9dceabc8e77415d73ecb06f8050cc5f', symbol: 'vIP\t', decimals: 18, chain: story.id }, // vesting IP
  { address: '0xee5aeecd6c9409424f88163aff415efcb9027a88', symbol: 'lpIP', decimals: 18, chain: story.id },

  // fot sei
  { address: zeroAddress, symbol: 'SEI', decimals: 18, chain: sei.id, isNative: true },
  { address: '0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7', symbol: 'WSEI', decimals: 18, chain: sei.id },
  { address: '0x92838ccdb9dceabc8e77415d73ecb06f8050cc5f', symbol: 'vSEI', decimals: 18, chain: sei.id },
  { address: '0x3362cb23043cb5e7c52711c5763c69fd513a3a88', symbol: 'lpSEI', decimals: 18, chain: sei.id },
]

export const TOKENS_MAP: { [k: `${number}_${Address}`]: Token } = TOKENS.reduce((map, item) => {
  return { ...map, [`${item.chain}_${item.address.toLowerCase()}`]: item }
}, {})

export function getTokenBy(address?: Address, chainId?: number, defOpt?: Partial<Exclude<Token, 'address' | 'chain'>>) {
  if (!address || !chainId) return undefined
  const key: `${number}_${Address}` = `${chainId}_${address.toLowerCase() as Address}`
  const token = TOKENS_MAP[key]
  if (!token) {
    const { symbol = 'Token', decimals = 18, isNative } = defOpt ?? {}
    TOKENS_MAP[key] = { address, chain: chainId, symbol, decimals, isNative } as Token
    return TOKENS_MAP[key]
  }
  return token
}

export function isNativeToken(token: Address) {
  return isAddressEqual(token, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') || token == zeroAddress
}
