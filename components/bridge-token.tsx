import { SUPPORT_CHAINS } from "@/config/network";
import { Token } from "@/config/tokens";
import { useBalance } from "@/hooks/useToken";
import { parseEthers } from "@/lib/utils";
import { useState } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";
import { Chain } from "viem";
import { Txs } from "./approve-and-tx";
import { AssetInput } from "./asset-input";


export function BridgeToken({ config }: { config: [Token, Token] }) {
    const [t0, t1] = config
    const [[from, to], setFromTo] = useState<[Token, Token]>([t0, t1])
    const fromChain = SUPPORT_CHAINS.find(c => c.id === from.chain)!
    const toChain = SUPPORT_CHAINS.find(c => c.id === to.chain)!
    const toggleFromTo = () => setFromTo([to, from])
    const [input, setInput] = useState<string>("")
    const inputBn = parseEthers(input, from.decimals)
    const balance = useBalance(from)
    const renderChain = (chain: Chain, label: string) => {
        return <div className="flex gap-3 relative px-4 py-3 items-center rounded-lg border border-slate-200 dark:border-slate-600 text-sm">
            <img src={(chain as any).iconUrl} className="w-5 h-5 rounded-full" />
            <div className="font-medium whitespace-nowrap">{chain.name}</div>
            <div className="absolute left-3 -top-2 bg-slate-200 dark:bg-slate-600 px-2 rounded-lg text-xs">{label}</div>
        </div>
    }
    return <div className="flex flex-col gap-4 text-sm w-full">
        <div className="animitem grid items-center gap-x-2 gap-y-4 relative">
            {renderChain(fromChain, 'From')}
            {renderChain(toChain, 'To')}
            <div className="cursor-pointer bg-slate-200 dark:bg-slate-600 absolute left-1/2 top-1/2 hover:scale-110 transition p-2 -translate-x-1/2 -translate-y-1/2 rounded-xl" onClick={toggleFromTo}>
                <FaArrowDown className="text-lg" />
            </div>
        </div>
        <div className="animitem">Token</div>
        <AssetInput className="animitem" asset={from.symbol} amount={input} setAmount={setInput} balance={balance.result} />
        <div className="animitem">Fee: $5</div>
        <Txs className="animitem" tx="Bridge" txs={[]} />
    </div>
}