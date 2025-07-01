import { proxyGetDef } from '@/lib/utils'
import { Address } from 'viem'
import { sepolia } from 'viem/chains'
import { TypeENV } from './env'
import { zeroGTestnet } from './network'

export const WriteConfirmations = 3

export type LntVaultConfig = {
  vault: Address
  asset: Address // ERC721
  market: Address
  protocol: Address
  lpTYT?: Address
  MockT?: Address
  MockaVTOracle?: Address
  MockNodeDelegator?: Address
  MockRewardDistribuitor?: Address
  onEnv?: TypeENV[]

  icon: string
  tit: string
  info: string
}
export const LNTVAULTS_CONFIG: { [key: number]: LntVaultConfig[] } = proxyGetDef(
  {
    [sepolia.id]: [
      {
        vault: '0xb8aa29c0688c53f4dd875b1d0702de69bf52df7d',
        asset: '0x0993a80ee5bb32b73f61c71662f53c599ee4f829',
        market: '0x8bb5b52183f2a3d578b452e09b3ed8f8ae859f9e',
        protocol: '0xcdf86f49303fd5350ece1f1a27b9d6083851ae04',
        onEnv: ['test', 'prod'],
        MockT: '0x6f00ca3db3ee2b72d8ddd434ae0e31571fd70f03',
        MockaVTOracle: '0x1e349be7cacbd558bf39ba38763359f541ed07ca',
        MockNodeDelegator: '0x48fdfe0ebc720262d4157ff9ea81d0d92d544c6d',
        MockRewardDistribuitor: '0x82d6a9b59c8aa157dca8ef1a15f36406198da3d5',
        icon: 'ReppoNft',
        tit: 'Reppo Network LNT Vault',
        info: 'Reppo are building plug & play style infrastructure for AI Agents, Developers & Physical AI to permissionlessly discover, negotiate, commit, and settle on community-governed capital, specialized datasets, and infrastructure through an intent-centric architecture.',
      },
      // {
      //   vault: '0xf7810972Fec61DffA8B19d589bd2a32115378f9E',
      //   asset: '0x5cc0eef57f96c2258304fac08753a47aea1a4e59',
      //   market: '0xea9ce90aeca28f36666a50c41bdd2cfc45ee40f6',
      //   protocol: '0xff2586c2ad47abfb0b294772398611a5928def20',
      //   lpTYT: '0x123',
      //   onEnv: ['test', 'prod'],
      //   MockT: '0x122798230e6583317e27d850a82a9713ad3eaf5b',
      //   MockaVTOracle: '0x4d67aa5b2e23315ab5c41c7866f0e2f49d1e4bc2',
      //   MockNodeDelegator: '0x7e6457224db3e214568b1dbf58ef45a7787595f4',
      //   MockRewardDistribuitor: '0x55ab653c6824d4cb32c84c8cbf18056b078f0c4e',
      // },
    ],
    [zeroGTestnet.id]: [
      {
        vault: '0x8e4c26e6e61753f570f822552ab827125ab147a1',
        asset: '0xf9d5f79a7528033b372ed8ec4635fa863553b4cd',
        market: '0x4b9f3a59d4b66e8d71540b6f954b467be1686dd1',
        protocol: '0x72faf32f5311bfaed7395a8923afd683949ef3ba',
        onEnv: ['test', 'prod'],
        MockT: '0xd3baf6025975e5fc33ddab5a21b42713ad55cf09',
        MockaVTOracle: '0x4717749731c45607e7609cc06115fe4052883c3c',
        MockNodeDelegator: '0x9726aeedabdd59bdeea84360306f0fadd874f7ea',
        MockRewardDistribuitor: '0x95b40e1531c5e9a0deb6c89abc64a19d007fdf08',
        icon: 'ZeroG',
        tit: '0G AI Alignment Node',
        info: '0G (Zero Gravity) is the first decentralized AI L1 chain that orchestrates hardware resources (storage, compute) and software assets (data, models) to handle AI workloads at scale. It bridges the gap between Web2 AI capabilities and Web3 decentralization.',
      },
    ],
  },
  [],
)
