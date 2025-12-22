import { Address, Chain, defineChain } from 'viem'
import { base as baseMainnet, zeroG, arbitrum as arbitrumMain, bsc as bscMain, arbitrumSepolia as arbSep, bscTestnet as bscTest, story as _story, sei as _sei } from 'viem/chains'
import { LP_TOKENS } from './lpTokens'
import { BASE_PATH } from './env'

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
  name: '0G Testnet',
  iconUrl: `${BASE_PATH}/ZeroG.png`,
})

export const zeroGmainnet = defineChain({
  id: 16661,
  name: '0G Mainnet',
  nativeCurrency: { name: '0G', symbol: '0G', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://evmrpc.0g.ai'],
    },
  },
  blockExplorers: {
    default: {
      name: '0G BlockChain Explorer',
      url: 'https://chainscan.0g.ai',
    },
  },
  testnet: false,
  iconUrl: `${BASE_PATH}/ZeroG.png`,
})

export const arbitrum = defineChain({
  ...arbitrumMain,
  rpcUrls: {
    ...arbitrumMain.rpcUrls,
    alchemy: {
      http: ['https://arb-mainnet.g.alchemy.com/v2/7UXJgo01vxWHLJDk09Y0qZct8Y3zMDbX'],
    },
  },
  iconUrl: `${BASE_PATH}/arbitrum.svg`,
})
export const arbitrumSepolia = defineChain({
  ...arbSep,
  iconUrl: `${BASE_PATH}/arbitrum.svg`,
})

export const bsc = defineChain({
  ...bscMain,
  name: 'BSC',
  iconUrl: `${BASE_PATH}/bsc.svg`,
})
export const bscTestnet = defineChain({
  ...bscTest,
  name: 'BSC Test',
  iconUrl: `${BASE_PATH}/bsc.svg`,
})

export const story = defineChain({
  ..._story,
  iconUrl: `${BASE_PATH}/IP.svg`,
})

export const sei = defineChain({
  ..._sei,
  rpcUrls: {
    default: {
      http: ['https://sei-evm-rpc.stakeme.pro'],
    },
    alchemy: {
      http: ['https://sei-mainnet.g.alchemy.com/v2/7UXJgo01vxWHLJDk09Y0qZct8Y3zMDbX'],
    },
  },
  iconUrl: `${BASE_PATH}/sei.svg`,
})

export const apiBatchConfig = { batchSize: 30, wait: 300 }
export const multicallBatchConfig = { batchSize: 1024, wait: 500 }

export const beraChains = [berachain]
export const lntChains = [base]
// allapps chanis
export const SUPPORT_CHAINS: [Chain, ...Chain[]] = [zeroGmainnet, base, berachain, arbitrum, bsc, story, sei]

const refChainId = { chainId: SUPPORT_CHAINS[0].id }
export function getCurrentChainId() {
  return refChainId.chainId
}

export function isBerachain(id: number) {
  return !!beraChains.find((item) => item.id == id)
}

export function isTestnet(chainId: number, def: boolean = false) {
  return SUPPORT_CHAINS.find((item) => item.id === chainId)?.testnet ?? def
}

export function getChain(chainId: number) {
  return SUPPORT_CHAINS.find((item) => item.id === chainId)
}

export function getChainName(chainId: number) {
  return getChain(chainId)?.name || `Chain(${chainId})`
}

export const BEX_URLS: { [k: number]: string } = {
  [berachain.id]: 'https://hub.berachain.com',
}
export const getBexPoolURL = (chainId: number, pool: Address) => {
  if (berachain.id) {
    return `${BEX_URLS[chainId]}/pools/${LP_TOKENS[pool].poolId}/deposit/`
  }
  return ''
}
