import { abiLntVault, abiLvtVerio } from "@/config/abi/abiLNTVault"
import { LntVaultConfig } from "@/config/lntvaults"
import { getTokenBy } from "@/config/tokens"
import { useLntVault } from "@/hooks/useFetLntVault"
import { useBalance } from "@/hooks/useToken"
import { fmtBn, parseEthers } from "@/lib/utils"
import { displayBalance } from "@/utils/display"
import { useRef, useState } from "react"
import { Txs, TXSType, withTokenApprove } from "./approve-and-tx"
import { SimpleDialog } from "./simple-dialog"
import { TokenInput } from "./token-input"
import { BBtn } from "./ui/bbtn"
import { DECIMAL } from "@/constants"
import { TokenIcon } from "./icons/tokenicon"
import { useQuery } from "@tanstack/react-query"
import { getPC } from "@/providers/publicClient"
import { useCalcKey } from "@/hooks/useCalcKey"

function LntVaultDeposit({ vc, onSuccess }: { vc: LntVaultConfig, onSuccess: () => void }) {
    const vd = useLntVault(vc)
    const chainId = vc.chain
    const mVault = vc.vault
    const vt = getTokenBy(vd.result!.VT ?? vd.result!.VT, chainId, { symbol: 'VT' })!
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
    const outAmountVT = inputBn * vd.result!.aVT / DECIMAL
    return <div className='flex flex-col gap-5 items-center p-5'>
        <div>Deposit</div>
        <TokenInput tokens={[asset]} amount={input} setAmount={setInput} />
        <div className='flex flex-col gap-1 w-full'>
            <div className='w-full'>Receive</div>
            <TokenInput tokens={[vt]} loading={false} disable amount={fmtBn(outAmountVT, vt.decimals)} />
        </div>
        <div className='text-sm opacity-60 text-center flex justify-between gap-5 w-full'>
            <div className='text-left'>
                {`1 vIP(Verio IP) = ${displayBalance(vd.result?.aVT ?? 0n, undefined, vt.decimals)} ${vt.symbol}`}
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
function LntVaultWithdraw({ vc, onSuccess }: { vc: LntVaultConfig, onSuccess: () => void }) {
    const vd = useLntVault(vc)
    const chainId = vc.deposit?.chain ?? vc.chain
    const mVault = vc.deposit?.vault ?? vc.vault
    const asset = getTokenBy(vc.asset, chainId, { symbol: 'vIP' })!
    const vt = getTokenBy(vd.result!.VT, chainId, { symbol: 'vIP' })!
    const [input, setInput] = useState('')
    const inputBn = parseEthers(input, vt.decimals)
    const vtBalance = useBalance(vt)
    const { data: outAmountVT, isFetching: loadingOutAmountVT } = useQuery({
        ...useCalcKey(['verioRedeemOut', inputBn, vc.vault]),
        queryFn: async () => {
            return getPC(vc.chain).readContract({ abi: abiLvtVerio, address: vc.vault, functionName: 'calculateVerioIPMint', args: [inputBn] })
        }
    })
    return <div className='flex flex-col gap-5 items-center p-5'>
        <div>Withdraw</div>
        <div className='flex flex-col gap-1 w-full'>
            <div className='w-full'>Input:</div>
            <TokenInput tokens={[vt]} amount={input} setAmount={setInput} />
            <div className='w-full'>Receive:</div>
            <TokenInput tokens={[asset]} disable balance={false} loading={loadingOutAmountVT} amount={fmtBn(outAmountVT ?? 0n, asset.decimals)} />
        </div>
        <Txs
            tx='Withdraw'
            className='mt-6'
            onTxSuccess={() => {
                onSuccess()
            }}
            disabled={inputBn <= 0n || inputBn > vtBalance.result}
            txs={[{
                abi: abiLntVault,
                address: mVault,
                functionName: 'redeem',
                args: [inputBn]
            }]} />

    </div>
}


export function LVTDepositWithdrawVerio({ vc }: { vc: LntVaultConfig }) {
    const depositRef = useRef<HTMLButtonElement>(null)
    // const withdrawRef = useRef<HTMLButtonElement>(null)
    const vd = useLntVault(vc)
    const asset = getTokenBy(vc.asset, vc.chain, { symbol: 'vIP' })!
    return <div className=' flex flex-col items-center h-full justify-between shrink-0 gap-5 w-full md:w-fit min-w-75'>
        <span className=''>Total Locked</span>
        <div className='font-bold'> {displayBalance(vd.result?.activeDepositCount, undefined, asset.decimals)}</div>
        <div className='flex items-center gap-2.5'>
            <TokenIcon token={asset} size={20} />
            {asset.symbol}
        </div>
        <div className='flex flex-col gap-5 justify-between lg:px-8 my-auto w-full'>
            <SimpleDialog
                triggerRef={depositRef}
                trigger={
                    <BBtn className='shrink-0'>Deposit</BBtn>
                }
            >
                <LntVaultDeposit vc={vc} onSuccess={() => depositRef.current?.click()} />
            </SimpleDialog>
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