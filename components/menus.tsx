'use client'

import { abiZooProtocol } from "@/config/abi"
import { abiLntProtocol } from "@/config/abi/abiLNTVault"
import { BVAULTS_CONFIG } from "@/config/bvaults"
import { LNTVAULTS_CONFIG } from "@/config/lntvaults"
import { isLOCL } from "@/constants"
import { useCurrentChainId } from "@/hooks/useCurrentChainId"
import { cn } from "@/lib/utils"
import { getPC } from "@/providers/publicClient"
import { useQuery } from "@tanstack/react-query"
import { uniq, uniqBy } from "es-toolkit"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MouseEvent, useEffect, useMemo, useRef } from "react"
import { IconType } from "react-icons"
import { AiFillApi } from "react-icons/ai"
import { FiChevronRight } from "react-icons/fi"
import { LuBox, LuChartLine, LuMenu, LuCircleUser, LuSquareSquare, LuSettings } from "react-icons/lu"
import { useClickAway, useToggle } from "react-use"
import { Address, isAddressEqual } from "viem"
import { useAccount } from "wagmi"
import { CoinIcon } from "./icons/coinicon"
import { usePageLoad } from "./page-loading"
import { Tip } from "./ui/tip"
import { size } from "es-toolkit/compat"

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
            (!menu.target || menu.target == '_self') && menu.href.startsWith('/') && new URL(location.origin + menu.href).pathname !== pathname && usePageLoad.setState({ isLoading: true })
        }} href={menu.disabled ? 'javascript:void(0)' : menu.href} style={{ paddingLeft: Math.round((depth + 1) * 16), paddingRight: 12 }}
            className={cn("relative text-base font-semibold whitespace-nowrap flex w-full items-center gap-3 py-2 rounded-md hover:bg-primary/20", { 'cursor-pointer': !menu.disabled, 'cursor-not-allowed text-black/60 dark:text-white/60': menu.disabled, "text-primary": isActive, 'animitem': animitem }, className)}>
            {menu.icon && <menu.icon />}
            {menu.disabled ? <Tip node={menu.name}>Coming Soon</Tip> : menu.name}
            {menu.subs && <FiChevronRight className={cn('cursor-pointer ml-auto', { "-rotate-90": isExpand })} onClick={onClickToggle} />}
        </Link>
        {isExpand && menu.subs?.map((item, i) => <MenusItem animitem={animitem} key={`menusitem_${i}_${depth}`} menu={item} expand={false} depth={depth + 1} />)}
    </>
}


function useShowBvaultAdmin() {
    const chainId = useCurrentChainId()
    const { address } = useAccount()
    // console.info('useShowBvaultAdmin:', chainId, address)
    const { data: showAdmin } = useQuery({
        queryKey: ['showAdminBVault:', chainId, address],
        enabled: Boolean(address),
        initialData: false,

        queryFn: async () => {
            const admins = await Promise.all(uniq(BVAULTS_CONFIG[chainId].map(item => item.protocolAddress)).map(item => getPC(chainId).readContract({ abi: abiZooProtocol, address: item, functionName: 'protocolOwner' })))
                .catch((error) => {
                    console.error('Error fetching BVault admins:', error)
                    return []
                })
            const exts = ["0xFE18Aa1EFa652660F36Ab84F122CD36108f903B6", "0xc56f7063fd6d199ccc443dbbf4283be602d46343"] as Address[]
            console.info('useShowBvaultAdmin:', admins, exts, address)
            return [...admins, ...exts].findIndex(item => isAddressEqual(item, address!)) >= 0
        }
    })
    return showAdmin || isLOCL
}
function useShowLntVaultAdmin() {
    const chainId = useCurrentChainId()
    const { address } = useAccount()
    // console.info('useShowLntVaultAdmin:', chainId, address)
    const { data: showAdmin } = useQuery({
        queryKey: ['showAdminLNT:', chainId, address],
        enabled: Boolean(address),
        initialData: false,
        queryFn: async () => {
            const admins = await Promise.all(uniqBy(LNTVAULTS_CONFIG, item => item.protocol).map(item => getPC(item.chain).readContract({ abi: abiLntProtocol, address: item.protocol, functionName: 'owner' })))
                .catch((error) => {
                    console.error('Error fetching LNT Vault admins:', error)
                    return []
                })
            const exts = ["0xFE18Aa1EFa652660F36Ab84F122CD36108f903B6", "0xc56f7063fd6d199ccc443dbbf4283be602d46343"] as Address[]
            console.info('useShowLntVaultAdmin:', admins, exts, address)
            return [...admins, ...exts].findIndex(item => isAddressEqual(item, address!)) >= 0
        }
    })
    return showAdmin || isLOCL
}
function MenusContent({ animitem }: { animitem?: boolean }) {
    const showBvaultAdmin = useShowBvaultAdmin()
    const showLntVaultAdmin = useShowLntVaultAdmin()
    const menus = useMemo(() => {
        return [
            {
                href: '/lnt',
                name: "LNT-Vault",
                subs: [
                    { href: '/lnt/pre-deposit', name: 'Pre-Deposit', icon: LuSquareSquare },
                    { href: '/lnt/vaults', name: 'LNT-Vault', icon: LuBox, demo: true },
                    { href: '/lnt/portfolio', name: 'Portfolio', icon: LuCircleUser, disabled: true },
                    { href: '/lnt/dashboard', name: 'Dashboard', icon: LuChartLine, disabled: true },
                    ...(showLntVaultAdmin ? [
                        { href: '/lnt/ops', name: 'Ops', icon: AiFillApi },
                        { href: '/lnt/admin', name: 'Admin', icon: LuSettings },
                    ] : [])
                ]
            },
            {
                href: '/b-vaults',
                name: "B-Vault",
                subs: [
                    { href: '/b-vaults', name: 'B-Vault', icon: LuBox },
                    { href: '/b-vaults/portfolio', name: 'Portfolio', icon: LuCircleUser },
                    { href: '/b-vaults/dashboard', name: 'Dashboard', icon: LuChartLine },
                    ...(showBvaultAdmin ? [{ href: '/b-vaults/admin', name: 'Admin', icon: LuSettings }] : [])
                ],
            }
        ] as MenuItem[]
    }, [showBvaultAdmin, showLntVaultAdmin])
    return <div className={cn("flex-col gap-2 items-end flex w-full")}>
        {menus.map((menu, i) => <MenusItem key={`menusitem_${i}`} menu={menu} animitem={animitem} />)}
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
                <CoinIcon symbol='logo-alt' size={60} />
            </Link>
            <div ref={refToggle}>
                <LuMenu className="text-3xl cursor-pointer" onClick={() => toggleOpen(!open)} />
            </div>
        </div>
        {/* for pc */}
        <div ref={refMenus} className={cn("hidden shrink-0 h-screen lg:flex flex-col gap-8 items-center sticky top-0 w-[15rem] overflow-y-auto transition-all")}>
            <div className="flex items-center justify-center gap-5 px-4 h-[72px]">
                <Link href={'/'} className='font-semibold flex pr-1 items-center text-base leading-7'>
                    <CoinIcon symbol='logo-alt' size={90} />
                </Link>
            </div>
            <MenusContent animitem />
        </div>
        {/* for mobile */}
        <div ref={refMenus} className={cn("fixed z-50 flex lg:hidden flex-col gap-8 items-center top-[72px] w-[15rem] overflow-y-auto max-h-[calc(100vh-72px)] transition-all -left-full  bg-[#eeeeee] dark:bg-l1 shadow-lg", { "left-0": open })}>
            <MenusContent />
        </div>
    </>
}