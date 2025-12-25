'use client'

import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { MdComputer, MdDarkMode, MdLightMode } from 'react-icons/md'
import { create } from 'zustand'
import { SimpleDialog } from './simple-dialog'

export type ThemeType = 'light' | 'dark'
export type ThemeModeType = ThemeType | 'system'
const defTheme: ThemeType = 'dark'

const getSystemTheme = (): ThemeType => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
const getThemeState = () => {
  let themeMode: ThemeModeType = defTheme
  let theme: ThemeType = defTheme
  if (typeof window === 'undefined') {
    return { themeMode, theme }
  }
  themeMode = (localStorage.themeMode as any) || defTheme
  theme = themeMode == 'system' ? getSystemTheme() : themeMode
  document.documentElement.classList.remove(theme == 'dark' ? 'light' : 'dark')
  document.documentElement.classList.add(theme)
  return { themeMode, theme }
}

export const useThemeState = create<{
  themeMode: ThemeModeType
  theme: ThemeType
  setThemeMode: (themeMode: ThemeModeType) => void
  setTheme: (theme: ThemeType) => void
}>((set) => ({
  ...getThemeState(),
  setThemeMode: (themeMode: ThemeModeType) => set(() => ({ themeMode })),
  setTheme: (theme: ThemeType) => set(() => ({ theme })),
}))

const Icons = {
  light: <MdLightMode />,
  dark: <MdDarkMode />,
  system: <MdComputer />,
}

export function ThemeMode({ triggerClassName }: { triggerClassName?: string }) {
  const ts = useThemeState()
  const onChangeTheme = () => {
    const { theme, themeMode } = getThemeState()
    ts.setTheme(theme)
    ts.setThemeMode(themeMode)
  }
  useEffect(() => {
    onChangeTheme()
  }, [])
  const onClick = (item: string) => {
    if (localStorage) {
      localStorage.setItem('themeMode', item.toLocaleLowerCase())
      onChangeTheme()
    }
  }
  return (
    <SimpleDialog
      className='max-w-100 pb-8 flex flex-col text-base text-fg'
      trigger={<div className={cn('text-sm hidden md:block cursor-pointer', triggerClassName)}>{Icons[ts.theme as 'light' | 'dark' | 'system']}</div>}
    >
      <div className='text-lg p-4'>Theme</div>
      <div className='flex flex-col px-4 gap-4'>
        {['Light', 'Dark', 'System'].map((item, index) => (
          <div
            key={'theme_mode_' + item}
            className={cn('flex bg-main px-4 items-center py-2 gap-3 cursor-pointer font-sec rounded-xl', {
              'bg-primary/5 text-primary': item.toLowerCase() == ts.themeMode,
            })}
            onClick={() => onClick(item)}
          >
            <div
              className={cn('text-xl rounded-lg bg-main w-7 aspect-square flex justify-center items-center', {
                'bg-primary/10': item.toLowerCase() == ts.themeMode,
              })}>
              {Icons[item.toLowerCase() as 'light' | 'dark' | 'system']}
            </div>
            <span className=''>{item}</span>
          </div>
        ))}
      </div>
    </SimpleDialog>
  )
}
