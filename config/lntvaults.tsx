import { Address, zeroAddress } from 'viem'
import { arbitrum, bsc, story } from 'viem/chains'
import { TypeENV } from './env'
import { base, sei } from './network'
import { ReactNode } from 'react'

export const WriteConfirmations = 3

export type LntVaultConfig = {
  chain: number
  vault: Address
  asset: Address // ERC721

  protocol: Address
  protocalSettings: Address
  lpTYT?: Address
  RedeemStrategy?: Address
  // aethir
  AethirNFT?: Address
  AethirVToracle?: Address
  isAethir?: boolean

  // 0G
  isZeroG?: boolean

  onEnv?: TypeENV[]
  vtActive: boolean
  ytEnable: boolean
  lpYields: boolean
  test?: boolean
  projectIcon: string
  icon: string
  tit: string
  info: ReactNode
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
  vtSwapHook: Address

  // lvt
  isLVT?: boolean
  depositFees?: string // def 5%

  // for reppo
  reppo?: {
    standard: Address
    preminum: Address
  }

  // is
  isFil?: boolean
  isVerio?: boolean
  isSei?: boolean
}
export const LNTVAULTS_CONFIG: LntVaultConfig[] = [
  // {
  //   chain: bsc.id,
  //   nftBalanceBy: 'alchemy',
  //   vault: '0x6e603014ace3ae06f34ffe259106af77c056d913',
  //   asset: '0xd0f4E1265Edd221b5bb0e8667a59f31B587B2197',
  //   protocol: '0x893509c486def081b959bed440d97f15b014643a',
  //   protocalSettings: '0xba3a59d369bdde63929691721e063105bbe12fe9',
  //   onEnv: ['test'],
  //   lpTYT: zeroAddress,
  //   isZeroG: true,
  //   vtActive: true,
  //   ytEnable: false,
  //   lpYields: false,
  //   projectIcon: '0G',
  //   startTime: 1762838215n,
  //   icon: 'ZeroG',
  //   tit: '0G AI Alignment Node',
  //   info: '0G (Zero Gravity) is the first decentralized AI L1 chain that orchestrates hardware resources (storage, compute) and software assets (data, models) to handle AI workloads at scale. It bridges the gap between Web2 AI capabilities and Web3 decentralization.',
  //   buyback: true,
  //   disWithdrawNFT: true,
  //   buybackPool: '0x6e603014ace3ae06f34ffe259106af77c056d913',
  //   deposit: {
  //     chain: arbitrum.id,
  //     vault: '0x6e603014ace3ae06f34ffe259106af77c056d913',
  //     protocol: '0xc78ae1d6ff234775f3f8d12f77cb7ed5cbc4e976',
  //     protocalSettings: '0x893509c486def081b959bed440d97f15b014643a',
  //     vtOracle: '0xf6f4a88ffd26fb14da4cff997ca773b06e3b2db3',
  //     fnRedeem: 'redeem',
  //     fnDepoist: 'deposit',
  //     vtAdapter: '0x33C42E171cFD7Ec85D3dB34D7f6d3D8121f64E63',
  //   },
  //   vtSwapHook: '0xa0dcce857576c4691507acd690700e7610a1fa88',
  // },
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
    vtSwapHook: '0xbf4b4A83708474528A93C123F817e7f2A0637a88',
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
    chain: base.id,
    nftBalanceBy: 'alchemy',
    vault: '0x878aac1ca6b36a2841ae0200f2366a4178c2ca22',
    asset: zeroAddress,
    protocol: '0x170e0c91ffa71dc3c16d43f754b3aece688470c8',
    protocalSettings: '0x2f70e725553c8e3341e46caa4e9b303e9d810fc9',
    onEnv: ['test', 'prod'],
    lpTYT: zeroAddress,
    isZeroG: false,
    vtActive: true,
    ytEnable: false,
    lpYields: false,
    projectIcon: 'Reppo',
    startTime: 1762838215n,
    icon: 'ReppoNft',
    tit: 'Reppo Solver Node',
    info: `Reppo's mission is to build a decentralized version of Scale AI on-chain where everyone involved in the generation and monetization of AI training data shares the upside, without intermediaries involved.The Reppo Solver Node is a decentralized application designed to participate in the Reppo.Exchange, a blockchain-based data marketplace that facilitates the creation, validation, and exchange of high-quality datasets.`,
    disWithdrawNFT: true,
    buyback: true,
    buybackPool: '0xf8dfaa0967c812a43d02059f2b14786dceb84e8b',
    vtSwapHook: '0x2b72494fd4f092569b87e1a10f92268384f07a88',
    reppo: {
      standard: '0x8A1BCBd935c9c7350013786D5d1118832F10e149',
      preminum: '0x1a245cfA2515089017792D92E9d68B8F8b3691eE',
    },
  },
  // LVT
  {
    isLVT: true,
    isFil: true,
    chain: bsc.id,
    nftBalanceBy: 'rpc-amount',
    vault: '0xebf1039d30d7a03e6f09d0815431db339017d031',
    asset: '0xd7fc9ab355567af429fb5bb3b535eab4c7e48567',
    protocol: '0x170e0c91ffa71dc3c16d43f754b3aece688470c8',
    protocalSettings: '0x2f70e725553c8e3341e46caa4e9b303e9d810fc9',
    vtSwapHook: '0xed202a7050ee856ba9f0d3cd5eabcab6b8a23a88',
    onEnv: ['test', 'prod'],
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
  // {
  //   isLVT: true,
  //   isVerio: true,
  //   chain: story.id,
  //   nftBalanceBy: 'rpc-amount',
  //   vault: '0x38402aa01220a1d19edfe061760877a353728214',
  //   asset: '0x5267F7eE069CEB3D8F1c760c215569b79d0685aD',
  //   protocol: '0xa341e92b22b1a2c94b24163eae09aed34e8ea134',
  //   protocalSettings: '0x056e530679857dbd884f7a9bd71e6b8a76909181',
  //   vtSwapHook: '0xee5aeecd6c9409424f88163aff415efcb9027a88',
  //   onEnv: ['test'],
  //   buyback: true,
  //   buybackPool: '0x4979a12bf440049780df3dcf245769e6bd1741db',
  //   lpTYT: zeroAddress,
  //   vtActive: true,
  //   ytEnable: false,
  //   lpYields: false,
  //   projectIcon: 'IP',
  //   startTime: 1765323400n,
  //   icon: 'IP',
  //   tit: 'vIP(Verio) 90-Locked Vault',
  //   info: `Story is a purpose-built Layer 1 blockchain designed specifically for intellectual property. Verio is the IP trust engine powering Story's IP blockchain. vIP, issued by Verio, is the LST asset of the Story network. The vIP (Verio) 90-Locked Vault instantly unlocks and distributes the next 90 days of LST staking rewards upfront, while still allowing users to redeem locked vIP 1:1 for WIP upon maturity.`,
  // },
  {
    isLVT: true,
    isSei: true,
    chain: sei.id,
    nftBalanceBy: 'rpc-amount',
    vault: '0x5d5958f62ffc35a93c426c0d5fc55cd3dffc9e20',
    asset: '0xf8dfaa0967c812a43d02059f2b14786dceb84e8b',
    protocol: '0xa341e92b22b1a2c94b24163eae09aed34e8ea134',
    protocalSettings: '0x056e530679857dbd884f7a9bd71e6b8a76909181',
    vtSwapHook: '0x3362cb23043cb5e7c52711c5763c69fd513a3a88',
    onEnv: ['test','prod'],
    buyback: true,
    buybackPool: '0x8bf32a9603859235cdaf32e8201982a6cdcf411a',
    lpTYT: zeroAddress,
    vtActive: true,
    ytEnable: false,
    lpYields: false,
    projectIcon: 'SEI',
    startTime: 1765869735n,
    icon: 'SEI',
    tit: 'SEI 360-Locked Vault',
    info: <>
      SEI Network is the first parallelized EVM blockchain delivering unmatched scalability and speed.<br />
      The SEI 360-Locked Vault instantly unlocks and distributes the next 360 days of LST staking rewards upfront, while still allowing users to redeem locked vSEI 1:1 for WSEI upon maturity.<br />
      <a href='https://rest.pacific-1.sei.io/cosmos/staking/v1beta1/delegations/sei1lm44xxxvjlepnmms2rt46vj7fmqlr28h5eku2v' target='_blank' className='underline underline-offset-2 text-primary cursor-pointer'>
        Delegation details
      </a>
    </>,
  },
]


export const LntConfigs = LNTVAULTS_CONFIG.filter(item => !item.isLVT)
export const LvtConfigs = LNTVAULTS_CONFIG.filter(item => item.isLVT)