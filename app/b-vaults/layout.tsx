'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { Header } from "@/components/header";
import { berachain, berachainTestnet } from "@/config/network";
import { isPROD } from "@/constants";
import { ReactNode } from "react";
import { Providers } from "../providers";

export default function Layout({ children }: { children: ReactNode }) {
    return <Providers supportChains={isPROD ? [berachain] : [berachain, berachainTestnet,]}>
        <Header />
        {children}
    </Providers>
}