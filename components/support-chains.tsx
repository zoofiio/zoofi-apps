'use client'

import { SUPPORT_CHAINS } from "@/config/network";
import { flatten } from "es-toolkit";
import React, { useContext } from "react";
import { Chain } from "viem";

export const ConfigChainsCTX = React.createContext<readonly [Chain, ...(Chain[])]>(SUPPORT_CHAINS)
export function ConfigChainsProvider({ children, chains }: { chains: number[] | number, children: React.ReactNode }) {
    const mChains = flatten([chains]).map(cid => SUPPORT_CHAINS.find(c => c.id === cid)!).filter(Boolean)
    if (mChains.length == 0) throw new Error("ConfigChains Error")
    return <ConfigChainsCTX.Provider value={mChains as any}>
        {children}
    </ConfigChainsCTX.Provider>
}
export function useConfigChains() {
    return useContext(ConfigChainsCTX)
}