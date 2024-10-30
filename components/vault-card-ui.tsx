import { cn } from '@/lib/utils'
import { displayBalance } from '@/utils/display'
import { AllHTMLAttributes, ButtonHTMLAttributes, EventHandler, HTMLAttributes, MouseEventHandler, ReactEventHandler, ReactNode } from 'react'
import { IconsMap } from './icons'
import { CoinIcon } from './icons/coinicon'
import { BBtn } from './ui/bbtn'

export const itemClassname = 'py-5 flex flex-col items-center gap-2 relative dark:border-border border-solid'
export const renderToken = (symbol: string, amount: bigint, usd: bigint, borderL: boolean = false) => {
  return (
    <div className={cn(itemClassname, 'border-b', { 'border-l': borderL })}>
      <div>
        <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-semibold leading-[12px] whitespace-nowrap flex gap-2 items-center'>
          <CoinIcon symbol={symbol} size={14} />
          {symbol}
        </div>
        <div className='flex mt-2 flex-col gap-1 pl-[1.375rem] text-xs font-medium'>
          <span className=''>{displayBalance(amount)}</span>
          <span className=' text-[#64748B] dark:text-slate-50/60'>{`$${displayBalance(usd, 2)}`}</span>
        </div>
      </div>
    </div>
  )
}
export const renderStat = (tit: string, icon: string, sub: ReactNode, borderL: boolean = false) => (
  <div className={cn(itemClassname, 'border-b pb-10', { 'border-l': borderL })}>
    <div>
      <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-semibold leading-[12px] whitespace-nowrap text-center'>{tit}</div>
      <div className='flex mt-2 items-center gap-2 text-sm font-medium'>
        <CoinIcon symbol={icon} size={14} />
        {typeof sub == 'string' ? <span>{sub}</span> : sub}
      </div>
    </div>
  </div>
)

const BtnWrap = (p: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, onClick, ...props } = p
  return p.onClick ? (
    <BBtn {...props} onClick={onClick}>
      {children}
    </BBtn>
  ) : (
    <div {...(props as any)} onClick={onClick}>
      {children}
    </div>
  )
}
export const renderChoseSide = (
  leftSymbol: keyof typeof IconsMap,
  leftTitle: string,
  leftSub: string,
  rightSymbol: keyof typeof IconsMap,
  rightTitle: string,
  rightSub: string,
  onClickLeft?: MouseEventHandler<HTMLDivElement>,
  onClickRight?: MouseEventHandler<HTMLDivElement>,
) => {
  const LeftIcon = IconsMap[leftSymbol]
  const RightIcon = IconsMap[rightSymbol]

  return (
    <div className={cn(itemClassname, 'col-span-2 gap-4')}>
      <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-semibold leading-[12px] whitespace-nowrap'>Choose your side</div>
      <div className='grid grid-cols-2 gap-4 w-full px-4'>
        <BtnWrap className={cn('h-[4.25rem] w-full relative')} onClick={onClickLeft as any}>
          <div className='flex gap-2 items-center p-4 w-full h-[4.25rem] absolute left-0 top-0'>
            <LeftIcon className='text-4xl' showBg />
            <div className='flex flex-col items-start gap-2'>
              <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-semibold leading-[12px] whitespace-nowrap'>{leftTitle}</div>
              <span className=' text-[14px] leading-[14px] font-medium'>{leftSub}</span>
            </div>
          </div>
        </BtnWrap>
        <BtnWrap className={cn('h-[4.25rem] w-full relative')} onClick={onClickRight as any}>
          <div className='flex flex-row-reverse gap-2 items-center p-4 w-full h-[4.25rem] absolute left-0 top-0'>
            <RightIcon className='text-4xl' showBg />
            <div className='flex flex-col items-end gap-2'>
              <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-semibold leading-[12px] whitespace-nowrap'>{rightTitle}</div>
              <span className=' text-[14px] leading-[14px] font-medium'>{rightSub}</span>
            </div>
          </div>
        </BtnWrap>
      </div>
    </div>
  )
}
