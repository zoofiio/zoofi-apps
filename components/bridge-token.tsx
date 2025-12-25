import { abiLayerzeroOFT } from "@/config/abi/abiLayerzero";
import { waitLayerZeroSend } from "@/config/layerzero";
import { arbitrum, arbitrumSepolia, bsc, bscTestnet, SUPPORT_CHAINS } from "@/config/network";
import { Token } from "@/config/tokens";
import { useCalcKey } from "@/hooks/useCalcKey";
import { useBalance } from "@/hooks/useToken";
import { parseEthers } from "@/lib/utils";
import { getPC } from "@/providers/publicClient";
import { displayBalance } from "@/utils/display";
import { Options } from '@layerzerolabs/lz-v2-utilities';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Address, Chain, Hex, isAddress, padHex } from "viem";
import { useAccount } from "wagmi";
import { Txs, withTokenApprove } from "./approve-and-tx";
import { AddressInput } from "./input-address";
import { ConfigChainsProvider } from "./support-chains";
import { TokenInput } from "./token-input";
import { Swap } from "./ui/bbtn";
const eidMaps: { [k: number]: number } = {
    [arbitrum.id]: 30110,
    [arbitrumSepolia.id]: 40231,
    [bsc.id]: 30102,
    [bscTestnet.id]: 40102,
}

const defAdapters: {
    [k: `${number}:${Address}`]: Address
} = {
    [`${arbitrumSepolia.id}:0xad763df2355142dc944f24aeffdb7b1a6bf917f7`]: '0xB13038Dafc796A703A8204dD8559da1a0c27ae17',
    [`${arbitrum.id}:0x5e95358b73bafe88c8dc1350697c4cb2354c63cd`]: '0x33C42E171cFD7Ec85D3dB34D7f6d3D8121f64E63'
} as const
export function BridgeToken({ config, adapters }: {
    config: [Token, Token], adapters?: typeof defAdapters
}) {
    const { address: user } = useAccount()
    const [t0, t1] = config
    const [[from, to], setFromTo] = useState<[Token, Token]>([t0, t1])
    const fromChain = SUPPORT_CHAINS.find(c => c.id === from.chain)!
    const toChain = SUPPORT_CHAINS.find(c => c.id === to.chain)!
    const toggleFromTo = () => setFromTo([to, from])
    const [input, setInput] = useState<string>("")
    const [toAddress, setToAddress] = useState<string>("")
    const toUser = toAddress || user
    const inputBn = parseEthers(input, from.decimals)
    const balance = useBalance(from)
    const renderChain = (chain: Chain, label: string) => {
        return <div className="flex gap-3 relative px-4 pt-8 py-6 items-center rounded-lg bg-main border border-board text-sm">
            <img src={(chain as any).iconUrl} className="w-5 h-5 rounded-full" />
            <div className="font-medium whitespace-nowrap">{chain.name}</div>
            <div className="absolute left-2 top-2 px-2 text-xs">{label}</div>
        </div>
    }
    const mAdapters = adapters ?? defAdapters
    const address = mAdapters[`${from.chain}:${from.address.toLowerCase() as Address}`] ?? from.address
    const getFee = async () => {
        if (!user) return undefined
        const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString() as Hex
        return getPC(from.chain).readContract({
            abi: abiLayerzeroOFT, address, functionName: 'quoteSend', args: [
                {
                    dstEid: eidMaps[to.chain],
                    to: padHex(user, { size: 32 }),
                    amountLD: inputBn,
                    minAmountLD: inputBn,
                    extraOptions: options,
                    composeMsg: '0x',
                    oftCmd: '0x'
                }, false
            ]
        })
    }
    const { data } = useQuery({
        ...useCalcKey(['fetbrigeTokenFee', from, to, inputBn]),
        queryFn: getFee
    })
    const getTxs: Parameters<typeof Txs>['0']['txs'] = async ({ pc, wc }) => {
        const fee = await getFee()
        if (!fee) return []
        const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString() as Hex
        return withTokenApprove({
            pc, user: wc.account.address,
            approves: [
                { spender: address, token: from.address, amount: inputBn }
            ],
            tx: {
                abi: abiLayerzeroOFT,
                address,
                functionName: 'send',
                args: [{
                    dstEid: eidMaps[to.chain],
                    to: padHex(toUser as Address, { size: 32 }),
                    amountLD: inputBn,
                    minAmountLD: inputBn,
                    extraOptions: options,
                    composeMsg: '0x',
                    oftCmd: '0x'
                }, fee, wc.account.address],
                value: fee.nativeFee
            }
        })
    }
    return <ConfigChainsProvider chains={from.chain}>
        <div className="flex flex-col gap-4 text-sm w-full font-sec">
            <div className="animitem grid items-center gap-x-2 gap-y-4 relative">
                {renderChain(fromChain, 'From')}
                {renderChain(toChain, 'To')}
                <Swap
                    onClick={toggleFromTo}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="animitem">Token</div>
            <TokenInput className="animitem" tokens={[from]} amount={input} setAmount={setInput} />
            <div className="animitem">To</div>
            <AddressInput className="animitem" value={toUser} setValue={setToAddress} />
            <div className="animitem text-fg/60">Fee: {displayBalance(data?.nativeFee, undefined, fromChain.nativeCurrency.decimals)} {fromChain.nativeCurrency.symbol}</div>
            <div className="animitem w-full">
                <Txs tx="Bridge"
                    beforeTxSuccess={(hashs) => waitLayerZeroSend(from.chain, hashs[hashs.length - 1])}
                    onTxSuccess={() => setInput('')}
                    disabled={!toUser || !isAddress(toUser)}
                    className="w-full"
                    txs={getTxs}
                />
            </div>
        </div>
    </ConfigChainsProvider>
}