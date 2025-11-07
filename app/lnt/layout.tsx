'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { Header } from "@/components/header";
import { ConfigChainsProvider } from "@/components/support-chains";
import { arbitrum, base, sepolia, zeroGmainnet, zeroGTestnet } from "@/config/network";
import { ReactNode } from "react";
import { bsc } from "viem/chains";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={[base.id, sepolia.id, zeroGTestnet.id, zeroGmainnet.id, arbitrum.id, bsc.id]}>
        <Header />
        {children}
    </ConfigChainsProvider>

}