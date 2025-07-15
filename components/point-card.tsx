

import { useElementSizeCheck } from '@/hooks/useElementSizeCheck'
import { GoArrowUpRight } from 'react-icons/go'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IconsMap } from './icons'
import { useThemeState } from './theme-mode'

type PointItem = {
  symbol: string
  symbolPrice?: string
  iconSymbol: keyof typeof IconsMap
  tit: string
  sub: string
  total: string
  link?: { text: string; url: string }
}

const bgMap: { [k: string]: string } = {
  ZUSD: '#FFD3C2',
  ZUSD_dark: '#FFD3C2',
  xiBGT: '#AFD3FF',
  xiBGT_dark: '#AFD3FF',
  xBERA: '#AFD3FF',
  xBERA_dark: '#AFD3FF',
}
const titBgMap: { [k: string]: string } = {
  ZUSD: '#FFA973',
  xiBGT: '#93B0FF',
  xBERA: '#93B0FF',
}


export function PointCard({ symbol, symbolPrice, iconSymbol, tit, sub, total, link }: PointItem) {
  const theme = useThemeState((s) => s.theme)
  const MIcon = IconsMap[iconSymbol];
  return (
    <div
      style={
        {
          // boxShadow: '0px 0px 12px 0px rgba(187, 215, 144, 0.4)',
        }
      }
      className='animitem card overflow-hidden !p-0 text-base flex flex-col'
    >
      <div className='flex md:flex-wrap items-center p-4 gap-2 dark:text-black' style={{ background: bgMap[`${symbol}_${theme}`] || bgMap[symbol] }}>
        <MIcon showbg={true} className='text-[2.625rem] shrink-0 dark:text-white text-black' />
        <div>
          <div className='font-semibold'>{symbol}</div>
          <div className='font-medium text-xs'>{symbolPrice}</div>
        </div>
        <div className='whitespace-nowrap text-center text-sm ml-auto flex flex-col items-center flex-1'>
          <div className='rounded-full px-2 py-[2px] w-fit' style={{ background: titBgMap[symbol] }}>
            {tit}
          </div>
          <div className='mt-1'>{sub}</div>
        </div>
      </div>
      {/* <div className='flex-1' /> */}
      <div className='flex justify-between p-4 whitespace-nowrap text-sm items-center gap-2'>
        <div className='font-medium text-slate-500 dark:text-slate-50/60 self-start text-xs items-center gap-1'>
          <span className='font-semibold text-sm'>{total}</span>
        </div>
        {link && (
          <a className='underline text-slate-500 dark:text-slate-50 flex items-center gap-1' href={link.url} target='_blank'>
            {link.text} <GoArrowUpRight />
          </a>
        )}
      </div>
    </div>
  )
}

export function PointCards() {
  const items = [] as any[]
  const [ref, useSwiper] = useElementSizeCheck(({ width }) => width < 970)
  if (items.length == 0) return null
  return (
    <div ref={ref as any} className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      {!useSwiper && items.map((item) => <PointCard key={item.symbol} {...item} />)}
      {useSwiper && (
        <Swiper
          spaceBetween={20}
          pagination={{
            clickable: true,
            renderBullet: function (index: number, className: string) {
              return '<div class="' + className + '"></div>'
            },
          }}
          className='-translate-x-[1rem] !px-4 !pb-10 !w-screen'
          modules={[Pagination]}
        >
          {items.map((item) => (
            <SwiperSlide key={item.symbol}>
              <PointCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}
