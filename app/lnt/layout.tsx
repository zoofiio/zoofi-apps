'use client'
    ; (BigInt.prototype as any).toJSON = function () {
        return this.toString()
    }
import { Header } from "@/components/header";
import { base } from "@/config/network";
import { ReactNode } from "react";
import { LuBox, LuLineChart, LuUserCircle } from "react-icons/lu";
import { Providers } from "../providers";

export default function Layout({ children }: { children: ReactNode }) {
    return <Providers supportChains={[base]}>
        <Header  />
        {children}
    </Providers>
}