'use client'

import { cn } from "@/lib/utils"
import { size } from "lodash"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MouseEvent, useEffect, useMemo, useRef } from "react"
import { IconType } from "react-icons"
import { FiChevronRight } from "react-icons/fi"
import { LuBox, LuLineChart, LuMenu, LuUserCircle } from "react-icons/lu"
import { useClickAway, useToggle } from "react-use"
import { CoinIcon } from "./icons/coinicon"
import { Tip } from "./ui/tip"
import { usePageLoad } from "./page-loading"


export type MenuItem = {
    name: string,
    href: string,
    target?: '_blank' | '_self',
    disabled?: boolean,
    icon?: IconType
    subs?: MenuItem[]
}

const isActiveLink = (pathname: string, li: MenuItem) => {
    const isActiveStatic = !li.disabled && pathname === li.href
    const isActiveAsParent = (pathname.split('/').length > li.href.split('/').length && pathname.startsWith(li.href)) && size(li.subs) > 0
    return isActiveStatic || isActiveAsParent
}
function MenusItem({ menu, expand = true, depth = 0 }: { menu: MenuItem, depth?: number, expand?: boolean }) {
    const [isExpand, toggleExpand] = useToggle(expand)
    const isActive = isActiveLink(usePathname(), menu)
    const onClickToggle = (e: MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        toggleExpand()
    }
    // const r = useRouter()
    return <>
        <Link target={menu.target} onClickCapture={() => {
            (!menu.target || menu.target == '_self') && usePageLoad.setState({ isLoading: true })
        }} href={menu.disabled ? 'javascript:void(0)' : menu.href} style={{ paddingLeft: Math.round((depth + 1) * 16), paddingRight: 12 }}
            // onClick={() => {
            //     !menu.disabled && r.push(menu.href)
            // }}
            className={cn("text-base font-semibold whitespace-nowrap flex w-full items-center gap-3 py-2 rounded-md hover:bg-primary/20", { 'cursor-pointer': !menu.disabled, 'cursor-not-allowed opacity-60': menu.disabled, "text-primary": isActive })}>
            {menu.icon && <menu.icon />}
            {menu.disabled ? <Tip node={menu.name}>Coming Soon</Tip> : menu.name}
            {menu.subs && <FiChevronRight className={cn('cursor-pointer ml-auto', { "-rotate-90": isExpand })} onClick={onClickToggle} />}
        </Link>
        {isExpand && menu.subs?.map((item, i) => <MenusItem key={`menusitem_${i}_${depth}`} menu={item} expand={false} depth={depth + 1} />)}
    </>
}


function MenusContent() {
    const menus = useMemo(() => {
        return [
            {
                href: '/lnt',
                name: "LNT-Vault",
                subs: [
                    { href: 'https://zoofi.io/lnt', name: 'About LNT', icon: LuBox, target: '_blank' },
                    { href: '/lnt/pre-deposit', name: 'Pre-Deposit', icon: LuBox },
                    { href: '/lnt', name: 'LNT-Vault', icon: LuBox, disabled: true },
                    { href: '/lnt/portfolio', name: 'Portfolio', icon: LuUserCircle, disabled: true },
                    { href: '/lnt/dashboard', name: 'Dashboard', icon: LuLineChart, disabled: true },
                ]
            },
            {
                href: '/b-vaults',
                name: "B-Vault",
                subs: [
                    { href: '/b-vaults', name: 'B-Vault', icon: LuBox },
                    { href: '/b-vaults/portfolio', name: 'Portfolio', icon: LuUserCircle },
                    { href: '/b-vaults/dashboard', name: 'Dashboard', icon: LuLineChart },
                ],
            }
        ] as MenuItem[]
    }, [])
    return <div className={cn("flex-col gap-2 items-end flex w-full")}>
        {menus.map((menu, i) => <MenusItem key={`menusitem_${i}`} menu={menu} />)}
    </div>
}
export function Menus() {

    const [open, toggleOpen] = useToggle(false)
    const refMenus = useRef<HTMLDivElement>(null)
    const refToggle = useRef<HTMLDivElement>(null)

    useClickAway(refMenus, (e) => {
        const { current: toggleEL } = refToggle
        toggleEL && !toggleEL.contains(e.target as any) && toggleOpen(false)
    })
    const [isClient, setClient] = useToggle(false)
    useEffect(() => { setClient(true) }, [])
    if (!isClient) return null
    return <>
        <div className="flex fixed z-50 left-0 lg:hidden items-center px-4 h-[72px]">
            <Link href={'/'} className='font-semibold flex pr-1 items-center text-base leading-7'>
                <CoinIcon symbol='logo-alt' size={90} />
            </Link>
            <div ref={refToggle}>
                <LuMenu className="text-3xl cursor-pointer" onClick={() => toggleOpen(!open)} />
            </div>
        </div>
        {/* for pc */}
        <div ref={refMenus} className={cn("hidden h-screen lg:flex flex-col gap-8 items-center sticky top-0 w-[15rem] overflow-y-auto transition-all")}>
            <div className="flex items-center justify-center gap-5 px-4 h-[72px]">
                <Link href={'/'} className='font-semibold flex pr-1 items-center text-base leading-7'>
                    <CoinIcon symbol='logo-alt' size={90} />
                </Link>
            </div>
            <MenusContent />
        </div>
        {/* for mobile */}
        <div ref={refMenus} className={cn("fixed z-50 flex lg:hidden flex-col gap-8 items-center top-[72px] w-[15rem] overflow-y-auto max-h-[calc(100vh-72px)] transition-all -left-full  bg-[#eeeeee] dark:bg-l1 shadow-lg", { "left-0": open })}>
            <MenusContent />
        </div>
    </>
}