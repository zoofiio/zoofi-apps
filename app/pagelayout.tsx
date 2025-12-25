'use client'
  ; (BigInt.prototype as any).toJSON = function () {
    return this.toString()
  }
import { TxsStat } from '@/components/approve-and-tx';
import { Menus } from '@/components/menus';
import { PageLoading } from '@/components/page-loading';
import { useInitAnimRoot } from '@/hooks/useAnim';
import { useConfigDomain } from '@/hooks/useConfigDomain';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Providers } from './providers';
import { useIsClient } from '@/hooks/useIsClient';
import { Header } from '@/components/header';

export default function PageLayout({ children }: { children: ReactNode }) {
  useConfigDomain()
  const root = useInitAnimRoot()
  const isClient = useIsClient()
  return (
    <div ref={root} suppressHydrationWarning={true} suppressContentEditableWarning={true}>
      {isClient && <>
        <Providers>
          <Header />
          <Menus />
          <div className='w-screen h-screen overflow-y-auto overflow-x-hidden flex justify-center relative'>
            {/* {children} */}
            {children}
          </div>
          <Toaster position='top-right' offset={70} />
          <PageLoading />
          <TxsStat />
        </Providers>
      </>}
    </div>
  )
}
