import { LntVaultConfig } from "@/config/lntvaults";
import { getTokenBy } from "@/config/tokens";
import { useLntVault } from "@/hooks/useFetLntVault";
import { parseEthers } from "@/lib/utils";
import { displayBalance } from "@/utils/display";
import Link from "next/link";
import { useState } from "react";
import { AssetInput } from "./asset-input";
import { CoinIcon } from "./icons/coinicon";
import { formatUnits } from "viem";
import { Txs } from "./approve-and-tx";

export function LntVaultBuyback({ vc }: { vc: LntVaultConfig }) {
    const vd = useLntVault(vc)
    const vt = getTokenBy(vd.result!.VT, vc.chain, { symbol: 'VT' })!
    const [input, setAmount] = useState<string>()
    const inputBn = parseEthers(input || '0', vt.decimals)
    return <div className="flex flex-col gap-4 w-full text-sm">
        <div className="animitem text-sm font-semibold">Tokens obtained by the vault will buyback VT here. <Link href={''} className="underline underline-offset-2">Read more</Link></div>
        <div className="animitem flex flex-wrap justify-between items-center gap-x-5">
            <div className="flex gap-4 items-center">
                <div>Next Buyback</div>
                <CoinIcon size={14} symbol={vt.symbol} />
                <div className="font-medium">123,132.32</div>
            </div>
            <div className="flex gap-4 items-center">
                <div>Total Pending Sale</div>
                <div className="font-medium">123,132.32</div>
            </div>
        </div>
        <AssetInput
            className="animitem"
            asset={vt.symbol}
            decimals={vt.decimals}
            amount={input}
            setAmount={setAmount}
            balance={0n}
            otherInfo={<div className="flex items-center gap-2">
                <span>
                    Pending : {displayBalance(0n, undefined, vt.decimals)}
                </span>
                <button
                    className='text-primary ml-2'
                    onClick={() => setAmount(formatUnits(0n, vt.decimals))}
                >
                    Max
                </button>
            </div>}
        />
        <div className="animitem text-center">Price : 1 0G = 1.25v0G</div>
        <div className="animitem gap-4 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
            <Txs tx="Join pending sale" txs={[]} />
            <Txs tx="Withdraw" txs={[]} />
            <div className="flex justify-center items-center">Settled: 1,232.323</div>
            <Txs tx="Claim" txs={[]} />
        </div>
    </div>
}