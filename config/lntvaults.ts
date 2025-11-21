import { Address, zeroAddress } from 'viem'
import { arbitrum, arbitrumSepolia, bsc, bscTestnet, sepolia } from 'viem/chains'
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
  startTime: bigint
  nftBalanceBy: 'zoofi' | 'rpc' | 'rpc-amount' | 'alchemy' | 'Moralis'

  buyback?: boolean
  buybackPool?: Address
  disWithdrawNFT?: boolean
  //
  deposit?: {
    chain: number
    vault: Address
    vtOracle: Address
    fnDepoist?: string
    fnRedeem?: string
    protocol?: Address
    protocalSettings?: Address
    vtAdapter?: Address
  }
  vtSwapHook?: Address

  // lvt
  isLVT?: boolean

}
export const LNTVAULTS_CONFIG: LntVaultConfig[] = [
  {
    chain: bsc.id,
    nftBalanceBy: 'alchemy',
    vault: '0x6e603014ace3ae06f34ffe259106af77c056d913',
    asset: '0xd0f4E1265Edd221b5bb0e8667a59f31B587B2197',
    protocol: '0x893509c486def081b959bed440d97f15b014643a',
    protocalSettings: '0xba3a59d369bdde63929691721e063105bbe12fe9',
    onEnv: ['test'],
    lpTYT: zeroAddress,
    isZeroG: true,
    vtActive: true,
    ytEnable: false,
    lpYields: false,
    projectIcon: '0G',
    startTime: 1762838215n,
    icon: 'ZeroG',
    tit: '0G AI Alignment Node',
    info: '0G (Zero Gravity) is the first decentralized AI L1 chain that orchestrates hardware resources (storage, compute) and software assets (data, models) to handle AI workloads at scale. It bridges the gap between Web2 AI capabilities and Web3 decentralization.',
    buyback: true,
    disWithdrawNFT: true,
    deposit: {
      chain: arbitrum.id,
      vault: '0x6e603014ace3ae06f34ffe259106af77c056d913',
      protocol: '0xc78ae1d6ff234775f3f8d12f77cb7ed5cbc4e976',
      protocalSettings: '0x893509c486def081b959bed440d97f15b014643a',
      vtOracle: '0xf6f4a88ffd26fb14da4cff997ca773b06e3b2db3',
      fnRedeem: 'redeem',
      fnDepoist: 'deposit',
      vtAdapter: '0x33C42E171cFD7Ec85D3dB34D7f6d3D8121f64E63',
    },
    vtSwapHook: '0xa0dcce857576c4691507acd690700e7610a1fa88',
  },
  {
    chain: bscTestnet.id,
    nftBalanceBy: 'zoofi',
    vault: '0x2faadaae8cee112b9e11b35f1c777fede3b0ffde',
    asset: '0x8b6d3c437326c46331f4b608c2f5c6c23ae2f836',
    protocol: '0x734623e7a70b6273fa4228dcf525643256d100c0',
    protocalSettings: '0xa6284206809734d3704b67948f634ff4bc898568',
    onEnv: ['test'],
    lpTYT: zeroAddress,
    ZeroGVToracle: '0x63008ce382e387502d4ee8e28bf73be7f5829f38',
    MockT: '0x785aeeb675a25034763710ac46dcd0799cf25293',
    isZeroG: true,
    vtActive: true,
    ytEnable: false,
    lpYields: false,
    projectIcon: '0G',
    startTime: 1762838215n,
    icon: 'ZeroG',
    tit: '0G AI Alignment Node',
    info: '0G (Zero Gravity) is the first decentralized AI L1 chain that orchestrates hardware resources (storage, compute) and software assets (data, models) to handle AI workloads at scale. It bridges the gap between Web2 AI capabilities and Web3 decentralization.',
    buyback: true,
    disWithdrawNFT: true,
    deposit: {
      chain: arbitrumSepolia.id,
      vault: '0x4fb04da43850ebe6675ac8274ff6a2c993bc2f8b',
      protocol: '0x0383bb45ef1dff46e649563218c509628d5eca16',
      protocalSettings: '0x8eeca063d0ec83b98f6af9008c535b1ca2c03e93',
      vtOracle: '0x63008ce382e387502d4ee8e28bf73be7f5829f38',
      fnRedeem: 'redeem',
      fnDepoist: 'deposit',
      vtAdapter: '0xB13038Dafc796A703A8204dD8559da1a0c27ae17',
    },
    vtSwapHook: '0x48e497862069034a6229e6cf59b7ebdf3f593a88',
  },

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
    projectIcon: 'ATH',
    startTime: 1753955184n,
    icon: 'aethir',
    tit: 'Aethir Checker Node',
    info: `Aethir is best described as distributed cloud compute infrastructure. It aggregates enterprise-grade GPU chips into a single global network to increase the supply of on-demand cloud compute resources for the AI, gaming, and virtualized compute sectors.
Checker nodes ensure the integrity and service quality of Aethir network by checking the GPU specifications and its service process.`,
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
    projectIcon: '0G',
    startTime: 1758171155n,
    icon: 'ZeroG',
    tit: '0G AI Alignment Node',
    info: '0G (Zero Gravity) is the first decentralized AI L1 chain that orchestrates hardware resources (storage, compute) and software assets (data, models) to handle AI workloads at scale. It bridges the gap between Web2 AI capabilities and Web3 decentralization.',
  },
  // {
  //   chain: sepolia.id,
  //   nftBalanceBy: 'alchemy',
  //   vault: '0xb8aa29c0688c53f4dd875b1d0702de69bf52df7d',
  //   asset: '0x0993a80ee5bb32b73f61c71662f53c599ee4f829',
  //   protocol: '0xcdf86f49303fd5350ece1f1a27b9d6083851ae04',
  //   onEnv: ['test', 'prod'],
  //   MockT: '0x6f00ca3db3ee2b72d8ddd434ae0e31571fd70f03',
  //   MockaVTOracle: '0x1e349be7cacbd558bf39ba38763359f541ed07ca',
  //   MockNodeDelegator: '0x48fdfe0ebc720262d4157ff9ea81d0d92d544c6d',
  //   MockRewardDistribuitor: '0x82d6a9b59c8aa157dca8ef1a15f36406198da3d5',
  //   lpTYT: zeroAddress,
  //   vtActive: true,
  //   ytEnable: true,
  //   lpYields: true,
  //   projectIcon: 'ReppoNft',
  //   icon: 'ReppoNft',
  //   tit: 'Reppo Network LNT Vault',
  //   info: 'Reppo are building plug & play style infrastructure for AI Agents, Developers & Physical AI to permissionlessly discover, negotiate, commit, and settle on community-governed capital, specialized datasets, and infrastructure through an intent-centric architecture.',
  // },
  // LVT
  {
    isLVT: true,
    chain: bsc.id,
    nftBalanceBy: 'rpc-amount',
    vault: '0xebf1039d30d7a03e6f09d0815431db339017d031',
    asset: '0xd7fc9ab355567af429fb5bb3b535eab4c7e48567',
    protocol: '0x170e0c91ffa71dc3c16d43f754b3aece688470c8',
    protocalSettings: '0x2f70e725553c8e3341e46caa4e9b303e9d810fc9',
    vtSwapHook: '0xed202a7050ee856ba9f0d3cd5eabcab6b8a23a88',
    onEnv: ['test'],
    buyback: true,
    buybackPool: '0x38402aa01220a1d19edfe061760877a353728214',
    lpTYT: zeroAddress,
    vtActive: true,
    ytEnable: false,
    lpYields: false,
    projectIcon: 'Filecoin',
    startTime: 1763626652n,
    icon: 'Filecoin',
    tit: 'Filecoin 540-Locked Vault',
    info: `Filecoin is a decentralized storage network powered by blockchain technology, designed to create a global marketplace for data storage and retrieval. Filecoin 540 Locked Vault instantly unlocks the liquidity of 540-day locked FIL tokens that Storage Providers (SPs) pledge as sector collateral. Each Vault position is backed 1:1 by real FIL tokens staked with active, verified Storage Providers on the Filecoin network.`,
  },
]
