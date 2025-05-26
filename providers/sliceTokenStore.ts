import { abiCrocQuery } from '@/config/abi'
import { getBeraTokensPrices, getIBGTPrice, getNftTokensIdsByUser } from '@/config/api'
import { CrocQueryAddress, HONEY_Address } from '@/config/bvaults'
import { LP_TOKENS } from '@/config/lpTokens'
import { berachain, berachainTestnet } from '@/config/network'
import { NATIVE_TOKEN_ADDRESS } from '@/config/swap'
import { DECIMAL } from '@/constants'
import _ from 'lodash'
import { Address, erc20Abi } from 'viem'
import { getPC } from './publicClient'
import { SliceFun } from './types'

export type TokenItem = {
  address: Address
  symbol: string
  decimals: number
  name?: string
  url?: string
}
export type TokenStore = {
  totalSupply: { [k: Address]: bigint }
  prices: { [k: Address]: bigint }

  updateTokenTotalSupply: (chainId: number, tokens: Address[]) => Promise<TokenStore['totalSupply']>
  updateTokenPrices: (chainId: number, tokens: Address[]) => Promise<TokenStore['prices']>

  // ---------------------- For current user ------------------------
  balances: { [k: Address]: bigint }
  updateTokensBalance: (chainId: number, tokens: Address[], user: Address) => Promise<TokenStore['balances']>

  // tokenList
  defTokenList: TokenItem[]
  updateDefTokenList: (chainId: number) => Promise<TokenItem[]>

  // nft
  nftBalance: {
    [k: Address]: bigint[]
  }
  updateNftBalance: (chainId: number, tokens: Address[], user: Address) => Promise<TokenStore['nftBalance']>
}

export const sliceTokenStore: SliceFun<TokenStore> = (set, get, init = {}) => {
  const updateTokenTotalSupply = async (chainId: number, tokens: Address[]) => {
    if (tokens.length == 0) return {}
    const pc = getPC(chainId)
    const datas = await Promise.all(
      tokens.map((token) => (token == NATIVE_TOKEN_ADDRESS ? Promise.resolve(0n) : pc.readContract({ abi: erc20Abi, address: token, functionName: 'totalSupply' }))),
    )
    const map = datas.reduce<TokenStore['totalSupply']>((map, item, i) => ({ ...map, [tokens[i]]: item }), {})
    set({ totalSupply: { ...get().totalSupply, ...map } })
    return map
  }
  const updateTokensBalance = async (chainId: number, tokens: Address[], user: Address) => {
    if (tokens.length == 0) return {}
    const pc = getPC(chainId)
    const datas = await Promise.all(
      tokens.map((token) =>
        token == NATIVE_TOKEN_ADDRESS ? pc.getBalance({ address: user }) : pc.readContract({ abi: erc20Abi, address: token, functionName: 'balanceOf', args: [user] }),
      ),
    )
    const map = datas.reduce<TokenStore['balances']>((map, item, i) => ({ ...map, [tokens[i]]: item }), {})
    set({ balances: { ...get().balances, ...map } })
    return map
  }

  const updateLPTokensStatForTest = async (chainId: number, mLps: Address[]) => {
    const pc = getPC(chainId)
    const lpPrices = await Promise.all(
      mLps.map((lp) =>
        Promise.all([
          pc.readContract({
            abi: abiCrocQuery,
            address: CrocQueryAddress[chainId],
            functionName: 'queryPrice',
            args: [LP_TOKENS[lp].base, LP_TOKENS[lp].quote, BigInt(LP_TOKENS[lp].poolType)],
          }),
          pc.readContract({
            abi: abiCrocQuery,
            address: CrocQueryAddress[chainId],
            functionName: 'queryLiquidity',
            args: [LP_TOKENS[lp].base, LP_TOKENS[lp].quote, BigInt(LP_TOKENS[lp].poolType)],
          }),
        ]),
      ),
    )
    const map: TokenStore['prices'] = {
      [HONEY_Address[chainId]]: DECIMAL,
    }
    /*
     */
    mLps.forEach((lp, i) => {
      const base = LP_TOKENS[lp].base
      const quote = LP_TOKENS[lp].quote
      const price = lpPrices[i][0]
      const priceFixDecimals = quote == '0xd6d83af58a19cd14ef3cf6fe848c9a4d21e5727c' ? 10n ** 6n : 1n
      map[lp] = price / priceFixDecimals ** 2n
      map[quote] = (((price * 10n ** 9n) / (18446744073709551616n * priceFixDecimals)) ** 2n * map[base]) / DECIMAL
    })
    console.info('lpPrics:', map)
    set({ prices: { ...get().prices, ...map } })
  }

  const updateTokenPrices = async (chainId: number, tokens: Address[]) => {
    const groups = _.groupBy(tokens, (token) => (LP_TOKENS[token] ? 'lp' : 'token'))
    const mLps = groups['lp'] || []
    // const mTokens = groups['token'] || []
    if (mLps.length !== 0) {
      console.info('mlps;', tokens, mLps)
      // for testnet
      if (chainId === berachainTestnet.id) {
        await updateLPTokensStatForTest(chainId, mLps)
      } else if (chainId === berachain.id) {
        const map = await getBeraTokensPrices()
        const iBGTprice = await getIBGTPrice()
        set({ prices: { ...get().prices, ...map, '0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b': iBGTprice } })
      }
    }
    return {}
  }

  const updateDefTokenList = async (chainId: number) => {
    const urls: { [k: number]: string } = {
      [berachain.id]: 'https://hub.berachain.com/internal-env/defaultTokenList.json',
      [berachainTestnet.id]: 'https://raw.githubusercontent.com/berachain/default-lists/main/src/tokens/bartio/defaultTokenList.json',
    }
    const tokenUrl = urls[chainId]
    if (!tokenUrl) return []
    const list = await fetch(tokenUrl)
      .then((res) => res.json())
      .then((data) => {
        return (data.tokens as any[])
          .filter((item) => item.chainId === chainId)
          .map<TokenItem>((item) => ({
            symbol: item.symbol as string,
            address: item.address as Address,
            decimals: item.decimals as number,
            name: item.name as string,
            url: ((item.logoURI as string) || '').replace('https://https://', 'https://'),
          }))
      })
      .catch((e) => [] as TokenItem[])
    localStorage.setItem('catchedDefTokenList_' + chainId, JSON.stringify(list))
    set({ defTokenList: list })
    return list
  }
  const getCatchedDefTokenList = (chainId: number) => {
    try {
      return JSON.parse(localStorage.getItem('catchedDefTokenList_' + chainId) || '[]') as TokenItem[]
    } catch (error) {
      return []
    }
  }

  const updateNftBalance = async (chainId: number, tokens: Address[], user: Address) => {
    const data = await getNftTokensIdsByUser(chainId, tokens, user)
    const idsMap = _.mapValues(data, (item) => item.map((id) => BigInt(id)))
    set({ nftBalance: { ...get().nftBalance, ...idsMap } })
    return {}
  }
  return {
    totalSupply: {},
    updateTokenTotalSupply,

    balances: {},
    updateTokensBalance,

    prices: {
      '0x549943e04f40284185054145c6E4e9568C1D3241': DECIMAL,
      '0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce': DECIMAL,
      '0x688e72142674041f8f6Af4c808a4045cA1D6aC82': DECIMAL,
    },
    updateTokenPrices,

    defTokenList: getCatchedDefTokenList(berachain.id),
    updateDefTokenList,

    nftBalance: {},
    updateNftBalance,
    ...init,
  }
}
