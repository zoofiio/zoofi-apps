import { Assign, Chain, ChainFormatters, defineChain, Prettify } from 'viem'
import { arbitrum as _arbitrum, base as _base, berachain as _berachain, bsc as _bsc, bscTestnet as _bscTest, sei as _sei, story as _story } from 'viem/chains'
import { ALCHEMY_API_KEY, ANKR_API_KEY, BASE_PATH } from './env'

function mconfigChain<
  formatters extends ChainFormatters,
  const chain extends Chain<formatters>
>(chain: chain): Prettify<Assign<Chain<undefined>, chain>> {
  const rpcUrls: Chain<formatters>['rpcUrls'] = {
    ...chain.rpcUrls
  }
  if (ALCHEMY_API_KEY) {
    const subdommainmap: { [k: number]: string } = {
      [_sei.id]: 'sei-mainnet',
      [_story.id]: 'story-mainnet',
      [_arbitrum.id]: 'arb-mainnet',
      [_base.id]: 'base-mainnet',
      [_bsc.id]: 'bnb-mainnet',
      [_berachain.id]: 'berachain-mainnet'
    }
    if (subdommainmap[chain.id]) {
      rpcUrls.alchemy = {
        http: [`https://${subdommainmap[chain.id]}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`]
      }
    }
  }
  if (ANKR_API_KEY) {
    const netmap: { [k: number]: string } = {
      [_sei.id]: 'sei-evm',
      [_story.id]: 'story-mainnet',
      [_arbitrum.id]: 'arbitrum',
      [_base.id]: 'base',
      [_bsc.id]: 'bsc',
    }
    if (netmap[chain.id]) {
      rpcUrls.ankr = {
        http: [`https://rpc.ankr.com/${netmap[chain.id]}`]
      }
    }
  }
  return defineChain({
    ...chain,
    rpcUrls,
  }) as unknown as Assign<Chain<undefined>, chain>
}

export const berachain = mconfigChain({
  ..._berachain,
  iconUrl: `${BASE_PATH}/berachain.svg`,
})

export const base = mconfigChain({
  ..._base,
  rpcUrls: {
    ..._base.rpcUrls,
    public: {
      http: ['https://base-rpc.publicnode.com', 'https://base-mainnet.public.blastapi.io', 'https://base.drpc.org'],
    }
  },
  iconUrl: `${BASE_PATH}/BaseNetwork.png`,
})

export const zeroGmainnet = mconfigChain({
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

export const arbitrum = mconfigChain({
  ..._arbitrum,
  rpcUrls: {
    ..._arbitrum.rpcUrls,
    public: {
      http: ['https://api.zan.top/arb-one', 'https://public-arb-mainnet.fastnode.io', 'https://arbitrum.drpc.org']
    },

  },
  iconUrl: `${BASE_PATH}/arbitrum.svg`,
})


export const bsc = mconfigChain({
  ..._bsc,
  name: 'BSC',
  iconUrl: `${BASE_PATH}/bsc.svg`,
})
export const bscTestnet = defineChain({
  ..._bscTest,
  name: 'BSC Test',
  iconUrl: `${BASE_PATH}/bsc.svg`,
})

export const story = mconfigChain({
  ..._story,
  iconUrl: `${BASE_PATH}/IP.svg`,
})

export const sei = mconfigChain({
  ..._sei,
  rpcUrls: {
    default: {
      http: ['https://sei-evm-rpc.stakeme.pro'],
    },
  },
  iconUrl: `${BASE_PATH}/sei.svg`,
})

export const apiBatchConfig = { batchSize: 30, wait: 300 }
export const multicallBatchConfig = { batchSize: 1024, wait: 500 }

export const beraChains = [berachain]
export const lntChains = [base]
// allapps chanis
export const SUPPORT_CHAINS: [Chain, ...Chain[]] = [zeroGmainnet, base, berachain, arbitrum, bsc, sei, story]

export function isTestnet(chainId: number, def: boolean = false) {
  return SUPPORT_CHAINS.find((item) => item.id === chainId)?.testnet ?? def
}

export function getChain(chainId: number) {
  return SUPPORT_CHAINS.find((item) => item.id === chainId)
}

export function getChainName(chainId: number) {
  return getChain(chainId)?.name || `Chain(${chainId})`
}