/* eslint-disable react-hooks/rules-of-hooks */
import { abiLntVault } from "@/config/abi/abiLNTVault";
import { abiRewardManager } from "@/config/abi/abiRewardManager";
import { LntVaultConfig } from "@/config/lntvaults";
import { getTokenBy, Token } from "@/config/tokens";
import { calcLPApy, calcVtApy, useLntVault, useLntVaultLogs, useLntVaultSwapFee7Days } from "@/hooks/useFetLntVault";
import { useBalance } from "@/hooks/useToken";
import { reFet } from "@/lib/useFet";
import { cn, formatPercent, nowUnix } from "@/lib/utils";
import { displayBalance } from "@/utils/display";
import { flatten } from "es-toolkit";
import { Fragment, ReactNode } from "react";
import { useAccount } from "wagmi";
import { Txs } from "./approve-and-tx";
import { CoinAmount } from "./coin-amount";
import { TokenIcon } from "./icons/tokenicon";
import STable from "./simple-table";
import { Tip } from "./ui/tip";
const claimColSize = 1.3;
const statuColSize = 1.6

const MCoinAmount = ({ ...p }: Parameters<typeof CoinAmount>[0]) => {
    return <CoinAmount className="font-bold text-sm" symbolClassName="opacity-100" {...p} />
}

function TokenSymbol({ t, size = 32, className }: { t?: Token, size?: number, className?: string }) {
    if (!t) return null
    return <div className={cn("flex gap-2 items-center font-semibold", className)}>
        <TokenIcon token={t} size={size} />
        {t.symbol}
    </div>
}



function VT({ vcs, filter }: { vcs: LntVaultConfig[], filter?: boolean }) {
    const { address } = useAccount()
    const data: ReactNode[][] = []
    const fVcs: LntVaultConfig[] = []
    for (const vc of vcs) {
        const vd = useLntVault(vc)
        const logs = useLntVaultLogs(vc)
        const apy = calcVtApy(vc, vd.data, logs.data)
        const vt = getTokenBy(vd.data?.VT, vc.chain, { symbol: 'VT' })
        const t = getTokenBy(vd.data?.T, vc.chain, { symbol: 'T' })!
        const vtBalance = useBalance(vt)
        const matureTime = vd.data?.expiryTime ?? 2051193600n
        const isMature = nowUnix() > matureTime
        const isDisableClaim = !isMature || vtBalance.data <= 0n || !address
        if ((!filter || vtBalance.data > 0n) && vt) {
            fVcs.push(vc)
            data.push([
                <TokenSymbol key={'vt'} t={vt} />,
                <Fragment key={'vtValue'}>
                    {displayBalance(vtBalance.data, undefined, vt.decimals)}
                </Fragment>,
                formatPercent(apy),
                isMature ? 'Mature' : 'Active',
                isMature ? <MCoinAmount key={'redeemable'} token={t} amount={vtBalance.data} /> : `1 ${vt.symbol} is equal to 1 ${t.symbol} at maturity`,
                isDisableClaim ? '' : <Txs
                    onTxSuccess={() => reFet(vd.key, vtBalance.key)}
                    key="claim"
                    className="w-28 font-semibold h-7"
                    tx="Claim"
                    txs={[{ abi: abiLntVault, functionName: 'redeemT', address: vc.vault, args: [vtBalance.data] }]}
                />,
            ])
        }
    }
    const header = ['VT', 'Value', 'APY', 'Status', 'Redeemable', '']
    // const r = useRouter()
    return <div className="animitem card overflow-x-auto font-sec">
        <STable
            headerClassName='text-left border-b-0'
            headerItemClassName={(i) => i == 0 ? 'py-1 px-0 ' : 'py-1 px-4 '}
            cellClassName={(_i, ci) => ci == 0 ? 'py-2 px-0' : 'py-2 px-4'}
            rowClassName='text-left text-sm leading-none'
            header={header}
            // onClickRow={filter ? (i) => toLntVault(r, fVcs[i].vault) : undefined}
            span={{ 2: statuColSize, 3: 2, [header.length - 1]: claimColSize }}
            data={data}

        />
    </div>
}

function LP({ vcs, filter }: { vcs: LntVaultConfig[], filter?: boolean }) {
    const { address } = useAccount()
    const data: ReactNode[][] = []
    for (const vc of vcs) {
        const vd = useLntVault(vc)
        const logs = useLntVaultLogs(vc)
        const swapfee7days = useLntVaultSwapFee7Days(vc)
        const { apy, items } = calcLPApy(vc, vd.data, logs.data, swapfee7days.data)
        const lpTVT = getTokenBy(vd.data?.vtSwapPoolHook, vc.chain, { symbol: 'lpTVT' })
        const lpTVTBalance = useBalance(lpTVT)
        const disableClaim = !vc.lpYields
        if ((!filter || lpTVTBalance.data > 0n) && lpTVT) {
            data.push([
                <TokenSymbol key={'lpTVT'} t={lpTVT} />,
                displayBalance(lpTVTBalance.data, undefined, lpTVT.decimals),
                <Tip key={"apy"} node={<div className="underline underline-offset-2">{formatPercent(apy)}</div>}>
                    {items.map(item => <div className="" key={item.name}>
                        {item.name}: {formatPercent(item.value)}
                    </div>)}
                </Tip>,
                '',
                '',
                '',
                disableClaim ? '' : <Txs
                    onTxSuccess={() => reFet(vd.key, lpTVTBalance.key)}
                    key="claim"
                    className="w-28 font-semibold h-7"
                    tx="Claim"
                    txs={[{ abi: abiRewardManager, functionName: 'claimRewards', address: lpTVT.address, args: [address!] }]}
                />
            ])
        }
    }
    const header = ['LP', 'Value', 'APY', '', '', '', '']
    return <div className="animitem card overflow-x-auto font-sec">
        <STable
            headerClassName='text-left font-semibold border-b-0'
            headerItemClassName={(i) => i == 0 ? 'py-1 px-0' : 'py-1 px-4'}
            cellClassName={(_i, ci) => ci == 0 ? 'py-2 px-0' : 'py-2 px-4'}
            rowClassName='text-left text-sm leading-none'
            header={header}
            span={{ 2: statuColSize, [header.length - 1]: claimColSize }}
            data={data}
        />
    </div>
}

export function LntMyPositions({ vc, filter, tit }: { vc: LntVaultConfig | LntVaultConfig[], filter?: boolean, tit?: string }) {
    const vcs = flatten([vc])
    return <div className="flex flex-col gap-4 card not-dark:bg-main">
        <div className="font-medium text-lg leading-none">{tit ?? 'My Positions'}</div>
        <div className="flex flex-col gap-2.5">
            <VT vcs={vcs} filter={filter} />
            <LP vcs={vcs} filter={filter} />
        </div>
    </div>
}