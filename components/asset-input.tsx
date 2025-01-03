'use client'

import { parseEthers } from '@/lib/utils'
import { displayBalance } from '@/utils/display'
import clsx from 'clsx'
import { useRef } from 'react'
import Select from 'react-select'
import { formatUnits } from 'viem'
import { CoinIcon } from './icons/coinicon'
import { useThemeState } from './theme-mode'
import { Spinner } from './spinner'

export function AssetInput({
  asset = 'ETH',
  assetIcon,
  assetURL,
  checkBalance = true,
  balance,
  balanceTit = 'Balance',
  decimals = 18,
  exchange,
  readonly,
  selected,
  onClick,
  amount,
  setAmount,
  price,
  disable,
  hasInput = false,
  options,
  onChange = () => {},
  defaultValue,
  balanceClassName = '',
  loading,
  disableNegative,
}: {
  asset: string
  assetIcon?: string
  assetURL?: string
  checkBalance?: boolean
  balance?: bigint
  balanceTit?: string
  decimals?: number
  exchange?: string | number
  readonly?: boolean
  selected?: boolean
  onClick?: () => void
  amount?: string
  setAmount?: any
  price?: number | string
  disable?: boolean
  hasInput?: boolean
  options?: { value: any; label: string }[]
  onChange?: any
  defaultValue?: any
  loading?: boolean
  balanceClassName?: string
  disableNegative?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const balanceInsufficient =
    checkBalance && typeof balance !== 'undefined' && parseEthers(typeof amount == 'number' ? amount + '' : amount || '', decimals) > (typeof balance == 'bigint' ? balance : 0n)
  const isDark = useThemeState((t) => t.theme == 'dark')
  const isError = balanceInsufficient
  return (
    <div
      className='relative w-full'
      onClick={() => {
        onClick && !disable && onClick()
      }}
    >
      <div className='relative'>
        <div className='absolute flex items-center h-fit gap-2 left-[48px] bottom-1 w-full  max-w-[calc(100%-56px)]' style={{ pointerEvents: 'none' }}>
          {price && <div className='text-neutral-500 dark:text-slate-50/70 text-xs max-w-full overflow-hidden'>{price}</div>}
          {exchange && <div className='text-slate-500 dark:text-slate-50/70 text-xs max-w-full overflow-hidden'>~${exchange}</div>}
        </div>
        <div className='absolute flex items-center gap-2 w-fit top-1/2 left-4 -translate-y-1/2'>
          <CoinIcon size={24} symbol={assetIcon || asset} url={assetURL} className='rounded-full' />
          <div className={clsx('relative', price || exchange ? '-top-[6px]' : '')}>
            {hasInput ? (
              <Select
                options={options}
                onChange={onChange}
                defaultValue={defaultValue}
                styles={{
                  control: (provided: any, state: any) => ({
                    ...provided,
                    border: '0px', // 边框颜色
                    outline: 'none', // 去除outline
                    boxShadow: 'none', // 去除阴影
                    borderRadius: '0px', // 去除圆角
                    minHeight: '24px', // 最小高度
                    padding: '0px',
                    background: 'transparent',
                  }),
                  singleValue: (base, state) => ({ ...base, color: isDark ? '#fff' : '#000' }),
                  valueContainer: (provided: any, state: any) => ({
                    ...provided,
                    padding: '0px',
                  }),
                  menu: (base, props) => ({
                    ...base,
                    margin: 0,
                    background: isDark ? '#444' : '#fff',
                  }),
                  option(base, props) {
                    return { ...base, color: isDark ? '#fff' : '#000', background: isDark ? 'transparent' : '#fff' }
                  },
                  menuPortal: (base, props) => ({
                    ...base,
                    margin: 0,
                  }),
                }}
              />
            ) : (
              <div>{asset}</div>
            )}
          </div>
        </div>
        <input
          value={loading ? '' : amount}
          onChange={(e) => {
            if (readonly) return
            const numstr = (e.target.value || '').replaceAll('-', '').replaceAll('+', '')
            setAmount(numstr)
          }}
          ref={inputRef}
          type='number'
          disabled={disable}
          className={clsx(
            readonly ? 'bg-slate-50 cursor-not-allowed dark:bg-slate-800' : 'bg-white dark:bg-transparent',
            {
              'border-green-700 border-2': selected,
              'border-red-400 !border-2 focus:border-red-400': isError,
              'border-slate-400  focus:border-primary': !isError && !selected,
            },
            'w-full h-14 text-right pr-4 pl-[8rem] font-bold text-2xl border-[#4A5546] border focus:border-2 text-slate-700 rounded-lg outline-none dark:text-slate-50',
          )}
          placeholder='0.000'
          maxLength={36}
          pattern='[0-9.]{36}'
          step={0.01}
          title=''
          readOnly={readonly}
        />
        {loading && <Spinner className='absolute right-24 top-[1.125rem]'/>}
      </div>

      {balance != undefined && (
        <div className='flex items-center justify-between mt-1 px-1 text-slate-400 dark:text-slate-50/70 text-sm'>
          <div className={balanceClassName}>
            <span>
              {balanceTit}: {displayBalance(balance, 3, decimals)}
            </span>
            <button
              className='text-primary ml-2'
              onClick={() => {
                const fmtAmount = formatUnits(balance, decimals)
                setAmount(fmtAmount)
                onClick && !disable && onClick()
              }}
            >
              Max
            </button>
          </div>
          <div className='text-sm text-red-400'>{balanceInsufficient ? 'Insufficient account balance' : ''}</div>
        </div>
      )}
    </div>
  )
}
