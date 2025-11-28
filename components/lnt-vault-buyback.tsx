import { abiLntBuyback, abiLntVault } from "@/config/abi/abiLNTVault";
import { LntVaultConfig } from "@/config/lntvaults";
import { getTokenBy } from "@/config/tokens";
import { RecordType } from "@/config/type";
import { useLntVault } from "@/hooks/useFetLntVault";
import { useBalance } from "@/hooks/useToken";
import { useFet } from "@/lib/useFet";
import { aarToNumber, fmtDuration, parseEthers, promiseAll } from "@/lib/utils";
import { getPC } from "@/providers/publicClient";
import { displayBalance } from "@/utils/display";
import { round } from "es-toolkit";
import Link from "next/link";
import { useState } from "react";
import { formatUnits, toHex } from "viem";
import { useAccount } from "wagmi";
import { Txs, TXSType, withTokenApprove } from "./approve-and-tx";
import { TokenIcon } from "./icons/tokenicon";
import { TokenInput } from "./token-input";
import { Tip } from "./ui/tip";
import { now } from "es-toolkit/compat";
const nextBatchConfigs: RecordType<string, { time: number, value: number }[]> = {
    // reppo
    ['0x878aac1ca6b36a2841ae0200f2366a4178c2ca22']: [
        { time: new Date('12/01/2025').getTime(), value: 29000 },
        { time: new Date('12/08/2025').getTime(), value: 29000 },
        { time: new Date('12/15/2025').getTime(), value: 29000 },
        { time: new Date('12/22/2025').getTime(), value: 29000 },
        { time: new Date('12/29/2025').getTime(), value: 29000 },
        { time: new Date('01/05/2026').getTime(), value: 29000 },
        { time: new Date('01/12/2026').getTime(), value: 29000 },
        { time: new Date('01/19/2026').getTime(), value: 29000 },
        { time: new Date('01/26/2026').getTime(), value: 29000 },
        { time: new Date('02/02/2026').getTime(), value: 29000 },
        { time: new Date('02/09/2026').getTime(), value: 29000 },
        { time: new Date('02/16/2026').getTime(), value: 29000 },
        { time: new Date('02/23/2026').getTime(), value: 29000 },
        { time: new Date('03/02/2026').getTime(), value: 29000 },
        { time: new Date('03/09/2026').getTime(), value: 29000 },
        { time: new Date('03/16/2026').getTime(), value: 29000 },
        { time: new Date('03/23/2026').getTime(), value: 29000 },
        { time: new Date('03/30/2026').getTime(), value: 29000 },
        { time: new Date('04/06/2026').getTime(), value: 29000 },
        { time: new Date('04/13/2026').getTime(), value: 29000 },
        { time: new Date('04/20/2026').getTime(), value: 29000 },
        { time: new Date('04/27/2026').getTime(), value: 29000 },
        { time: new Date('05/04/2026').getTime(), value: 29000 },
        { time: new Date('05/11/2026').getTime(), value: 29000 },
        { time: new Date('05/18/2026').getTime(), value: 29000 },
        { time: new Date('05/25/2026').getTime(), value: 29000 },
        { time: new Date('06/01/2026').getTime(), value: 29000 },
        { time: new Date('06/08/2026').getTime(), value: 29000 },
        { time: new Date('06/15/2026').getTime(), value: 29000 },
        { time: new Date('06/22/2026').getTime(), value: 29000 },
        { time: new Date('06/29/2026').getTime(), value: 29000 },
        { time: new Date('07/06/2026').getTime(), value: 29000 },
        { time: new Date('07/13/2026').getTime(), value: 29000 },
        { time: new Date('07/20/2026').getTime(), value: 29000 },
        { time: new Date('07/27/2026').getTime(), value: 29000 },
        { time: new Date('08/03/2026').getTime(), value: 29000 },
        { time: new Date('08/10/2026').getTime(), value: 29000 },
        { time: new Date('08/17/2026').getTime(), value: 29000 },
        { time: new Date('08/24/2026').getTime(), value: 29000 },
        { time: new Date('08/31/2026').getTime(), value: 29000 },
        { time: new Date('09/07/2026').getTime(), value: 29000 },
        { time: new Date('09/14/2026').getTime(), value: 29000 },
        { time: new Date('09/21/2026').getTime(), value: 29000 },
        { time: new Date('09/28/2026').getTime(), value: 29000 },
        { time: new Date('10/05/2026').getTime(), value: 29000 },
        { time: new Date('10/12/2026').getTime(), value: 29000 },
        { time: new Date('10/19/2026').getTime(), value: 29000 },
        { time: new Date('10/26/2026').getTime(), value: 29000 },
        { time: new Date('11/02/2026').getTime(), value: 29000 },
        { time: new Date('11/09/2026').getTime(), value: 29000 },
        { time: new Date('11/16/2026').getTime(), value: 29000 },
        { time: new Date('11/23/2026').getTime(), value: 29000 },
        { time: new Date('11/30/2026').getTime(), value: 29000 },
    ]
}

function getNextBatch(vc: LntVaultConfig) {
    if (nextBatchConfigs[vc.vault]) {
        const batchs = nextBatchConfigs[vc.vault]
        const nowTime = now()
        const batch = batchs.find(item => item.time > nowTime)
        return batch
    }
    return undefined
}
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
    const pots = buybackDatas.result?.pots ?? []
    const vestingRate = aarToNumber(buybackDatas.result?.VestingRate ?? 0n, 18)
    const price = `Conversion ratio : 1 ${vt.symbol} = ${round((1 - vestingRate), 2)} ${t.symbol}`

    // nextBuyback
    const nextBuyback = getNextBatch(vc)
    const minStakeAmountVT = buybackDatas.result?.minStakeAmountVT ?? 0n

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
        if (inputBn > vtBalance.result) throw new Error("Balance too low")
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
        if (inputBn > userPendingSale.result) throw new Error("Input amount too large")
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
    return <div className="flex flex-col gap-4 w-full text-sm">
        <div className="animitem text-sm font-semibold">You can gradually convert VT to T here. <Link href={'https://docs.zoofi.io/lnt-vault/product-design/how-does-lnt-work/vt-value-anchoring'} target="_blank" className="underline underline-offset-2">Read more</Link></div>
        <div className="animitem flex flex-wrap justify-between items-center gap-x-5">
            <div className="flex gap-2 items-center">
                <div>Next batch</div>
                <TokenIcon size={14} token={vt} />
                <div className="font-medium">{nextBuyback?.value ?? '-'}
                    {nextBuyback && <span className="opacity-60 text-xs">(~{fmtDuration(nextBuyback.time - now())})</span>}
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <div>Total Request</div>
                <div className="font-medium">{displayBalance(pendinSale.result, undefined, vt.decimals)}</div>
                <Tip>If the amount of VT in the pool exceeds the rewards for the current batch, participating users will receive settlement on a pro-rata basis. The remaining VT will continue to wait for the next batch of redemption until fully converted.</Tip>
            </div>
        </div>
        <TokenInput
            className="animitem"
            tokens={[vt]}
            amount={input}
            setAmount={setAmount}
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
            <Txs tx="Request" disabled={inputBn <= 0n} txs={getJoinTxs} />
            <Txs tx="Withdraw" disabled={inputBn <= 0n} txs={getWithdrawTxs} />
            <div className="flex justify-center items-center">Settled: {displayBalance(userSeltted.result, undefined, t.decimals)}</div>
            <Txs tx="Claim" disabled={userSeltted.result == 0n} txs={getCalimTxs} />
        </div>
    </div>
}