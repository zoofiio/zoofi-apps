import { isLOCL } from '@/constants'
import { Address, zeroAddress } from 'viem'
import { arbitrum, bsc, sepolia } from 'viem/chains'
import { TypeENV } from './env'
import { zeroGmainnet } from './network'

export const WriteConfirmations = 3

export type LntVaultConfig = {
  chain: number
  vault: Address
  asset: Address // ERC721

  protocol: Address
  protocalSettings?: Address
  lpTYT?: Address
  MockT?: Address
  MockaVTOracle?: Address
  MockNodeDelegator?: Address
  MockRewardDistribuitor?: Address
  RedeemStrategy?: Address
  // aethir
  AethirNFT?: Address
  AethirVToracle?: Address
  isAethir?: boolean

  // 0G
  ZeroGNFT?: Address
  ZeroGVToracle?: Address
  isZeroG?: boolean

  onEnv?: TypeENV[]
  vtActive: boolean
  ytEnable: boolean
  lpYields: boolean
  test?: boolean
  projectIcon: string
  icon: string
  tit: string
  info: string
  isIdle?: boolean
  startTime?: bigint
  nftBalanceBy: 'zoofi' | 'rpc' | 'rpc-amount' | 'alchemy'

  buyback?: Address
  bridge?: {
    chain: number
  }
}
export const LNTVAULTS_CONFIG: LntVaultConfig[] = [
  {
    chain: arbitrum.id,
    nftBalanceBy: 'rpc-amount',
    vault: '0xf8dfaa0967c812a43d02059f2b14786dceb84e8b',
    asset: '0xc227e25544edd261a9066932c71a25f4504972f1',
    protocol: '0x170e0c91ffa71dc3c16d43f754b3aece688470c8',
    protocalSettings: '0x2f70e725553c8e3341e46caa4e9b303e9d810fc9',
    onEnv: ['test', 'prod'],
    AethirVToracle: '0xd7fc9ab355567af429fb5bb3b535eab4c7e48567',
    RedeemStrategy: '0x878aac1ca6b36a2841ae0200f2366a4178c2ca22',
    isAethir: true,
    lpTYT: zeroAddress,
    test: false,
    isIdle: false,
    vtActive: true,
    ytEnable: false,
    lpYields: false,
    projectIcon: 'Aethir2',
    startTime: 1753955184n,
    icon: 'aethir',
    tit: 'Aethir Checker Node',
    info: `Aethir is best described as distributed cloud compute infrastructure. It aggregates enterprise-grade GPU chips into a single global network to increase the supply of on-demand cloud compute resources for the AI, gaming, and virtualized compute sectors.
Checker nodes ensure the integrity and service quality of Aethir network by checking the GPU specifications and its service process.`,

    buyback: isLOCL ? zeroAddress : undefined,
    bridge: isLOCL ? { chain: bsc.id } : undefined,
  },
  {
    chain: zeroGmainnet.id,
    nftBalanceBy: 'zoofi',
    vault: '0x7d3cec2f46279229277802d30702e4e7fb19bac0',
    asset: '0x0e1d50c3c0894399c343b5d93ad5baf1a00b9328',
    protocol: '0x6e603014ace3ae06f34ffe259106af77c056d913',
    onEnv: ['test', 'prod'],
    lpTYT: zeroAddress,
    ZeroGVToracle: '0x0d1795b6a21f36a6c3ef8333be63ac734f72c34b',
    RedeemStrategy: '0xd08cf0c214e577a90c718bc5f1bb42a2987a098e',
    AethirNFT: '0x0e1d50c3c0894399c343b5d93ad5baf1a00b9328',
    isZeroG: true,
    vtActive: true,
    ytEnable: false,
    lpYields: false,
    projectIcon: 'ZeroG',
    startTime: 1758171155n,
    icon: 'ZeroG',
    tit: '0G AI Alignment Node',
    info: '0G (Zero Gravity) is the first decentralized AI L1 chain that orchestrates hardware resources (storage, compute) and software assets (data, models) to handle AI workloads at scale. It bridges the gap between Web2 AI capabilities and Web3 decentralization.',
  },
  {
    chain: sepolia.id,
    nftBalanceBy: 'alchemy',
    vault: '0xb8aa29c0688c53f4dd875b1d0702de69bf52df7d',
    asset: '0x0993a80ee5bb32b73f61c71662f53c599ee4f829',
    protocol: '0xcdf86f49303fd5350ece1f1a27b9d6083851ae04',
    onEnv: ['test', 'prod'],
    MockT: '0x6f00ca3db3ee2b72d8ddd434ae0e31571fd70f03',
    MockaVTOracle: '0x1e349be7cacbd558bf39ba38763359f541ed07ca',
    MockNodeDelegator: '0x48fdfe0ebc720262d4157ff9ea81d0d92d544c6d',
    MockRewardDistribuitor: '0x82d6a9b59c8aa157dca8ef1a15f36406198da3d5',
    lpTYT: zeroAddress,
    vtActive: true,
    ytEnable: true,
    lpYields: true,
    projectIcon: 'ReppoNft',
    icon: 'ReppoNft',
    tit: 'Reppo Network LNT Vault',
    info: 'Reppo are building plug & play style infrastructure for AI Agents, Developers & Physical AI to permissionlessly discover, negotiate, commit, and settle on community-governed capital, specialized datasets, and infrastructure through an intent-centric architecture.',
  },
]
