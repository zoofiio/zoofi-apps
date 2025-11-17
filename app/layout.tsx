; (BigInt.prototype as any).toJSON = function () {
  return this.toString()
}
import '@rainbow-me/rainbowkit/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './globals.css'

// import PageLayout from './pagelayout'
import Script from 'next/script'
import PageLayout from './pagelayout'
const inter = Inter({ subsets: ['latin'] })
// const PageLayout = dynamic(() => import("./pagelayout"), { ssr: false })

const MMetas = {
  title: 'Zoo Finance',
  description: 'A Structured Protocol for Better Liquidity Utilization',

} as const

export const metadata: Metadata = {
  ...MMetas,
  metadataBase: null,
  keywords: ['Zoofi', 'LNT', 'Node', 'Vault', 'Arbitrum', 'Berachain'],
  openGraph: {
    ...MMetas,
    type: 'website',
    images: 'https://zoofi.io/Welcome.jpg'
  },
  twitter: {
    ...MMetas,
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
        <div id='tooltip-root' className='fixed left-0 top-0 z-[200]' />
      </body>
    </html>
  )
}
