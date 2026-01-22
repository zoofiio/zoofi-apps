'use client'

import { Txs } from '@/components/approve-and-tx'
import { Expandable, GeneralAction, inputClassname, selectClassNames } from '@/components/general-action'
import { MultiTxTemp } from '@/components/multitxs'
import { PageWrap } from '@/components/page-wrap'
import { abiBVault, abiProtocolSettings, abiZooProtocol } from '@/config/abi'
import { useVaultsConfigs } from '@/hooks/useVaultsConfigs'
import { toJson } from '@/lib/bnjson'
import { cn, parseEthers } from '@/lib/utils'
import { useMemo } from 'react'
import { FaSpinner } from 'react-icons/fa6'
import Select from 'react-select'
import { useMeasure, useSetState } from 'react-use'
import { Address, erc20Abi, formatUnits, isAddress, parseUnits, stringToHex } from 'viem'
import { useReadContracts } from 'wagmi'

type ParamItem = { label: string; value: string; units?: number /** def 10 */ }

const BVaultParams: ParamItem[] = [
  { label: '产品周期', value: 'D', units: 0 },
  { label: '初始定价', value: 'APRi' },
  // { label: '保底定价', value: 'APRl' },
  // { label: '衰减时长', value: 'T', units: 0 },
  // { label: '价格变动系数', value: 'e1', units: 0 },
  // { label: '斜率变动系数', value: 'e2', units: 0 },
  { label: '赎回手续费', value: 'f1' },
  { label: '利息佣金', value: 'f2' },
]

function UpdateVaultParams({ paramList, vault, protocoSettingAddress }: { paramList: ParamItem[]; vault: Address; protocoSettingAddress: Address }) {
  const params = useMemo(() => paramList.map((p) => ({ ...p, label: `${p.label}(${p.value})` })), [paramList])
  const [{ value, param }, setState] = useSetState({
    value: '',
    param: params[0],
  })
  const { data, refetch } = useReadContracts({
    contracts: paramList.map((p) => ({
      abi: abiProtocolSettings,
      address: protocoSettingAddress,
      functionName: 'vaultParamValue',
      args: [vault, stringToHex(p.value, { size: 32 })],
    })),
  })
  const infos = useMemo(
    () =>
      (data || []).map((d, index) => {
        const p = paramList[index]
        return `${p.label}(${p.value}): ${formatUnits((d.result as unknown as bigint) || 0n, typeof p.units == 'number' ? p.units : 10)}`
      }),
    [data],
  )
  const currentUnits = typeof param.units == 'number' ? param.units : 10
  const [infoRef, infoMeasure] = useMeasure<HTMLDivElement>()

  return (
    <Expandable tit='Vault Param Vaule'>
      <Select classNames={selectClassNames} maxMenuHeight={infoMeasure.height + 110} value={param} options={params} onChange={(e: any) => setState({ param: e as any })} />
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
      <div className='text-sm flex flex-col items-start' ref={infoRef}>
        {infos.map((info, index) => (
          <div key={`info_${index}`}>{info}</div>
        ))}
      </div>
    </Expandable>
  )
}


function Erc20Approve() {
  const [stat, setStat] = useSetState({
    token: '',
    spender: '',
    amount: 0n
  })
  return <Expandable tit='Erc20Approve'>
    <input type='text' placeholder='token' value={stat.token} onChange={(e) => setStat({ token: e.target.value })} className={cn(inputClassname)} />
    <input type='text' placeholder='spender' value={stat.spender} onChange={(e) => setStat({ spender: e.target.value })} className={cn(inputClassname)} />
    <input type='text' placeholder='amount' value={stat.amount.toString()} onChange={(e) => {
      try {
        setStat({ amount: parseEthers(e.target.value, 0) })
      } catch (error) {
      }
    }} className={cn(inputClassname)} />
    <Txs
      tx='Write'
      disabled={!isAddress(stat.token) || !isAddress(stat.spender) || stat.amount <= 0n}
      txs={[{
        abi: erc20Abi,
        address: stat.token as Address,
        functionName: 'approve',
        args: [stat.spender as Address, stat.amount],
      }]}
      className='mt-0! w-full flex items-center justify-center gap-4'
    />
  </Expandable>
}

export default function AdminPage() {
  const { current, setState, stateOptions: options, bsQuery: { isLoading } } = useVaultsConfigs()
  return (
    <PageWrap>
      <div className='w-full flex'>
        <MultiTxTemp />
        {isLoading ? <div className='flex w-full justify-center items-center h-screen'>
          <FaSpinner className='text-3xl animate-spin' />
        </div> : <div className='flex flex-col gap-4 w-full max-w-[840px] mx-auto px-5'>
          <div className="text-lg whitespace-pre-wrap p-2 bg-primary/20 rounded-xl">
            {toJson({ 'Decimal18': '000000000000000000' }, undefined, 2)}
          </div>
          <Select classNames={selectClassNames} defaultValue={options[0]} options={options} onChange={(e: any) => e && setState({ current: e as any })} />
          {current.type == 'B-Vault' && (
            <>
              <UpdateVaultParams vault={current.data.vault} paramList={BVaultParams} protocoSettingAddress={current.data.protocolSettingsAddress} />
              {['close', 'pause', 'unpause', 'pauseRedeemPool', 'unpauseRedeemPool', 'setBriber'].map((functionName) => (
                <GeneralAction key={`b-vault-${functionName}`} abi={abiBVault} functionName={functionName} address={current.data.vault} />
              ))}
              <GeneralAction tit='transferOwnership' abi={abiZooProtocol} functionName='transferOwnership' address={current.data.protocolAddress} />
              <GeneralAction tit='upsertParamConfig' abi={abiProtocolSettings} functionName='upsertParamConfig' address={current.data.protocolSettingsAddress} />
            </>
          )}
          <Erc20Approve />
        </div>}
      </div>
    </PageWrap>
  )
}
