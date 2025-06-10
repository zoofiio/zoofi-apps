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
  lpTYT: Address
  MockT?: Address
  MockaVTOracle?: Address
  MockNodeDelegator?: Address
  onEnv?: TypeENV[]
}
export const LNTVAULTS_CONFIG: { [key: number]: LntVaultConfig[] } = proxyGetDef(
  {
    [sepolia.id]: [
      {
        vault: '0xf7810972Fec61DffA8B19d589bd2a32115378f9E',
        asset: '0x5cc0eef57f96c2258304fac08753a47aea1a4e59',
        market: '0xea9ce90aeca28f36666a50c41bdd2cfc45ee40f6',
        protocol: '0xff2586c2ad47abfb0b294772398611a5928def20',
        lpTYT: '0x123',
        onEnv: ['test', 'prod'],
        MockT: '0x122798230e6583317e27d850a82a9713ad3eaf5b',
        MockaVTOracle: '0x4d67aa5b2e23315ab5c41c7866f0e2f49d1e4bc2',
        MockNodeDelegator: '0x7e6457224db3e214568b1dbf58ef45a7787595f4'
      },
    ],
  },
  [],
)
