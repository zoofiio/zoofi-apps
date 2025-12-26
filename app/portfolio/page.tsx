'use client'

import { LntMyPositions } from "@/components/lnt-vault-positions";
import { PageWrap } from "@/components/page-wrap";
import { LntConfigs, LvtConfigs } from "@/config/lntvaults";

export default function Page() {
    return <PageWrap className="flex flex-col gap-4">
        <LntMyPositions vc={LntConfigs} filter tit="LNT Positions" />
        <LntMyPositions vc={LvtConfigs} filter tit="LVT Positions" />
    </PageWrap>
}