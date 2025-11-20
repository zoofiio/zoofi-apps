'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { Header } from "@/components/header";
import { ConfigChainsProvider } from "@/components/support-chains";
import { ReactNode } from "react";
import { bsc } from "viem/chains";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={[bsc.id]}>
        <Header />
        {children}
    </ConfigChainsProvider>

}