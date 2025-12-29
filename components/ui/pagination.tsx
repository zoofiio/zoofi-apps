import { cn } from "@/lib/utils";
import { chunk } from "es-toolkit";
import { useMemo, useState } from "react";

const short = "..." as const
export function Pagination({ className, itemClassname, currentPage = 1, pages = 0, onPageChange }: { className?: string, itemClassname?: string, currentPage?: number, pages?: number, onPageChange?: (page: number) => void }) {
    if (pages < 2) return null
    const items: (number | typeof short)[] = []
    const slid = 2
    for (let index = 0; index < pages; index++) {
        if (index >= 1 && index <= (currentPage - 1 - slid - 1) && currentPage >= (4 + slid)) {
            items[items.length - 1] !== short && items.push(short)
        } else if (index >= (currentPage - 1 + slid + 1) && index <= (pages - 2) && currentPage <= (pages - 1 - 2 - slid)) {
            items[items.length - 1] !== short && items.push(short)
        } else {
            items.push(index + 1)
        }
    }
    return <div className={cn("flex items-center justify-center gap-1", className)}>
        {items.map((item, i) =>
            <div
                key={'pageitem_' + i}
                className={cn(
                    "text-sm w-9 h-9 flex items-center justify-center rounded-lg bg-primary/10",
                    { "bg-primary text-white": item == currentPage },
                    { "hover:bg-primary/30": item != currentPage && typeof item == 'number' },
                    { "cursor-pointer": typeof item == 'number' },
                    itemClassname
                )}
                onClick={() => { currentPage !== item && typeof item == 'number' && onPageChange?.(item) }}
            >
                {item}
            </div>)}
    </div>
}


export function usePaginationByTotal(total: number, pagesize: number = 20) {
    const [currentPage, setCurrentPage] = useState(1)
    return useMemo(() => ({ pages: Math.ceil(total / pagesize), currentPage, onPageChange: (page: number) => setCurrentPage(page) }), [currentPage, total, pagesize])
}