import { fetBalance, fetErc721Balance, fetTotalSupply } from "@/hooks/fetsToken";
import { fromJson, toJsonRES } from "@/lib/bnjson";
import { cacheGet } from "@/lib/cache";
import { toNumber } from "es-toolkit/compat";
import { NextRequest } from "next/server";

const fetMap = {
    fetBalance,
    fetTotalSupply,
    fetErc721Balance,
}


async function fetData(fet: keyof typeof fetMap, sp: Record<string, string>) {
    switch (fet) {
        case "fetBalance": {
            const args = [fromJson(sp.token), sp.byUser] as Parameters<typeof fetBalance>
            return cacheGet(`fetBalance:${args[0].chain}:${args[0].address}:${args[1]}`, () => fetBalance(...args))
        }
        case "fetTotalSupply": {
            const args = [fromJson(sp.token)] as Parameters<typeof fetTotalSupply>
            return cacheGet(`fetTotalSupply:${args[0].chain}:${args[0].address}`, () => fetTotalSupply(...args), 60000 * 60)
        }
        case "fetErc721Balance": {
            const args = [toNumber(sp.chainId), sp.token, sp.by, sp.byUser] as Parameters<typeof fetErc721Balance>
            return cacheGet(`fetErc721Balance:${args.join(',')}`, () => fetErc721Balance(...args))
        }
    }
}

export async function GET(req: NextRequest) {
    const sp = Object.fromEntries(req.nextUrl.searchParams)
    const fet = sp.fet as keyof typeof fetMap
    const data = await fetData(fet, sp)
    return toJsonRES(data)
}