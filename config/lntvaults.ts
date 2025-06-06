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
  MockaVTOracle?: Address
  MockNodeDelegator?: Address
  onEnv?: TypeENV[]
}
export const LNTVAULTS_CONFIG: { [key: number]: LntVaultConfig[] } = proxyGetDef(
  {
    [sepolia.id]: [
      {
        vault: '0xf3ffc5708be6d52a04f1acb903711e9cd108cbd8',
        asset: '0xc97120230c20f9f9fa164245ae2d30d1d09239c7',
        market: '0x0ba46512c286e6dfca51a105608c0b81a464716e',
        protocol: '0x802d7b295668bc09fdf5ed11c17095c930edb4b2',
        onEnv: ['test', 'prod'],
        MockaVTOracle: '0x8f9c423ee318ac797167c7dc1d411861b9451519',
        MockNodeDelegator: '0x6f52f6870696c907573c36adec1abe6c1274bda5'
      },
    ],
  },
  [],
)
