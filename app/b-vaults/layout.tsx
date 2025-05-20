'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { Header } from "@/components/header";
import { ConfigChainsProvider } from "@/components/support-chains";
import { berachain, berachainTestnet } from "@/config/network";
import { isPROD } from "@/constants";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={isPROD ? [berachain] : [berachain, berachainTestnet]}>
        <Header />
        {children}
    </ConfigChainsProvider>

}