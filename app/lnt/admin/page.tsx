'use client'

import { ApproveAndTx } from '@/components/approve-and-tx'
import { AsyncInfo, ContractAll, Erc20Approve, Expandable, GeneralAction, inputClassname } from '@/components/general-action'
import { MultiTxTemp } from '@/components/multitxs'
import { PageWrap } from '@/components/page-wrap'
import { Spinner } from '@/components/spinner'
import { ConfigChainsProvider } from '@/components/support-chains'
import { SimpleSelect } from '@/components/ui/select'
import { abiMockERC20, abiMockERC721, abiProtocolSettings } from '@/config/abi'
import { abiAethirNFT, abiAethirVToracle, abiLntBuyback, abiLntProtocol, abiLntVault, abiLntVaultDepositExt, abiLVTVault, abiMockaVToracle, abiMockNodeDelegator, abiMockRewardDistributor, abiRedeemStrategy, abiReppoLntVault, abiZeroGVToracale } from '@/config/abi/abiLNTVault'
import { LNTVAULTS_CONFIG } from '@/config/lntvaults'
import { getChain, isTestnet } from '@/config/network'
import { fetLntVault } from '@/hooks/useFetLntVault'
import { cn, FMT, fmtDate, promiseAll, shortStr } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useSetState } from 'react-use'
import { Address, erc1155Abi, formatUnits, parseUnits, stringToHex } from 'viem'


type ParamItem = { show: string; value: string; units?: number /** def 10 */ }

function UpdateVaultParams({ paramList, vault, protocoSettingAddress, chain }: { chain: number, paramList: ParamItem[]; vault: Address; protocoSettingAddress: Address }) {
  const params = useMemo(() => paramList.map((p, i) => ({ ...p, show: `${p.show}(${p.value})`, key: `param:${i}` })), [paramList])
  const [{ value, param }, setState] = useSetState({
    value: '',
    param: params[0],
  })
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['vualtParams:', chain, vault, paramList],
    queryFn: async () => {
      const all: any = {}
      const pc = getPC(chain)
      paramList.forEach(item => {
        all[`${item.show}(${item.value})`] = pc.readContract({ abi: abiProtocolSettings, address: protocoSettingAddress, functionName: 'vaultParamValue', args: [vault, stringToHex(item.value, { size: 32 })] })
          .then((res => formatUnits((res as unknown as bigint) || 0n, typeof item.units == 'number' ? item.units : 10)))
      })
      return promiseAll(all)
    }
  })
  const currentUnits = typeof param.units == 'number' ? param.units : 10
  return (
    <Expandable tit='Vault Param Vaule'>
      <SimpleSelect className='w-full animitem z-50' itemClassName='p-3' currentClassName='p-3' listClassName='max-h-[350px] overflow-y-auto' options={params} onChange={(data) => setState({ param: data })} />
      <input
        value={value.toString()}
        onChange={(e) => {
          const numstr = (e.target.value || '').replaceAll('-', '').replaceAll('+', '')
          setState({ value: numstr })
        }}
        type='number'
        className={cn(inputClassname)}
        pattern='[0-9.]{36}'
        step={1}
        placeholder='0'
      />
      <div className='text-sm flex flex-col items-start min-h-[300px] whitespace-pre-wrap'>
        {isFetching && <Spinner className='text-xl' />}
        {JSON.stringify(data, undefined, 2)}
      </div>
      <ApproveAndTx
        tx='Write'
        config={{
          abi: abiProtocolSettings,
          address: protocoSettingAddress,
          functionName: 'updateVaultParamValue',
          args: [vault, stringToHex(param.value, { size: 32 }), parseUnits(value, currentUnits)],
        }}
        onTxSuccess={() => {
          setState({ value: '' })
          refetch()
        }}
        className=' w-full flex items-center justify-center gap-4'
      />
    </Expandable>
  )
}
const LntVaultParams: ParamItem[] = [
  { show: '', value: 'VTC', units: 18 },
  { show: '', value: 'BuybackDiscountThreshold', units: 18 },
  { show: '', value: 'BuybackProfitCommissionRate', units: 18 },
  { show: '', value: 'initialAnchor', units: 18 },
  { show: '', value: 'scalarRoot', units: 18 },
  { show: '', value: 'vtSwapFee', units: 18 },
  { show: '', value: 'R', units: 18 },
]
const LntVaultParams2_1: ParamItem[] = [
  { show: '', value: 'VTC', units: 18 }
]
const LntVaultParams2_2: ParamItem[] = [
  { show: '', value: 'VestingRate', units: 18 },
  { show: '', value: 'initialAnchor', units: 18 },
  { show: '', value: 'scalarRoot', units: 18 },
  { show: '', value: 'vtSwapFee', units: 18 },
  { show: '', value: 'R', units: 18 },
]

const LntVaultParamsReppo: ParamItem[] = [
  ...LntVaultParams2_1,
  ...LntVaultParams2_2
]


export default function AdminPage() {
  const vcs = LNTVAULTS_CONFIG
  const options = vcs.map(item => ({ key: item.vault, show: `${item.isLVT ? 'LVT' : 'LNT'}-Vault  (${shortStr(item.vault)}) (${item.tit}) (${getChain(item.chain)!.name})`, vc: item }))
  const [current_, setCurrent] = useState<typeof options[0] | undefined>(options[0])
  const current = options.length > 0 ? current_ : undefined;
  return (
    <PageWrap>
      <div className='w-full flex'>
        <MultiTxTemp />
        <div className='flex flex-col gap-4 w-full mx-auto px-5'>
          <div className="animitem text-lg whitespace-pre-wrap p-2 bg-primary/20 rounded-xl">
            {JSON.stringify({
              'Decimal18': '000000000000000000',
              'Vault': current?.vc.vault
            }, undefined, 2)}
          </div>
          <SimpleSelect className='w-full animitem z-50' itemClassName='p-3 font-mono' currentClassName='p-3' options={options} onChange={setCurrent} />
          {
            current && <ConfigChainsProvider chains={[current.vc.chain]}>
              {
                current.vc.reppo ? <>
                  <UpdateVaultParams chain={current.vc.chain} vault={current.vc.vault} protocoSettingAddress={current.vc.protocalSettings} paramList={LntVaultParamsReppo} />
                  <ContractAll tit='Protocol' abi={abiLntProtocol} address={current.vc.protocol} />
                  <GeneralAction abi={abiLntVault} functionName='updateVTPriceTime' address={current.vc.vault}
                    infos={() => promiseAll({
                      vtPriceStartTime: getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'vtPriceStartTime' }),
                      vtPriceEndTime: getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'vtPriceEndTime' })
                    })} />
                  <ContractAll tit='Vault' abi={abiReppoLntVault} address={current.vc.vault} />
                  {current.vc.buybackPool && <ContractAll tit='Put Option' abi={abiLntBuyback} address={current.vc.buybackPool} />}
                </> :
                  current.vc.deposit ? <>
                    <Expandable tit={`Deposit/Withdraw NFT (${getChain(current.vc.deposit.chain)!.name})`}>
                      <ConfigChainsProvider chains={[current.vc.deposit.chain]}>
                        {current.vc.deposit.protocalSettings &&
                          <UpdateVaultParams
                            chain={current.vc.deposit.chain}
                            vault={current.vc.deposit.vault}
                            protocoSettingAddress={current.vc.deposit.protocalSettings}
                            paramList={LntVaultParams2_1}
                          />}
                        {current.vc.deposit.protocol && <ContractAll unwrap tit='Protocol' abi={abiLntProtocol} address={current.vc.deposit.protocol} />}
                        <GeneralAction disableAnim abi={abiMockERC721} tit={`mintMockErc721 (${current.vc.asset})`} functionName={'airdropByOwner'} address={current.vc.asset} />
                        <ContractAll unwrap tit='aVToracle' abi={abiZeroGVToracale} address={current.vc.deposit.vtOracle} />
                        <ContractAll unwrap tit='Vault' abi={abiLntVaultDepositExt} address={current.vc.deposit.vault} />
                      </ConfigChainsProvider>
                    </Expandable>
                    <Expandable tit={`Swap (${getChain(current.vc.chain)!.name})`}>
                      {current.vc.protocalSettings && <UpdateVaultParams chain={current.vc.chain} vault={current.vc.vault} protocoSettingAddress={current.vc.protocalSettings} paramList={LntVaultParams2_2} />}
                      <ContractAll unwrap tit='Protocol' abi={abiLntProtocol} address={current.vc.protocol} />
                      <GeneralAction disableAnim abi={abiLntVault} functionName='updateVTPriceTime' address={current.vc.vault}
                        infos={() => promiseAll({
                          vtPriceStartTime: getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'vtPriceStartTime' }),
                          vtPriceEndTime: getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'vtPriceEndTime' })
                        })} />
                      {current.vc.buybackPool && <ContractAll unwrap tit='Put Option' abi={abiLntBuyback} address={current.vc.buybackPool} />}
                      {current.vc.MockT && <>
                        <GeneralAction disableAnim abi={abiMockERC20} tit={'mockT setTester'} functionName='setTester' address={current.vc.MockT} />
                        <GeneralAction disableAnim abi={abiMockERC20} tit={`mintT (${current.vc.MockT})`} functionName='mint' address={current.vc.MockT} />
                      </>}
                      <Erc20Approve />
                    </Expandable>
                  </> :
                    current.vc.isLVT ? <>
                      <UpdateVaultParams chain={current.vc.chain} vault={current.vc.vault} protocoSettingAddress={current.vc.protocalSettings} paramList={LntVaultParams2_2} />
                      <ContractAll unwrap tit='Protocol' abi={abiLntProtocol} address={current.vc.protocol} />
                      <GeneralAction abi={abiLntVault} functionName='updateVTPriceTime' address={current.vc.vault}
                        infos={() => promiseAll({
                          vtPriceStartTime: getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'vtPriceStartTime' }),
                          vtPriceEndTime: getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'vtPriceEndTime' })
                        })} />
                      <ContractAll tit='ERC1155' abi={erc1155Abi} address={current.vc.asset} />
                      <ContractAll unwrap tit='LvtVault' abi={abiLVTVault} address={current.vc.vault} />
                      {current.vc.buybackPool && <ContractAll tit='Put Option' abi={abiLntBuyback} address={current.vc.buybackPool} />}
                    </> :
                      <>
                        <AsyncInfo keys={[current.vc.vault]} infos={() => fetLntVault(current.vc)} />
                        <UpdateVaultParams chain={current.vc.chain} vault={current.vc.vault} protocoSettingAddress={current.vc.protocalSettings} paramList={LntVaultParams} />
                        <GeneralAction abi={abiLntVault} functionName='withdrawProfitT' address={current.vc.vault} />
                        <GeneralAction abi={abiLntVault} functionName='close' address={current.vc.vault} />
                        <GeneralAction abi={abiLntVault} functionName='updateAutoBuyback' address={current.vc.vault}
                          infos={() => getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'autoBuyback' })} />
                        <GeneralAction abi={abiLntVault} functionName='updateCheckerNode' address={current.vc.vault}
                          infos={() => getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'checkerNode' })}
                        />
                        <GeneralAction abi={abiLntVault} functionName='setUser' address={current.vc.vault} argsDef={['', '', (2n ** 63n).toString()]} />
                        <GeneralAction abi={abiLntVault} functionName='batchSetUser' address={current.vc.vault} />
                        <GeneralAction abi={abiLntVault} functionName='setUserRecordsInfo' address={current.vc.vault} />
                        <GeneralAction abi={abiLntVault} functionName='removeLastSetUserRecords' address={current.vc.vault} />
                        <GeneralAction abi={abiLntVault} functionName='buybackVT' address={current.vc.vault} />
                        <GeneralAction abi={abiLntVault} functionName='updateVTPriceTime' address={current.vc.vault}
                          infos={() => promiseAll({
                            vtPriceStartTime: getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'vtPriceStartTime' }),
                            vtPriceEndTime: getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'vtPriceEndTime' })
                          })} />
                        <GeneralAction abi={abiLntVault} functionName='updateVTAOracle' address={current.vc.vault} />
                        <GeneralAction abi={abiLntVault} functionName='updateRedeemStrategy' address={current.vc.vault}
                          infos={() => getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'redeemStrategy' })}
                        />
                        <GeneralAction abi={abiLntVault} functionName='updateVTSwapHook' address={current.vc.vault} />
                        <GeneralAction abi={abiLntVault} functionName='updateAethirClaimAndWithdraw' address={current.vc.vault} />
                        <ContractAll unwrap tit='Protocol' abi={abiLntProtocol} address={current.vc.protocol} />
                        {current.vc.AethirVToracle && <ContractAll tit='AethirVToracle' abi={abiAethirVToracle} address={current.vc.AethirVToracle} />}
                        {current.vc.RedeemStrategy && <ContractAll tit='RedeemStrategy' abi={abiRedeemStrategy} address={current.vc.RedeemStrategy}
                          itemInfos={{
                            updateRedeemStrategy: {
                              ONLY_WITHIN_REDEEM_TIME_WINDOW: 0,
                              ALLOWED: 1,
                              FORBIDDEN: 2
                            },
                            redeemTimeWindows: async () => {
                              const pc = getPC(current.vc.chain)
                              const count = await pc.readContract({ abi: abiRedeemStrategy, address: current.vc.RedeemStrategy!, functionName: 'redeemTimeWindowsCount' })
                              const tws = await pc.readContract({ abi: abiRedeemStrategy, address: current.vc.RedeemStrategy!, functionName: 'redeemTimeWindows', args: [0n, count] })
                              return tws[0].map((t, i) => `${fmtDate(t * 1000n, FMT.ALL)}       --   ${tws[1][i]}`)
                            }
                          }}
                        />}

                        <Erc20Approve />
                      </>
              }
            </ConfigChainsProvider>
          }
        </div>
      </div>
    </PageWrap>
  )
}
