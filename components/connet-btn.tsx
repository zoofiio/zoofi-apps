import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { useAccount, useConfig, useSwitchChain } from 'wagmi'
import { BBtn } from './ui/bbtn'
import { Spinner } from './spinner'

export default function ConnectBtn() {
  const size = useWindowSize(1024)
  const { isConnected, chainId } = useAccount()
  const showConnect = !isConnected
  const cm = useConnectModal()
  const { chains } = useConfig()
  const sc = useSwitchChain()
  const [isSwitching, setSwitching] = useState(false)
  useEffect(() => {
    let task: any = null
    if (chainId !== undefined && chainId !== null && !chains.find(item => item.id === chainId)) {
      console.info('needSwitchChainTo:', chains[0].id, chains.map(item => item.id))
      setSwitching(true)
      setTimeout(async () => {
        sc.switchChain({ chainId: chains[0].id })
      }, 300)
    } else {
      setSwitching(false)
    }
    return () => { task !== null && clearTimeout(task) }
  }, [chains, chainId])
  if (isSwitching) {
    return <Spinner className='text-2xl' />
  }
  if (showConnect)
    return (
      <BBtn className='mt-0 w-fit' onClick={() => cm.openConnectModal?.()}>
        <span className='font-medium text-sm whitespace-nowrap'>Connect Wallet</span>
      </BBtn>
    )
  return <ConnectButton chainStatus={size.width > 600 ? 'full' : 'icon'} showBalance={false} />
}
