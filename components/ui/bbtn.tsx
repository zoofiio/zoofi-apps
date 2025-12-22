import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, HTMLAttributes, useRef } from 'react';
import { AiOutlineSwap } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { Spinner } from '../spinner';
import { useThemeState } from '../theme-mode';

export function BBtn(p: ButtonHTMLAttributes<HTMLButtonElement> & { borderWidth?: number; busy?: boolean; busyShowContent?: boolean; }) {
  const { borderWidth = 1, children, busy, busyShowContent = true, className, ...props } = p
  const btnRef = useRef<HTMLButtonElement>(null)
  return (
    <button
      {...props}
      ref={btnRef}
      className={cn(
        "group/bbtn relative px-3 cursor-pointer flex justify-center items-center gap-4 w-full h-12 transition-all rounded-[.625rem]",
        'font-sec leading-[2.375] text-base text-primary font-medium',
        "border border-transparent",
        "disabled:bg-primary/5 disabled:cursor-not-allowed disabled:text-primary/30",
        { 'bg-primary/10 hover:border-primary': !p.disabled },
        className,
      )}
    >
      {busy && <Spinner />}
      {(busyShowContent || !busy) && children}
    </button>
  )
}
export function BBtn2(p: ButtonHTMLAttributes<HTMLButtonElement> & { borderWidth?: number; busy?: boolean; busyShowContent?: boolean; }) {
  const { borderWidth = 1, children, busy, busyShowContent = true, className, ...props } = p
  const btnRef = useRef<HTMLButtonElement>(null)
  const theme = useThemeState()
  return (
    <button
      {...props}
      ref={btnRef}
      style={{
        boxShadow: '0px 0px 1px 0px #5D5D5D66 inset',
        background: theme.theme == 'dark' ? 'linear-gradient(180deg, #1E1E1E 0%, #393939 100%)' : ''
      }}
      className={cn(
        "group/bbtn relative px-3 cursor-pointer flex justify-center items-center gap-3 w-full h-8 transition-all rounded-[.625rem]",
        'font-sec leading-[2.375] text-base text-fg/60 font-medium',
        "disabled:cursor-not-allowed disabled:text-fg/30",
        { 'hover:text-fg/80 not-dark:hover:bg-primary/20 not-dark:hover:text-primary': !p.disabled },
        className,
      )}
    >
      {busy && <Spinner />}
      {(busyShowContent || !busy) && children}
    </button>
  )
}


export function Swap(p: HTMLAttributes<HTMLDivElement>) {
  const { className, style, ...props } = p
  return <div
    {...props}
    style={{ transform: 'rotateX(180deg) rotateZ(90deg)', ...(style || {}) }}
    className={cn("flex w-8 h-8 justify-center items-center self-center text-sm cursor-pointer border border-board bg-bg text-fg rounded-full m-shadow-around hover:shadow-primary hover:border-primary", className)}
  >
    <AiOutlineSwap />
  </div>
}
export function SwapDown(p: HTMLAttributes<HTMLDivElement>) {
  const { className, style, ...props } = p
  return <div
    {...props}
    style={{ ...(style || {}) }}
    className={cn("flex w-8 h-8 justify-center items-center self-center text-sm cursor-pointer border border-slate-500 text-slate-500 rounded-full", className)}
  >
    <IoIosArrowDown />
  </div>
}
