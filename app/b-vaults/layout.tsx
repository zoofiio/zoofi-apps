'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { ConfigChainsProvider } from "@/components/support-chains";
import { berachain } from "@/config/network";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={[berachain.id]}>
        {children}
    </ConfigChainsProvider>

}