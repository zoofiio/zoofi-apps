'use client'
  ; (BigInt.prototype as any).toJSON = function () {
    return this.toString()
  }
import { Menus } from '@/components/menus';
import { PageLoading } from '@/components/page-loading';
import { useConfigDomain } from '@/hooks/useConfigDomain';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Providers } from './providers';
import { useInitAnimRoot } from '@/hooks/useAnim';
import { useEffectOnce, useMount } from 'react-use';
import { useIsClient } from '@/hooks/useIsClient';

export default function PageLayout({ children }: { children: ReactNode }) {
  useConfigDomain()
  const root = useInitAnimRoot()
  const isClient = useIsClient()
  return (
    <div ref={root}>
      {isClient && <Providers>
        <div className='w-screen h-screen overflow-auto flex justify-center relative'>
          <div className='flex justify-center w-full max-w-[1400px] h-max relative'>
            <Menus />
            <div className='flex-1 relative h-max w-full'>
              {children}
            </div>
          </div>
        </div>
        {/* {children} */}
        <Toaster position='top-right' offset={70} />
        {/* <BetaFlag /> */}
        <PageLoading />
      </Providers>}
    </div>
  )
}
