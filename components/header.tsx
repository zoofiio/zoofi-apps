'use client'

import { DISCORD_LINK, DOC_LINK, DomainRef, TWITTER_LINK } from '@/constants'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { TbBook2, TbBrandDiscordFilled, TbBrandX } from 'react-icons/tb'
import ConnectBtn from './connet-btn'
import { SwitchChain } from './switch-chain'
import { ThemeMode } from './theme-mode'


const itemClassName = 'text-fg/60 hover:text-primary hover:border-primary border border-board text-xs h-8 flex items-center justify-center px-2.5 rounded-lg'
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
    <header className='h-[72px] fixed top-0 left-0 w-full flex items-center justify-center px-4 z-90 backdrop-blur-3xl border-b border-board'>
      <div className='flex items-center justify-end md:gap-4 max-w-380 w-full'>
        {pathname.startsWith('/b-vaults') ?
          <Link href={'/lnt'} className={itemClassName}>
            LNT-Vault
          </Link> :
          <Link href={'/b-vaults'} className={itemClassName}>
            B-Vault
          </Link>}
        <ThemeMode triggerClassName={cn(itemClassName, 'text-lg hidden md:flex aspect-square px-0')} />
        {/* Social networks */}
        <div className='hidden lg:flex items-center gap-3'>
          {social_networks.map(({ url, icon, name }) => {
            const Icon = icon
            return (
              <Link key={name} href={url} className={cn(itemClassName, 'text-lg aspect-square px-0')}>
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
