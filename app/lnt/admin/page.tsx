'use client'

import { Txs } from '@/components/approve-and-tx'
import { AsyncInfo, ContractAll, Erc20Approve, Expandable, GeneralAction, inputClassname } from '@/components/general-action'
import { MultiTxTemp } from '@/components/multitxs'
import { PageWrap } from '@/components/page-wrap'
import { Spinner } from '@/components/spinner'
import { ConfigChainsProvider } from '@/components/support-chains'
import { SimpleSelect } from '@/components/ui/select'
import { abiMockERC721, abiProtocolSettings } from '@/config/abi'
import { abiAethirVToracle, abiLntBuyback, abiLntProtocol, abiLntVault, abiLntVaultDepositExt, abiLVTVault, abiRedeemStrategy, abiReppoLntVault, abiZeroGVToracale } from '@/config/abi/abiLNTVault'
import { LntVaultConfig, LNTVAULTS_CONFIG } from '@/config/lntvaults'
import { getChain } from '@/config/network'
import { fetLntVault } from '@/hooks/useFetLntVault'
import { cn, FMT, fmtDate, promiseAll, shortStr } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useSetState } from 'react-use'
import { Address, erc1155Abi, erc20Abi, formatUnits, parseAbi, parseUnits, stringToHex } from 'viem'


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
      <Txs
        tx='Write'
        txs={[{
          abi: abiProtocolSettings,
          address: protocoSettingAddress,
          functionName: 'updateVaultParamValue',
          args: [vault, stringToHex(param.value, { size: 32 }), parseUnits(value, currentUnits)],
        }]}
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

const LvtVaultParamsVerio: ParamItem[] = [
  ...LntVaultParams,
  { show: '', value: 'VerioIPInflationRate', units: 18 },
  { show: '', value: 'VestingRate', units: 18 },
]


function AdminReppo({ vc }: { vc: LntVaultConfig }) {
  return <>
    <UpdateVaultParams chain={vc.chain} vault={vc.vault} protocoSettingAddress={vc.protocalSettings} paramList={LntVaultParamsReppo} />
    <ContractAll tit='Protocol' abi={abiLntProtocol} address={vc.protocol} />
    <GeneralAction abi={abiLntVault} functionName='updateVTPriceTime' address={vc.vault}
      infos={() => promiseAll({
        vtPriceStartTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }),
        vtPriceEndTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' })
      })} />
    <ContractAll tit='Vault' abi={abiReppoLntVault} address={vc.vault}
      argsDef={{ buyback: async () => getPC(vc.chain).readContract({ abi: erc20Abi, functionName: 'balanceOf', address: '0xFf8104251E7761163faC3211eF5583FB3F8583d6', args: [vc.vault] }).then(bn => [bn.toString()]) }} />
    <ContractAll tit='Vault Ext' abi={abiLntVaultDepositExt} address={vc.vault} />
    {vc.buybackPool && <ContractAll tit='Put Option' abi={abiLntBuyback} address={vc.buybackPool} />}
  </>
}

function Admin0G({ vc }: { vc: LntVaultConfig }) {
  if (!vc.deposit) return null
  return <>
    <Expandable tit={`Deposit/Withdraw NFT (${getChain(vc.deposit.chain)!.name})`}>
      <ConfigChainsProvider chains={vc.deposit.chain}>
        {vc.deposit.protocalSettings &&
          <UpdateVaultParams
            chain={vc.deposit.chain}
            vault={vc.deposit.vault}
            protocoSettingAddress={vc.deposit.protocalSettings}
            paramList={LntVaultParams2_1}
          />}
        {vc.deposit.protocol && <ContractAll unwrap tit='Protocol' abi={abiLntProtocol} address={vc.deposit.protocol} />}
        <GeneralAction disableAnim abi={abiMockERC721} tit={`mintMockErc721 (${vc.asset})`} functionName={'airdropByOwner'} address={vc.asset} />
        <ContractAll unwrap tit='aVToracle' abi={abiZeroGVToracale} address={vc.deposit.vtOracle} />
        <ContractAll unwrap tit='Vault' abi={abiLntVaultDepositExt} address={vc.deposit.vault} />
      </ConfigChainsProvider>
    </Expandable>
    <Expandable tit={`Swap (${getChain(vc.chain)!.name})`}>
      {vc.protocalSettings && <UpdateVaultParams chain={vc.chain} vault={vc.vault} protocoSettingAddress={vc.protocalSettings} paramList={LntVaultParams2_2} />}
      <ContractAll unwrap tit='Protocol' abi={abiLntProtocol} address={vc.protocol} />
      <GeneralAction disableAnim abi={abiLntVault} functionName='updateVTPriceTime' address={vc.vault}
        infos={() => promiseAll({
          vtPriceStartTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }),
          vtPriceEndTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' })
        })} />
      {vc.buybackPool && <ContractAll unwrap tit='Put Option' abi={abiLntBuyback} address={vc.buybackPool} />}

      <Erc20Approve />
    </Expandable>
  </>
}



function AdminAethir({ vc }: { vc: LntVaultConfig }) {
  return <>
    <AsyncInfo keys={[vc.vault]} infos={() => fetLntVault(vc)} />
    <UpdateVaultParams chain={vc.chain} vault={vc.vault} protocoSettingAddress={vc.protocalSettings} paramList={LntVaultParams} />
    <GeneralAction abi={abiLntVault} functionName='withdrawProfitT' address={vc.vault} />
    <GeneralAction abi={abiLntVault} functionName='close' address={vc.vault} />
    <GeneralAction abi={abiLntVault} functionName='updateAutoBuyback' address={vc.vault}
      infos={() => getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'autoBuyback' })} />
    <GeneralAction abi={abiLntVault} functionName='updateCheckerNode' address={vc.vault}
      infos={() => getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'checkerNode' })}
    />
    <GeneralAction abi={abiLntVault} functionName='setUser' address={vc.vault} argsDef={['', '', (2n ** 63n).toString()]} />
    <GeneralAction abi={abiLntVault} functionName='batchSetUser' address={vc.vault} />
    <GeneralAction abi={abiLntVault} functionName='setUserRecordsInfo' address={vc.vault} />
    <GeneralAction abi={abiLntVault} functionName='removeLastSetUserRecords' address={vc.vault} />
    <GeneralAction abi={abiLntVault} functionName='buybackVT' address={vc.vault} />
    <GeneralAction abi={abiLntVault} functionName='updateVTPriceTime' address={vc.vault}
      infos={() => promiseAll({
        vtPriceStartTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }),
        vtPriceEndTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' })
      })} />
    <GeneralAction abi={abiLntVault} functionName='updateVTAOracle' address={vc.vault} />
    <GeneralAction abi={abiLntVault} functionName='updateRedeemStrategy' address={vc.vault}
      infos={() => getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'redeemStrategy' })}
    />
    <GeneralAction abi={abiLntVault} functionName='updateVTSwapHook' address={vc.vault} />
    <GeneralAction abi={abiLntVault} functionName='updateAethirClaimAndWithdraw' address={vc.vault} />
    <ContractAll unwrap tit='Protocol' abi={abiLntProtocol} address={vc.protocol} />
    {vc.AethirVToracle && <ContractAll tit='AethirVToracle' abi={abiAethirVToracle} address={vc.AethirVToracle} />}
    {vc.RedeemStrategy && <ContractAll tit='RedeemStrategy' abi={abiRedeemStrategy} address={vc.RedeemStrategy}
      itemInfos={{
        updateRedeemStrategy: {
          ONLY_WITHIN_REDEEM_TIME_WINDOW: 0,
          ALLOWED: 1,
          FORBIDDEN: 2
        },
        redeemTimeWindows: async () => {
          const pc = getPC(vc.chain)
          const count = await pc.readContract({ abi: abiRedeemStrategy, address: vc.RedeemStrategy!, functionName: 'redeemTimeWindowsCount' })
          const tws = await pc.readContract({ abi: abiRedeemStrategy, address: vc.RedeemStrategy!, functionName: 'redeemTimeWindows', args: [0n, count] })
          return tws[0].map((t, i) => `${fmtDate(t * 1000n, FMT.ALL)}       --   ${tws[1][i]}`)
        }
      }}
    />}

    <Erc20Approve />
  </>
}


const abiMErc1155 = [
  ...erc1155Abi,
  ...parseAbi([
    'function mint(address to, uint256 id, uint256 value, bytes memory data) external',
  ])
]
function AdminFilcoin({ vc }: { vc: LntVaultConfig }) {
  return <>
    <UpdateVaultParams chain={vc.chain} vault={vc.vault} protocoSettingAddress={vc.protocalSettings} paramList={LntVaultParams2_2} />
    <ContractAll tit='Protocol' abi={abiLntProtocol} address={vc.protocol} />
    <GeneralAction abi={abiLntVault} functionName='updateVTPriceTime' address={vc.vault}
      infos={() => promiseAll({
        vtPriceStartTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }),
        vtPriceEndTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' })
      })} />
    <ContractAll tit='ERC1155' abi={abiMErc1155} address={vc.asset} />
    <ContractAll tit='LvtVault' abi={abiLVTVault} address={vc.vault} />
    {vc.buybackPool && <ContractAll tit='Put Option' abi={abiLntBuyback} address={vc.buybackPool} />}
  </>
}


function AdminVerio({ vc }: { vc: LntVaultConfig }) {
  return <>
    <UpdateVaultParams chain={vc.chain} vault={vc.vault} protocoSettingAddress={vc.protocalSettings} paramList={LvtVaultParamsVerio} />
    <ContractAll tit='Protocol' abi={abiLntProtocol} address={vc.protocol} />
    <GeneralAction abi={abiLntVault} functionName='updateVTPriceTime' address={vc.vault}
      infos={() => promiseAll({
        vtPriceStartTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }),
        vtPriceEndTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' })
      })} />
    <ContractAll tit='LvtVault' abi={abiLVTVault} address={vc.vault} />
    {vc.buybackPool && <ContractAll tit='Put Option' abi={abiLntBuyback} address={vc.buybackPool} />}
  </>
}

function AdminSei({ vc }: { vc: LntVaultConfig }) {
  return <>
    <UpdateVaultParams chain={vc.chain} vault={vc.vault} protocoSettingAddress={vc.protocalSettings} paramList={LntVaultParams2_2} />
    <ContractAll tit='Protocol' abi={abiLntProtocol} address={vc.protocol} />
    <GeneralAction abi={abiLntVault} functionName='updateVTPriceTime' address={vc.vault}
      infos={() => promiseAll({
        vtPriceStartTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceStartTime' }),
        vtPriceEndTime: getPC(vc.chain).readContract({ abi: abiLntVault, address: vc.vault, functionName: 'vtPriceEndTime' })
      })} />
    <ContractAll tit='ERC1155' abi={abiMErc1155} address={vc.asset} />
    <ContractAll tit='LvtVault' abi={abiLVTVault} address={vc.vault} />
    {vc.buybackPool && <ContractAll tit='Put Option' abi={abiLntBuyback} address={vc.buybackPool} />}
  </>
}
export default function AdminPage() {
  const vcs = LNTVAULTS_CONFIG
  const options = vcs.map(item => ({ key: item.vault, show: `${item.isLVT ? 'LVT' : 'LNT'}-Vault  (${shortStr(item.vault)}) (${item.tit}) (${getChain(item.chain)!.name})`, vc: item }))
  const [current_, setCurrent] = useState<typeof options[0] | undefined>(options[0])
  const current = options.length > 0 ? current_ : undefined;
  return (
    <PageWrap>
      <div className='w-full flex font-mono'>
        <MultiTxTemp />
        <div className='flex flex-col gap-2 w-full mx-auto px-5'>
          <div className="animitem text-lg whitespace-pre-wrap p-2 bg-primary/20 rounded-xl">
            {JSON.stringify({
              'Decimal18': '000000000000000000',
              'Vault': current?.vc.vault
            }, undefined, 2)}
          </div>
          <SimpleSelect className='w-full animitem z-50' itemClassName='p-3 font-mono' currentClassName='p-3' options={options} onChange={setCurrent} />
          {
            current && <ConfigChainsProvider chains={current.vc.chain}>
              {current.vc.reppo && <AdminReppo vc={current.vc} />}
              {current.vc.deposit && <Admin0G vc={current.vc} />}
              {current.vc.isAethir && <AdminAethir vc={current.vc} />}

              {current.vc.isFil && <AdminFilcoin vc={current.vc} />}
              {current.vc.isVerio && <AdminVerio vc={current.vc} />}
              {current.vc.isSei && <AdminSei vc={current.vc} />}
            </ConfigChainsProvider>
          }
        </div>
      </div>
    </PageWrap>
  )
}
