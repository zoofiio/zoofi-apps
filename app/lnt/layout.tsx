'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { Header } from "@/components/header";
import { ConfigChainsProvider } from "@/components/support-chains";
import { base, sepolia } from "@/config/network";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={[base, sepolia]}>
        <Header />
        {children}
    </ConfigChainsProvider>

}