import { LntVaultConfig } from "@/config/lntvaults";
import STable from "./simple-table"
import { useLntVault, useLntVaultYTRewards } from "@/hooks/useFetLntVault";
import { getTokenBy, Token } from "@/config/tokens";
import { cn } from "@/lib/utils";
import { CoinIcon } from "./icons/coinicon";
import { useCurrentChainId } from "@/hooks/useCurrentChainId";
import { displayBalance } from "@/utils/display";
import { useBalance } from "@/hooks/useToken";
import { CoinAmount } from "./coin-amount";
import { ApproveAndTx } from "./approve-and-tx";
import { reFet } from "@/lib/useFet";
import { useAccount } from "wagmi";
import { abiRewardManager } from "@/config/abi/abiRewardManager";
import { abiLntVault } from "@/config/abi/abiLNTVault";
const claimColSize = 1.3;
const statuColSize = 1.6

const MCoinAmount = ({ ...p }: Parameters<typeof CoinAmount>[0]) => {
    return <CoinAmount className="font-bold text-sm" symbolClassName="opacity-100" {...p} />
}

function TokenSymbol({ t, size = 32, className }: { t?: Token, size?: number, className?: string }) {
    if (!t) return null
    return <div className={cn("flex gap-2 items-center font-semibold", className)}>
        <CoinIcon symbol={t.symbol} size={size} />
        {t.symbol}
    </div>
}

function VT({ vc }: { vc: LntVaultConfig }) {
    const chainId = useCurrentChainId()
    const { address } = useAccount()
    const vd = useLntVault(vc)
    const vt = getTokenBy(vd.result?.VT, chainId, { symbol: 'VT' })!
    const vtBalance = useBalance(vt)
    const data = vd.result ? [[
        <TokenSymbol key={'vt'} t={vt} />,
        displayBalance(vtBalance.result, undefined, vt.decimals),
        vd.result.closed ? 'Mature' : 'Active',
        <MCoinAmount key={'redeemable'} token={vt} amount={vtBalance.result} />,
        <ApproveAndTx
            disabled={vd.result.aVT > 0n || vtBalance.result <= 0n || !address}
            onTxSuccess={() => reFet(vd.key, vtBalance.key)}
            key="claim"
            className="w-28 font-semibold h-7"
            tx="Claim"
            config={{ abi: abiLntVault, functionName: 'redeemT', address: vc.vault, args: [vtBalance.result] }}
        />,
    ]] : []
    const header = ['VT', 'Value', 'Status', 'Redeemable', '']
    return <div className="card !p-4 bg-white">
        <STable
            headerClassName='text-left font-semibold border-b-0'
            headerItemClassName='py-1 px-0 text-base'
            rowClassName='text-left text-black text-sm leading-none font-medium'
            cellClassName='py-2 px-0'
            header={header}
            span={{ 2: statuColSize, 3: 2, [header.length - 1]: claimColSize }}
            data={data}
        />
    </div>
}
function YT({ vc }: { vc: LntVaultConfig }) {
    const chainId = useCurrentChainId()
    const { address } = useAccount()
    const vd = useLntVault(vc)
    const rewrads = useLntVaultYTRewards(vc)
    const yt = getTokenBy(vd.result?.YT, chainId, { symbol: 'YT' })!
    const ytBalance = useBalance(yt)
    const header = ['YT', 'Value', 'Status', 'Yield', 'Airdrops', '']
    const data = vd.result && rewrads.result ? [
        [
            <TokenSymbol key={'yt'} t={yt} />,
            displayBalance(ytBalance.result, undefined, yt.decimals),
            vd.result.closed ? 'Mature' : 'Active',
            <div key="yield">
                {rewrads.result.map(([token, amount]) => <MCoinAmount token={getTokenBy(token, chainId, { symbol: 'T' })!} key={`rewards_${token}`} amount={amount} />)}
            </div>,
            '',
            <ApproveAndTx
                disabled={!rewrads.result.length || !address}
                onTxSuccess={() => reFet(vd.key, rewrads.key)}
                key="claim"
                className="w-28 font-semibold h-7"
                tx="Claim"
                config={{ abi: abiRewardManager, functionName: 'claimRewards', address: yt.address, args: [address!] }}
            />,
        ]
    ] : []
    return <div className="card !p-4 bg-white">
        <STable
            headerClassName='text-left font-semibold border-b-0'
            headerItemClassName='py-1 px-0 text-base'
            rowClassName='text-left text-black text-sm leading-none font-medium'
            cellClassName='py-2 px-0'
            header={header}
            span={{ 2: statuColSize, [header.length - 1]: claimColSize }}
            data={data}
        />
    </div>
}
function LP({ vc }: { vc: LntVaultConfig }) {
    const chainId = useCurrentChainId()
    const { address } = useAccount()
    const vd = useLntVault(vc)
    const lpTVT = getTokenBy(vd.result?.vtSwapPoolHook, chainId, { symbol: 'lpTVT' })!
    const lpTVTBalance = useBalance(lpTVT)

    const data = vd.result ? [[
        <TokenSymbol key={'lpTVT'} t={lpTVT} />,
        displayBalance(lpTVTBalance.result, undefined, lpTVT.decimals),
        '',
        '',
        '',
        <ApproveAndTx
            disabled={true}
            onTxSuccess={() => reFet(vd.key, lpTVTBalance.key)}
            key="claim"
            className="w-28 font-semibold h-7"
            tx="Claim"
            config={{ abi: abiRewardManager, functionName: 'claimRewards', address: lpTVT.address, args: [address!] }}
        />
    ]] : []
    const header = ['LP', 'Value', '', 'Yield', 'Airdrops', '']
    return <div className="card !p-4 bg-white">
        <STable
            headerClassName='text-left font-semibold border-b-0'
            headerItemClassName='py-1 px-0 text-base'
            rowClassName='text-left text-black text-sm leading-none font-medium'
            cellClassName='py-2 px-0'
            header={header}
            span={{ 2: statuColSize, [header.length - 1]: claimColSize }}
            data={data}
        />
    </div>
}

export function LntMyPositions({ vc }: { vc: LntVaultConfig }) {
    return <div className="flex flex-col gap-5">
        <div className="font-semibold text-2xl leading-none">My Positions</div>
        <VT vc={vc} />
        <YT vc={vc} />
        <LP vc={vc} />
    </div>
}