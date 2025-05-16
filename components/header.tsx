'use client'

import { base, berachain, berachainTestnet, SUPPORT_CHAINS } from '@/config/network'
import { DISCORD_LINK, DOC_LINK, isLNT, TWITTER_LINK } from '@/constants'

import { abiMockPriceFeed, abiVault } from '@/config/abi'
import { BVAULTS_CONFIG } from '@/config/bvaults'
import { BASE_PATH } from '@/config/env'
import { LNTVAULTS_CONFIG } from '@/config/lntvaults'
import { VAULTS_CONFIG } from '@/config/swap'
import { DomainRef } from '@/hooks/useConfigDomain'
import { useCurrentChainId } from '@/hooks/useCurrentChainId'
import { useWandContractRead } from '@/hooks/useWand'
import { useChainModal } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { IconType } from 'react-icons'
import { TbBook2, TbBrandDiscordFilled, TbBrandX } from 'react-icons/tb'
import { useWindowSize } from 'react-use'
import { sepolia } from 'viem/chains'
import { useAccount, useConfig } from 'wagmi'
import ConnectBtn from './connet-btn'
import { ThemeMode } from './theme-mode'

const NetIcon: { [k: number]: string } = {
  [berachainTestnet.id]: `${BASE_PATH}/berachain.svg`,
  [berachain.id]: `${BASE_PATH}/berachain.svg`,
  [base.id]: `${BASE_PATH}/BaseNetwork.png`,
  [sepolia.id]: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iIzI1MjkyRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjhhMTQgMTQgMCAxIDAgMC0yOCAxNCAxNCAwIDAgMCAwIDI4WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNhKSIgZmlsbC1vcGFjaXR5PSIuMyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjhhMTQgMTQgMCAxIDAgMC0yOCAxNCAxNCAwIDAgMCAwIDI4WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNiKSIgZD0iTTguMTkgMTQuNzcgMTQgMTguMjFsNS44LTMuNDQtNS44IDguMTktNS44MS04LjE5WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0xNCAxNi45My01LjgxLTMuNDRMMTQgNC4zNGw1LjgxIDkuMTVMMTQgMTYuOTNaIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMCIgeDI9IjE0IiB5MT0iMCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIxNCIgeDI9IjE0IiB5MT0iMTQuNzciIHkyPSIyMi45NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4K',
}

export function useShowAdmin() {
  const chainId = useCurrentChainId()
  const { address } = useAccount()
  const { data: owner } = useWandContractRead({
    abi: abiVault,
    address: isLNT ? LNTVAULTS_CONFIG[chainId]?.[0]?.vault : BVAULTS_CONFIG[chainId]?.[0]?.vault,
    functionName: 'owner',
    query: { enabled: !!address },
  })
  return !!address && address == owner
}

export function useShowTester() {
  const chainId = useCurrentChainId()
  const { address } = useAccount()
  const { data: isTester } = useWandContractRead({
    abi: abiMockPriceFeed,
    address: VAULTS_CONFIG[chainId]?.[1]?.assetTokenFeed,
    functionName: 'isTester',
    args: [address as any],
    query: { enabled: !!address },
  })
  return !!isTester
}



export function Header() {
  // const modal = useModal()
  const chainId = useCurrentChainId()
  const { openChainModal } = useChainModal()
  // const showAdmin = useShowAdmin()
  // const showTester = useShowTester()

  const { chain, address } = useAccount()
  const { chains } = useConfig()
  const currentChain = SUPPORT_CHAINS.find(item => item.id === chainId)!


  const showDefNet = !chain || SUPPORT_CHAINS.findIndex((item) => item.id == chain.id) == -1 || chains.length <= 1
  const social_networks = useMemo(
    () => [
      { name: 'doc', url: DOC_LINK(), icon: TbBook2 },
      { name: 'Twitter', url: TWITTER_LINK, icon: TbBrandX },
      { name: 'Discord', url: DISCORD_LINK, icon: TbBrandDiscordFilled },
    ],
    [DomainRef.value],
  )
  return (
    <header className='h-[72px] sticky top-0 left-0 w-full max-w-[1300px] inset-0 mx-auto flex items-center justify-end px-4 z-30 bg-slate-50/30 backdrop-blur-lg dark:text-slate-50 dark:bg-slate-900/30'>
      <div className='flex items-center gap-1 md:gap-4'>
        {/* Social networks */}
        <ThemeMode />
        <div className='hidden lg:flex items-center gap-3'>
          {social_networks.map(({ url, icon, name }) => {
            const Icon = icon
            return (
              <Link key={name} href={url} className='text-slate-300 hover:text-primary'>
                <Icon />
              </Link>
            )
          })}
        </div>
        {showDefNet && (
          <div
            className='flex items-center gap-2 text-sm text-slate-500 dark:text-slate-50 font-medium rounded-full cursor-pointer'
            onClick={() => openChainModal && openChainModal()}
          >
            <Image width={24} height={24} src={NetIcon[chainId]} alt='' />
            <div className='hidden sm:block'>{currentChain.name}</div>
          </div>
        )}
        <ConnectBtn />
      </div>
    </header>
  )
}
