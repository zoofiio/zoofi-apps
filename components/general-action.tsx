import { useCurrentChainId } from '@/hooks/useCurrentChainId'
import { cn, handleError, parseEthers, promiseT } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isNil, toString } from 'lodash'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Collapse } from 'react-collapse'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'
import Select from 'react-select'
import { useSetState } from 'react-use'
import { twMerge } from 'tailwind-merge'
import { Abi, AbiFunction, AbiParameter, Address, erc20Abi, isAddress, stringToHex } from 'viem'
import { ApproveAndTx, Txs } from './approve-and-tx'
import { BBtn } from './ui/bbtn'
import { AddMultiTx } from './multitxs'
import { Spinner } from './spinner'


export const selectClassNames: Parameters<Select>[0]['classNames'] = {
  menu: () => cn('bg-white dark:bg-black dark:border'),
  option: (props) => cn({ '!bg-primary/30': props.isFocused, '!bg-primary/60': props.isSelected }),
  control: () => 'bg-white dark:bg-black !min-h-[58px] !border-primary/30 !shadow-none',
  singleValue: () => 'dark:text-white',
}
export const inputClassname = 'bg-white dark:bg-transparent border-primary/70 w-full h-14 text-right pr-4 font-bold text-sm border focus:border-2  rounded-md outline-none '

export const defConvertArg = (arg: string, _i: number, param: AbiParameter) => {
  if (param.type == 'uint8') return parseInt((arg || '').replaceAll(' ', ''))
  if (param.type.startsWith('uint')) return BigInt((arg || '').replaceAll(' ', ''))
  if (param.type == 'bytes32') return stringToHex(arg, { size: 32 })
  if (param.type == 'bool') {
    if (arg == 'true') return true
    return false
  }
  return arg
}
const convertArgs = (args: string[], inputs: readonly AbiParameter[], ca?: (arg: string, i: number, param: AbiParameter) => any) => {
  try {
    return args.map((arg, i) => {
      const input = inputs[i]
      if (ca) return ca(arg, i, input)
      return defConvertArg(arg, i, input)
    })
  } catch (error) {
    return undefined;
  }
}

export function Expandable({ children, tit, disable }: { tit: string; children?: ReactNode; disable?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className='animitem flex flex-col w-full bg-white dark:bg-transparent rounded-lg overflow-hidden border border-solid border-primary/40'>
      <div className='px-5 py-2 min-h-[58px] flex justify-between items-center text-sm'>
        <div className='font-medium text-base'>{tit}</div>
        {disable ? (
          children
        ) : (
          <div className='px-2 py-1 rounded-full border border-solid border-primary flex items-center text-xs text-primary cursor-pointer ' onClick={() => setOpen(!open)}>
            <span className='mr-[5px]'>{!open ? 'Expand' : 'Close'}</span>
            {open ? <FiArrowUp /> : <FiArrowDown />}
          </div>
        )}
      </div>
      <Collapse isOpened={open} theme={{ content: 'bg-gray-200 dark:bg-transparent p-4 flex flex-col gap-2' }}>
        {children}
      </Collapse>
    </div>
  )
}

export function GeneralAction({
  abi,
  address,
  functionName,
  tit,
  infos,
  convertArg,
  txProps,
  onArgs,
  argsDef
}: {
  abi: Abi
  address: Address
  functionName: string
  tit?: string
  infos?: any | (() => Promise<any>)
  argsDef?: string[]
  convertArg?: (arg: string, i: number, param: AbiParameter) => any
  onArgs?: (args: string[]) => void
  txProps?: Omit<Parameters<typeof Txs>[0], 'txs' | 'className'>
}) {
  const abiItem = abi.find((item) => item.type == 'function' && item.name == functionName) as AbiFunction
  const inputsLength = abiItem?.inputs?.length || 0
  const [{ args }, setState] = useSetState({ args: new Array(inputsLength).fill('') as string[] })
  useEffect(() => {
    onArgs && onArgs(args)
  }, [args])
  const { data: qInfo, isLoading, isError, refetch } = useQuery({
    queryKey: ['queryInfo', address, functionName, infos],
    enabled: Boolean(infos),
    queryFn: async () => promiseT(infos)
  })
  const margs = useMemo(() => args.map((arg, i) => arg || argsDef?.[i] || ''), [argsDef, args])
  const chaindId = useCurrentChainId()
  const { data, mutate: doRead, isPending: isReadLoading } = useMutation({
    mutationFn: async () => {
      return await getPC(chaindId).readContract({ abi, address, functionName, ...(args.length ? { args: convertArgs(args, abiItem.inputs, convertArg) } : {}) })
    },
    onError: handleError
  })

  if (!abiItem) return
  const isWrite = abiItem.stateMutability.includes("payable")
  const disableExpand = (!abiItem.inputs || abiItem.inputs.length == 0) && isWrite
  const writeArgs = isWrite ? convertArgs(margs, abiItem.inputs, convertArg) : undefined
  return (
    <Expandable tit={tit || functionName} disable={disableExpand}>
      {abiItem.inputs?.map((item, index) => (
        <div
          className='relative'
          key={`input_${index}`}
        >
          <div className='opacity-60 absolute top-1/2 left-2 -translate-y-1/2 text-xs'>{item.name}({item.type})</div>
          <input
            type='text'
            value={margs[index]}
            onChange={(e) => setState({ args: args.map((arg, argIndex) => (index == argIndex ? e.target.value : arg)) })}
            className={cn(inputClassname)}
          />

        </div>
      ))}

      <div className={cn('whitespace-pre-wrap')}>
        {isLoading && <Spinner />}
        {!isNil(qInfo) && JSON.stringify(qInfo, undefined, 2)}
      </div>

      <div className={cn('whitespace-pre-wrap')}>
        {!isNil(data) && JSON.stringify(data, undefined, 2)}
      </div>
      {
        isWrite ?
          <div className='flex gap-5 items-center'>
            <Txs
              {...(txProps || {})}
              onTxSuccess={() => {
                Boolean(infos) && refetch()
                txProps?.onTxSuccess?.()
              }}
              tx='Write'
              txs={[{
                abi,
                address,
                functionName,
                ...(args.length ? { args: writeArgs } : {}),
              }]}
              disabled={txProps?.disabled || (Boolean(args.length) && !Boolean(writeArgs))}
              className={cn('!mt-0 flex items-center justify-center gap-4', disableExpand ? 'max-w-[100px]' : 'w-full')}
            />
            <AddMultiTx txs={[{
              abi,
              address,
              functionName,
              ...(args.length ? { args: writeArgs } : {}),
            }]} />
          </div>
          :
          <BBtn
            className={twMerge('flex items-center justify-center gap-4', cn('!mt-0 flex items-center justify-center gap-4', disableExpand ? 'max-w-[100px]' : 'w-full'))}
            onClick={() => doRead()}
            busy={isReadLoading}
            busyShowContent={true}
            disabled={false}>
            Read
          </BBtn>
      }
    </Expandable>
  )
}


export function ContractAll({ abi, address, tit, itemInfos }: { abi: Abi, address: Address, tit: string, itemInfos?: Record<string, Parameters<typeof GeneralAction>[0]['infos']> }) {
  const [reads, writes] = useMemo(() => {
    const reads = []
    const writes = []
    for (const item of abi) {
      if (item.type == 'function') {
        const isWrite = item.stateMutability.includes('payable')
        if (isWrite) {
          writes.push(item)
        } else {
          reads.push(item)
        }
      }
    }
    return [reads, writes]
  }, [abi])
  return <Expandable tit={tit}>
    <div className='grid grid-cols-5 gap-4'>
      <div className='flex flex-col gap-2 col-span-2'>
        <div className='font-bold text-2xl'>Read</div>
        {reads.map((item, i) => <GeneralAction key={`read_${i}`} abi={[item]} address={address} functionName={item.name} infos={itemInfos?.[item.name]} />)}
      </div>
      <div className='flex flex-col gap-2 col-span-3'>
        <div className='font-bold text-2xl'>Write</div>
        {writes.map((item, i) => <GeneralAction key={`write_${i}`} abi={[item]} address={address} functionName={item.name} infos={itemInfos?.[item.name]} />)}
      </div>
    </div>
  </Expandable>
}


export function Erc20Approve() {
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
    <ApproveAndTx
      tx='Write'
      disabled={!isAddress(stat.token) || !isAddress(stat.spender) || stat.amount <= 0n}
      config={{
        abi: erc20Abi,
        address: stat.token as Address,
        functionName: 'approve',
        args: [stat.spender as Address, stat.amount],
      }}
      className='!mt-0 w-full flex items-center justify-center gap-4'
    />
  </Expandable>
}



