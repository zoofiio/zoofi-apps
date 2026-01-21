'use client'

import { ConfigChainsProvider } from "@/components/support-chains";
import { base } from "@/config/network";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return <ConfigChainsProvider chains={[base.id]}>
        {children}
    </ConfigChainsProvider>

}