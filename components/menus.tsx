import { useMemo } from "react"
import { IconType } from "react-icons"


export type MenuItem = {
    naem: string,
    href: string,
    hrefs?: string[]
    target?: '_blank' | '_self',
    disabled?: boolean,
    icon?: IconType
    subs?: MenuItem[]
}



export function Menus() {
    const menus = useMemo(() => { }, [])
    return <div className="flex flex-col gap-2 items-center ">

    </div>
}