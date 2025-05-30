import { Address } from 'viem'
import { sepolia } from 'viem/chains'
import { TypeENV } from './env'
import { proxyGetDef } from '@/lib/utils'

export const WriteConfirmations = 3

export type LntVaultConfig = {
  vault: Address
  asset: Address // ERC721
  market: Address
  protocol: Address
  onEnv?: TypeENV[]
}
export const LNTVAULTS_CONFIG: { [key: number]: LntVaultConfig[] } = proxyGetDef(
  {
    [sepolia.id]: [
      {
        vault: '0x0d662dd166c74b407aefbe85712f82e2134d2fc1',
        asset: '0x535d7d9c319f159d627ac69004047919d8234b5a',
        market: '0xec9e89b11879b1918cf83ffbfbbb2e311f21c262',
        protocol: '0x83566d3b1a2de90ad0982b1a3f5d24f5434995ec',
        onEnv: ['test', 'prod'],
      },
    ],
  },
  [],
)
