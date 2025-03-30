'use client'

import { PageWrap } from "@/components/page-wrap"
import { NodeLicense, PreDeposit } from "@/components/pre-deposit"


const nodelicense: NodeLicense[] = [
    {
        name: 'Lnfi',
        tit: 'Lnfi Network',
        about: 'LNFI Network appears to be a platform that brings together Bitcoin, the Lightning Network, and Nostr to create a financialization layer called LightningFi. This layer is designed to manage Taproot Assets, which are tokens issued on the Bitcoin blockchain, allowing for efficient and scalable asset transfers.',
        totalNodes: 100000n,
        totalTokenSupply: 10000000000000n,
        nodeMining: 'Node Mining: 26% ~ 2years',
        net: 'Ethereum'
    },
    {
        name: 'Reppo',
        tit: 'Reppo Network',
        about: 'Reppo is pioneering plug & play infrastructure for AI Agents & Developers to discover, negotiate, commit, and settle on specialized datasets and data pipelines, on-demand.',
        totalNodes: 100000n,
        totalTokenSupply: 10000000000000n,
        nodeMining: 'Node Mining: 26% ~ 2years',
        net: 'Ethereum'
    },
]
export default function Page() {

    return <PageWrap>
        <div className="flex flex-col gap-8 w-full max-w-[1232px] mx-auto">
            {nodelicense.map(nl => <PreDeposit key={nl.name} data={nl} />)}
        </div>
    </PageWrap>
}