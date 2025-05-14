import { ReactNode } from "react"
import { Address } from "viem"

export type NodeLicense = {
  name: string
  tit: ReactNode
  infos: ReactNode[]
  about: string
  totalNodes: bigint
  totalTokenSupply: bigint
  nodeMining: string
  salesStartTime?: number
  tokenTGE?: string
  net: string
  preDeposit?: {
    nft: Address
    prelnt: Address
    withdrawTime?: number
  }
}
