import { useCurrentChainId } from "@/hooks/useCurrentChainId"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { FiLogOut } from "react-icons/fi"
import { Chain } from "viem"
import { useAccount, useDisconnect, useSwitchChain } from "wagmi"
import { SimpleDialog } from "./simple-dialog"
import { useConfigChains } from "./support-chains"
import { useSetState } from "react-use"
import { Spinner } from "./spinner"
import { useRef } from "react"

export function SwitchChain() {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const { chains, setDef } = useConfigChains()
    const chainId = useCurrentChainId()
    const ct = chains.find(item => item.id == chainId)
    const { switchChainAsync } = useSwitchChain()
    const { chainId: connectedChainId, isConnected } = useAccount()
    const supportChain = chains.find(item => item.id == connectedChainId)
    const chainError = !supportChain && isConnected
    const isActive = (c: Chain) => {
        return c == ct && !chainError
    }
    const [chainSwitching, setSwitching] = useSetState<{ [k: number]: boolean }>({})
    const onClickItem = (item: Chain) => {
        if (isActive(item)) return
        setSwitching({ [item.id]: true })
        switchChainAsync({ chainId: item.id }).catch(console.error).finally(() => {
            setSwitching({ [item.id]: false })
            setDef(item.id)
            triggerRef.current?.click()
        })
    }

    const dis = useDisconnect()
    const onDis = () => {
        dis.disconnectAsync().finally(() => {
            triggerRef.current?.click()
        })
    }
    if (!ct) return null
    return <SimpleDialog
        className="w-full max-w-90 p-4 shadow-lg"
        triggerRef={triggerRef}
        triggerProps={{ className: 'hidden md:flex' }}
        trigger={
            chainError ? <div className='flex items-center gap-2 text-sm font-bold rounded-lg cursor-pointer relative px-2 h-10 bg-red-500 text-white' >
                Wrong network
            </div> : <div className='flex items-center gap-2 text-sm font-medium rounded-lg cursor-pointer relative px-2 h-10'>
                <Image width={24} height={24} src={(ct as any).iconUrl ?? '/ETH.svg'} alt='' />
                <div className='hidden sm:block'>{ct.name}</div>
            </div>
        }>
        <div className="text-xl font-semibold mb-2">Switch Networks</div>
        <div className="flex flex-col gap-1">
            {chains.map(item => {
                const active = isActive(item)
                return <div key={item.name} className={cn(`flex items-center gap-2 p-2 rounded-lg cursor-pointer`, { 'bg-primary/60': active, 'hover:bg-white/10': !active })} onClick={() => onClickItem(item)}>
                    <Image width={24} height={24} src={(item as any).iconUrl ?? '/ETH.svg'} alt='' />
                    <div className=''>{item.name}</div>
                    {chainSwitching[item.id] && <Spinner className="text-xl ml-auto" />}
                    {active && isConnected && <span className="text-xs ml-auto">connected</span>}
                </div>
            })}
            {isConnected && <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-red-600 hover:bg-white/10" onClick={onDis}>
                <FiLogOut /> Disconnect
                {dis.isPending && <Spinner className="text-xl ml-auto" />}
            </div>}
        </div>
    </SimpleDialog>


}