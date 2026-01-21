import { LntVaultConfig, LNTVAULTS_CONFIG } from "@/config/lntvaults";
import { fetLntBuyback, fetLntBuybackUser, fetLntHookPoolkey, fetLntVault, fetLntVaultLogs, fetLntWithdrawWindows } from "@/hooks/fetsLnt";
import { NextRequest, NextResponse } from "next/server";
import { Address, isAddress, isAddressEqual } from "viem";

import { toJsonRES } from "@/lib/bnjson";
import { cacheGet } from "@/lib/cache";

const fetMap = {
    fetLntVault,
    fetLntVaultLogs,
    fetLntHookPoolkey,
    fetLntWithdrawWindows,
    fetLntBuyback,
    fetLntBuybackUser,
}

async function fetData(fet: keyof typeof fetMap, vc: LntVaultConfig, sp: Record<string, string>) {
    switch (fet) {
        case "fetLntBuybackUser": {
            return cacheGet(`${fet}:${vc.chain}:${vc.vault}:${sp.byUser}`, () => fetMap[fet](vc, sp.byUser as Address))
        }
        default: {
            return cacheGet(`${fet}:${vc.chain}:${vc.vault}`, () => fetMap[fet](vc) as Promise<any>, 60000 * 60)
        }
    }
}
export async function GET(req: NextRequest) {
    const sp = Object.fromEntries(req.nextUrl.searchParams)
    const chain = sp.chain
    const vault = sp.vault
    if (!chain || !vault || !isAddress(vault)) return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
    const vc = LNTVAULTS_CONFIG.find(vc => `${vc.chain}` == chain && isAddressEqual(vault, vc.vault))
    if (!vc) return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
    const fet = sp.fet as keyof typeof fetMap
    const fetFn = fetMap[fet]
    if (fet || !fetFn) NextResponse.json({ message: 'Invalid request' }, { status: 400 })
    sp.byUser as Address
    const data = await fetData(fet, vc, sp)
    return toJsonRES(data)
}