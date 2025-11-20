import { abiLntVault, abiZeroGLntBuyback } from "@/config/abi/abiLNTVault";
import { LntVaultConfig } from "@/config/lntvaults";
import { getTokenBy } from "@/config/tokens";
import { useLntVault } from "@/hooks/useFetLntVault";
import { useBalance } from "@/hooks/useToken";
import { useFet } from "@/lib/useFet";
import { aarToNumber, parseEthers, promiseAll } from "@/lib/utils";
import { getPC } from "@/providers/publicClient";
import { displayBalance } from "@/utils/display";
import { range, round } from "es-toolkit";
import { parseInt } from "es-toolkit/compat";
import Link from "next/link";
import { useState } from "react";
import { formatUnits, toHex } from "viem";
import { useAccount } from "wagmi";
import { Txs, TXSType, withTokenApprove } from "./approve-and-tx";
import { AssetInput } from "./input-asset";
import { CoinIcon } from "./icons/coinicon";
import { Tip } from "./ui/tip";

export function LntVaultBuyback({ vc }: { vc: LntVaultConfig }) {
    const buybackPool = vc.buybackPool ?? vc.vault;
    const { address: user } = useAccount()
    const vd = useLntVault(vc)
    const t = getTokenBy(vd.result!.T, vc.chain, { symbol: 'T' })!
    const vt = getTokenBy(vd.result!.VT, vc.chain, { symbol: 'VT' })!
    const vtBalance = useBalance(vt)
    const [input, setAmount] = useState<string>()
    const inputBn = parseEthers(input || '0', vt.decimals)
    const buybackDatas = useFet({
        key: `BuybackDatas:${vc.vault}`,
        fetfn: async () => {
            const pc = getPC(vc.chain)
            const potCount = await pc.readContract({ abi: abiZeroGLntBuyback, address: buybackPool, functionName: 'stakingTokenPotCount' })
            const chunks = range(parseInt(potCount.toString())).map(item => BigInt(item))
            return promiseAll({
                pots: Promise.all(chunks.map(index => pc.readContract({ abi: abiZeroGLntBuyback, address: buybackPool, functionName: 'stakingTokenPots', args: [index] }))),
                buybackDustAmountVT: pc.readContract({ abi: abiZeroGLntBuyback, address: buybackPool, functionName: 'buybackDustAmountVT' }),
                minStakeAmountVT: pc.readContract({ abi: abiZeroGLntBuyback, address: buybackPool, functionName: 'minStakeAmountVT' }),
                VestingRate: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'paramValue', args: [toHex('VestingRate', { size: 32 })] })
            })
        }
    })
    const pots = buybackDatas.result?.pots ?? []
    const vestingRate = aarToNumber(buybackDatas.result?.VestingRate ?? 0n, 18)
    const price = `Conversion ratio : 1 ${vt.symbol} = ${round((1 - vestingRate), 2)} ${vt.symbol}`

    // nextBuyback
    const nextBuyback = buybackDatas.result?.buybackDustAmountVT ?? 0n
    const minStakeAmountVT = buybackDatas.result?.minStakeAmountVT ?? 0n

    // pendingSale
    const pendinSale = useFet({
        key: pots.length ? `pendingSale:${vc.vault}` : '',
        initResult: 0n,
        fetfn: async () => {
            const pc = getPC(vc.chain)
            return pc.readContract({ abi: abiZeroGLntBuyback, address: buybackPool, functionName: 'totalStakingAmountVT', args: [pots[pots.length - 1]] })
        }
    })
    const userPendingSale = useFet({
        key: pots.length && user ? `BuybackUserPending:${vc.vault}:${user}` : '',
        initResult: 0n,
        fetfn: async () => {
            const pc = getPC(vc.chain)
            return pc.readContract({ abi: abiZeroGLntBuyback, address: buybackPool, functionName: 'userStakingAmountVT', args: [pots[pots.length - 1], user!] })
        }
    })
    const userSeltted = useFet({
        key: pots.length && user ? `BuybackUserSetteld:${vc.vault}:${user}` : '',
        initResult: 0n,
        fetfn: async () => {
            const pc = getPC(vc.chain)
            const boughts = await Promise.all(pots.map(pot => pc.readContract({ abi: abiZeroGLntBuyback, address: buybackPool, functionName: 'boughtAmountT', args: [pot, user!] })))
            return boughts.reduce((sum, item) => sum + item, 0n)
        }
    })
    const getJoinTxs: TXSType = async ({ pc, wc }) => {
        if (inputBn < minStakeAmountVT) throw new Error("Stake amount too small")
        if (inputBn > vtBalance.result) throw new Error("Balance too low")
        return withTokenApprove({
            pc, user: wc.account.address,
            approves: [{ spender: buybackPool, token: vt.address, amount: inputBn }],
            tx: {
                abi: abiZeroGLntBuyback,
                address: buybackPool,
                functionName: 'stake',
                args: [inputBn]
            }
        })
    }
    const getWithdrawTxs: TXSType = async ({ pc, wc }) => {
        if (inputBn > userPendingSale.result) throw new Error("Input amount too large")
        return [{
            abi: abiZeroGLntBuyback,
            address: buybackPool,
            functionName: 'withdraw',
            args: [pots[pots.length - 1], inputBn]
        }]
    }
    const getCalimTxs: TXSType = async ({ pc, wc }) => {
        const boughts = await Promise.all(pots.map(pot => pc.readContract({ abi: abiZeroGLntBuyback, address: buybackPool, functionName: 'boughtAmountT', args: [pot, user!] })))
        return boughts.map((bought, i) => ({ bought, pot: pots[i] })).filter(item => item.bought > 100n).map(item => ({
            abi: abiZeroGLntBuyback,
            address: buybackPool,
            functionName: 'claimBoughtT',
            args: [item.pot]
        }))
    }
    return <div className="flex flex-col gap-4 w-full text-sm">
        <div className="animitem text-sm font-semibold">You can gradually convert VT to T here. <Link href={'https://docs.zoofi.io/lnt-vault/product-design/how-does-lnt-work/vt-value-anchoring'} target="_blank" className="underline underline-offset-2">Read more</Link></div>
        <div className="animitem flex flex-wrap justify-between items-center gap-x-5">
            <div className="flex gap-4 items-center">
                <div>Next batch</div>
                <CoinIcon size={14} symbol={vt.symbol} />
                <div className="font-medium">{displayBalance(nextBuyback, undefined, vt.decimals)}</div>
            </div>
            <div className="flex gap-4 items-center">
                <div>Total Pending</div>
                <div className="font-medium">{displayBalance(pendinSale.result, undefined, vt.decimals)}</div>
                <Tip>If the amount of VT in the pool exceeds the rewards for the current batch, participating users will receive settlement on a pro-rata basis. The remaining VT will continue to wait for the next batch of redemption until fully converted.</Tip>
            </div>
        </div>
        <AssetInput
            className="animitem"
            asset={vt.symbol}
            decimals={vt.decimals}
            amount={input}
            setAmount={setAmount}
            balance={vtBalance.result}
            checkBalance={false}
            otherInfo={<div className="flex items-center gap-2">
                <span>
                    Pending : {displayBalance(userPendingSale.result, undefined, vt.decimals)}
                </span>
                <button
                    className='text-primary ml-2'
                    onClick={() => setAmount(formatUnits(userPendingSale.result, vt.decimals))}
                >
                    Max
                </button>
            </div>}
        />
        <div className="animitem text-center">{price} <Tip>The conversion ratio here is not 1:1 (including protocol service fee). Users can choose to accept it or wait until maturity for a 1:1 redemption(no service fee)</Tip></div>
        <div className="animitem gap-4 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
            <Txs tx="Join pending" disabled={inputBn <= 0n} txs={getJoinTxs} />
            <Txs tx="Withdraw" disabled={inputBn <= 0n} txs={getWithdrawTxs} />
            <div className="flex justify-center items-center">Settled: {displayBalance(userSeltted.result, undefined, t.decimals)}</div>
            <Txs tx="Claim" disabled={userSeltted.result == 0n} txs={getCalimTxs} />
        </div>
    </div>
}