'use client'

import { Noti } from "@/components/noti"
import { PageWrap } from "@/components/page-wrap"
import { nodelicense, PreDeposit } from "@/components/pre-deposit"
import Link from "next/link"

export default function Page() {
    return <PageWrap>
        <div className="flex flex-col gap-8 w-full max-w-[1232px] px-4 mx-auto">
            <div className="w-full">
                <div className='page-title'>Pre-Deposit</div>
                <div className="w-full flex items-center gap-5 flex-wrap justify-between">
                    <Noti className="w-auto" data='Deposit Node NFTs to access 100% liquidity on day 1 launch.' />
                    <Link target="_blank" href={'https://zoofi.io/lnt'} className="underline underline-offset-2">Learn more about LNT</Link>
                </div>
            </div>
            {nodelicense.map(nl => <PreDeposit key={nl.name} data={nl} />)}
        </div>
    </PageWrap>
}