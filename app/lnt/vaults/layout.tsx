'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { ConfigChainsProvider } from "@/components/support-chains";
import { sepolia, zeroGTestnet } from "@/config/network";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={[zeroGTestnet, sepolia]}>
        {children}
    </ConfigChainsProvider>

}