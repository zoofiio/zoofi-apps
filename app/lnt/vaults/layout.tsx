'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { ConfigChainsProvider } from "@/components/support-chains";
import { arbitrum } from "@/config/network";
import { ReactNode } from "react";
import { base, bsc } from "viem/chains";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={[base.id, arbitrum.id, bsc.id]}>
        {children}
    </ConfigChainsProvider>

}