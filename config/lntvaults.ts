import { Address } from 'viem'
import { sepolia } from 'viem/chains'
import { TypeENV } from './env'
import { zeroGTestnet } from './network'

export const WriteConfirmations = 3

export type LntVaultConfig = {
  chain: number
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
export const LNTVAULTS_CONFIG: LntVaultConfig[] = [
  {
    chain: sepolia.id,
    vault: '0xb8aa29c0688c53f4dd875b1d0702de69bf52df7d',
    asset: '0x0993a80ee5bb32b73f61c71662f53c599ee4f829',
    market: '0x8bb5b52183f2a3d578b452e09b3ed8f8ae859f9e',
    protocol: '0xcdf86f49303fd5350ece1f1a27b9d6083851ae04',
    onEnv: ['test', 'prod'],
    MockT: '0x6f00ca3db3ee2b72d8ddd434ae0e31571fd70f03',
    MockaVTOracle: '0x1e349be7cacbd558bf39ba38763359f541ed07ca',
    MockNodeDelegator: '0x48fdfe0ebc720262d4157ff9ea81d0d92d544c6d',
    MockRewardDistribuitor: '0x82d6a9b59c8aa157dca8ef1a15f36406198da3d5',
    lpTYT: '0x123',
    icon: 'ReppoNft',
    tit: 'Reppo Network LNT Vault',
    info: 'Reppo are building plug & play style infrastructure for AI Agents, Developers & Physical AI to permissionlessly discover, negotiate, commit, and settle on community-governed capital, specialized datasets, and infrastructure through an intent-centric architecture.',
  },
  {
    chain: zeroGTestnet.id,
    vault: '0xda732f0f05e8e4448d8358a142b289f528f81824',
    asset: '0xfce521166366566a49344a0dd529028d5fda5cd3',
    market: '0xb1d4d60ebd2bae3904a4070ac4661ed9b84c47e8',
    protocol: '0x47c79e20ffd41ca55ced7e31aa5767a7440ff0cf',
    onEnv: ['test', 'prod'],
    // MockT: '0xe01c85599300f9ed5de2d7d4fe3dc2dc4c5c3877',
    MockaVTOracle: '0x8fb28f6d7834dc0127e39be7c9db11383e126d2b',
    MockNodeDelegator: '0xc7329fbb367f709b57f3945eb6ac18cebd711c7c',
    MockRewardDistribuitor: '0x1063bbc8c6a81f0f84af6b6c84f6a7635b008893',
    lpTYT: '0x123',
    icon: 'ZeroG',
    tit: '0G AI Alignment Node',
    info: '0G (Zero Gravity) is the first decentralized AI L1 chain that orchestrates hardware resources (storage, compute) and software assets (data, models) to handle AI workloads at scale. It bridges the gap between Web2 AI capabilities and Web3 decentralization.',
  },
]
