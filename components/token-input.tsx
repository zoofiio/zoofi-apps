'use client'

import { Token } from '@/config/tokens'
import { cn, parseEthers } from '@/lib/utils'
import { displayBalance } from '@/utils/display'
import { isNil } from 'es-toolkit'
import { useEffect, useMemo, useRef, useState } from 'react'
import { formatUnits } from 'viem'
import { useBalance } from '../hooks/useToken'
import { TokenIcon } from './icons/tokenicon'
import { Spinner } from './spinner'
import { SimpleSelect } from './ui/select'


function TokenSymbol({ token }: { token: Token }) {
  return <div className='flex items-center gap-2 font-medium'>
    <TokenIcon token={token} size={40} showNet />
    {token.symbol}
  </div>
}

export function TokenInput({
  className,
  tokens,
  checkBalance = true,
  balance: showBalance = true,
  balanceTit = 'Balance',
  readonly,
  selected,
  onClick,
  amount,
  setAmount,
  disable,
  balanceClassName = '',
  loading,
  error = '',
  otherInfo,
  onTokenChange
}: {
  tokens: Token[],
  checkBalance?: boolean
  balance?: boolean
  balanceTit?: string
  readonly?: boolean
  selected?: boolean
  onClick?: () => void
  amount?: string
  setAmount?: any
  disable?: boolean
  loading?: boolean
  balanceClassName?: string
  error?: string
  otherInfo?: React.ReactNode
  onTokenChange?: (token: Token) => void
  className?: string
}) {
  const options = useMemo(() => {
    return tokens.map((item => ({
      key: item.address,
      show: <TokenSymbol token={item} />,
      data: item,
    })))
    // eslint-disable-next-line react-hooks/use-memo
  }, [JSON.stringify(tokens)])
  const [token, setToken] = useState<Token>(options[0].data)
  useEffect(() => {
    if (!options.some(item => item.data == token)) {
      console.info('tokenChange:')
      setToken(options[0].data)
      onTokenChange?.(options[0].data)
    }
  }, [token, options])
  const mShowBalance = showBalance && !disable
  const mCheckBalance = checkBalance && !disable
  const tokenBalance = useBalance(mShowBalance ? token : undefined)
  const balance = tokenBalance.data;
  const inputRef = useRef<HTMLInputElement>(null)
  const balanceInsufficient = mCheckBalance && parseEthers(`${amount ?? '0'}`, token.decimals) > balance
  const isError = Boolean(error) || balanceInsufficient

  if (options.length == 0) return null
  return (
    <div
      className={cn('relative w-full flex flex-col p-4 gap-4 font-sec border border-transparent bg-card dark:bg-main rounded-xl m-shadow-around', {
        ' border-green-700': selected,
        ' border-red-400 has-focus:shadow-red-400/40': isError,
        ' has-focus:border-primary has-focus:shadow-primary/40': !isError && !selected,
      }, className)}
      onClick={(e) => {
        inputRef.current?.focus()
        onClick && !disable && onClick()
      }}
    >

      {
        isError && <div className='flex w-full justify-center absolute left-0 bottom-0'>
          <div className='text-sm text-white bg-red-400 rounded-t right-0 bottom-0 px-1 '>{error || 'Insufficient account balance'}</div>
        </div>
      }
      <div className='flex items-center w-full h-10 relative gap-3'>
        {loading && <Spinner className='absolute right-24 top-4.5' />}

        <div className='flex items-center gap-2 w-fit left-4 z-50'>
          {tokens.length > 1 ? <SimpleSelect className='border-none' options={options} onChange={(n) => {
            console.info('tokenChange:', n)
            setToken(n.data); onTokenChange?.(n.data)
          }} /> : <TokenSymbol token={token} />}
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
          className={cn(
            'bg-transparent min-w-0 basis-0 flex-1 h-full font-semibold text-right text-2xl outline-none! border-none!',
            {
              'cursor-not-allowed ': readonly
            },
          )}
          placeholder='0.000'
          maxLength={36}
          pattern='[0-9.]{36}'
          step={0.01}
          title=''
          readOnly={readonly}
        />
      </div>
      {(mShowBalance || !isNil(otherInfo)) && (
        <div className='flex items-center justify-between mt-1 px-1 text-fg/60 text-sm'>
          {mShowBalance && <div className={balanceClassName}>
            <span>
              {balanceTit}: {displayBalance(balance, undefined, token.decimals)}
            </span>
            {!disable && <button
              className='ml-2 text-primary'
              onClick={() => {
                const fmtAmount = formatUnits(balance, token.decimals)
                setAmount(fmtAmount)
                onClick && !disable && onClick()
              }}
            >
              Max
            </button>}
          </div>}
          {otherInfo}
        </div>
      )}

    </div>
  )
}


export function useTokenInputHelper(tokens: Token[]) {
  const [_currentToken, setCurrentToken] = useState(tokens[0])
  const currentToken = tokens.includes(_currentToken) ? _currentToken : tokens[0]
  const [inputAsset, setInputAsset] = useState('')
  const inputAssetBn = parseEthers(inputAsset, currentToken.decimals)
  return {
    currentToken,
    inputAsset,
    inputAssetBn,
    setCurrentToken,
    setInputAsset,
  }
}