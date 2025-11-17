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
import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';

import { ConfigChainsProvider } from '@/components/support-chains';
import { useThemeState } from '@/components/theme-mode';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Chain, createClient, http } from 'viem';


const qClient = new QueryClient({ defaultOptions: { queries: { retry: 3, refetchOnMount: 'always', staleTime: 1000 } } })
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
  const theme = useThemeState((s) => s.theme)
  return (
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
  )
}