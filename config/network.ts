import { providers } from 'ethers'
import { Address, Chain, defineChain } from 'viem'
import { base as baseMainnet, zeroG } from 'viem/chains'
import { LP_TOKENS } from './lpTokens'
import { BASE_PATH } from './env'

export const berachainTestnet = defineChain({
  id: 80084,
  name: 'Berachain Bartio',
  nativeCurrency: {
    decimals: 18,
    name: 'BERA Token',
    symbol: 'BERA',
  },
  rpcUrls: {
    default: { http: ['https://berachain-bartio.g.alchemy.com/v2/YU6TIvn1RpD1wyHrDMpt4Yt6_bJYmOtk', 'https://bartio.rpc.berachain.com'] },
  },
  blockExplorers: {
    default: {
      name: 'Routescan',
      url: 'https://80084.testnet.routescan.io/',
    },
  },
  contracts: {
    multicall3: { address: '0xcA11bde05977b3631167028862bE2a173976CA11', blockCreated: 109269 },
  },
  testnet: true,
  fees: {
    baseFeeMultiplier: 1.4,
  },
  iconUrl: `${BASE_PATH}/berachain.svg`,
})

export const berachain = defineChain({
  id: 80094,
  name: 'Berachain',
  nativeCurrency: {
    decimals: 18,
    name: 'BERA Token',
    symbol: 'BERA',
  },
  rpcUrls: {
    default: { http: ['https://rpc.berachain.com'] },
    // "https://berachain-mainnet.g.alchemy.com/v2/-yCJ0Aq6OmJoAtLknbSiImqfoPCzQCxe"
    alchemy: { http: ['https://berachain-mainnet.g.alchemy.com/v2/7UXJgo01vxWHLJDk09Y0qZct8Y3zMDbX'] },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://berascan.com/',
    },
  },
  contracts: {
    multicall3: { address: '0xcA11bde05977b3631167028862bE2a173976CA11', blockCreated: 109269 },
  },
  testnet: false,
  fees: {
    baseFeeMultiplier: 1.4,
  },
  iconUrl: `${BASE_PATH}/berachain.svg`,
})

export const sepolia = defineChain({
  id: 11_155_111,
  name: 'Sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://eth-sepolia.public.blastapi.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
      apiUrl: 'https://api-sepolia.etherscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 751532,
    },
    ensRegistry: { address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
    ensUniversalResolver: {
      address: '0xc8Af999e38273D658BE1b921b88A9Ddf005769cC',
      blockCreated: 5_317_080,
    },
  },
  testnet: true,
  iconUrl:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iIzI1MjkyRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjhhMTQgMTQgMCAxIDAgMC0yOCAxNCAxNCAwIDAgMCAwIDI4WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNhKSIgZmlsbC1vcGFjaXR5PSIuMyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjhhMTQgMTQgMCAxIDAgMC0yOCAxNCAxNCAwIDAgMCAwIDI4WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNiKSIgZD0iTTguMTkgMTQuNzcgMTQgMTguMjFsNS44LTMuNDQtNS44IDguMTktNS44MS04LjE5WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0xNCAxNi45My01LjgxLTMuNDRMMTQgNC4zNGw1LjgxIDkuMTVMMTQgMTYuOTNaIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMCIgeDI9IjE0IiB5MT0iMCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIxNCIgeDI9IjE0IiB5MT0iMTQuNzciIHkyPSIyMi45NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4K',
})

export const base = defineChain({
  ...baseMainnet,
  rpcUrls: {
    ...baseMainnet.rpcUrls,
    alchemy: {
      http: ['https://base-mainnet.g.alchemy.com/v2/7UXJgo01vxWHLJDk09Y0qZct8Y3zMDbX'],
    },
  },
  iconUrl: `${BASE_PATH}/BaseNetwork.png`,
})

export const zeroGTestnet = defineChain({
  ...zeroG,
  id: 16601,
  iconUrl: `${BASE_PATH}/ZeroG.png`,
})

export const apiBatchConfig = { batchSize: 30, wait: 300 }
export const multicallBatchConfig = { batchSize: 100, wait: 300 }

export const beraChains = [berachainTestnet, berachain]
export const lntChains = [sepolia, base]
// allapps chanis
export const SUPPORT_CHAINS: [Chain, ...Chain[]] = [zeroGTestnet, sepolia, base, berachain, berachainTestnet]

const refChainId = { chainId: SUPPORT_CHAINS[0].id }
export function getCurrentChainId() {
  return refChainId.chainId
}

export function isBerachain(id: number) {
  return !!beraChains.find((item) => item.id == id)
}

export const refEthersProvider: {
  provider?: providers.FallbackProvider | providers.JsonRpcProvider
} = {}

export const BEX_URLS: { [k: number]: string } = {
  [berachainTestnet.id]: 'https://bartio.bex.berachain.com',
  [berachain.id]: 'https://hub.berachain.com',
}
export const getBexPoolURL = (chainId: number, pool: Address) => {
  if (chainId == berachainTestnet.id) {
    return `${BEX_URLS[chainId]}/pool/${pool}`
  } else if (berachain.id) {
    return `${BEX_URLS[chainId]}/pools/${LP_TOKENS[pool].poolId}/deposit/`
  }
  return ''
}
