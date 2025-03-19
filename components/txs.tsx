import { twMerge } from 'tailwind-merge'
import { SimulateContractParameters } from 'viem'

import { BBtn } from './ui/bbtn'

export function TXS({
  className,
  tx,
  configs,
  confirmations,
}: {
  className?: string
  tx: string
  configs: SimulateContractParameters[]
  confirmations?: number
}) {
  return (
    <BBtn className={twMerge('flex items-center justify-center gap-4', className)} onClick={() => { }} disabled={configs.length == 0}>
      {tx}
    </BBtn>
  )
}

