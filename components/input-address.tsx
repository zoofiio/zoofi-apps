'use client'

import { cn } from '@/lib/utils'
import { useRef } from 'react'


export function AddressInput({
  disable,
  readonly,
  value,
  setValue,
  error,
  className,
}: {
  disable?: boolean
  readonly?: boolean
  value?: string
  setValue?: (value: string) => void
  error?: string
  className?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const addressError = value && !/^0x[a-fA-F0-9]{40}$/.test(value) ? 'Invalid address format' : ''
  const mError = error || addressError
  const isError = !!mError
  return (
    <div
      className={cn('relative w-full', className)}
    >
      <div className='relative'>
        <input
          value={value}
          onChange={(e) => {
            setValue?.(e.target.value)
          }}
          ref={inputRef}
          type='text'
          disabled={disable}
          className={cn(
            readonly ? 'bg-slate-50 cursor-not-allowed dark:bg-slate-800' : 'bg-white dark:bg-transparent',
            'w-full h-14 text-right px-4 font-bold text-sm border-[#4A5546] border focus:border-2 text-slate-700 rounded-lg outline-none dark:text-slate-50',
            {
              'border-red-400 !border-2 focus:border-red-400': isError,
            },
          )}
          placeholder='0x...'
          maxLength={42}
          title=''
          readOnly={readonly}
        />
        {isError && <div className='text-sm text-white bg-red-400 rounded right-0 bottom-0 absolute px-1 translate-y-1/4'>{mError}</div>}
      </div>
    </div>
  )
}
