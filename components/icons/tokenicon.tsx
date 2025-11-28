'use client'

import { BASE_PATH } from '@/config/env'
import { getChain } from '@/config/network'
import { Token } from '@/config/tokens'
import { cn } from '@/lib/utils'
import { CSSProperties } from 'react'

const SupportICONS: { [k: string]: string } = {
  BERA: 'BERA.svg',
  ETH: 'ETH.svg',
  ETHx: 'ETHx.svg',
  'HONEY-USDC': 'HONEY-USDC.svg',
  'USDC-HONEY': 'HONEY-USDC.svg',
  'HONEY-WBERA': 'HONEY-WBERA.webp',
  'HONEY-WBTC': 'HONEY-WBTC.svg',
  'HONEY-WETH': 'HONEY-WETH.svg',
  HONEY: 'HONEY.svg',
  iBGT: 'iBGT.webp',
  iRED: 'iRED.svg',
  USDC: 'USDC.svg',
  USDCx: 'USDCx.svg',
  USDT: 'USDT.svg',
  Venom: 'Venom.svg',
  WBERA: 'WBERA.svg',
  WBTC: 'WBTC.svg',
  WBTCx: 'WBTCx.svg',
  weeth: 'weeth.png',
  weETH: 'weETH.svg',
  weETHx: 'weETHx.svg',
  WETH: 'WETH.svg',
  xBERA: 'xBERA.svg',
  xiBGT: 'xiBGT.svg',
  yiRED: 'yiRED.svg',
  ZUSD: 'ZUSD.svg',
  BYUSD: 'BYUSD.webp',
  ['0G']: '0G.png',
  ATH: 'ATH.png',
  Fil: 'Filecoin.svg',
  REPPO: 'REPPO.svg',
}

export function CoinIconImpl({ symbol, size = 48, url, style, ...p }: { symbol: string; className?: string; style?: CSSProperties; size?: number | string; url?: string }) {
  const supportIcon = SupportICONS[symbol]
  const src = `${BASE_PATH}/${supportIcon}`
  if (!supportIcon && !url) {
    return (
      <svg {...p} width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <text className='fill-primary/60' width='20' x='12' y='14' textAnchor='middle' fontSize={12} dominantBaseline='middle'>
          {symbol.slice(0, 2)}
        </text>
        <circle className='stroke-primary/60' cx='12' cy='12' r='11.5' strokeWidth={1} />
      </svg>
    )
  }
  return <img {...p} style={{ width: size, height: size, ...(style || {}) }} className={cn(p.className)} width={size} height={size} src={supportIcon ? src : url} alt={symbol} />
}


const ignoreDouble = ['logo-alt', 'status-green', 'status-red', 'kodiak-logo']
export function DoubleCoinIcon({ symbol1, symbol2, size = 48, url1, url2, className }: { symbol1: string, symbol2: string, className?: string, size?: number | string, url1?: string, url2?: string }) {
  return <div className={cn('flex items-center', className)}>
    <CoinIconImpl symbol={symbol1} size={size} url={url1} />
    <CoinIconImpl symbol={symbol2} size={size} url={url2} style={{ marginLeft: `-30%` }} />
  </div>
}

export function TokenIcon({ token, size = 48, showNet = false, url, ...p }: { token?: Token; className?: string; style?: CSSProperties; size?: number | string; url?: string, showNet?: boolean }) {
  if (!token) return null
  const isLP = token.symbol.startsWith('lp')
  const isVT = token.symbol.startsWith('v')
  const symbol = isLP ? token.symbol.slice(2) : isVT ? token.symbol.slice(1) : token.symbol
  const isOtherLP = symbol.includes('-') && !ignoreDouble.includes(symbol)
  const [symbol1, symbol2] = symbol.split('-')
  const chain = getChain(token.chain)
  return <div className='relative shrink-0'>
    {
      isOtherLP ? <DoubleCoinIcon {...p} symbol1={symbol1} symbol2={symbol2} size={size} />
        : <CoinIconImpl {...p} symbol={symbol} size={size} url={url} />
    }
    {
      isVT && <svg className={cn('absolute left-0 top-0 scale-105 origin-center', p.className)} style={{ width: size, height: size, ...(p.style ?? {}) }}
        width={size} height={size} fill='none' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
        <circle cx="20" cy="20" r="19" stroke="#10B981" stroke-width="2" />
      </svg>
    }
    {
      isLP && <svg className={cn('absolute left-0 top-0 scale-105 origin-center', p.className)} style={{ width: size, height: size, ...(p.style ?? {}) }}
        width={size} height={size} fill='none' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'>
        <circle cx="60" cy="60" r="57" stroke="#6366F1" stroke-width="6" />
        <circle cx="100" cy="20" r="17" fill="white" stroke="#6366F1" stroke-width="6" />
        <text text-anchor="middle" x="100" y="27" fill="#6366F1" font-size="20">LP</text>
      </svg>
    }
    {
      showNet && chain && <img src={(chain as any).iconUrl} className='absolute right-0 bottom-0 w-1/3 h-1/3 rounded-full' />
    }
  </div>
}


