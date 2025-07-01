import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { useAccount, useSwitchChain } from 'wagmi'
import { Spinner } from './spinner'
import { useConfigChains } from './support-chains'
import { BBtn } from './ui/bbtn'
import { useDocumentVisible } from '@/hooks/useDocumentVisible'

export default function ConnectBtn() {
  const size = useWindowSize(1024)
  const { isConnected, chainId } = useAccount()
  const showConnect = !isConnected
  const cm = useConnectModal()
  const { chains } = useConfigChains()
  const sc = useSwitchChain()
  const [isSwitching, setSwitching] = useState(false)
  const docVisible = useDocumentVisible()
  useEffect(() => {
    if (!docVisible || isSwitching) return
    let task: any = null
    if (chainId !== undefined && chainId !== null && !chains.find(item => item.id === chainId)) {
      console.info('needSwitchChainTo:', chains[0].id, chains.map(item => item.id))
      setSwitching(true)
      setTimeout(() => {
        if (document.visibilityState !== 'visible') return;
        Promise.race([sc.switchChainAsync({ chainId: chains[0].id }), new Promise((_reslove, reject) => setTimeout(() => reject('Timeout'), 3000))])
          .catch(console.error)
          .finally(() => setSwitching(false))
      }, 300)
    } else {
      setSwitching(false)
    }
    return () => { task !== null && clearTimeout(task) }
  }, [chains, chainId, docVisible])
  if (isSwitching) {
    return <Spinner className='text-2xl' />
  }
  if (showConnect)
    return (
      <BBtn className='mt-0 w-fit' onClick={() => cm.openConnectModal?.()}>
        <span className='font-medium text-sm whitespace-nowrap'>Connect Wallet</span>
      </BBtn>
    )
  return <ConnectButton chainStatus={'none'} showBalance={false} />
}
