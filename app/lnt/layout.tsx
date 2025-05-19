'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { Header } from "@/components/header";
import { base, sepolia } from "@/config/network";
import { ReactNode } from "react";
import { Providers } from "../providers";

export default function Layout({ children }: { children: ReactNode }) {
    return <Providers supportChains={[base, sepolia]}>
        <Header />
        {children}
    </Providers>
}