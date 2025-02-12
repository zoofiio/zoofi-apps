; (BigInt.prototype as any).toJSON = function () {
  return this.toString()
}
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@rainbow-me/rainbowkit/styles.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import './globals.css'

import PageLayout from './pagelayout'
const inter = Inter({ subsets: ['latin'] })

const baseMeta = {
  title: 'Zoo Finance',
  description: 'A Structured Protocol for Better Liquidity Utilization',
}

export const metadata: Metadata = {
  ...baseMeta,
  openGraph: {
    ...baseMeta,
    type: 'website',
    images: 'https://zoofi.io/Welcome.jpg'
  },
  twitter: {
    ...baseMeta,
    images: 'https://zoofi.io/Welcome.jpg'
  },
  
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='' suppressHydrationWarning>
      <body className={`${inter.className} bg-stone-50 dark:bg-slate-950 dark:text-slate-50`}>
        <PageLayout>{children}</PageLayout>
        <div id='tooltip-root' className='fixed left-0 top-0 z-[60]' />
      </body>
    </html>
  )
}
