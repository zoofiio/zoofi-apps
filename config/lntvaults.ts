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
  icon: string
  tit: string
  info: string
}
export const LNTVAULTS_CONFIG: LntVaultConfig[] = [
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
    icon: 'ZeroG',
    tit: '0G AI Alignment Node',
    info: '0G (Zero Gravity) is the first decentralized AI L1 chain that orchestrates hardware resources (storage, compute) and software assets (data, models) to handle AI workloads at scale. It bridges the gap between Web2 AI capabilities and Web3 decentralization.',
  },
  {
    chain: arbitrum.id,
    vault: '0x51bc756d7522f963e64d8ef98fdf9ec509f03689',
    asset: '0xb58dafe606162a744f5007a49d928055bcfb67ed',
    protocol: '0x0028b2137d90f52443287d63a7bb398580ee0158',
    protocalSettings: '0x67b02b199a45a6c158f7ec66ef01139432d4dcb0',
    onEnv: ['test'],
    MockT: '0x776f5061f89aa8df62f8e52688516ab33e55b494',
    // MockaVTOracle: '0xf1487677d2e09250d89efdb647e3e288503683d0',
    // MockNodeDelegator: '0xc7329fbb367f709b57f3945eb6ac18cebd711c7c',
    // MockRewardDistribuitor: '0x1063bbc8c6a81f0f84af6b6c84f6a7635b008893',
    AethirNFT: '0xb58dafe606162a744f5007a49d928055bcfb67ed',
    AethirVToracle: '0x27d3e7898cdff305fbc031d44c087c031188ca25',
    AethirRedeemStrategy: '0x2280c560B1d36eb40814F1E7489663C35B1BaDF0',
    isAethir: true,
    lpTYT: '0x123',
    test: true,
    vtActive: true,
    ytEnable: false,
    lpYields: false,
    icon: 'aethir',
    tit: 'Aethir Checker Node',
    info: `Aethir is best described as distributed cloud compute infrastructure. It aggregates enterprise-grade GPU chips into a single global network to increase the supply of on-demand cloud compute resources for the AI, gaming, and virtualized compute sectors.
Checker nodes ensure the integrity and service quality of Aethir network by checking the GPU specifications and its service process.`,
  },
]
