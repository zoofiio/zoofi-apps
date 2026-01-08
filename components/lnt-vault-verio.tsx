import { abiLntVault } from "@/config/abi/abiLNTVault"
import { LntVaultConfig } from "@/config/lntvaults"
import { getTokenBy, Token } from "@/config/tokens"
import { DECIMAL } from "@/constants"
import { useLntVault, useVTTotalSupply } from "@/hooks/useFetLntVault"
import { fmtBn, parseEthers } from "@/lib/utils"
import { displayBalance } from "@/utils/display"
import { useRef, useState } from "react"
import { Txs, TXSType, withTokenApprove } from "./approve-and-tx"
import { TokenIcon } from "./icons/tokenicon"
import { SimpleDialog } from "./simple-dialog"
import { TokenInput } from "./token-input"
import { BBtn } from "./ui/bbtn"

function LntVaultDeposit({ vc, onSuccess }: { vc: LntVaultConfig, onSuccess: () => void }) {
    const vd = useLntVault(vc)
    const chainId = vc.chain
    const mVault = vc.vault
    const vt = getTokenBy(vd.data!.VT ?? vd.data!.VT, chainId, { symbol: 'VT' })!
    const asset = getTokenBy(vc.asset, chainId, { symbol: 'vIP' })!
    const [input, setInput] = useState('')
    const inputBn = parseEthers(input, asset.decimals)
    const getTxs: TXSType = ({ wc, pc }) => {
        return withTokenApprove({
            user: wc.account.address, pc,
            approves: [{ token: vc.asset, spender: mVault, amount: inputBn }],
            tx: {
                name: 'Deposit',
                abi: abiLntVault,
                address: mVault,
                functionName: 'deposit',
                args: [inputBn]
            }
        })
    }
    const outAmountVT = inputBn * vd.data!.aVT / DECIMAL
    return <div className='flex flex-col gap-5 items-center p-5'>
        <div>Deposit</div>
        <TokenInput tokens={[asset]} amount={input} setAmount={setInput} />
        <div className='flex flex-col gap-1 w-full'>
            <div className='w-full'>Receive</div>
            <TokenInput tokens={[vt]} loading={false} disable amount={fmtBn(outAmountVT, vt.decimals)} />
        </div>
        <div className='text-sm opacity-60 text-center flex justify-between gap-5 w-full'>
            <div className='text-left'>
                {`1 vIP(Verio IP) = ${displayBalance(vd.data?.aVT ?? 0n, undefined, vt.decimals)} ${vt.symbol}`}
            </div>
            <div>

            </div>
        </div>
        <Txs
            tx='Deposit'
            onTxSuccess={() => {
                setInput('')
                onSuccess()
            }}
            txs={getTxs} />
    </div>
}


export function LVTDepositWithdrawVerio({ vc }: { vc: LntVaultConfig }) {
    const vtTotal = useVTTotalSupply(vc)
    return <div className='flex flex-col items-center h-full justify-between shrink-0 gap-5 w-full'>
        <span className='font-def text-lg font-medium'>Total Locked</span>
        <div className='font-bold font-def text-xl'> {displayBalance(vtTotal)}</div>
        <div className='flex items-center gap-2.5'>
            <TokenIcon token={{ chain: vc.chain, symbol: 'IP' } as Token} size={20} />
            {'IP'}
        </div>
        <div className='flex flex-col gap-5 justify-between lg:px-8 my-auto w-full'>
            {/* <SimpleDialog
                triggerRef={depositRef}
                trigger={
                    <BBtn className='shrink-0'>Deposit</BBtn>
                }
            >
                <LntVaultDeposit vc={vc} onSuccess={() => depositRef.current?.click()} />
            </SimpleDialog> */}
            {/* <SimpleDialog
                triggerRef={withdrawRef}
                trigger={
                    <BBtn className='shrink-0'>Withdraw</BBtn>
                }
            >
                <LntVaultWithdraw vc={vc} onSuccess={() => withdrawRef.current?.click()} />
            </SimpleDialog> */}
        </div>

    </div>
}