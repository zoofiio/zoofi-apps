'use client'

import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { create } from "zustand"



export type PageLoadStore = {
    isLoading: boolean,
    set: (p: Partial<Exclude<PageLoadStore, 'set'>>) => void
}
export const usePageLoad = create<PageLoadStore>((_get, set) => ({
    isLoading: false,
    set
}))

export function PageLoading() {
    const { isLoading } = usePageLoad()
    const pathname = usePathname()
    useEffect(() => {
        console.info('pathname change:', pathname)
        usePageLoad.setState({ isLoading: false })
    }, [pathname])
    // return <div className={cn('top-loader fixed z-50 top-0 left-0 ')} />
    return <div className={cn('top-loader fixed z-50 top-0 left-0', isLoading ? 'visible' : 'invisible')} />
}


export function useWrapRouter() {
    const r = useRouter()
    return useMemo(() => {
        const names = [
            r.back.name,
            r.forward.name,
            r.push.name,
            r.replace.name,
        ]
        return new Proxy(r, {
            apply(target: any, thisArg, argArray) {
                names.includes(target.name) &&
                    usePageLoad.setState({ isLoading: true })
                target.apply(thisArg, argArray)
            },
        }) as typeof r
    }, [r])
}

