'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { base } from "@/config/network";
import { Providers } from "../providers";
import { ReactNode } from "react";
import { Header, LinkItem } from "@/components/header";
import { LuBox, LuLineChart, LuUserCircle } from "react-icons/lu";
const links: LinkItem[] = [
    { href: '/lnt/pre-deposit', label: 'Pre-Deposit', icon: LuBox },
    { href: '/lnt/portfolio', label: 'Portfolio', icon: LuUserCircle, disable: true },
    { href: '/lnt/dashboard', label: 'Dashboard', icon: LuLineChart, disable: true },
]
export default function Layout({ children }: { children: ReactNode }) {
    return <Providers supportChains={[base]}>
        <Header links={links} />
        {children}
    </Providers>
}