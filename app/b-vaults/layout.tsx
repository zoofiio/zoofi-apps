'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { Header, LinkItem } from "@/components/header";
import { berachain, berachainTestnet } from "@/config/network";
import { isPROD } from "@/constants";
import { ReactNode } from "react";
import { LuBox, LuLineChart, LuUserCircle } from "react-icons/lu";
import { Providers } from "../providers";
const links: LinkItem[] = [
    { href: '/b-vaults', label: 'B-Vaults', icon: LuBox, },
    { href: '/b-vaults/portfolio', label: 'Portfolio', icon: LuUserCircle },
    { href: '/b-vaults/dashboard', label: 'Dashboard', icon: LuLineChart },
]
export default function Layout({ children }: { children: ReactNode }) {
    return <Providers supportChains={isPROD ? [berachain] : [berachainTestnet, berachain]}>
        <Header links={links} />
        {children}
    </Providers>
}