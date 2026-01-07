import axios from 'axios'
import { keys } from 'es-toolkit/compat'
import { Address, Hex, numberToHex, parseUnits } from 'viem'
import api from '../../utils/api'
import { arbitrumSepolia, sepolia, arbitrum, base, berachain } from 'viem/chains'
import { zeroGmainnet } from '../network'

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

export const getLntVaultVTPriceApy = (chainId: number, vault: Address, start: number, end: number) =>
  api.get<{ price: string; apy: string; time: number }[]>(chainId, `/api/lnt/vt-price-apy/${vault}/${start}/${end}`)
export const getLntVaultActivity = (chainId: number, vault: Address, start: number, end: number) =>
  api.get<{
    deposits: { tokenId: string; user: Address; tx: Hex; block: string; block_time: string }[]
    redeems: { tokenId: string; user: Address; tx: Hex; block: string; block_time: string }[]
  }>(chainId, `/api/lnt/activity/${vault}/${start}/${end}`)
export const getLntVaultActivityPage = (chainId: number, vault: Address, page: number, size: number = 20) =>
  api.get<{
    items: { tokenId: string; user: Address; tx: Hex; block: string; block_time: string; type: 'Deposit' | 'Redeem' }[]
    total: number
  }>(chainId, `/api/lnt/activity/page/${vault}`, { page, size })
export const getLntVaultSwapFee7Days = (chainId: number, vault: Address) => api.get<string>(chainId, `/api/lnt/${vault}/swapfee7days`).then((res) => BigInt(res))

const pythMap: { [k: Hex]: Address[] } = {
  '0x962088abcfdbdb6e30db2e340c8cf887d9efb311b1f2f17b155a63dbb6d40265': ['0x6969696969696969696969696969696969696969', '0x0000000000000000000000000000000000000000'], // BERA,WBERA
  '0xf67b033925d73d43ba4401e00308d9b0f26ab4fbd1250e8b5407b9eaade7e1f4': ['0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce'], // HONEY
  '0xc929105a1af143cbfc887c4573947f54422a9ca88a9e622d151b8abdf5c2962f': ['0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b'], // iBGT
  '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b': ['0x779Ded0c9e1022225f8E0630b35a9b54bE713736'], // USDT
  '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a': ['0x549943e04f40284185054145c6E4e9568C1D3241'], // USDC
  '0x00456705ae9007ea761e95c724035a23a62fe9e444bbc744e11af7f050ab53c3': ['0x688e72142674041f8f6Af4c808a4045cA1D6aC82'], // BYUSD
  '0x9d4294bbcd1174d6f2003ec365831e64cc31d9f6f15a2b85399db8d5000960f6': ['0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590'], // WETH
  '0xeb943c0b5c9e02a529f799ac91070c3b7046f9412f3e5b0a90ba00267b838f34': ['0x9b6761bf2397Bb5a6624a856cC84A3A14Dcd3fe5'], // iBERA
}
export const getTokensPriceByPyth = async () => {
  const ids = keys(pythMap)
  const res = await axios.get<{ parsed: { id: string; price: { price: string; conf: string; expo: number; publish_time: number } }[] }>(
    'https://hermes.pyth.network/v2/updates/price/latest',
    {
      params: { 'ids[]': ids },
    },
  )
  const prices = res.data.parsed
  const priceMap: { [k: Address]: bigint } = {}
  for (const item of prices) {
    const itemPrice = parseUnits(item.price.price, 18 + item.price.expo)
    for (const token of pythMap[`0x${item.id}`]) {
      priceMap[token] = itemPrice
    }
  }
  return priceMap
}

const aclchemyMap: { [k: number]: string } = {
  [sepolia.id]: 'eth-sepolia',
  [base.id]: 'base-mainnet',
  [berachain.id]: 'berachain-mainnet',
  [arbitrum.id]: 'arb-mainnet',
  [arbitrumSepolia.id]: 'arb-sepolia',
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

export const getNftsByMoralis = async (chainId: number, nft: Address, owner: Address) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-Key':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjkzNmE0N2RkLWU1ZTYtNDZkZS04YjEwLTQ2MzhjMWEyYWQwOSIsIm9yZ0lkIjoiNDgxMTEyIiwidXNlcklkIjoiNDk0OTY3IiwidHlwZUlkIjoiNGJhOTQ3MDgtYTczMy00NjM3LWI0MTUtNTFmNDI2Mzg1ZjUzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NjMwMTk5ODEsImV4cCI6NDkxODc3OTk4MX0.Pho4OP4PBlpwXbJjSwY9NBIhdYbhJyD9li3FxKXWgWA',
    },
  }
  const datas = await fetch(
    `https://deep-index.moralis.io/api/v2.2/${owner}/nft?chain=${numberToHex(chainId)}&format=decimal&limit=1000&exclude_spam=false&token_addresses%5B0%5D=${nft}`,
    options,
  ).then((response) => response.json())

  return []
}
export const getNftsByAnker = async (chainId: number, nft: Address, owner: Address) => {
  const map: { [k: number]: string } = {
    [zeroGmainnet.id]: '0g_mainnet_evm',
  }
  if (!map[chainId]) throw new Error('not support chain')
  let pageToken = undefined
  const tokenIds: string[] = []
  while (true) {
    const datas: any = await fetch(`https://rpc.ankr.com/multichain/e1a06837672f1dd89a4c70522941d3beebad120eafad005d79d77c42856d9310`, {
      method: 'POST',
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'ankr_getNFTsByOwner',
        params: {
          blockchain: [map[chainId]],
          filter: [
            {
              [nft]: [],
            },
          ],
          pageSize: 500,
          pageToken,
          walletAddress: owner,
        },
      }),
    }).then((response) => response.json())
    const ids = ((datas.result?.assets ?? []) as any[]).map((item: any) => item.tokenId as string)
    tokenIds.push(...ids)
    if (ids.length < 500 || !datas.result.nextPageToken) break
    pageToken = datas.result.nextPageToken
  }
  return tokenIds
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

export const getOpsAdmins = (chainId: number, token: string) => api.get<{ name: Address; role: string }[]>(chainId, '/api/ops/admins', {}, { headers: { Authorization: token } })
export const modifyOpsAdmins = (chainId: number, token: string, config: { type: 'add' | 'del'; user: Address }) =>
  api.post(chainId, '/api/ops/modify-admins', config, { headers: { Authorization: token } })
export const getOpsStatsAethir = (chainId: number, token: string) =>
  api.get<{
    deployments: {
      chain_name: string
      network: string
      cpu_usage: string
      memory_usage: string
      expire_at: string
      node_type: string
      pod_name: string
      namespace: string
      pod_status: string
      is_action_required: boolean
      node_name: string
      uuid: string
      product_details: {
        id: string
        name: string
        metadata: {
          tags: string[]
          chain: string
          banner: string
          status: string
          logoUrl: string
          network: string
          node_type: string
          categories: string[]
          chain_name: string
          description: string
          displayName: string
          displayNetwork: string
          nodeops_doc_link: string
          product_doc_link: string
          market_share_percentage: number
        }
        is_active: boolean
        created_at: string
        updated_at: string
      }
      plan_id: string
      no_of_nodes: number
      start_date: string
      key: string
      rewards: string
      tokens: string
      wallet_id: string
      is_burner_wallet_connected: boolean
      delegated_licenses_count: number
      delegated_licenses: any
      pending_licenses: string[]
      subscription_id: string
      is_slots_full: boolean
    }[]
    burners: {
      burner_wallet: Address
      delegated_nfts: string[]
      plan_id: string
      delegated_nfts_count: number
      is_slot_full: boolean
      expire_at: string
    }[]
  }>(chainId, '/api/ops/nodeops-stats-aethir', {}, { headers: { Authorization: token }, timeout: 20000 })
export const opsOrderAethir = (chainId: number, token: string, quantity: number) =>
  api.post(chainId, `/api/ops/nodeops-order/${quantity}`, {}, { headers: { Authorization: token } })

export const getOpsAethirRewards = (chainId: number, token: string) =>
  api.get<{
    account_id: number
    claimable_ath: string
    withdrawable_ath: string
    claims: { orderId: string; cliffSecond: number; amount: string; time: number }[]
    withdraws: { time: number; orderIds: string[] }[]
    withdrawsOrderIds: string[]
    totalClaimed: string
    pendingClaimed: string
    withdrawAmount: string
  }>(chainId, '/api/ops/aethir-rewards', {}, { headers: { Authorization: token } })
