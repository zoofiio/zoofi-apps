import { abiBeraLP, abiBeraVault, abiBQuery } from "@/config/abi";
import { abiBQuery2, codeBQuery2 } from "@/config/abi/BQuery2";
import { BVaultConfig } from "@/config/bvaults";
import { LP_TOKENS } from "@/config/lpTokens";
import { DECIMAL } from "@/constants";
import { cacheGet } from "@/lib/cache";
import { promiseAll, toDecimal18 } from "@/lib/utils";
import { getPC } from "@/providers/publicClient";
import { range } from "es-toolkit";
import { toNumber } from "es-toolkit/compat";
import { Address, erc20Abi, parseAbi, parseAbiItem, PublicClient } from "viem";

export async function fetBVault(vc: BVaultConfig) {
    const pc = getPC(vc.chain)
    const getLpData = async () => {
        if (LP_TOKENS[vc.asset]?.poolId) {
            const lp = vc.asset
            const [[tokens, balances], totalSupply] = await Promise.all([
                pc.readContract({
                    abi: abiBeraVault,
                    address: '0x4Be03f781C497A489E3cB0287833452cA9B9E80B',
                    functionName: 'getPoolTokens',
                    args: [LP_TOKENS[lp]!.poolId!],
                }),
                pc.readContract({
                    abi: abiBeraLP,
                    address: lp,
                    functionName: LP_TOKENS[lp].isStable ? 'getActualSupply' : 'totalSupply',
                }),
            ])
            const baseIndex = tokens.findIndex((item) => item == LP_TOKENS[lp]!.base)
            const quoteIndex = tokens.findIndex((item) => item == LP_TOKENS[lp]!.quote)
            return {
                lp,
                vault: vc.vault,
                baseBalance: balances[baseIndex],
                quoteBalance: balances[quoteIndex],
                totalSupply,
            }
        }
    }
    const getKodiakLpData = async (pc: PublicClient, vc: BVaultConfig) => {
        const lp = vc.asset
        const abi = parseAbi(['function getUnderlyingBalances() external view returns(uint256,uint256)'])
        const [[baseBalance, quoteBalance], totalSupply] = await Promise.all([
            pc.readContract({
                abi: abi,
                address: lp,
                functionName: 'getUnderlyingBalances',
            }),
            pc.readContract({
                abi: erc20Abi,
                address: lp,
                functionName: 'totalSupply',
            }),
        ])
        return {
            lp,
            vault: vc.vault,
            baseBalance,
            quoteBalance,
            totalSupply,
        }
    }

    const { vd, lpdata, ptRebaseRate } = await promiseAll({
        vd: pc.readContract({ abi: abiBQuery2, code: codeBQuery2, functionName: 'queryBVault', args: [vc.vault] }),
        lpdata: LP_TOKENS[vc.asset]?.isKodiak ? getKodiakLpData(pc, vc) : getLpData(),
        ptRebaseRate: vc.pTokenV2
            ? pc.readContract({ abi: [parseAbiItem('function rebaseRate() view returns (uint256)')], address: vc.pToken, functionName: 'rebaseRate' })
            : Promise.resolve(0n),
    })

    if (lpdata) {
        vd.lpLiq = vd.lockedAssetTotal
        const shareLp = (vd.lpLiq * DECIMAL) / lpdata.totalSupply
        vd.lpBase = toDecimal18((lpdata.baseBalance * shareLp) / DECIMAL, LP_TOKENS[lpdata.lp]!.baseDecimal)
        vd.lpQuote = toDecimal18((lpdata.quoteBalance * shareLp) / DECIMAL, LP_TOKENS[lpdata.lp]!.quoteDecimal)
    }
    return { ...vd, ptRebaseRate }
}

export async function fetBVaultEpoches(vc: BVaultConfig) {
    const vd = await cacheGet(`fetBVault:${vc.chain}:${vc.vault}`, () => fetBVault(vc), 60000 * 60)
    if (vd.epochCount == 0n) return []
    const ids = range(toNumber(vd.epochCount.toString()) + 1).map((n) => BigInt(n))
    const pc = getPC(vc.chain)
    return Promise.all(ids.map((epochId) => pc.readContract({ abi: abiBQuery, address: vc.bQueryAddres, functionName: 'queryBVaultEpoch', args: [vc.vault, epochId] })))
}

export async function fetUserBVault(vc: BVaultConfig, byUser: Address) {
    const epoches = await cacheGet(`fetBVaultEpoches:${vc.chain}:${vc.vault}`, () => fetBVaultEpoches(vc), 60000 * 60)
    if (epoches.length == 0) return []
    const pc = getPC(vc.chain)
    return await Promise.all(
        epoches.map((e) => pc.readContract({ abi: abiBQuery, address: vc.bQueryAddres, functionName: 'queryBVaultEpochUser', args: [vc.vault, e.epochId, byUser] })),
    )
}