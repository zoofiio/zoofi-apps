import { useApproves, useNftApproves } from '@/hooks/useApprove'
import { useWrapContractWrite } from '@/hooks/useWrapContractWrite'
import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Abi, Account, Address, Chain, ContractFunctionArgs, ContractFunctionName, encodeFunctionData, SimulateContractParameters, TransactionReceipt, WalletClient } from 'viem'

import { useCurrentChainId, useNetworkWrong } from '@/hooks/useCurrentChainId'
import { BBtn } from './ui/bbtn'
import { useSwitchChain, useWalletClient } from 'wagmi'
import { useMutation } from '@tanstack/react-query'
import { getPC } from '@/providers/publicClient'
import { handleError, promiseT } from '@/lib/utils'
import { toast as tos } from 'sonner'
import { switchChain } from 'viem/actions'

export function SwitchChain({ className }: { className?: string }) {
  const { switchChain, isPending } = useSwitchChain()
  const chainId = useCurrentChainId()
  return <BBtn className={twMerge('flex items-center justify-center gap-4 whitespace-nowrap', className)} onClick={() => switchChain({ chainId })} busy={isPending} disabled={isPending}>
    Switch Network
  </BBtn>
}
export function ApproveAndTx<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
  chainOverride extends Chain | undefined,
  accountOverride extends Account | Address | undefined = undefined,
>({
  className,
  tx,
  busyShowTxet = true,
  approves,
  spender,
  requestAmount,
  config,
  toast = true,
  skipSimulate = false,
  disabled,
  confirmations,
  onTxSuccess,
  onApproveSuccess,
}: {
  className?: string
  tx: string
  busyShowTxet?: boolean
  approves?: { [k: Address]: bigint }
  spender?: Address
  requestAmount?: bigint
  config: SimulateContractParameters<abi, functionName, args, Chain, chainOverride, accountOverride> & {
    enabled?: boolean
  }
  toast?: boolean
  skipSimulate?: boolean
  disabled?: boolean
  confirmations?: number
  onTxSuccess?: (txr: TransactionReceipt) => void
  onApproveSuccess?: () => void
}) {
  const { write: doTx, isDisabled, isLoading: isTxLoading } = useWrapContractWrite(config as any, { onSuccess: (txr) => onTxSuccess && onTxSuccess(txr), autoToast: toast, skipSimulate, confirmations })
  const txDisabled = disabled || isDisabled || isTxLoading || config.enabled === false
  const { approve, shouldApprove, loading: isApproveLoading, isSuccess: isApproveSuccess } = useApproves(approves || {}, spender, requestAmount)
  const onApproveSuccessRef = useRef<() => void>()
  onApproveSuccessRef.current = onApproveSuccess
  useEffect(() => {
    onApproveSuccessRef.current && isApproveSuccess && onApproveSuccessRef.current()
  }, [isApproveSuccess])
  const isNetWrong = useNetworkWrong()
  const approveDisabled = disabled || !approve || isApproveLoading || isNetWrong
  if (isNetWrong) {
    return <SwitchChain className={className} />
  }
  if (shouldApprove)
    return (
      <BBtn className={twMerge('flex items-center justify-center gap-4', className)} onClick={approve} busy={isApproveLoading} disabled={approveDisabled}>
        Approve
      </BBtn>
    )
  return (
    <BBtn className={twMerge('flex items-center justify-center gap-4', className)} onClick={() => doTx()} busy={isTxLoading} busyShowContent={busyShowTxet} disabled={txDisabled}>
      {tx}
    </BBtn>
  )
}


export function NftApproveAndTx<
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
  chainOverride extends Chain | undefined,
  accountOverride extends Account | Address | undefined = undefined,
>({
  className,
  tx,
  busyShowTxet = true,
  approves,
  spender,
  requestAmount,
  config,
  toast = true,
  skipSimulate = false,
  disabled,
  confirmations,
  onTxSuccess,
  onApproveSuccess,
}: {
  className?: string
  tx: string
  busyShowTxet?: boolean
  approves?: { [k: Address]: true }
  spender?: Address
  requestAmount?: bigint
  config: SimulateContractParameters<abi, functionName, args, Chain, chainOverride, accountOverride> & {
    enabled?: boolean
  }
  toast?: boolean
  skipSimulate?: boolean
  disabled?: boolean
  confirmations?: number
  onTxSuccess?: (txr: TransactionReceipt) => void
  onApproveSuccess?: () => void
}) {
  const { write: doTx, isDisabled, isLoading: isTxLoading } = useWrapContractWrite(config as any, { onSuccess: (txr) => onTxSuccess && onTxSuccess(txr), autoToast: toast, skipSimulate, confirmations })
  const txDisabled = disabled || isDisabled || isTxLoading || config.enabled === false

  const { approve, shouldApprove, loading: isApproveLoading, isSuccess: isApproveSuccess } = useNftApproves(approves ?? {}, spender)
  const onApproveSuccessRef = useRef<() => void>()
  onApproveSuccessRef.current = onApproveSuccess
  useEffect(() => {
    onApproveSuccessRef.current && isApproveSuccess && onApproveSuccessRef.current()
  }, [isApproveSuccess])
  const isNetWrong = useNetworkWrong()
  const approveDisabled = disabled || !approve || isApproveLoading || isNetWrong
  if (isNetWrong) {
    return <SwitchChain className={className} />
  }
  if (shouldApprove)
    return (
      <BBtn className={twMerge('flex items-center justify-center gap-4', className)} onClick={approve} busy={isApproveLoading} disabled={approveDisabled}>
        Approve
      </BBtn>
    )
  return (
    <BBtn className={twMerge('flex items-center justify-center gap-4', className)} onClick={() => doTx()} busy={isTxLoading} busyShowContent={busyShowTxet} disabled={txDisabled}>
      {tx}
    </BBtn>
  )
}


export async function doTx(wc: WalletClient, config: SimulateContractParameters | (() => Promise<SimulateContractParameters>), confirmations: number = 3) {
  const mconfig = typeof config === 'function' ? await config() : config
  const pc = getPC(await wc.getChainId())
  const { request } = await pc.simulateContract({ account: wc.account, ...mconfig })
  const hash = await wc.writeContract(request)
  const txr = await pc.waitForTransactionReceipt({ hash, confirmations })
  return txr
}


export type TX = SimulateContractParameters | (() => Promise<SimulateContractParameters>)


export function Txs({
  className, tx, txs, disabled, busyShowTxet = true, toast = true, onTxSuccess }:
  {
    className?: string, tx: string, disabled?: boolean, txs: TX[] | (() => Promise<TX[]> | TX[]), busyShowTxet?: boolean, toast?: boolean
    onTxSuccess?: () => void
  }) {
  const { data: wc } = useWalletClient()
  const isNetwrong = useNetworkWrong()
  const chainId = useCurrentChainId()
  const { switchChainAsync } = useSwitchChain()
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!wc) return
      if (isNetwrong) await switchChainAsync({ chainId })
      const calls = await promiseT(txs).then(items => Promise.all(items.map(promiseT)))
      const { id } = await wc.sendCalls({
        account: wc.account.address,
        calls: calls.map(item => ({ data: encodeFunctionData({ abi: item.abi, functionName: item.functionName, args: item.args }), to: item.address })),
      })
      while (true) {
        const res = await wc.waitForCallsStatus({ id })
        if (res.status == 'pending') continue
        if (res.status == 'success') {
          toast && tos.success("Transactions Success")
          onTxSuccess?.()
        } else {
          throw new Error(`Transactions ${res.status} ${JSON.stringify(res)}`)
        }
        break
      }
    },
    onError: toast ? handleError : () => { }
  })
  const txDisabled = disabled || isPending || txs.length === 0 || !wc
  return <BBtn className={twMerge('flex items-center justify-center gap-4', className)} onClick={() => mutate()} busy={isPending} busyShowContent={busyShowTxet} disabled={txDisabled}>
    {tx}
  </BBtn>
}