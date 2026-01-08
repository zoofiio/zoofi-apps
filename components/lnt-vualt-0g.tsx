import { abi0GMarginAccount } from "@/config/abi/abiLNTVault";
import { LntVaultConfig } from "@/config/lntvaults";
import { getTokenBy } from "@/config/tokens";
import { useBalance } from "@/hooks/useToken";
import { cn, FMT, fmtDate, nowUnix, parseEthers } from "@/lib/utils";
import { getPC } from "@/providers/publicClient";
import { useQuery } from "@tanstack/react-query";
import { isNil } from "es-toolkit";
import { useState } from "react";
import { erc721Abi } from "viem";
import { useAccount } from "wagmi";
import { Txs } from "./approve-and-tx";
import { SimpleDialog } from "./simple-dialog";
import { TokenInput } from "./token-input";
import { BBtn } from "./ui/bbtn";

const types = ['Deposit', 'Withdraw'] as const
type TypeItem = (typeof types)[number]

function MarginAccount({ vc }: { vc: LntVaultConfig }) {
    const mt = getTokenBy(vc.marginAccount!.input, vc.chain, { symbol: 'MT' })!
    const [type, setType] = useState(types[0] as TypeItem)
    const [input, setInput] = useState('')
    const inputBn = parseEthers(input, mt.decimals)
    const { address } = useAccount()
    const mtBalance = useBalance(mt)
    const { data: staked } = useQuery({
        queryKey: ['queryMarginAccountStatked', address],
        enabled: Boolean(address),
        staleTime: 60 * 1000,
        refetchOnMount: 'always',
        queryFn: async () => getPC(vc.chain).readContract({ abi: abi0GMarginAccount, address: vc.marginAccount!.margin, functionName: 'userStakeAmount', args: [address!] })
    })
    const { data: withdrawTime } = useQuery({
        queryKey: ['queryMarginAccountWithdrawTime'],
        staleTime: 60 * 60 * 1000,
        refetchOnMount: 'always',
        queryFn: async () => getPC(vc.chain).readContract({ abi: abi0GMarginAccount, address: vc.marginAccount!.margin, functionName: 'unstakeStartTime' })

    })
    const mStaked = staked ?? 0n
    return <div className="flex flex-col gap-5 items-center p-5 font-sec">
        <div className="flex items-center gap-5 mr-auto">
            {types.map(item => <div key={item} className={cn("cursor-pointer underline-offset-4", { 'underline': type === item })}
                onClick={() => {
                    if (type !== item) {
                        setInput('')
                        setType(item)
                    }
                }}>{item}</div>)}
        </div>
        <TokenInput
            tokens={[mt]}
            amount={input}
            setAmount={setInput}
            balance={type == 'Deposit' ? undefined : mStaked}
            balanceTit={type == 'Deposit' ? undefined : "Deposited"}
        />
        {
            type == 'Deposit' && <div className="text-xs text-fg/60 text-center w-full">
                Deposit a margin deposit to ensure redemption at maturity. Please note that once deposited, <strong className="text-fg">withdrawal is only possible after two months.</strong>
            </div>
        }
        {
            type == 'Withdraw' && <div className="text-xs text-fg/60 text-center w-full">
                Withdrawal availability date <strong className="text-fg">{isNil(withdrawTime) ? '-' : fmtDate(withdrawTime * 1000n, FMT.ALL3)}</strong>
            </div>
        }
        <Txs
            tx={type}
            disabled={inputBn <= 0n || (type == 'Deposit' && inputBn > mtBalance.data) || (type == 'Withdraw' && (inputBn > mStaked || nowUnix() < (withdrawTime ?? 9999999999999999n)))}
            txs={[{
                abi: abi0GMarginAccount,
                address: vc.marginAccount!.margin,
                functionName: 'stake',
                value: inputBn
            }]}
        />
    </div>
}

export function Lnt0gHeader({ vc }: { vc: LntVaultConfig }) {
    return <div className='font-sec flex justify-end items-center gap-5 text-xs lg:gap-10 lg:text-sm '>
        {vc.marginAccount &&
            <SimpleDialog trigger={<BBtn className="whitespace-nowrap text-xs h-8">Margin Account</BBtn>}>
                <MarginAccount vc={vc} />
            </SimpleDialog>
        }
        <Txs
            tx="Approve for ALL"
            className="whitespace-nowrap text-xs h-8"
            txs={[{
                abi: erc721Abi,
                address: vc.asset,
                functionName: 'setApprovalForAll',
                args: [vc.vault, true]
            }]}
        />
    </div>
}