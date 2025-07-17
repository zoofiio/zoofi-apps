'use client'

import { PageWrap } from "@/components/page-wrap";
import { LntVaultConfig, LNTVAULTS_CONFIG } from "@/config/lntvaults";
import { useLntVault } from "@/hooks/useFetLntVault";
import { cn } from "@/lib/utils";
import { displayBalance } from "@/utils/display";


function LntVaultCount({ vc }: { vc: LntVaultConfig }) {
    const vd = useLntVault(vc)
    const activeCount = vd.result?.activeDepositCount ?? 0n
    const successDelegateCount = activeCount
    const hasError = successDelegateCount !== activeCount
    return <div className="animitem card flex flex-col items-center gap-5">
        <div className="font-semibold text-xl">{vc.tit}</div>
        <div className="flex items-baseline gap-5">
            Deposited:
            <div className="font-bold text-5xl text-primary">{displayBalance(activeCount, 0, 0)}</div>
        </div>
        <div className="flex items-baseline gap-5">
            Delegated:
            <div className={cn("font-bold text-5xl text-primary", { "text-red-500": hasError })}>{displayBalance(successDelegateCount, 0, 0)}</div>
        </div>
    </div>
}

export default function Page() {
    return <PageWrap>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 p-5">
            <>{LNTVAULTS_CONFIG.map((vc, i) => <LntVaultCount key={`lvc_${i}`} vc={vc} />)}</>
        </div>
    </PageWrap>
}