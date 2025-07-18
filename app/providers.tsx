'use client'
  ; (BigInt.prototype as any).toJSON = function () {
    return this.toString()
  }
import * as React from 'react';

import { SUPPORT_CHAINS, apiBatchConfig, multicallBatchConfig } from '@/config/network';
import { RainbowKitProvider, connectorsForWallets, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { binanceWallet, bitgetWallet, coinbaseWallet, gateWallet, injectedWallet, metaMaskWallet, okxWallet, tokenPocketWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createConfig, createStorage } from 'wagmi';

const walletConnectProjectId = 'abf1f323cd9ff9f6a27167188d993168'
// const ankrKey = 'e1a06837672f1dd89a4c70522941d3beebad120eafad005d79d77c42856d9310'
const ankrKey = '5da55021cad3ac57391c3292c373dec3a32bf9eaae63b74d4138d5d4a17dd554'

import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';

import { ConfigChainsProvider } from '@/components/support-chains';
import { useThemeState } from '@/components/theme-mode';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Chain, createClient, http } from 'viem';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/45897/wand/version/latest',
  cache: new InMemoryCache(),
})

const qClient = new QueryClient({ defaultOptions: { queries: { retry: 3 } } })

const isTgMini = true
const storage = createStorage({
  storage: {
    getItem: (key) => typeof window !== 'undefined' ? window.localStorage.getItem(key) : undefined,
    removeItem: (key) => typeof window !== 'undefined' ? window.localStorage.removeItem(key) : undefined,
    setItem: (key, value) => {
      key !== 'wagmi.cache' && typeof window !== 'undefined' && localStorage.setItem(key, value)
    },
  },
})
const appName = 'ZooFi'
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [injectedWallet, metaMaskWallet, coinbaseWallet, binanceWallet, okxWallet, bitgetWallet, tokenPocketWallet, gateWallet, walletConnectWallet],
    },
  ],
  {
    appName,
    projectId: walletConnectProjectId,
  },
)


const config = createConfig({
  connectors,
  storage,
  chains: SUPPORT_CHAINS,
  client: ({ chain }) =>
    createClient({
      chain,
      transport: http(undefined, { batch: apiBatchConfig }),
      batch: { multicall: multicallBatchConfig },
    }),
})
export function Providers({ children, supportChains = SUPPORT_CHAINS }: { children: React.ReactNode, supportChains?: readonly [Chain, ...Chain[]] }) {
  // const [config, setConfig] = React.useState<ReturnType<typeof createConfig>>()
  // React.useEffect(() => {
  //   // const isTgMini = Boolean((window as any).Telegram?.WebApp?.platform) && (window as any).Telegram?.WebApp?.platform !== 'unknown'

  // }, [])
  const theme = useThemeState((s) => s.theme)
  return (
    <ApolloProvider client={client}>
      <WagmiProvider config={config}>
        <ConfigChainsProvider chains={supportChains.map(item => item.id)}>
          <QueryClientProvider client={qClient}>
            <QueryParamProvider adapter={NextAdapterApp}>
              <RainbowKitProvider locale='en-US' modalSize='compact' theme={theme === 'dark' ? darkTheme({ accentColor: 'green' }) : lightTheme()}>
                {children}
              </RainbowKitProvider>
            </QueryParamProvider>
          </QueryClientProvider>
        </ConfigChainsProvider>
      </WagmiProvider>
    </ApolloProvider>
  )
}