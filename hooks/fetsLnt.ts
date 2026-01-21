import { abiLntBuyback, abiLntVault, abiLntVTSwapHook, abiLvtVerio, abiQueryLNT, abiRedeemStrategy } from '@/config/abi/abiLNTVault'
import { codeQueryLNT } from '@/config/codes'
import { LntVaultConfig } from '@/config/lntvaults'
import { DECIMAL } from '@/constants'
import { cacheGet } from '@/lib/cache'
import { nowUnix, promiseAll } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { last } from 'es-toolkit'
import { Address, erc721Abi, toHex } from 'viem'

export async function fetLntVault(vc: LntVaultConfig) {
    const pc = getPC(vc.chain)
    const reppoOverwrite: { [k: string]: Promise<any> } = vc.reppo
        ? {
            activeDepositCount: Promise.all(
                [vc.reppo.standard, vc.reppo.preminum].map((nft) => pc.readContract({ abi: erc721Abi, address: nft, functionName: 'balanceOf', args: [vc.vault] })),
            ).then<bigint>((counts) => counts.reduce((t, c) => t + c, 0n)),
        }
        : {}

    const verioOverwrite: { [k: string]: Promise<any> } = vc.isVerio
        ? {
            aVT: Promise.all([
                pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'paramValue', args: [toHex('VerioIPInflationRate', { size: 32 })] }),
                pc.readContract({ abi: abiLvtVerio, address: vc.vault, functionName: 'calculateIPWithdrawal', args: [DECIMAL] }),
            ]).then(([vipInRate, vipRate]) => (vipInRate * DECIMAL * vipRate) / DECIMAL / DECIMAL),
            // activeDepositCount: pc.readContract({ abi: erc20Abi, address: vc.asset, functionName: 'balanceOf', })
        }
        : {}

    const { lntdata, ...other } = await promiseAll({
        lntdata: pc.readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'queryLntVault', args: [vc.vault] }),
        expiryTime: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' }),
        startTime: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }),
        ...reppoOverwrite,
        ...verioOverwrite,
    })
    return { ...lntdata, ...other }
}

export async function fetLntHookPoolkey(vc: LntVaultConfig) {
    return getPC(vc.chain).readContract({ abi: abiLntVTSwapHook, address: vc.vtSwapHook, functionName: 'poolKey' })
}

export async function fetLntVaultLogs(vc: LntVaultConfig) {
    return getPC(vc.chain).readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'getLog', args: [vc.vault, vc.vtSwapHook] })
}

export async function fetLntWithdrawWindows(vc: LntVaultConfig) {
    const pc = getPC(vc.chain)
    const redeemStrategy = await pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'redeemStrategy' })
    const canRedeem = await pc.readContract({ abi: abiRedeemStrategy, address: redeemStrategy, functionName: 'canRedeem' })
    if (canRedeem) return [{ startTime: nowUnix(), duration: 10000000000n }]
    const windowCount = await pc.readContract({ abi: abiRedeemStrategy, address: redeemStrategy, functionName: 'redeemTimeWindowsCount' })
    const [sTimes, durations] = await pc.readContract({ abi: abiRedeemStrategy, address: redeemStrategy, functionName: 'redeemTimeWindows', args: [0n, windowCount] })
    return sTimes.map((st, i) => ({ startTime: st, duration: durations[i] })).sort((a, b) => (a.startTime > b.startTime ? 1 : a.startTime < b.startTime ? -1 : 0))
}


export async function fetLntBuyback(vc: LntVaultConfig) {
    const buybackPool = vc.buybackPool!
    const pc = getPC(vc.chain)
    const potCount = await pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'stakingTokenPotCount' })
    // const chunks = range(parseInt(potCount.toString())).map(item => BigInt(item))
    const data = await promiseAll({
        pots: pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'stakingTokenPotsRange', args: [0n, potCount] }),
        buybackDustAmountVT: pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'buybackDustAmountVT' }),
        minStakeAmountVT: pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'minStakeAmountVT' }),
        VestingRate: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'paramValue', args: [toHex('VestingRate', { size: 32 })] }),
        pendingSale: Promise.resolve(0n)
    })
    if (data.pots.length) {
        const lastPot = last(data.pots)!
        data.pendingSale = await pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'totalStakingAmountVT', args: [lastPot] })
    }
    return data
}

export async function fetLntBuybackUser(vc: LntVaultConfig, byUser: Address) {
    const { pots } = await cacheGet(`fetLntBuyback:${vc.chain}:${vc.vault}`, () => fetLntBuyback(vc))
    const lastPot = last(pots)!
    const pc = getPC(vc.chain)
    const userSeltted = async () => Promise.all(pots.map(pot => pc.readContract({ abi: abiLntBuyback, address: vc.buybackPool!, functionName: 'boughtAmountT', args: [pot, byUser] })))
        .then(boughts => boughts.reduce((sum, item) => sum + item, 0n) as bigint)
    return await promiseAll({
        userPendingSale: pc.readContract({ abi: abiLntBuyback, address: vc.buybackPool!, functionName: 'userStakingAmountVT', args: [lastPot, byUser] }),
        userSeltted: userSeltted()
    })
}