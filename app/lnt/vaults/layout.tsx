'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { ConfigChainsProvider } from "@/components/support-chains";
import { arbitrum, sepolia, zeroGTestnet } from "@/config/network";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={[zeroGTestnet.id, sepolia.id, arbitrum.id]}>
        {children}
    </ConfigChainsProvider>

}