'use client'

import { useShowBvaultAdmin, useShowLntVaultAdmin } from "@/hooks/admins"
import { cn } from "@/lib/utils"
import { size } from "es-toolkit/compat"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MouseEvent, useMemo, useRef } from "react"
import { IconType } from "react-icons"
import { AiFillApi } from "react-icons/ai"
import { BiMenuAltLeft } from "react-icons/bi"
import { FiChevronRight } from "react-icons/fi"
import { LuBox, LuBoxes, LuChartLine, LuCircleUser, LuSettings } from "react-icons/lu"
import { useClickAway, useToggle } from "react-use"
import { CoinIcon } from "./icons/coinicon"
import { usePageLoad } from "./page-loading"
import { Tip } from "./ui/tip"

export type MenuItem = {
    name: string,
    href: string,
    target?: '_blank' | '_self',
    disabled?: boolean,
    demo?: boolean,
    icon?: IconType
    subs?: MenuItem[]
}

const isActiveLink = (pathname: string, li: MenuItem) => {
    const isActiveStatic = !li.disabled && pathname === li.href
    const isActiveAsParent = (pathname.split('/').length > li.href.split('/').length && pathname.startsWith(li.href)) && size(li.subs) > 0
    return isActiveStatic || isActiveAsParent
}
function MenusItem({ menu, expand = true, depth = 0, className, animitem }: { menu: MenuItem, depth?: number, expand?: boolean, className?: string, animitem?: boolean }) {
    const [isExpand, toggleExpand] = useToggle(expand)
    const pathname = usePathname()
    const isActive = isActiveLink(pathname, menu)
    const onClickToggle = (e: MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        toggleExpand()
    }
    // const r = useRouter()
    return <>
        <Link target={menu.target} onClickCapture={() => {
            !menu.disabled && (!menu.target || menu.target == '_self') && menu.href.startsWith('/') && new URL(location.origin + menu.href).pathname !== pathname && usePageLoad.setState({ isLoading: true })
        }} href={menu.disabled ? 'javascript:void(0)' : menu.href} style={{ paddingLeft: Math.round((depth + 1) * 16), paddingRight: 12 }}
            className={cn("relative text-base font-semibold whitespace-nowrap flex w-full items-center gap-3 py-2 hover:bg-primary/20", { 'cursor-pointer': !menu.disabled, 'cursor-not-allowed text-fg/60': menu.disabled, "text-primary": isActive, 'animitem': animitem }, className)}>
            {menu.icon && <menu.icon />}
            {menu.disabled ? <Tip node={menu.name}>Coming Soon</Tip> : menu.name}
            {menu.subs && <FiChevronRight className={cn('cursor-pointer ml-auto', { "-rotate-90": isExpand })} onClick={onClickToggle} />}
        </Link>
        {isExpand && menu.subs?.map((item, i) => <MenusItem animitem={animitem} key={`menusitem_${i}_${depth}`} menu={item} expand={false} depth={depth + 1} />)}
    </>
}



function useMenus() {
    const pathname = usePathname()
    const showBvaultAdmin = useShowBvaultAdmin()
    const showLntVaultAdmin = useShowLntVaultAdmin()
    const menus = useMemo<MenuItem[]>(() => {
        if (pathname.startsWith("/b-vaults")) {
            return [
                { href: '/b-vaults', name: 'B-Vault', icon: LuCircleUser },
                { href: '/b-vaults/portfolio', name: 'Portfolio', icon: LuCircleUser },
                { href: '/b-vaults/dashboard', name: 'Dashboard', icon: LuChartLine },
                ...(showBvaultAdmin ? [{ href: '/b-vaults/admin', name: 'Admin', icon: LuSettings }] : [])
            ]
        }
        return [
            { href: '/lnt', name: 'LNT-Vault', icon: LuBox },
            { href: '/lvt', name: 'LVT-Vault', icon: LuBoxes, },
            { href: '/portfolio', name: 'Portfolio', icon: LuCircleUser },
            ...(showLntVaultAdmin ? [
                { href: '/lnt/ops', name: 'Ops', icon: AiFillApi },
                { href: '/lnt/admin', name: 'Admin', icon: LuSettings },
            ] : []),
        ] as MenuItem[]
    }, [showBvaultAdmin, showLntVaultAdmin, pathname])
    return menus
}


const menuItemClassName = "hidden slg:block text-sm cursor-pointer leading-none text-fg/80 border border-board rounded-lg p-2 hover:border-primary hover:text-primary"
export function Menus() {

    const [open, toggleOpen] = useToggle(false)
    const refMenus = useRef<HTMLDivElement>(null)
    const refToggle = useRef<HTMLDivElement>(null)

    useClickAway(refMenus, (e) => {
        const { current: toggleEL } = refToggle
        toggleEL && !toggleEL.contains(e.target as any) && toggleOpen(false)
    })
    const menus = useMenus()
    const pathname = usePathname()
    const pcMenus = pathname.startsWith("/b-vaults") ? menus.slice(1) : menus.slice(2)
    return <>
        <div className="font-sec flex fixed z-100 left-[clamp(20px,calc(50vw-760px),10000px)] items-center h-[72px]">
            <div ref={refToggle} className="slg:hidden">
                <BiMenuAltLeft className="text-3xl cursor-pointer" onClick={() => toggleOpen(!open)} />
            </div>
            <Link href={'/'} className='font-semibold flex pr-1 items-center text-[3.3125rem] slg:text-[4.375rem] leading-7'>
                <CoinIcon symbol='logo-alt' size={'1em'} />
            </Link>
            <Link href={'/'} className={cn(menuItemClassName, 'ml-5')}>
                {`Home`}
            </Link>
            {pcMenus.map((item, i) =>
                <Link
                    key={`menusitem_${i}`}
                    href={item.href}
                    className={`${menuItemClassName} ml-2`}>
                    {item.name}
                </Link>)}
        </div>
        {/* for pc */}
        {/* <div ref={refMenus} className={cn("hidden lg:flex shrink-0 h-screen  flex-col gap-8 items-center sticky top-0 w-60 overflow-y-auto transition-all")}>
            <div className="flex items-center justify-center gap-5 px-4 h-[72px]">
                <Link href={'/'} className='font-semibold flex pr-1 items-center text-base leading-7'>
                    <CoinIcon symbol='logo-alt' size={90} />
                </Link>
            </div>
            <MenusContent animitem />
        </div> */}
        {/* for mobile */}
        <div ref={refMenus} className={cn("font-sec fixed z-100 flex flex-col gap-8 items-center top-[72px] w-60 overflow-y-auto max-h-[calc(100vh-72px)] transition-all -left-full bg-bg/20 backdrop-blur-3xl border-r border-b rounded-br-2xl  border-primary/30 shadow-lg opacity-0", { "left-0 opacity-100": open })}>
            <div className={cn("flex-col gap-2 items-end flex w-full")}>
                {menus.map((menu, i) => <MenusItem key={`menusitem_${i}`} menu={menu} />)}
            </div>
        </div>
    </>
}