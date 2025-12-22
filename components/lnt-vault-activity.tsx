import { getLntVaultActivityPage } from "@/config/api";
import { LntVaultConfig } from "@/config/lntvaults";
import { getChain } from "@/config/network";
import { isLoading, isSuccess, useFet } from "@/lib/useFet";
import { FMT, fmtDate, shortStr } from "@/lib/utils";
import Link from "next/link";
import { useRef } from "react";
import STable from "./simple-table";
import { Spinner } from "./spinner";
import { Pagination, usePaginationByTotal } from "./ui/pagination";

export function LntVaultActivity({ vc }: { vc: LntVaultConfig }) {
    const totalRef = useRef(0)
    // eslint-disable-next-line react-hooks/refs
    const pagis = usePaginationByTotal(totalRef.current, 20)
    const data = useFet({
        key: `LntVaultActivity:${vc.vault}:${pagis.currentPage}`,
        initResult: { items: [], total: 0 },
        fetfn: async () => getLntVaultActivityPage(vc.chain, vc.vault, pagis.currentPage, 20).then((res) => {
            totalRef.current = res.total
            return res
        })
    })
    return <div className="flex flex-col gap-4 card">
        <div className="animitem font-medium text-2xl leading-none">Activity</div>
        <div className='animitem card bg-bg overflow-x-auto font-sec'>
            {
                isLoading(data) && <div className="flex justify-center items-center pt-10 w-full h-[765px]"><Spinner /></div>
            }
            {
                isSuccess(data) &&
                <STable
                    header={["License ID", "Activity", "From/to", "Time"]}
                    data={data.result.items.map((item) => [
                        `#${item.tokenId}`,
                        <div key={'action'} className={item.type == 'Deposit' ? 'text-green-500' : 'text-red-500'}>{item.type == 'Deposit' ? item.type : 'Withdraw'}</div>,
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