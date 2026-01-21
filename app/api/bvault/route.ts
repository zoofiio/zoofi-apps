import { BVaultConfig, BVAULTS_CONFIG } from "@/config/bvaults";
import { fetBVault, fetBVaultEpoches, fetUserBVault } from "@/hooks/fetsBvault";
import { toJsonRES } from "@/lib/bnjson";
import { cacheGet } from "@/lib/cache";
import { NextRequest, NextResponse } from "next/server";
import { Address, isAddress, isAddressEqual } from "viem";



const fetMap = {
    fetBVault,
    fetBVaultEpoches,
    fetUserBVault,
}

async function fetData(fet: keyof typeof fetMap, vc: BVaultConfig, sp: Record<string, string>) {
    switch (fet) {
        case "fetUserBVault": {
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
    const vc = BVAULTS_CONFIG.find(vc => `${vc.chain}` == chain && isAddressEqual(vault, vc.vault))
    if (!vc) return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
    const fet = sp.fet as keyof typeof fetMap
    const fetFn = fetMap[fet]
    if (fet || !fetFn) NextResponse.json({ message: 'Invalid request' }, { status: 400 })
    const data = await fetData(fet, vc, sp)
    return toJsonRES(data)
}