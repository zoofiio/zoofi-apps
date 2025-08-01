'use client'

import ConnectBtn from "@/components/connet-btn";
import { PageWrap } from "@/components/page-wrap";
import { Spinner } from "@/components/spinner";
import { BBtn } from "@/components/ui/bbtn";
import { abiLntVault } from "@/config/abi/abiLNTVault";
import { getOpsAdmins, getOpsStatsAethir, opsOrderAethir } from "@/config/api";
import { LntVaultConfig, LNTVAULTS_CONFIG } from "@/config/lntvaults";
import { useCurrentChainId } from "@/hooks/useCurrentChainId";
import { useLntVault } from "@/hooks/useFetLntVault";
import { isError, isLoading, useFet } from "@/lib/useFet";
import { handleError, promiseAll } from "@/lib/utils";
import { getPC } from "@/providers/publicClient";
import { useMutation } from "@tanstack/react-query";
import { flatten, range } from "es-toolkit";
import { useLocalStorage } from "react-use";
import { Address, erc721Abi, parseAbi } from "viem";
import { useAccount, useSignMessage } from "wagmi";

function AethirOpsManager({ vc, token }: { vc: LntVaultConfig, token: string }) {
    const vd = useLntVault(vc)
    const data = useFet({
        key: vd.result ? `AethirOpsManagerData: ${vc.vault}` : '',
        fetfn: async () => {
            const pc = getPC(vc.chain)
            // vault nfts
            const vaultNftCount = await pc.readContract({ abi: erc721Abi, functionName: 'balanceOf', address: vd.result!.NFT, args: [vc.vault] })
            const nftIs = range(parseInt(vaultNftCount.toString())).map(index => BigInt(index))
            const erc721AbiMore = parseAbi(['function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)'])
            const setUserCount = await pc.readContract({ abi: abiLntVault, address: vc.vault, functionName: 'setUserRecordCount' })
            const getSetUsers = async () => {
                const chunkSize = 100n
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
            const data = await promiseAll({
                vaultNft: Promise.all(nftIs.map(i => pc.readContract({ abi: erc721AbiMore, functionName: 'tokenOfOwnerByIndex', address: vd.result!.NFT, args: [vc.vault, i] }))),
                setUsers: getSetUsers(),
                opsStats: getOpsStatsAethir(vc.chain, token),
            })
            // calc

        }
    })
    const { mutate: orderNodeOps } = useMutation({
        mutationFn: async () => opsOrderAethir(vc.chain, token, 1),
        onError: handleError,
    })
    if (isLoading(data)) return <Spinner />
    return <div className="flex flex-col gap-5">
        <div className="animitem font-semibold text-xl">{vc.tit}</div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">

        </div>

    </div>
}

export default function Page() {
    const [opsToken, setOpsToken] = useLocalStorage('ops-token', '')
    const { signMessageAsync } = useSignMessage()
    const chainId = useCurrentChainId()
    const { address } = useAccount()
    const { mutate } = useMutation({
        mutationFn: async () => {
            const signature = await signMessageAsync({ message: 'Auth for zoofi ops' })
            const nToken = btoa(signature)
            await getOpsAdmins(chainId, nToken)
            setOpsToken(btoa(signature))
        },
        onError: handleError
    })
    return <PageWrap>
        {
            opsToken ? <>
                {LNTVAULTS_CONFIG.filter(item => item.isAethir && !item.test).map(vc => <AethirOpsManager vc={vc} token={opsToken} key={vc.vault} />)}
            </> : <>
                {
                    !address ? <ConnectBtn /> : <BBtn onClick={() => mutate()} className="animitem">Login</BBtn>
                }
            </>
        }
    </PageWrap>
}