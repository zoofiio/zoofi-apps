import { Address } from 'viem'
import { arbitrum, sepolia } from 'viem/chains'
import { TypeENV } from './env'
import { zeroGTestnet } from './network'

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
  // aethir
  AethirNFT?: Address
  AethirVToracle?: Address
  AethirRedeemStrategy?: Address
  isAethir?: boolean

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
}
export const LNTVAULTS_CONFIG: LntVaultConfig[] = [
  {
    chain: arbitrum.id,
    vault: '0xf8dfaa0967c812a43d02059f2b14786dceb84e8b',
    asset: '0xc227e25544edd261a9066932c71a25f4504972f1',
    protocol: '0x170e0c91ffa71dc3c16d43f754b3aece688470c8',
    protocalSettings: '0x2f70e725553c8e3341e46caa4e9b303e9d810fc9',
    onEnv: ['test'],
    AethirVToracle: '0xd7fc9ab355567af429fb5bb3b535eab4c7e48567',
    AethirRedeemStrategy: '0x878aac1ca6b36a2841ae0200f2366a4178c2ca22',
    isAethir: true,
    lpTYT: '0x123',
    test: true,
    isIdle: true,
    vtActive: true,
    ytEnable: false,
    lpYields: false,
    projectIcon: 'Aethir2',
    icon: 'aethir',
    tit: 'Aethir Checker Node',
    info: `Aethir is best described as distributed cloud compute infrastructure. It aggregates enterprise-grade GPU chips into a single global network to increase the supply of on-demand cloud compute resources for the AI, gaming, and virtualized compute sectors.
Checker nodes ensure the integrity and service quality of Aethir network by checking the GPU specifications and its service process.`,
  },
  {
    chain: arbitrum.id,
    vault: '0x166c533bfcb482df813e4b0e804ec9c9a573247f',
    asset: '0x48563bb31d2927d9f66422cb4573124434d748be',
    protocol: '0x65ac39278b0f3951237985c5aa85bb51e8541eaf',
    protocalSettings: '0x38b40a5c2dd2d62a7b578257a18a8f675353d481',
    onEnv: ['test'],
    MockT: '0xd839962d55d9e8309f0f64c391887a33ab8cb4d0',
    // MockaVTOracle: '0xf1487677d2e09250d89efdb647e3e288503683d0',
    // MockNodeDelegator: '0xc7329fbb367f709b57f3945eb6ac18cebd711c7c',
    // MockRewardDistribuitor: '0x1063bbc8c6a81f0f84af6b6c84f6a7635b008893',
    AethirNFT: '0x48563bb31d2927d9f66422cb4573124434d748be',
    AethirVToracle: '0x47dc4714c5f4d18df398da082534fdea76f29174',
    AethirRedeemStrategy: '0x8363b9f3173c667ee59c38f1c4885aae10a5e0e2',
    isAethir: true,
    lpTYT: '0x123',
    test: true,
    vtActive: true,
    ytEnable: false,
    lpYields: false,
    projectIcon: 'Aethir2',
    icon: 'aethir',
    tit: 'Aethir Checker Node',
    info: `Aethir is best described as distributed cloud compute infrastructure. It aggregates enterprise-grade GPU chips into a single global network to increase the supply of on-demand cloud compute resources for the AI, gaming, and virtualized compute sectors.
Checker nodes ensure the integrity and service quality of Aethir network by checking the GPU specifications and its service process.`,
  },
  {
    chain: sepolia.id,
    vault: '0xb8aa29c0688c53f4dd875b1d0702de69bf52df7d',
    asset: '0x0993a80ee5bb32b73f61c71662f53c599ee4f829',
    protocol: '0xcdf86f49303fd5350ece1f1a27b9d6083851ae04',
    onEnv: ['test', 'prod'],
    MockT: '0x6f00ca3db3ee2b72d8ddd434ae0e31571fd70f03',
    MockaVTOracle: '0x1e349be7cacbd558bf39ba38763359f541ed07ca',
    MockNodeDelegator: '0x48fdfe0ebc720262d4157ff9ea81d0d92d544c6d',
    MockRewardDistribuitor: '0x82d6a9b59c8aa157dca8ef1a15f36406198da3d5',
    lpTYT: '0x123',
    vtActive: true,
    ytEnable: true,
    lpYields: true,
    projectIcon: 'ReppoNft',
    icon: 'ReppoNft',
    tit: 'Reppo Network LNT Vault',
    info: 'Reppo are building plug & play style infrastructure for AI Agents, Developers & Physical AI to permissionlessly discover, negotiate, commit, and settle on community-governed capital, specialized datasets, and infrastructure through an intent-centric architecture.',
  },
  {
    chain: zeroGTestnet.id,
    vault: '0xda732f0f05e8e4448d8358a142b289f528f81824',
    asset: '0xfce521166366566a49344a0dd529028d5fda5cd3',
    protocol: '0x47c79e20ffd41ca55ced7e31aa5767a7440ff0cf',
    onEnv: ['test', 'prod'],
    // MockT: '0xe01c85599300f9ed5de2d7d4fe3dc2dc4c5c3877',
    MockaVTOracle: '0x8fb28f6d7834dc0127e39be7c9db11383e126d2b',
    MockNodeDelegator: '0xc7329fbb367f709b57f3945eb6ac18cebd711c7c',
    MockRewardDistribuitor: '0x1063bbc8c6a81f0f84af6b6c84f6a7635b008893',
    lpTYT: '0x123',
    vtActive: true,
    ytEnable: true,
    lpYields: true,
    projectIcon: 'ZeroG',
    icon: 'ZeroG',
    tit: '0G AI Alignment Node',
    info: '0G (Zero Gravity) is the first decentralized AI L1 chain that orchestrates hardware resources (storage, compute) and software assets (data, models) to handle AI workloads at scale. It bridges the gap between Web2 AI capabilities and Web3 decentralization.',
  },
]
