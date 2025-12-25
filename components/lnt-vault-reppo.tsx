import { abiReppoLntVault } from "@/config/abi/abiLNTVault";
import { LntVaultConfig } from "@/config/lntvaults";
import { getTokenBy } from "@/config/tokens";
import { useLntVault, useLntVaultVTC } from "@/hooks/useFetLntVault";
import { useErc721Balance } from "@/hooks/useToken";
import { reFet, useFet } from "@/lib/useFet";
import { cn, fmtBn, formatPercent } from "@/lib/utils";
import { getPC } from "@/providers/publicClient";
import { displayBalance } from "@/utils/display";
import { keys } from "es-toolkit/compat";
import { useRef, useState } from "react";
import { useSetState } from "react-use";
import { toast } from "sonner";
import { erc721Abi, isAddressEqual, parseEther } from "viem";
import { TX, Txs, TXSType } from "./approve-and-tx";
import { SimpleDialog } from "./simple-dialog";
import { ConfigChainsProvider } from "./support-chains";
import { TokenInput } from "./token-input";
import { BBtn } from "./ui/bbtn";
import { DECIMAL } from "@/constants";


export function useReppoLntVaultNFTs(vc: LntVaultConfig) {
    return useFet({
        key: vc.reppo ? `ReppoLntVaultNFTs:${vc.vault}` : '',
        initResult: [],
        fetfn: async () => {
            const [nfts, avts] = await getPC(vc.chain).readContract({ abi: abiReppoLntVault, address: vc.vault, functionName: 'NFTs' })
            return nfts.map((nft, i) => ({ NFT: nft, aVT: avts[i] }))
        }
    })
}

function DepositReppo({ vc, onSuccess }: { vc: LntVaultConfig, onSuccess: () => void }) {
    const vd = useLntVault(vc)

    const withdrawPrice = vd.data?.aVT ?? 0n
    const maxSelected = 30;
    const [curentNft, setCurrentNft] = useState(vc.reppo!.standard)
    const [selectedNft, setSelectNft] = useSetState<{ [tokenId: string]: boolean }>({})
    const tokenIds = keys(selectedNft).filter(item => selectedNft[item]).map(item => BigInt(item))
    const chainId = vc.deposit?.chain ?? vc.chain
    const mVault = vc.deposit?.vault ?? vc.vault
    const reppoNfts = useReppoLntVaultNFTs(vc)
    const standarPrice = reppoNfts.data.find(item => isAddressEqual(item.NFT, vc.reppo!.standard))?.aVT ?? 0n
    const premiumPrice = reppoNfts.data.find(item => isAddressEqual(item.NFT, vc.reppo!.preminum))?.aVT ?? 0n
    const currentPrice = curentNft == vc.reppo!.standard ? standarPrice : premiumPrice
    const nftsStandard = useErc721Balance(chainId, vc.reppo!.standard, vc.nftBalanceBy)
    const nftsPreminum = useErc721Balance(chainId, vc.reppo!.preminum, vc.nftBalanceBy)
    const vtc = useLntVaultVTC(vc)
    const outAmountVT = (currentPrice - currentPrice * parseEther(vtc.toFixed(6)) / DECIMAL) * BigInt(tokenIds.length)
    const nfts = curentNft == vc.reppo!.standard ? nftsStandard : nftsPreminum
    const vt = getTokenBy(vd.data!.VTbyDeposit ?? vd.data!.VT, chainId, { symbol: 'VT' })!
    const onClickOne = (id: string) => {
        if (selectedNft[id.toString()]) {
            setSelectNft({ [id.toString()]: false })
        } else {
            if (tokenIds.length >= maxSelected) {
                toast.error(`Up to ${maxSelected}`)
            } else {
                setSelectNft({ [id.toString()]: true })
            }
        }
    }
    const clearSelectNft = () => {
        setSelectNft(keys(selectedNft).reduce((p, item) => ({ ...p, [item]: false }), {} as { [tokenId: string]: boolean }))
    }
    const onClickAll = () => {
        if (tokenIds.length >= maxSelected) {
            toast.error(`Up to ${maxSelected}`)
        } else {
            const snft: { [tokenId: string]: boolean } = {}
            nfts.data.filter(item => !selectedNft[item.toString()]).slice(0, maxSelected - tokenIds.length).forEach(item => {
                snft[item] = true
            })
            console.info('onClickAll:', snft, selectedNft, tokenIds)
            setSelectNft(snft)
        }
    }

    const getTxs: TXSType = async ({ pc, wc }) => {
        const approves: TX[] = []
        if (!(await pc.readContract({ abi: erc721Abi, address: curentNft, functionName: 'isApprovedForAll', args: [wc.account.address!, mVault] }))) {
            const alreadyApproves = await Promise.all(tokenIds.map(id => pc.readContract({ abi: erc721Abi, address: curentNft, functionName: 'getApproved', args: [id] })))
            alreadyApproves.forEach((ap, i) => {
                if (!isAddressEqual(ap, vc.vault)) {
                    approves.push({ abi: erc721Abi, address: curentNft, functionName: 'approve', args: [mVault, tokenIds[i]], name: `Approve #${tokenIds[i].toString()}` })
                }
            })
        }
        return [
            ...approves,
            {
                name: 'Deposit',
                abi: abiReppoLntVault,
                address: mVault,
                functionName: 'deposit',
                enabled: tokenIds.length > 0,
                args: [curentNft, tokenIds]
            }
        ]
    }
    return <div className='flex flex-col gap-5 items-center p-5'>
        <div className='w-full text-start font-medium flex items-center justify-between'>Licenses ID
            <div className="flex ml-auto items-center gap-5 mr-10">
                <div className={cn("cursor-pointer underline-offset-4", { 'underline': curentNft === vc.reppo!.standard })}
                    onClick={() => {
                        if (curentNft !== vc.reppo!.standard) {
                            clearSelectNft(); setCurrentNft(vc.reppo!.standard)
                        }
                    }}>Standard</div>
                <div className={cn("cursor-pointer underline-offset-4", { 'underline': curentNft === vc.reppo!.preminum })}
                    onClick={() => {
                        if (curentNft !== vc.reppo!.preminum) {
                            clearSelectNft(); setCurrentNft(vc.reppo!.preminum)
                        }
                    }}>Premium</div>
            </div>
        </div>
        <div className='w-lg h-72 overflow-y-auto'>
            <div className='w-full gap-2 grid grid-cols-4 '>
                {nfts.data.map(id => (
                    <div key={id.toString()}
                        className={cn('flex gap-1 items-center cursor-pointer', { 'text-primary': selectedNft[id.toString()] })}
                        onClick={() => onClickOne(id)}
                    >
                        <div className={cn('w-3 h-3 border border-black/20 bg-[#EBEBEB] rounded-full', { 'bg-primary': selectedNft[id.toString()] })} />
                        #{id.toString()}
                    </div>))}
            </div>
        </div>
        <BBtn className='' onClick={onClickAll}>Select All</BBtn>
        <div className='flex flex-col gap-1 w-full'>
            <div className='w-full'>Receive</div>
            <TokenInput tokens={[vt]} loading={false} disable amount={fmtBn(outAmountVT, vt.decimals)} />
        </div>
        <div className='text-sm opacity-60 text-center flex justify-between gap-5 w-full'>
            <div className='text-left'>
                {`1 License = ${displayBalance(currentPrice, undefined, vt.decimals)} ${vt.symbol}`}
            </div>
            <div>
                {`Operation Fees : ${formatPercent(vtc, 2, false)}`}
            </div>
        </div>
        <ConfigChainsProvider chains={chainId}>
            <Txs
                tx='Deposit'
                onTxSuccess={() => {
                    const nStat: { [id: string]: boolean } = {}
                    tokenIds.forEach((id) => {
                        nStat[id.toString()] = false
                    })
                    setSelectNft(nStat)
                    reFet(nfts.key, vd.key)
                    onSuccess()
                }}
                disabled={tokenIds.length == 0}
                txs={getTxs} />
        </ConfigChainsProvider>
    </div>
}

export function LntVaultDepositReppo({ vc }: { vc: LntVaultConfig }) {
    const depositRef = useRef<HTMLButtonElement>(null)
    const vd = useLntVault(vc)
    const vt = getTokenBy(vd.data!.VT, vc.chain, { symbol: 'VT' })!
    const reppoNfts = useReppoLntVaultNFTs(vc)
    const standarPrice = reppoNfts.data.find(item => isAddressEqual(item.NFT, vc.reppo!.standard))?.aVT ?? 0n
    const premiumPrice = reppoNfts.data.find(item => isAddressEqual(item.NFT, vc.reppo!.preminum))?.aVT ?? 0n
    return <div className='flex flex-col h-full justify-between shrink-0 gap-6 w-full md:w-fit'>
        <div className='flex items-center text-sm justify-between whitespace-nowrap'>
            <span className='font-def text-lg'>Total Deposited</span>
            <span className='opacity-50 ml-1'>Licenses</span>
        </div>
        <div className='font-def text-xl font-bold text-center'>{displayBalance(vd.data!.activeDepositCount, 0, 0)}</div>
        <div className='flex flex-col gap-5 justify-between lg:px-8 my-auto font-sec'>
            <SimpleDialog
                triggerRef={depositRef}
                trigger={
                    <BBtn className='shrink-0'>Deposit</BBtn>
                }
            >
                <DepositReppo vc={vc} onSuccess={() => depositRef.current?.click()} />
            </SimpleDialog>
            <div className='mt-4 text-sm opacity-60 text-center'>
                {`1 Standard = ${displayBalance(standarPrice, undefined, vt.decimals)} ${vt.symbol}`}
            </div>
            <div className='text-sm opacity-60 text-center'>
                {`1 Premium = ${displayBalance(premiumPrice, undefined, vt.decimals)} ${vt.symbol}`}
            </div>
        </div>

    </div>
}