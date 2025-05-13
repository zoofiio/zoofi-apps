'use client'

import { PageWrap } from "@/components/page-wrap"
import { PreDeposit } from "@/components/pre-deposit"
import { nodelicense } from "@/config/prelnt"

export default function Page() {
    return <PageWrap>
        <div className="flex flex-col gap-8 w-full max-w-[1232px] mx-auto">
            {nodelicense.map(nl => <PreDeposit key={nl.name} data={nl} />)}
        </div>
    </PageWrap>
}