import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, HTMLAttributes, useRef } from 'react';
import { AiOutlineSwap } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { Spinner } from '../spinner';

export function BBtn(p: ButtonHTMLAttributes<HTMLButtonElement> & { borderWidth?: number; busy?: boolean; busyShowContent?: boolean; }) {
  const { borderWidth = 1, children, busy, busyShowContent = true, className, ...props } = p
  const btnRef = useRef<HTMLButtonElement>(null)
  return (
    <button
      {...props}
      ref={btnRef}
      className={cn(
        'group/bbtn font-sec relative px-3 cursor-pointer w-full transition-all leading-[2.375] ring-0 text-base text-black dark:text-white font-medium h-10 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed bg-btn  dark:bg-btndark',
        "border-primary border hover:border-primary/60",
        { 'hover:bg-btnhover dark:hover:bg-btndarkhover': !p.disabled },
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
    className={cn("flex w-8 h-8 justify-center items-center self-center text-sm cursor-pointer border border-slate-500 text-slate-500 rounded-full hover:text-primary hover:border-primary", className)}
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
