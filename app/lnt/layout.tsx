'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { base } from "@/config/network";
import { Providers } from "../providers";
import { ReactNode } from "react";
import { Header } from "@/components/header";

export default function Layout({ children }: { children: ReactNode }) {
    return <Providers supportChains={[base]}>
        <Header />
        {children}
    </Providers>
}