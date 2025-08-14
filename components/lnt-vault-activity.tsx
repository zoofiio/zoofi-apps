import { getLntVaultActivity } from "@/config/api";
import { LntVaultConfig } from "@/config/lntvaults";
import { isLoading, isSuccess, useFet } from "@/lib/useFet";
import { FMT, fmtDate, shortStr } from "@/lib/utils";
import { now, toNumber } from "es-toolkit/compat";
import STable from "./simple-table";
import Link from "next/link";
import { getChain } from "@/config/network";
import { Spinner } from "./spinner";
import { useMemo } from "react";
import { Pagination, usePagination } from "./ui/pagination";

export function LntVaultActivity({ vc }: { vc: LntVaultConfig }) {
    const endTime = Math.round(now() / 1000)
    const startTime = Math.round(endTime - 60 * 60 * 24 * 30)
    const data = useFet({
        key: `LntVaultActivity:${vc.vault}`,
        initResult: { deposits: [], redeems: [] },
        fetfn: async () => getLntVaultActivity(vc.chain, vc.vault, startTime, endTime)
    })
    const items = useMemo(() => data.result.deposits.map((item) => ({ ...item, type: 'Deposit' }))
        .concat(data.result.redeems.map((item) => ({ ...item, type: 'Withdraw' })))
        .sort((a, b) => toNumber(b.block) - toNumber(a.block)), [data.result])
    const pagis = usePagination(items)
    const pagedata = pagis.datas[pagis.currentPage - 1]
    return <div className="flex flex-col gap-5">
        <div className="animitem font-semibold text-2xl leading-none">Activity</div>
        <div className='animitem card overflow-x-auto'>
            {
                isLoading(data) && <div className="flex justify-center items-center py-10 w-full"><Spinner /></div>
            }
            {
                isSuccess(data) &&
                <STable
                    header={["License ID", "Activity", "From/to", "Time"]}
                    data={pagedata.map((item) => [
                        `#${item.tokenId}`,
                        <div key={'action'} className={item.type == 'Deposit' ? 'text-green-500' : 'text-red-500'}>{item.type}</div>,
                        `${shortStr(item.user)}`,
                        <Link
                            key="time"
                            target="_blank"
                            href={`${getChain(vc.chain)!.blockExplorers?.default.url}/tx/${item.tx}`}
                            className="underline underline-offset-2">
                            {fmtDate(new Date(item.block_time).getTime(), FMT.ALL)}
                        </Link>
                    ])}
                />
            }
            <Pagination {...pagis} />
        </div>
    </div>
}