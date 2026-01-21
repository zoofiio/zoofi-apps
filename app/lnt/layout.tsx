'use client'

import { ConfigChainsProvider } from "@/components/support-chains";
import { arbitrum, base, sei, story } from "@/config/network";
import { ReactNode } from "react";
import { bsc } from "viem/chains";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={[base.id, arbitrum.id, bsc.id, sei.id, story.id]}>
        {children}
    </ConfigChainsProvider>

}