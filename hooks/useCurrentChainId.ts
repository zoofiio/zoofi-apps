import { useChainId, useConfig } from 'wagmi'

export function useCurrentChainId() {
  const chainId = useChainId()
  const { chains } = useConfig()
  const isSupported = chains.find((item) => item.id === chainId)
  return isSupported ? chainId : chains[0].id
}

export function useNetworkWrong() {
  const chainId = useChainId()
  const { chains } = useConfig()
  const isSupported = chains.find((item) => item.id === chainId)
  return !isSupported
}
