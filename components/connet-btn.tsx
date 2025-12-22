import { useDocumentVisible } from '@/hooks/useDocumentVisible'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import { Spinner } from './spinner'
import { useConfigChains } from './support-chains'
import { BBtn } from './ui/bbtn'



function WalletIcon() {
  return <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 0C14.6569 0 16 1.34315 16 3V4H10.0703C9.52058 4.00007 9.00042 4.25207 8.60938 4.71094C8.21597 5.1699 8.00001 5.87805 8 6.51953V7.48047C8 8.12195 8.21597 8.8301 8.60938 9.28906C9.00272 9.74794 9.52058 9.99993 10.0703 10H16V11C16 12.6569 14.6569 14 13 14H3C1.34315 14 1.61067e-08 12.6569 0 11V3C1.28853e-07 1.34315 1.34315 0 3 0H13Z" fill="url(#paint0_linear_1598_323)" />
    <path d="M9.47418 5.47418C9.1682 5.78016 9 6.25205 9 6.6797V7.3203C9 7.74796 9.1682 8.21984 9.47418 8.52582C9.78016 8.8318 10.1828 9 10.6104 9H16V5H10.6104C10.1828 5 9.77837 5.1682 9.47418 5.47418ZM11.2689 6.28425C11.6644 6.28425 11.9847 6.60455 11.9847 7C11.9847 7.39545 11.6644 7.71575 11.2689 7.71575C10.8735 7.71575 10.5532 7.39545 10.5532 7C10.5532 6.60455 10.8735 6.28425 11.2689 6.28425Z" fill="url(#paint1_linear_1598_323)" />
    <defs>
      <linearGradient id="paint0_linear_1598_323" x1="8" y1="0" x2="8" y2="14" gradientUnits="userSpaceOnUse">
        <stop stop-color="#28CB54" />
        <stop offset="1" stop-color="#D9F35D" />
      </linearGradient>
      <linearGradient id="paint1_linear_1598_323" x1="12.602" y1="5.06927" x2="12.602" y2="8.93073" gradientUnits="userSpaceOnUse">
        <stop stop-color="#21CA53" />
        <stop offset="1" stop-color="#DCF45D" />
      </linearGradient>
    </defs>
  </svg>

}
export default function ConnectBtn() {
  // const size = useWindowSize(1024)
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
      <BBtn className='mt-0 w-fit border-primary h-8 text-xs gap-2' onClick={() => cm.openConnectModal?.()}>
        <WalletIcon /> <span>Connect Wallet</span>
      </BBtn>
    )
  return <ConnectButton chainStatus={'none'} showBalance={false} />
}
