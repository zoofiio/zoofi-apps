'use client'

import { PageWrap } from "@/components/page-wrap";
import { LntVaultConfig, LNTVAULTS_CONFIG } from "@/config/lntvaults";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSetState } from "react-use";

function AethirOpsManager({ vc }: { vc: LntVaultConfig }) {
    const [ss, setSS] = useSetState({
        token: ''
    })
    const {} = useQuery({
        queryKey: ['VaultNFTRecodes', vc],
        queryFn: async () => {

        }
    })
    const { mutate: orderNodeOps } = useMutation({
        mutationFn: async () => {

        }
    })

    return <div className="flex flex-col gap-5">
        <div className="animitem font-semibold text-xl">{vc.tit}</div>
        

        <div className="">

        </div>
    </div>
}

export default function Page() {
    return <PageWrap>
        {LNTVAULTS_CONFIG.filter(item => item.isAethir && !item.test).map(vc => <AethirOpsManager vc={vc} key={vc.vault} />)}
    </PageWrap>
}