'use client'
  ; (BigInt.prototype as any).toJSON = function () {
    return this.toString()
  }
import { Menus } from '@/components/menus';
import { isBETA } from '@/constants';
import { useConfigDomain } from '@/hooks/useConfigDomain';
import { useReadingCount } from '@/hooks/useWrapPublicClient';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
// background: linear-gradient(105.67deg, #02050E 14.41%, #1D2F23 98.84%);

function PageLoading() {
  const readingCount = useReadingCount()
  return <div className={cn('top-loader fixed z-10 top-0 left-0', readingCount ? 'visible' : 'invisible')} />
}

function BetaFlag() {
  if (!isBETA) return null
  return <div className='fixed left-0 top-0 z-50 px-1 text-xs bg-red-600 text-white'>Beta</div>
}

export default function PageLayout({ children }: { children: ReactNode }) {
  useConfigDomain()

  return (
    <>
      <div className='w-screen h-screen overflow-auto flex justify-center relative bg-[#eeeeee] dark:bg-l1'>
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
    </>
  )
}
