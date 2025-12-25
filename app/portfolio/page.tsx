'use client'

import { LntMyPositions } from "@/components/lnt-vault-positions";
import { PageWrap } from "@/components/page-wrap";
import { LNTVAULTS_CONFIG } from "@/config/lntvaults";

export default function Page() {
    return <PageWrap className="">
        <LntMyPositions vc={LNTVAULTS_CONFIG} filter />
    </PageWrap>
}