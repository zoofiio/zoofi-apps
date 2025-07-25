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

// import PageLayout from './pagelayout'
import Script from 'next/script'
import dynamic from 'next/dynamic'
const inter = Inter({ subsets: ['latin'] })
const PageLayout = dynamic(() => import("./pagelayout"))

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
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js?56" defer></Script>
      </head>
      <body className={`${inter.className} bg-white dark:bg-dark dark:text-slate-50`}>
        <PageLayout>{children}</PageLayout>
        <div id='tooltip-root' className='fixed left-0 top-0 z-[60]' />
      </body>
    </html>
  )
}
