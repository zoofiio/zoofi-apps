'use client'

import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
export function PageWrap({ children, className, ...p }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('h-max pt-23 pb-6 w-full max-w-320', className)} {...p}>
      {children}
    </div>
  )
}
