'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { base, berachain, berachainTestnet } from "@/config/network";
import { Providers } from "../providers";
import { ReactNode } from "react";
import { Header, LinkItem } from "@/components/header";
import { LuBox, LuLineChart, LuUserCircle } from "react-icons/lu";
import { isPROD } from "@/constants";
const links: LinkItem[] = [
    { href: '/b-vaults/pre-deposit', hrefs: ['/lnt'], label: 'Pre-Deposit', icon: LuBox },
    { href: '/lnt/portfolio', label: 'Portfolio', icon: LuUserCircle, disable: true },
    { href: '/lnt/dashboard', label: 'Dashboard', icon: LuLineChart, disable: true },
]
export default function Layout({ children }: { children: ReactNode }) {
    return <Providers supportChains={isPROD ? [berachain] : [berachainTestnet, berachain]}>
        <Header links={[]} />
        {children}
    </Providers>
}