import { twMerge } from 'tailwind-merge'
import { SimulateContractParameters, TransactionReceipt } from 'viem'

import { useMutation } from '@tanstack/react-query'
import { FaCircleCheck, FaSpinner } from "react-icons/fa6"
import { useSetState } from 'react-use'
import { useWalletClient } from 'wagmi'
import { SimpleDialog } from './simple-dialog'
import { BBtn } from './ui/bbtn'
import { getPC } from '@/providers/publicClient'
import { useRef } from 'react'

export function TXS({
  className,
  tx = "Transaction All",
  configs,
  confirmations,
  onSuccess
}: {
  className?: string
  tx?: string
  configs: ({ name: string, config: SimulateContractParameters | (() => SimulateContractParameters | Promise<SimulateContractParameters>) })[]
  confirmations?: number
  onSuccess?: (txr: TransactionReceipt, index: number) => void
}) {
  const [itemStat, setItemStat] = useSetState<{ [k: number]: 'loading' | 'finish' | 'error' }>({})
  const isFinishAll = configs.reduce((allFinish, _cf, cfI) => itemStat[cfI] === 'finish' && allFinish, true)
  const { data: wc } = useWalletClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!wc) return;
      const pc = getPC()
      for (let index = 0; index < configs.length; index++) {
        // skip finished
        if (itemStat[index] == 'finish') continue
        const item = configs[index];
        setItemStat({ [index]: 'loading' })
        const mconfig = typeof item.config == 'function' ? (await item.config()) : item.config;
        const simres = await pc.simulateContract(mconfig)
        const txhash = await wc.writeContract(simres.request)
        const txr = await pc.waitForTransactionReceipt({ hash: txhash, confirmations })
        if (txr.status != 'success') {
          setItemStat({ [index]: 'error' })
          throw new Error("Transaction reverted")
        }
        onSuccess?.(txr, index)

        setItemStat({ [index]: 'finish' })
      }
    }
  })
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <SimpleDialog
        disableOutClose
        triggerProps={{ disabled: configs.length == 0 }}
        trigger={
          <BBtn className={twMerge('flex items-center justify-center gap-4', className)} disabled={configs.length == 0}>
            {tx}
          </BBtn>
        }
      >
        <div className='card flex flex-col gap-4'>
          {
            configs.map((cf, i) => <div key={`txs_${i}`} className='flex items-center justify-between px-4 py-2 rounded-lg bg-black/20 dark:bg-white/20 text-base'>
              {cf.name}
              {itemStat[i] === 'loading' && <FaSpinner className='text-xl' />}
              {itemStat[i] === 'finish' && <FaCircleCheck className='text-xl text-green-500' />}
            </div>)
          }
        </div>
        <BBtn disabled={isPending || !wc} busy={isPending} onClick={() => {
          if (isFinishAll) {
            triggerRef.current?.click()
          } else {
            mutate()
          }
        }}>{isFinishAll ? 'Complete' : tx}</BBtn>
      </SimpleDialog>
    </>
  )
}

