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

export default function PageLayout({ children }: { children: ReactNode }) {
  useConfigDomain()
  const root = useInitAnimRoot()
  // const isClient = useIsClient()
  return (
    <div ref={root}>
      <Providers>
        <div className='w-screen h-screen overflow-auto flex justify-center relative'>
          <div className='flex justify-center w-full max-w-[1400px] h-max relative'>
            <Menus />
            <div className='flex-1 basis-0 relative h-max w-0'>
              {children}
            </div>
          </div>
        </div>
        {/* {children} */}
        <Toaster position='top-right' offset={70} />
        {/* <BetaFlag /> */}
        <PageLoading />
        <TxsStat />
      </Providers>
    </div>
  )
}
