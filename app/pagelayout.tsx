'use client'

import { TxsStat } from '@/components/approve-and-tx';
import { Header } from '@/components/header';
import { Menus } from '@/components/menus';
import { useInitAnimRoot } from '@/hooks/useAnim';
import { useConfigDomain } from '@/hooks/useConfigDomain';
import { useIsClient } from '@/hooks/useIsClient';
import { ReactNode, useEffect } from 'react';
import { HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineX } from "react-icons/hi";
import { Toaster, toast } from 'sonner';
import { Providers } from './providers';
export default function PageLayout({ children }: { children: ReactNode }) {
  useConfigDomain()
  const root = useInitAnimRoot()
  const isClient = useIsClient()
  useEffect(() => {
    if (isClient) {
      (window as any).toast = toast
    }
  }, [isClient])
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
          {/* background: linear-gradient(274.04deg, rgba(255, 133, 151, 0.16) -17.72%, rgba(255, 58, 88, 0.16) 113.66%); */}
          <Toaster
            duration={1000 * 60}
            position='top-right'
            offset={70}
            icons={{
              error: <HiOutlineExclamationCircle className='text-[#FF3A58] text-2xl ' />,
              success: <HiOutlineCheckCircle className='text-[#36CD77] text-2xl' />,
              close: <HiOutlineX />
            }}
            closeButton
            toastOptions={{
              unstyled: true,
              classNames: {
                closeButton: 'absolute top-4 right-4 text-fg hover:text-primary text-2xl cursor-pointer',
                toast: 'backdrop-blur-lg text-fg p-4 pr-10 flex rounded-xl min-h-max max-h-100 overflow-y-auto gap-2 w-80 max-w-[90vw] relative',
                error: 'bg-[#FF3A58]/15 ',
                success: 'bg-[#36CD77]/15'
              }
            }} />
          <TxsStat />
        </Providers>
      </>}
    </div>
  )
}
