'use client'

import { ConfigChainsProvider } from "@/components/support-chains";
import { sei, story } from "@/config/network";
import { ReactNode } from "react";
import { bsc } from "viem/chains";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={[bsc.id, sei.id, story.id]}>
        {children}
    </ConfigChainsProvider>

}