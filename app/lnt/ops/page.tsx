'use client'

import ConnectBtn from "@/components/connet-btn";
import { Expandable, GeneralAction, inputClassname } from "@/components/general-action";
import { PageWrap } from "@/components/page-wrap";
import { SimpleDialog } from "@/components/simple-dialog";
import STable from "@/components/simple-table";
import { Spinner } from "@/components/spinner";
import { BBtn } from "@/components/ui/bbtn";
import { SimpleSelect } from "@/components/ui/select";
import { abiLntVault } from "@/config/abi/abiLNTVault";
import { getOpsAdmins, getOpsAethirRewards, getOpsStatsAethir, modifyOpsAdmins, opsOrderAethir } from "@/config/api";
import { LntVaultConfig, LNTVAULTS_CONFIG } from "@/config/lntvaults";
import { arbitrum } from "@/config/network";
import useCopy from "@/hooks/useCopy";
import { useLntVault } from "@/hooks/useFetLntVault";
import { toJson } from "@/lib/bnjson";
import { isError, isLoading, isSuccess, reFet, useFet } from "@/lib/useFet";
import { cn, FMT, fmtDate, handleError, promiseAll, shortStr, tryToBn, UnPromise } from "@/lib/utils";
import { getPC } from "@/providers/publicClient";
import { displayBalance } from "@/utils/display";
import { useMutation } from "@tanstack/react-query";
import { flatten, range, trim } from "es-toolkit";
import { useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { useLocalStorage, useSetState } from "react-use";
import { toast } from "sonner";
import { Address, erc721Abi, isAddress, isAddressEqual, parseAbi, parseEther } from "viem";
import { useAccount, useSignMessage, useWalletClient } from "wagmi";


function NumItem({ num, tit, numClassName }: { num?: number | string, tit: string, numClassName?: string }) {
    return <div className="animitem flex flex-col p-5 items-center gap-6 rounded-xl border border-primary/60">
        <div className="text-center text-base">{tit}</div>
        <div className={cn("text-5xl font-medium text-center", numClassName)}>{num ?? '-'}</div>
    </div>
}
function AethirOpsManager({ vc, token }: { vc: LntVaultConfig, token: string }) {
    const { copyTextToClipboard } = useCopy()
    const vd = useLntVault(vc)
    const data = useFet({
        key: vd.data ? `AethirOpsManagerData: ${vc.vault}` : '',
        fetfn: async () => {
            const pc = getPC(vc.chain)
            // vault nfts
            const vaultNftCount = await pc.readContract({ abi: erc721Abi, functionName: 'balanceOf', address: vc.asset, args: [vc.vault] })
            const erc721AbiMore = parseAbi([
                'function tokenIdsOfOwnerByAmount(address owner, uint256 index) view returns(uint256[])'
            ])
            const setUserCount = await pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'setUserRecordCount' })
            console.info('setUserCount:', setUserCount)
            const getSetUsers = async () => {
                const chunkSize = 200n
                const chunkList: { index: bigint, count: bigint }[] = []
                const chunkCount = setUserCount / chunkSize
                for (let index = 0n; index < chunkCount; index++) {
                    chunkList.push({ index: index * chunkSize, count: chunkSize })
                }
                let mod = setUserCount % chunkSize;
                if (mod > 0) {
                    chunkList.push({ index: chunkSize * chunkCount, count: mod })
                }
                return Promise.all(chunkList.map(({ index, count }) => pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'setUserRecordsInfo', args: [index, count] }).then(
                    ([tokenIds, owners, users, isBan]) => {
                        return tokenIds.map((tokenId, i) => ({ tokenId, owner: owners[i], user: users[i], isBanned: isBan[i] }))
                    }
                ))).then(flatten)
            }
            const getVaultNft = async () => pc.readContract({ abi: erc721AbiMore, functionName: 'tokenIdsOfOwnerByAmount', address: vc.asset, args: [vc.vault, vaultNftCount] }).then(data => data.map(id => id.toString()))
            const data = await promiseAll({
                vaultNft: getVaultNft(),
                setUsers: getSetUsers(),
                opsStats: getOpsStatsAethir(vc.chain, token),
                rewards: getOpsAethirRewards(vc.chain, token),
            })
            // calc
            const inBunnerNftMap: { [k: string]: (typeof data.opsStats.burners)[number] } = {}
            const bunnerAddress: Address[] = []
            for (const bunnerItem of data.opsStats.burners) {
                if (!bunnerItem.delegated_nfts) bunnerItem.delegated_nfts = []
                bunnerItem.burner_wallet = bunnerItem.burner_wallet.startsWith('0x') ? bunnerItem.burner_wallet : `0x${bunnerItem.burner_wallet}`
                for (const nftId of bunnerItem.delegated_nfts) {
                    inBunnerNftMap[nftId] = bunnerItem
                }
                bunnerAddress.push(bunnerItem.burner_wallet)
            }
            const inSetUsersMap: { [k: string]: (typeof data.setUsers)[number] } = {}
            for (const setuser of data.setUsers) {
                inSetUsersMap[setuser.tokenId.toString()] = setuser
            }
            const pending: string[] = []
            const error: string[] = []
            const success: string[] = []
            for (const id of data.vaultNft) {
                if (inBunnerNftMap[id]) {
                    success.push(id)
                } else if (inSetUsersMap[id] && bunnerAddress.find(add => isAddressEqual(add, inSetUsersMap[id].user))) {
                    pending.push(id)
                } else {
                    error.push(id)
                }
            }
            return { ...data, pending, error, success, inSetUsersMap, inBunnerNftMap }
        }
    })

    const [{ detailBuner, delegateTo, delegateIds, delegateExpire, openCofrimOrder, filterVaultNftIds }, setState] = useSetState<{
        detailBuner?: UnPromise<ReturnType<typeof getOpsStatsAethir>>['burners'][number]
        delegateTo: string
        delegateIds?: string
        delegateExpire: bigint
        openCofrimOrder: boolean
        filterVaultNftIds?: string
    }>({ delegateTo: '', delegateExpire: (2n ** 63n), openCofrimOrder: false })
    const delegateToAdd = delegateTo ?? data.data?.opsStats.burners[0]?.burner_wallet ?? ''
    const delegateIdsStr = delegateIds ?? data.data?.error.join(',') ?? ''
    const { mutate: orderNodeOps, isPending: isBusyOrder } = useMutation({
        mutationFn: async () => opsOrderAethir(vc.chain, token, 1),
        onError: handleError,
        onSuccess: () => {
            toast.success("Success!")
            setState({ openCofrimOrder: false })
            reFet(data.key)
        }
    })
    const { data: wc } = useWalletClient()
    const { mutate: doDelegate, isPending: isBusyDelegate } = useMutation({
        mutationFn: async () => {
            if (!wc || !delegateIdsStr || !delegateToAdd || !delegateExpire) throw new Error('Please input!')
            const to = delegateToAdd as Address
            const ids = (delegateIdsStr ?? '').split(',').map(item => trim(item)).filter(Boolean).map(BigInt)
            const tos = ids.map(() => to)
            await wc.writeContract({ abi: abiLntVault, address: vc.vault, functionName: 'batchSetUser', args: [ids, tos, delegateExpire] })
        },
        onError: handleError,
        onSuccess: () => {
            toast.success("Success!")
            reFet(data.key)
        }
    })

    const bunners = (data.data?.opsStats.burners ?? [])
    const bunerCapacity = (planId: string) => {
        return (data.data?.opsStats.deployments.find(item => item.plan_id == planId)?.no_of_nodes ?? 1) * 100
    }
    const createAt = (planId: string) => {
        return data.data?.opsStats.deployments.find(item => item.plan_id == planId)?.start_date ?? '-'
    }
    const vaultNfts = (data.data?.vaultNft ?? []).reverse()
    const inBunnerNftMap = data.data?.inBunnerNftMap ?? {}
    const inSetUsersMap = data.data?.inSetUsersMap ?? {}
    const inSetUsers = (id: string) => {
        return inSetUsersMap[id] && bunners.find(buner => isAddressEqual(buner.burner_wallet, inSetUsersMap[id].user))
    }
    const createFiterNftMap = () => {
        if (!filterVaultNftIds) return undefined
        try {
            const nftids = filterVaultNftIds.trim().split(",").map(item => item.trim()).filter(Boolean)
            const map: { [k: string]: boolean } = {}
            for (const item of nftids) {
                map[item] = true
            }
            return map
        } catch (error) {
            return {}
        }
    }
    const filterNftMap = createFiterNftMap()
    const showVaultNfts = filterNftMap ? vaultNfts.filter(id => filterNftMap[id]) : vaultNfts
    const itemClassName = 'flex flex-col gap-2 p-5 bg-black/10 dark:bg-white/10 rounded-xl'

    if (isLoading(data)) return <div className="flex justify-center items-center"> <Spinner /></div>
    if (isError(data)) return <div className="flex flex-col justify-center items-center">
        <div>Network error!</div>
        <BBtn onClick={() => reFet(data.key)}>Refresh</BBtn>
    </div>
    if (!isSuccess(data)) return null
    return <div className={cn(itemClassName, 'gap-5')}>
        <div className=" font-semibold text-2xl">{vc.tit}</div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
            <NumItem tit="Vault Deposited" num={data.data?.vaultNft.length} numClassName="" />
            <NumItem tit="Delegate Success" num={data.data?.success.length} numClassName="text-green-500" />
            <NumItem tit="Delegate Pending" num={data.data?.pending.length} numClassName="text-yellow-500" />
            <NumItem tit="Not Delegate" num={data.data?.error.length} numClassName="text-red-500" />
        </div>
        <div className={cn(itemClassName, 'overflow-x-auto')}>
            <div className="font-semibold text-xl">{"BurnerList"}</div>
            <STable
                header={['Item', 'Burner Address', 'Delegated', 'Remaining', 'Created', 'Expires']}
                data={bunners.map((buner, i) => [
                    `${i + 1}`,
                    <div key={'burneraddress'} className="flex items-center gap-2">{shortStr(buner.burner_wallet)} <FaCopy className="cursor-pointer" onClick={(e) => {
                        copyTextToClipboard(buner.burner_wallet)
                        e.stopPropagation()
                        e.preventDefault()
                    }} /></div>,
                    `${buner.delegated_nfts_count}`,
                    <div key="ramining" className="">{`${bunerCapacity(buner.plan_id) - buner.delegated_nfts_count}`}</div>,
                    createAt(buner.plan_id).replaceAll("+0000", '').trim(),
                    buner.expire_at.replaceAll("+0000", '').trim(),
                ])}
                onClickRow={(i) => setState({ detailBuner: bunners[i] })}
            />
        </div>
        <Expandable className="bg-black/10 dark:bg-white/10 rounded-xl" tit="Rewards">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
                <NumItem tit="Un Claim" num={displayBalance(parseEther(data.data?.rewards.claimable_ath ?? '0'))} numClassName="" />
                <NumItem tit="Claimed" num={displayBalance(data.data?.rewards.totalClaimed)} numClassName="text-yellow-500" />
                <NumItem tit="Un Withdraw" num={displayBalance(data.data?.rewards.pendingClaimed)} numClassName="text-red-500" />
                <NumItem tit="Withdrawal" num={displayBalance(data.data?.rewards.withdrawAmount)} numClassName="text-green-500" />
                <NumItem tit="Claim Fee" num={5 * (data.data?.rewards.claims.length ?? 0)} numClassName="text-orange-500" />
            </div>
            <div>Un withdraw list:</div>
            <STable
                header={['OrderID', 'Amount', 'Claim At', 'Can Withdraw At']}
                data={(data.data?.rewards.claims ?? []).filter(item => !data.data?.rewards.withdrawsOrderIds.includes(item.orderId)).map((item, i) => [
                    `${item.orderId}`,
                    displayBalance(item.amount),
                    fmtDate(item.time * 1000, FMT.ALL),
                    fmtDate((item.time + item.cliffSecond) * 1000, FMT.ALL),
                ])}
            />
        </Expandable>
        <Expandable className="bg-black/10 dark:bg-white/10 rounded-xl" tit="Set Delegate (batchSetUser)">
            <input className={cn(inputClassname)} placeholder="Burner address" value={delegateToAdd} onChange={(e) => setState({ delegateTo: e.target.value })} />
            <input className={cn(inputClassname)} placeholder="NftIds(,分割多个)" value={delegateIdsStr} onChange={(e) => setState({ delegateIds: e.target.value })} />
            <input className={cn(inputClassname)} placeholder="ExpireTime" value={delegateExpire.toString()} onChange={(e) => setState({ delegateExpire: tryToBn(e.target.value) })} />
            <BBtn onClick={doDelegate as any} busy={isBusyDelegate} disabled={isBusyDelegate}>Delegate</BBtn>
        </Expandable>
        <div className={cn(itemClassName, "xl:flex-row items-center gap-6")}>
            <GeneralAction abi={abiLntVault} functionName='updateCheckerNode' address={vc.vault}
                infos={() => getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'checkerNode' })}
            />
            <BBtn onDoubleClick={() => setState({ openCofrimOrder: true })}>Order from Nodeops(Double Click)</BBtn>
            <SimpleDialog
                open={openCofrimOrder}
                className="p-5"
                onOpenChange={(open) => !open && setState({ openCofrimOrder: false })}>
                <div>Comfirm Order</div>
                <div>是否确认下单？</div>
                <div className="pt-8">
                    <BBtn onClick={orderNodeOps as any} busy={isBusyOrder} disabled={isBusyOrder}>Confrim</BBtn>
                </div>
            </SimpleDialog>
        </div>

        <div className={cn(itemClassName, 'overflow-x-auto')}>
            <div className="font-semibold text-xl">{"Vault NFT"}</div>
            <input className={cn(inputClassname)} placeholder="FilterNftIds(,分割多个)" value={filterVaultNftIds} onChange={(e) => setState({ filterVaultNftIds: e.target.value })} />
            <div className="w-full overflow-y-auto max-h-[80vh]">
                <STable
                    headerClassName="sticky top-0 bg-black/60"
                    header={['Lisense ID', 'Status', 'isBanned']}
                    data={showVaultNfts.map((id) => {
                        const status = inBunnerNftMap[id] ? 'Sucsess' : inSetUsers(id) ? 'Pending' : 'Error';
                        return [
                            `${id}`,
                            <div key={'status'} className={cn("", { "text-green-500": status == 'Sucsess', "text-yellow-500": status == 'Pending', "text-red-500": status == 'Error' })}>{status}</div>,
                            `${inSetUsersMap[id]?.isBanned ?? false}`
                        ]
                    })}
                />
            </div>
        </div>
        <SimpleDialog
            open={Boolean(detailBuner)}
            className="p-5"
            onOpenChange={(open) => !open && setState({ detailBuner: undefined })}>
            <div>Lisense ID</div>
            {detailBuner && <div className="w-full max-w-[600px] grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-1 p-5 max-h-[60vh] overflow-y-auto">
                {detailBuner.delegated_nfts.map(id => <div key={id} className="px-2 py-1 rounded-sm bg-primary/10">{id}</div>)}
            </div>}
        </SimpleDialog>
    </div>
}

const modifytypes = ['add', 'del'] as const
export default function Page() {
    const [opsToken, setOpsToken] = useLocalStorage('ops-token', '')
    const { signMessageAsync } = useSignMessage()
    const { address } = useAccount()
    const admins = useFet({
        key: opsToken ? 'OpsAdmins' : '',
        initResult: [],
        fetfn: async () => getOpsAdmins(arbitrum.id, opsToken!)
    })
    const { mutate } = useMutation({
        mutationFn: async () => {
            const signature = await signMessageAsync({ message: 'Auth for zoofi ops' })
            const nToken = btoa(signature)
            await getOpsAdmins(arbitrum.id, nToken)
            setOpsToken(btoa(signature))
        },
        onError: handleError
    })
    const { mutate: modifyAdmins, isPending: isBusyModify } = useMutation({
        mutationFn: async (type: (typeof modifytypes)[number]) => {
            if (!modifyAdd || !isAddress(modifyAdd)) throw new Error("Params errors")
            await modifyOpsAdmins(arbitrum.id, opsToken!, { type, user: modifyAdd as Address })
        },
        onSuccess: () => reFet(admins.key),
        onError: handleError
    })
    const [modifyAdd, setModifyAdd] = useState('')
    const [modifyType, setModifyType] = useState<(typeof modifytypes)[number]>('add')
    return <PageWrap className="flex flex-col gap-5 max-w-6xl font-sec">
        {
            opsToken ? <>
                <Expandable className="bg-black/10 dark:bg-white/10 rounded-xl" tit="Admins">
                    <div className="p-5 rounded-sm bg-primary/10">
                        {toJson(admins.data, undefined, 2)}
                    </div>
                    <input className={cn(inputClassname)} value={modifyAdd} onChange={(e) => setModifyAdd(e.target.value)} />
                    <SimpleSelect options={modifytypes} onChange={setModifyType} />
                    <BBtn className="flex gap-5 items-center justify-center" onClick={() => modifyAdmins(modifyType)} busy={isBusyModify} disabled={isBusyModify}>Modify Admins</BBtn>
                </Expandable>
                {LNTVAULTS_CONFIG.filter(item => item.isAethir && !item.test).map(vc => <AethirOpsManager vc={vc} token={opsToken} key={vc.vault} />)}
            </> : <div className="py-36 px-5 flex justify-center">
                {
                    !address ? <ConnectBtn /> : <BBtn onClick={() => mutate()} className="">Login</BBtn>
                }
            </div>
        }
    </PageWrap>
}