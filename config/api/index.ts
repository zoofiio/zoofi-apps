import { Address, Hex } from 'viem'
import api from '../../utils/api'
import axios from 'axios'
import { parseEthers } from '@/lib/utils'
import { DECIMAL } from '@/constants'
import _ from 'lodash'
import { arbitrum, base, berachain, sepolia } from '../network'

export const getBvaultEpochYtPrices = (chainId: number, vault: Address, epochId: bigint) =>
  api.get<{ price: string; time: number }[]>(chainId, `/api/bvault/getEpochYTPrices/${vault}/${epochId}`)
export const getLntVaultEpochYtPrices = (chainId: number, vault: Address, epochId: bigint) =>
  api.get<{ price: string; time: number }[]>(chainId, `/api/lntvault/getEpochYTPrices/${vault}/${epochId}`)

export const getBvaultPtSynthetic = (chainId: number, vault: Address, epochId: bigint) => api.get<string>(chainId, `/api/bvault/getEpochPtSynthetic/${vault}/${epochId}`)

export const getBvaultsPtSynthetic = (chainId: number, bvaults: Address[] = []) => api.post<{ [k: Address]: string }>(chainId, '/api/bvault/batchGetEpochPtSynthetic', { bvaults })

export const getLntVaultsDeposited = (chainId: number, vaults: Address[]) => api.post<{ [k: Address]: number }>(chainId, '/api/lntvault/batchNfts', { vaults })

export type NFT_STAT = 'Deposited' | 'DepositedClaimed' | 'Redeemed'
export const getLntVaultNftStatByUser = (chainId: number, vault: Address, user: Address) =>
  api.get<{ tokenId: string; stat: NFT_STAT; tx: Address }[]>(chainId, `/api/lntvault/${vault}/${user}/nftstat`)

export const getNftTokenIdsByUser = (chainId: number, token: Address, user: Address) => api.get<string[]>(chainId, `/api/nft/${token}/${user}/tokenIds`)
export const getNftTokensIdsByUser = (chainId: number, tokens: Address[], user: Address) => api.post<{ [k: Address]: string[] }>(chainId, `/api/nft/${user}/tokenIds`, { tokens })

export const getNftsByZoofi = (chainId: number, token: Address, user: Address) => api.get<string[]>(chainId, `/api/nft/erc721Balance/${chainId}/${token}/${user}`)

export const getBeraTokensPrices = (
  tokens: Address[] = [
    '0x6969696969696969696969696969696969696969', // BERA,WBERA
    '0x0000000000000000000000000000000000000000', // BERA,WBERA
    '0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce', // HONEY
    '0x656b95E550C07a9ffe548bd4085c72418Ceb1dba', // BGT
    '0x549943e04f40284185054145c6E4e9568C1D3241', // USDC
    '0x779Ded0c9e1022225f8E0630b35a9b54bE713736', // USDT
    '0x688e72142674041f8f6Af4c808a4045cA1D6aC82', // BYUSD
    '0x0555E30da8f98308EdB960aa94C0Db47230d2B9c', // WBTC,
    '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590', // WETH,
    '0x9b6761bf2397Bb5a6624a856cC84A3A14Dcd3fe5', // iBERA
    '0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b', // iBGT
  ],
) =>
  axios
    .post<{
      data: {
        tokenGetCurrentPrices: {
          address: Address
          chain: 'BERACHAIN'
          price: number
          updatedAt: number
          updatedBy: string
          __typename: string
        }[]
      }
    }>('https://chgbtcc9ffu7rbdw2kmu4urwy.stellate.sh/', {
      operationName: 'GetTokenCurrentPrices',
      variables: {
        chains: ['BERACHAIN'],
        addressIn: tokens,
      },
      query:
        'query GetTokenCurrentPrices($chains: [GqlChain!]!, $addressIn: [String!]!) {\n  tokenGetCurrentPrices(chains: $chains, addressIn: $addressIn) {\n    address\n    chain\n    price\n    updatedAt\n    updatedBy\n    __typename\n  }\n}',
    })
    .then((res) => {
      const prices = res.data.data.tokenGetCurrentPrices
      const priceDataMap: {
        [k: Address]: {
          address: Address
          chain: 'BERACHAIN'
          price: number
          updatedAt: number
          updatedBy: string
          __typename: string
        }
      } = {}
      for (const price of prices) {
        priceDataMap[price.address] = price
      }
      const priceMap: { [k: Address]: bigint } = {}
      for (const token of tokens) {
        const pd = priceDataMap[token.toLowerCase() as Address]
        if (pd) {
          priceMap[token] = parseEthers(pd.price.toFixed(6))
        }
      }
      return priceMap
    })

export const getIBGTPrice = () =>
  axios
    .post<{
      rewardTokens: {
        address: Address
        decimals: number
        image: string
        name: string
        price: number
        symbol: string
      }[]
      underlyingTokens: {
        address: Address
        decimals: number
        image: string
        name: string
        price: number
        symbol: string
      }[]
    }>('https://api.zoofi.io/api/third/ibgt')
    .then((res) => _.concat(res.data.underlyingTokens, res.data.rewardTokens)?.find((item) => item.symbol === 'iBGT'))
    .then((data) => (data ? parseEthers(data.price.toFixed(6)) : DECIMAL))

const aclchemyMap: { [k: number]: string } = {
  [sepolia.id]: 'eth-sepolia',
  [base.id]: 'base-mainnet',
  [berachain.id]: 'berachain-mainnet',
  [arbitrum.id]: 'arb-mainnet',
}
export const getNftsByAlchemy = async (chainId: number, nft: Address, owner: Address) => {
  if (!aclchemyMap[chainId]) {
    throw new Error('Not Support')
  }
  // https://eth-sepolia.g.alchemy.com/v2/7UXJgo01vxWHLJDk09Y0qZct8Y3zMDbX
  let pageKey: string | undefined = undefined
  const getNfts = (pageSize: number = 100) =>
    axios
      .get<{
        ownedNfts: {
          tokenId: string
        }[]
        totalCount: number
        pageKey?: string
      }>(`https://${aclchemyMap[chainId]}.g.alchemy.com/nft/v3/7UXJgo01vxWHLJDk09Y0qZct8Y3zMDbX/getNFTsForOwner?owner=${owner}&contractAddresses[]=${nft}&pageSize=${pageSize}`, {
        params: pageKey ? { pageKey } : {},
      })
      .then((res) => {
        return {
          pageKey: res.data.pageKey,
          nfts: res.data.ownedNfts.map((item) => item.tokenId),
        }
      })
  let res: string[] = []
  while (true) {
    const { pageKey: nPK, nfts } = await getNfts()
    res = res.concat(nfts)
    if (!nPK) break
    pageKey = nPK
  }
  return res
}

export type NftTx = { blockNum: Hex; hash: Hex; from: Address; to: Address; erc721TokenId: Hex }
export const getNftTxsByAlchemy = async (chainId: number, opt: { nft: Address; from: Address; to: Address }) => {
  if (!aclchemyMap[chainId]) {
    throw new Error('Not Support')
  }
  let pageKey: string | undefined = undefined
  const getNftTxs = (pageSize: number = 100) =>
    axios
      .post<{
        result: { transfers: NftTx[]; pakeKey: string }
      }>(`https://${aclchemyMap[chainId]}.g.alchemy.com/v2/7UXJgo01vxWHLJDk09Y0qZct8Y3zMDbX`, {
        jsonrpc: '2.0',
        method: 'alchemy_getAssetTransfers',
        params: [
          {
            category: ['erc721'],
            contractAddresses: [opt.nft],
            maxCount: pageSize,
            pageKey,
            fromAddress: opt.from,
            toAddress: opt.to,
            order: 'desc',
          },
        ],
        id: 1,
      })
      .then((res) => {
        return {
          pageKey: res.data.result.pakeKey,
          txs: res.data.result.transfers,
        }
      })
  let res: NftTx[] = []
  while (true) {
    const { pageKey: nPK, txs } = await getNftTxs()
    res = res.concat(txs)
    if (!nPK) break
    pageKey = nPK
  }
  return res
}
