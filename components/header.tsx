'use client'

import { DISCORD_LINK, DOC_LINK, DomainRef, TWITTER_LINK } from '@/constants'

import Link from 'next/link'
import { useMemo } from 'react'
import { TbBook2, TbBrandDiscordFilled, TbBrandX } from 'react-icons/tb'
import ConnectBtn from './connet-btn'
import { SwitchChain } from './switch-chain'
import { ThemeMode } from './theme-mode'
import { usePathname } from 'next/navigation'


export function Header() {
  const social_networks = useMemo(
    () => [
      { name: 'doc', url: DOC_LINK(), icon: TbBook2 },
      { name: 'Twitter', url: TWITTER_LINK, icon: TbBrandX },
      { name: 'Discord', url: DISCORD_LINK, icon: TbBrandDiscordFilled },
    ],
    [DomainRef.value],
  )
  const pathname = usePathname()
  return (
    <header className='h-[72px] sticky top-0 left-0 w-full max-w-[1300px] inset-0 mx-auto flex items-center justify-end px-4 z-30 main-colors'>
      <div className='flex items-center md:gap-4'>
        {pathname.startsWith('/b-vaults') ?
          <Link href={'/lnt'} className='text-primary/80 hover:text-primary underline underline-offset-2'>
            LNT-Vault
          </Link> :
          <Link href={'/b-vaults'} className='text-primary/80 hover:text-primary underline underline-offset-2'>
            B-Vault
          </Link>}
        <ThemeMode />
        {/* Social networks */}
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
        <SwitchChain />
        <ConnectBtn />
      </div>
    </header>
  )
}
