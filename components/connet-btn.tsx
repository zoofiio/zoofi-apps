import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useWindowSize } from 'react-use'
import { useAccount } from 'wagmi'
import { BBtn } from './ui/bbtn'

export default function ConnectBtn() {
  const size = useWindowSize(1024)
  const { isConnected } = useAccount()
  const showConnect = !isConnected
  const cm = useConnectModal()
  if (showConnect)
    return (
      <BBtn className='mt-0 w-fit' onClick={() => cm.openConnectModal?.()}>
        <span className='font-medium text-sm px-5'>Connect Wallet</span>
      </BBtn>
    )
  return <ConnectButton chainStatus={size.width > 600 ? 'full' : 'icon'} showBalance={false} />
}
