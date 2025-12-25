'use client'
  ; (BigInt.prototype as any).toJSON = function () {
    return this.toString()
  }
import { TxsStat } from '@/components/approve-and-tx';
import { Header } from '@/components/header';
import { Menus } from '@/components/menus';
import { useInitAnimRoot } from '@/hooks/useAnim';
import { useConfigDomain } from '@/hooks/useConfigDomain';
import { useIsClient } from '@/hooks/useIsClient';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Providers } from './providers';

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
          <TxsStat />
        </Providers>
      </>}
    </div>
  )
}
