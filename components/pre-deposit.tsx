import { NodeLicense } from "@/config/prelnt";
import { abiPreDeposit, usePreDepositByUser, usePreDepositData } from "@/hooks/usePreDeposit";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode, useMemo, useRef } from "react";
import { useSetState } from "react-use";
import { encodeFunctionData, erc721Abi, isAddressEqual } from "viem";
import { useAccount } from "wagmi";
import { NftApproveAndTx, TX, Txs, TXSType } from "./approve-and-tx";
import { CoinIcon } from "./icons/coinicon";
import { SimpleDialog } from "./simple-dialog";
import { keys, now } from "es-toolkit/compat";
import { LNTVAULTS_CONFIG } from "@/config/lntvaults";
import { abiReppoLntVault } from "@/config/abi/abiLNTVault";



export const nodelicense: NodeLicense[] = [
    //   {
    //     name: 'Lnfi',
    //     tit: 'Lnfi Network',
    //     about:
    //       'LNFI Network appears to be a platform that brings together Bitcoin, the Lightning Network, and Nostr to create a financialization layer called LightningFi. This layer is designed to manage Taproot Assets, which are tokens issued on the Bitcoin blockchain, allowing for efficient and scalable asset transfers.',
    //     totalNodes: 100000n,
    //     totalTokenSupply: 10000000000000n,
    //     nodeMining: 'Node Mining: 26% ~ 2years',
    //     net: 'Ethereum',
    //   },
    {
        name: 'Reppo Network',
        // tit: 'Reppo Network',
        tit: (<div>Reppo <span className="text-red-400">Preminum Solver Node</span></div>),
        infos: [
            'Price: 0.17ETH',
            'Sales Link:',
            <Link key={'link'} href={'https://repposolvers.xyz/'} target="_blank">https://repposolvers.xyz/</Link>
        ],
        about:
            'Reppo are building plug & play style infrastructure for AI Agents, Developers & Physical AI to permissionlessly discover, negotiate, commit, and settle on community-governed capital, specialized datasets, and infrastructure through an intent-centric architecture.',
        totalNodes: 100000n,
        totalTokenSupply: 10000000000000n,
        nodeMining: 'Node Mining: 26% ~ 2years',
        net: 'Base',
        preDeposit: {
            nft: '0x1a245cfA2515089017792D92E9d68B8F8b3691eE',
            prelnt: '0x58a4f5cecb69b85600b26092f0c0a73430ea8800',
            withdrawTime: 1759881600000
        },
    },
    {
        name: 'Reppo Network',
        // tit: 'Reppo Network',
        tit: (<div>Reppo <span className="text-yellow-300">Standard Solver Node</span></div>),
        infos: [
            'Price: 0.08ETH',
            'Sales Link:',
            <Link key={'link'} href={'https://repposolvers.xyz/'} target="_blank">https://repposolvers.xyz/</Link>
        ],
        about:
            'Reppo are building plug & play style infrastructure for AI Agents, Developers & Physical AI to permissionlessly discover, negotiate, commit, and settle on community-governed capital, specialized datasets, and infrastructure through an intent-centric architecture.',
        totalNodes: 100000n,
        totalTokenSupply: 10000000000000n,
        nodeMining: 'Node Mining: 26% ~ 2years',
        net: 'Base',
        preDeposit: {
            nft: '0x8A1BCBd935c9c7350013786D5d1118832F10e149',
            prelnt: '0xaf021d48339e52edd84bab1221df9bac7f10cb69',
            withdrawTime: 1759881600000
        },
    },
]

function BtnB(p: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { children, ...props } = p;
    return <button {...props} className="text-[1em] p-[.75em] w-[12.5em] rounded-[.5em]  cursor-pointer border dark:border-white border-black btn-b disabled:opacity-60 disabled:cursor-not-allowed">
        {children}
    </button >
}
export function NodeLicenseImage(p: { icon: ReactNode }) {
    return <div className="rounded-2xl border border-black flex flex-col w-57.5 gap-4.5 pt-4.5 bg-white">
        <div className="bg-[#2BBD34] h-7.5 border-y border-black w-full"></div>
        <div className="flex gap-2.5 h-2.5 pl-5">
            <div className="w-19 h-full bg-black "></div>
            <div className="w-6.25 h-full bg-black"></div>
        </div>
        <div className="pl-5 pr-2.5 pb-2 flex flex-col">
            <div className="text-black font-medium text-2xl">Node Licence</div>
            <div className="self-end">
                {p.icon}
            </div>
        </div>
    </div>
}


const nlImages: { [k: string]: { src: string, width: string, height: string } } = {
    'Lnfi': { src: '/lnfi.png', width: '50', height: '20' },
    'Reppo': { src: '/reppo.png', width: '24', height: '24' }
}
export function NodeLicenseInfo({ data }: { data: NodeLicense }) {
    return <div style={{
        backdropFilter: 'blur(20px)'
    }} className="animitem bg-white/5 border border-[#4A5546] rounded-2xl flex flex-col p-7 gap-5 min-h-100" >
        <div className="flex gap-7 flex-wrap">
            {/* <NodeLicenseImage icon={nlImages[data.name] ? <img {...nlImages[data.name]} className="invert" /> : null} /> */}
            <CoinIcon symbol="ReppoNft" size={161} />
            <div className="flex flex-col whitespace-nowrap gap-5 h-full text-sm font-medium">
                <div className="text-base font-semibold">{data.tit}</div>
                {data.infos.map((item, i) => <div key={`info_${i}`}>{item}</div>)}
                {/* <div className="text-base font-semibold">{data.tit}</div>
                <div>Total No. of Nodes: {displayBalance(data.totalNodes, 0, 0)}</div>
                <div>Total Token Supply: {displayBalance(data.totalTokenSupply, 0, 0)}</div>
                <div>Node Mining: {data.nodeMining}</div>
                <div>Sales start time: {data.salesStartTime ? fmtDate(data.salesStartTime) : 'TBD'}</div>
                <div>Token TGE: {data.tokenTGE ? data.tokenTGE : 'TBD'}</div> */}
            </div>
        </div>
        <div className="bg-[#4A5546] h-px w-full shrink-0"></div>
        <div className="flex flex-col gap-2">
            <div className="text-base font-medium">About {data.name}</div>
            <div className="opacity-60 text-sm font-medium leading-normal">{data.about}</div>
        </div>
    </div >
}


function InSvg() {
    return <svg width="60" height="67" viewBox="0 0 60 67" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M53.7305 30.0801L26.8652 26.5V40.6973L53.7305 43.5156V30.0801Z" fill="#118C26" />
        <path d="M5.37305 31.1465L26.8652 26.5V42.6191L5.37305 47.2656V31.1465Z" fill="#30CA39" />
        <path d="M30.4453 36.5195L53.7305 30.0801V60.5254L30.4453 66.9648V36.5195Z" fill="#2BBD34" />
        <path d="M5.37305 31.1465L30.4453 36.5195V66.8008L5.37305 60.7012V31.1465Z" fill="#118C26" />
        <path d="M30.4453 36.4727L5.37305 31.1465L0 41.8926L25.9687 47.9922L30.4453 36.4727Z" fill="#2BBD34" />
        <path d="M30.4453 36.5195L53.7305 30.0801L60 40.8262L37.6113 48.1621L30.4453 36.5195Z" fill="#6FE167" />
        <g>
            <path d="M41.5 20L36 21L30 18L34 17L41.5 20Z" fill="#D93E46" />
            <path d="M28 22.5V3L36 1.5V21L41.5 20L31.5 34L21.5 24L28 22.5Z" fill="#F14851" />
            <path d="M21 1L28 3L36 1.5L29 0L21 1Z" fill="#D03B41" />
            <path d="M28 22.5V3L21 1V19.5L28 22.5Z" fill="#9D323D" />
            <path d="M21 19.5L28 22.5L21.5 24L16 20.5L21 19.5Z" fill="#D03B41" />
            <path d="M21.5 24L31.5 34L21 25.5L16 20.5L21.5 24Z" fill="#9E333E" />
        </g>
    </svg>
}
function OutSvg() {
    return <svg width="60" height="65" viewBox="0 0 60 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M53.7305 27.5801L26.8652 24V38.1973L53.7305 41.0156V27.5801Z" fill="#118C26" />
        <path d="M5.37305 28.6465L26.8652 24V40.1191L5.37305 44.7656V28.6465Z" fill="#30CA39" />
        <path d="M30.4453 34.0195L53.7305 27.5801V58.0254L30.4453 64.4648V34.0195Z" fill="#2BBD34" />
        <path d="M5.37305 28.6465L30.4453 34.0195V64.3008L5.37305 58.2012V28.6465Z" fill="#118C26" />
        <path d="M30.4453 33.9727L5.37305 28.6465L0 39.3926L25.9687 45.4922L30.4453 33.9727Z" fill="#2BBD34" />
        <path d="M30.4453 34.0195L53.7305 27.5801L60 38.3262L37.6113 45.6621L30.4453 34.0195Z" fill="#6FE167" />
        <g>
            <path d="M30 31V14.5L23 14V29.5L30 31Z" fill="#AAAD16" />
            <path d="M30 14.5V31L37 29V13L42 12L33.5 0L23 16L30 14.5Z" fill="#E5CF3E" />
            <path d="M23 16L33.5 0H27L16.5 14L23 16Z" fill="#BBB73C" />
        </g>
    </svg>

}


function LntPreDeposit({ node, onSuccess }: { node: NodeLicense, onSuccess: () => void }) {
    const [selectedNft, setSelectNft] = useSetState<{ [tokenId: string]: boolean }>({})
    const tokenIds = keys(selectedNft).filter(item => selectedNft[item]).map(item => BigInt(item))
    const data = useMemo(() => {
        const ids = keys(selectedNft).filter(item => selectedNft[item]).map(item => BigInt(item))
        return ids.map(id => encodeFunctionData({ abi: abiPreDeposit, functionName: 'deposit', args: [id] }))
    }, [selectedNft])
    const pre = node.preDeposit!
    // const nfts = useNftBalance(pre.nft)
    const { data: { nfts }, refetch } = usePreDepositByUser(node)
    return <div className='flex flex-col gap-5 items-center p-5 h-max'>
        <div className='w-full text-start'>Licenses ID</div>
        <div className='w-full max-w-lg h-72 overflow-y-auto'>
            <div className='w-full gap-2 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] '>
                {nfts.map(id => (<div key={id.toString()} className={cn('flex gap-1 items-center cursor-pointer', { 'text-primary': selectedNft[id.toString()] })} onClick={() => setSelectNft({ [id.toString()]: !selectedNft[id.toString()] })}>
                    <div className={cn('w-3 h-3 border border-black/20 bg-[#EBEBEB] rounded-full', { 'bg-primary': selectedNft[id.toString()] })} />
                    #{id.toString()}
                </div>))}
            </div>
        </div>
        <NftApproveAndTx tx='Deposit'
            approves={{ [pre.nft]: true }}
            spender={pre.prelnt}
            confirmations={5}
            onTxSuccess={() => {
                const nStat: { [id: string]: boolean } = {}
                tokenIds.forEach((id) => {
                    nStat[id.toString()] = false
                })
                setSelectNft(nStat)
                onSuccess()
                refetch()
            }}
            config={{
                abi: abiPreDeposit,
                address: pre.prelnt,
                functionName: 'multicall',
                enabled: tokenIds.length > 0,
                args: [data]
            }} />
    </div>
}
function LntPreWithdraw({ node, onSuccess }: { node: NodeLicense, onSuccess: () => void }) {
    const [selectedNft, setSelectNft] = useSetState<{ [tokenId: string]: boolean }>({})
    const tokenIds = keys(selectedNft).filter(item => selectedNft[item]).map(item => BigInt(item))
    const data = useMemo(() => {
        const ids = keys(selectedNft).filter(item => selectedNft[item]).map(item => BigInt(item))
        return ids.map(id => encodeFunctionData({ abi: abiPreDeposit, functionName: 'withdraw', args: [id] }))
    }, [selectedNft])
    const { data: { deposited }, refetch } = usePreDepositByUser(node)
    const pre = node.preDeposit!
    const { address } = useAccount()
    const getTxs: TXSType = async ({ pc, wc }) => {
        const curentNft = node.preDeposit!.nft
        const vc = LNTVAULTS_CONFIG.find(item => item.reppo)
        if (tokenIds.length <= 0) return []
        if (!vc) return []
        const approves: TX[] = []
        if (!(await pc.readContract({ abi: erc721Abi, address: curentNft, functionName: 'isApprovedForAll', args: [wc.account.address!, vc.vault] }))) {
            const alreadyApproves = await Promise.all(tokenIds.map(id => pc.readContract({ abi: erc721Abi, address: curentNft, functionName: 'getApproved', args: [id] })))
            alreadyApproves.forEach((ap, i) => {
                if (!isAddressEqual(ap, vc.vault)) {
                    approves.push({ abi: erc721Abi, address: curentNft, functionName: 'approve', args: [vc.vault, tokenIds[i]], name: `Approve #${tokenIds[i].toString()}` })
                }
            })
        }
        return [
            {
                abi: abiPreDeposit,
                address: pre.prelnt,
                functionName: 'multicall',
                enabled: tokenIds.length > 0,
                args: [data]
            },
            ...approves,
            {
                name: 'Deposit',
                abi: abiReppoLntVault,
                address: vc.vault,
                functionName: 'deposit',
                enabled: tokenIds.length > 0,
                args: [curentNft, tokenIds]
            }
        ]
    }
    return <div className='flex flex-col gap-5 items-center p-5'>
        <div className='w-full text-start'>Licenses ID</div>
        <div className='w-full max-w-lg h-72 overflow-y-auto'>
            <div className='w-full gap-2 grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] '>
                {deposited.map(id => (<div key={id.toString()} className={cn('flex gap-1 items-center cursor-pointer', { 'text-primary': selectedNft[id.toString()] })} onClick={() => setSelectNft({ [id.toString()]: !selectedNft[id.toString()] })}>
                    <div className={cn('w-3 h-3 border border-black/20 bg-[#EBEBEB] rounded-full', { 'bg-primary': selectedNft[id.toString()] })} />
                    #{id.toString()}
                </div>))}
            </div>
        </div>

        {/* <NftApproveAndTx tx='Withdraw'
                confirmations={5}
                onTxSuccess={() => {
                    const nStat: { [id: string]: boolean } = {}
                    tokenIds.forEach((id) => {
                        nStat[id.toString()] = false
                    })
                    setSelectNft(nStat)
                    onSuccess()
                    refetch()
                }}
                config={{
                    abi: abiPreDeposit,
                    address: pre.prelnt,
                    functionName: 'multicall',
                    enabled: tokenIds.length > 0,
                    args: [data]
                }} /> */}
        <Txs tx="Withdraw to LNT" txs={getTxs} onTxSuccess={() => {
            const nStat: { [id: string]: boolean } = {}
            tokenIds.forEach((id) => {
                nStat[id.toString()] = false
            })
            setSelectNft(nStat)
            onSuccess()
            refetch()
        }} />

    </div>
}
export function PrePool({ data }: { data: NodeLicense }) {
    const depositRef = useRef<HTMLButtonElement>(null)
    const withdrawRef = useRef<HTMLButtonElement>(null)
    const { data: { totalDeposit }, refetch: reFetData } = usePreDepositData(data)
    const { data: { deposited, nfts }, refetch: reFetUser } = usePreDepositByUser(data)
    return <div style={{
        backdropFilter: 'blur(20px)'
    }} className="animitem bg-white/5 border border-[#4A5546] rounded-2xl flex flex-col p-7 gap-5 min-h-max" >
        {/* title */}
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-bold">Pre-Deposit Pool</div>
                <div className="text-xs font-medium">Network: {data.net}</div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="opacity-60 text-xs font-medium">Total Deposited</div>
                <div className="text-sm font-medium">
                    <span className="text-2xl font-bold mr-2">{totalDeposit.toString()}</span>
                    Licenses
                </div>
            </div>
        </div>
        <div className="bg-[#4A5546] h-px w-full shrink-0" />
        {/* deposit withdraw */}
        <div className="flex gap-5 flex-1 flex-col sm:flex-row">
            {/* deposit */}
            <div className="flex-1 flex flex-col justify-between items-center h-full gap-5 pb-5">
                <div className="self-start">In-Wallet: {nfts.length}</div>
                <InSvg />
                <SimpleDialog
                    triggerRef={depositRef}
                    triggerProps={{ className: 'flex-1', disabled: !data.preDeposit }}
                    trigger={
                        <BtnB disabled={!data.preDeposit}>Deposit</BtnB>
                    }
                >
                    <LntPreDeposit node={data} onSuccess={() => { depositRef.current?.click(); reFetData(); reFetUser() }} />
                </SimpleDialog>

            </div>
            <div className="bg-[#4A5546] h-px w-full sm:w-px sm:h-full shrink-0" />
            {/* withdraw */}
            <div className="flex-1 flex flex-col justify-between items-center h-full gap-5 pb-5">
                <div className="self-end">Deposited: {deposited.length}</div>
                <OutSvg />
                <SimpleDialog
                    triggerRef={withdrawRef}
                    triggerProps={{ className: 'flex-1', disabled: !data.preDeposit || (data.preDeposit.withdrawTime || 0) > now() }}
                    trigger={
                        <BtnB disabled={!data.preDeposit || (data.preDeposit.withdrawTime || 0) > now()}>Withdraw</BtnB>
                    }
                >
                    <LntPreWithdraw node={data} onSuccess={() => { withdrawRef.current?.click(); reFetData(); reFetUser() }} />
                </SimpleDialog>
            </div>
        </div>
    </div>
}


export function PreDeposit({ data }: { data: NodeLicense }) {
    return <div className="gap-4 xl:gap-8 w-full grid xl:grid-cols-[5fr_6fr]">
        <NodeLicenseInfo data={data} />
        <PrePool data={data} />
    </div>
}


