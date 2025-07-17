'use client'
import { cn } from '@/lib/utils';
import React from 'react';
import { useThemeState } from './theme-mode';
// background: radial-gradient(76.25% 76.25% at 50.3% 23.75%, rgba(27, 205, 89, 0.2) 0%, rgba(179, 232, 84, 0.2) 100%)
export function PageWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  const theme = useThemeState((s) => s.theme)
  // const path = usePathname()
  // const isHome = path == '/'
  return (
    <div
      className={cn('h-auto pt-[30px] pb-6', className)}
      // style={{
      //   backgroundSize: 'contain',
      //   background:
      //     theme == 'light'
      //       ? '#eeeeee'
      //       : 'linear-gradient(105.67deg, #02050E 14.41%, #1D2F23 98.84%)',
      // }}
    >
      {children}
    </div>
  )
}
