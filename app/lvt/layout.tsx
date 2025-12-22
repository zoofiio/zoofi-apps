'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { ConfigChainsProvider } from "@/components/support-chains";
import { sei } from "@/config/network";
import { ReactNode } from "react";
import { bsc, story } from "viem/chains";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={[bsc.id,story.id, sei.id]}>
        {children}
    </ConfigChainsProvider>

}