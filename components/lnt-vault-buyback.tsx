import { abiLntBuyback, abiLntVault } from "@/config/abi/abiLNTVault";
import { LntVaultConfig } from "@/config/lntvaults";
import { getTokenBy } from "@/config/tokens";
import { useLntVault } from "@/hooks/useFetLntVault";
import { useBalance } from "@/hooks/useToken";
import { useFet } from "@/lib/useFet";
import { aarToNumber, fmtDuration, parseEthers, promiseAll } from "@/lib/utils";
import { getPC } from "@/providers/publicClient";
import { displayBalance } from "@/utils/display";
import { round } from "es-toolkit";
import { now } from "es-toolkit/compat";
import Link from "next/link";
import { useState } from "react";
import { formatUnits, toHex } from "viem";
import { useAccount } from "wagmi";
import { Txs, TXSType, withTokenApprove } from "./approve-and-tx";
import { TokenIcon } from "./icons/tokenicon";
import { TokenInput } from "./token-input";
import { Tip } from "./ui/tip";
function getNextBatch(vc: LntVaultConfig) {
    if (vc.reppo) {
        const nowTime = now()
        const nextDate = new Date(nowTime + 24 * 3600 * 1000)
        nextDate.setHours(8, 0, 0, 0)
        // end time 11/30/2026 08:00:00
        if (nextDate.getTime() > 1795996800000) return undefined;
        return { value: '4,135', time: nextDate.getTime() }
    }
    return undefined
}
export function LntVaultBuyback({ vc }: { vc: LntVaultConfig }) {
    const buybackPool = vc.buybackPool ?? vc.vault;
    const { address: user } = useAccount()
    const vd = useLntVault(vc)
    const t = getTokenBy(vd.data!.T, vc.chain, { symbol: 'T' })!
    const vt = getTokenBy(vd.data!.VT, vc.chain, { symbol: 'VT' })!
    const vtBalance = useBalance(vt)
    const [input, setAmount] = useState<string>()
    const inputBn = parseEthers(input || '0', vt.decimals)
    const buybackDatas = useFet({
        key: `BuybackDatas:${vc.vault}`,
        fetfn: async () => {
            const pc = getPC(vc.chain)
            const potCount = await pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'stakingTokenPotCount' })
            // const chunks = range(parseInt(potCount.toString())).map(item => BigInt(item))
            return promiseAll({
                pots: pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'stakingTokenPotsRange', args: [0n, potCount] }),
                buybackDustAmountVT: pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'buybackDustAmountVT' }),
                minStakeAmountVT: pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'minStakeAmountVT' }),
                VestingRate: pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'paramValue', args: [toHex('VestingRate', { size: 32 })] })
            })
        }
    })
    const pots = buybackDatas.data?.pots ?? []
    const vestingRate = aarToNumber(buybackDatas.data?.VestingRate ?? 0n, 18)
    const price = `Conversion ratio : 1 ${vt.symbol} = ${round((1 - vestingRate), 2)} ${t.symbol}`

    // nextBuyback
    const nextBuyback = getNextBatch(vc)
    const minStakeAmountVT = buybackDatas.data?.minStakeAmountVT ?? 0n

    // pendingSale
    const pendinSale = useFet({
        key: pots.length ? `pendingSale:${vc.vault}` : '',
        initResult: 0n,
        fetfn: async () => {
            const pc = getPC(vc.chain)
            return pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'totalStakingAmountVT', args: [pots[pots.length - 1]] })
        }
    })
    const userPendingSale = useFet({
        key: pots.length && user ? `BuybackUserPending:${vc.vault}:${user}` : '',
        initResult: 0n,
        fetfn: async () => {
            const pc = getPC(vc.chain)
            return pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'userStakingAmountVT', args: [pots[pots.length - 1], user!] })
        }
    })
    const userSeltted = useFet({
        key: pots.length && user ? `BuybackUserSetteld:${vc.vault}:${user}` : '',
        initResult: 0n,
        fetfn: async () => {
            const pc = getPC(vc.chain)
            const boughts = await Promise.all(pots.map(pot => pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'boughtAmountT', args: [pot, user!] })))
            return boughts.reduce((sum, item) => sum + item, 0n)
        }
    })
    const getJoinTxs: TXSType = async ({ pc, wc }) => {
        if (inputBn < minStakeAmountVT) throw new Error("Stake amount too small")
        if (inputBn > vtBalance.data) throw new Error("Balance too low")
        return withTokenApprove({
            pc, user: wc.account.address,
            approves: [{ spender: buybackPool, token: vt.address, amount: inputBn }],
            tx: {
                abi: abiLntBuyback,
                address: buybackPool,
                functionName: 'stake',
                args: [inputBn]
            }
        })
    }
    const getWithdrawTxs: TXSType = async ({ pc, wc }) => {
        if (inputBn > userPendingSale.data) throw new Error("Input amount too large")
        return [{
            abi: abiLntBuyback,
            address: buybackPool,
            functionName: 'withdraw',
            args: [pots[pots.length - 1], inputBn]
        }]
    }
    const getCalimTxs: TXSType = async ({ pc, wc }) => {
        const boughts = await Promise.all(pots.map(pot => pc.readContract({ abi: abiLntBuyback, address: buybackPool, functionName: 'boughtAmountT', args: [pot, user!] })))
        return boughts.map((bought, i) => ({ bought, pot: pots[i] })).filter(item => item.bought > 100n).map(item => ({
            abi: abiLntBuyback,
            address: buybackPool,
            functionName: 'claimBoughtT',
            args: [item.pot]
        }))
    }
    return <div className="flex flex-col gap-4 w-full text-sm font-sec">
        <div className="overflow-hidden animitem text-sm font-semibold flex items-center justify-between gap-4 py-2 px-4 rounded-xl border border-board bg-size-[100%_100%] bg-[url(/bg_buyback.png)] not-dark:bg-[url(/bg_buyback2.png)] bg-no-repeat">
            <span className="max-w-55 text-base">You can gradually convert VT to T here.</span>
            <Link href={'https://docs.zoofi.io/lnt-vault/product-design/how-does-lnt-work/vt-value-anchoring'}
                target="_blank"
                className="hover:text-primary not-dark:opacity-60 font-normal">{`Read more>`}</Link>
        </div>
        <div className="animitem flex flex-wrap justify-between items-center gap-3 whitespace-nowrap">
            <div className="flex gap-2 items-center p-2 border border-board rounded-lg flex-1 basis-0">
                <div className="text-fg/60 mr-auto">Next batch</div>
                <TokenIcon size={14} token={vt} />
                <div className="font-medium">{nextBuyback?.value ?? '-'}
                    {nextBuyback && <span className="opacity-60 text-xs">(~{fmtDuration(nextBuyback.time - now())})</span>}
                </div>
            </div>
            <div className="flex gap-4 items-center p-2 border border-board rounded-lg flex-1 basis-0">
                <div className="text-fg/60">Total Request</div>
                <div className="font-medium ml-auto">{displayBalance(pendinSale.data, undefined, vt.decimals)}</div>
                <Tip>If the amount of VT in the pool exceeds the rewards for the current batch, participating users will receive settlement on a pro-rata basis. The remaining VT will continue to wait for the next batch of redemption until fully converted.</Tip>
            </div>
        </div>
        <TokenInput
            className="animitem"
            tokens={[vt]}
            amount={input}
            setAmount={setAmount}
            checkBalance={false}
            otherInfo={<div className="flex items-center gap-2 ml-auto">
                <span>
                    Pending : {displayBalance(userPendingSale.data, undefined, vt.decimals)}
                </span>
                <button
                    className='text-primary ml-2'
                    onClick={() => setAmount(formatUnits(userPendingSale.data, vt.decimals))}
                >
                    Max
                </button>
            </div>}
        />
        <div className="animitem text-center">{price} <Tip>The conversion ratio here is not 1:1 (including protocol service fee). Users can choose to accept it or wait until maturity for a 1:1 redemption(no service fee)</Tip></div>
        <div className="animitem gap-4 grid grid-cols-2">
            <Txs tx="Request" disabled={inputBn <= 0n} txs={getJoinTxs} />
            <Txs tx="Withdraw" disabled={inputBn <= 0n} txs={getWithdrawTxs} />
        </div>
        <div className="animitem flex items-center gap-5">
            <div className="flex justify-between px-3 py-2 rounded-xl items-center flex-1 border border-board h-12">
                <span className="text-fg/60">Settled</span>
                {displayBalance(userSeltted.data, undefined, t.decimals)}
            </div>
            <Txs tx="Claim" className="w-fit" disabled={userSeltted.data == 0n} txs={getCalimTxs} />
        </div>
    </div>
}