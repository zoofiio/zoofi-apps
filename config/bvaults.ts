import { Address } from 'viem'
import { berachain, berachainTestnet } from './network'
import { TypeENV } from './env'
import { proxyGetDef } from '@/lib/utils'

export type BVaultConfig = {
  vault: Address
  asset: Address
  assetSymbol: string
  pToken: Address
  pTokenV2?: boolean
  pTokenSymbol: string
  yTokenSymbol: string
  protocolAddress: Address
  protocolSettingsAddress: Address
  yeetLiqSymbol?: string
  rewardSymbol?: string
  bQueryAddres: Address
  lpPoolIdx?: number
  isOld?: boolean
  onEnv?: TypeENV[]
}

export const ZooProtocolAddress: { [k: number]: Address } = {
  [berachainTestnet.id]: '0x8685CE9Db06D40CBa73e3d09e6868FE476B5dC89',
  [berachain.id]: '0x4737c3BAB13a1Ad94ede8B46Bc6C22fb8bBE9c81',
}
export const ZooProtocolSettingsAddress: { [k: number]: Address } = {
  [berachainTestnet.id]: '0x97d82C639835F4EfaCC366fdE78CA0c4EC2a2A83',
  [berachain.id]: '0x7D3Cec2f46279229277802D30702e4E7FB19bAC0',
}
export const CrocQueryAddress: { [k: number]: Address } = {
  [berachainTestnet.id]: '0x8685CE9Db06D40CBa73e3d09e6868FE476B5dC89',
  [berachain.id]: '0x8685CE9Db06D40CBa73e3d09e6868FE476B5dC89',
}

export const HONEY_Address: { [k: number]: Address } = {
  [berachainTestnet.id]: '0x0e4aaf1351de4c0264c5c7056ef3777b41bd8e03',
  [berachain.id]: '0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce',
}
export const BQueryAddress: { [k: number]: Address } = {
  [berachainTestnet.id]: '0xDf1126d3627b7f5D2a44d978A7180AcbD3c34aB6',
  [berachain.id]: '0x6E603014ACE3Ae06F34Ffe259106Af77c056d913',
}

export const BVAULTS_CONFIG: { [key: number]: BVaultConfig[] } = proxyGetDef(
  {
    [berachainTestnet.id]: [
      // new
      // {
      //   vault: '0x74D124D12B2ef774C99f6c304feD0A1aA7A797cB',
      //   asset: '0xd28d852cbcc68dcec922f6d5c7a8185dbaa104b7',
      //   assetSymbol: 'HONEY-WBERA',
      //   pToken: '0xF8362a475d72Cb257612Bf0F0A48558288fFe379',
      //   pTokenSymbol: 'pHONEY-BERA',
      //   yTokenSymbol: 'yHONEY-BERA',
      //   protocolAddress: ZooProtocolAddress,
      //   protocolSettingsAddress: ZooProtocolSettingsAddress,
      //   bQueryAddres: BQueryAddress[berachainTestnet.id],
      //   onEnv: ['beta'],
      // },
      {
        vault: '0x9700FEa232560E4048DD924623491926282125bE',
        asset: '0xd28d852cbcc68dcec922f6d5c7a8185dbaa104b7',
        assetSymbol: 'HONEY-WBERA',
        pToken: '0x575287Cd8CB9A49e0EE00Bf0C71Eac337Ab8FeBa',
        pTokenSymbol: 'pHONEY-BERA',
        yTokenSymbol: 'yHONEY-BERA',
        protocolAddress: ZooProtocolAddress[berachainTestnet.id],
        protocolSettingsAddress: ZooProtocolSettingsAddress[berachainTestnet.id],
        bQueryAddres: BQueryAddress[berachainTestnet.id],
        isOld: true,
        onEnv: ['beta'],
      },
      {
        vault: '0x5C88005534FB5C5B01445eC5bC944ebA0818554f',
        asset: '0xd28d852cbcc68dcec922f6d5c7a8185dbaa104b7',
        assetSymbol: 'HONEY-WBERA',
        pToken: '0x19f4cE524268a01bfAFf8B433110d8304b096be0',
        pTokenSymbol: 'pHONEY-BERA',
        yTokenSymbol: 'yHONEY-BERA',
        protocolAddress: ZooProtocolAddress[berachainTestnet.id],
        protocolSettingsAddress: ZooProtocolSettingsAddress[berachainTestnet.id],
        bQueryAddres: BQueryAddress[berachainTestnet.id],
        isOld: true,
        onEnv: ['beta'],
      },
      {
        vault: '0x9Ef9cE44c82111e967904059edf12701e17e6C03',
        asset: '0xd28d852cbcc68dcec922f6d5c7a8185dbaa104b7',
        assetSymbol: 'HONEY-WBERA',
        pToken: '0x0C2553919748093b0760EA825C85dc5a72142932',
        pTokenSymbol: 'pHONEY-BERA',
        yTokenSymbol: 'yHONEY-BERA',
        protocolAddress: ZooProtocolAddress[berachainTestnet.id],
        protocolSettingsAddress: ZooProtocolSettingsAddress[berachainTestnet.id],
        bQueryAddres: BQueryAddress[berachainTestnet.id],
        isOld: true,
        onEnv: ['beta', 'test'],
      },
      {
        vault: '0x77412b08bB3a8c38F7D0DC7D1158C5E7bfE03Eea',
        asset: '0xd28d852cbcc68dcec922f6d5c7a8185dbaa104b7',
        assetSymbol: 'HONEY-WBERA',
        pToken: '0x02FEDe9cf47c3D8aCE52613C2a45bC588D4e0516',
        pTokenSymbol: 'pHONEY-BERA',
        yTokenSymbol: 'yHONEY-BERA',
        protocolAddress: ZooProtocolAddress[berachainTestnet.id],
        protocolSettingsAddress: ZooProtocolSettingsAddress[berachainTestnet.id],
        bQueryAddres: '0xEE723BD0bC2449678d37177B7D93cc69D1af4B6F',
        onEnv: ['beta'],
      },
      {
        vault: '0xCC5AeD7b81dc45f02329Cc2Bf2c64B873D0be752',
        asset: '0xd28d852cbcc68dcec922f6d5c7a8185dbaa104b7',
        assetSymbol: 'HONEY-WBERA',
        pToken: '0x05425F978a87DC80827f6c4a104FCbc6E9021ecc',
        pTokenSymbol: 'pHONEY-BERA',
        yTokenSymbol: 'yHONEY-BERA',
        protocolAddress: ZooProtocolAddress[berachainTestnet.id],
        protocolSettingsAddress: ZooProtocolSettingsAddress[berachainTestnet.id],
        bQueryAddres: '0xEE723BD0bC2449678d37177B7D93cc69D1af4B6F',
        onEnv: ['beta'],
      },
      {
        vault: '0x12f5F1f53B419d1E5F3084E649001Ff091683ADc',
        asset: '0x0001513F4a1f86da0f02e647609E9E2c630B3a14',
        assetSymbol: 'WBERA-YEET',
        pToken: '0x256938Bf1A340e6F80eAA35798b08a122783BEDF',
        pTokenSymbol: 'pWBERA-YEET',
        yTokenSymbol: 'yWBERA-YEET',
        rewardSymbol: 'WBERA-YEET',
        protocolAddress: ZooProtocolAddress[berachainTestnet.id],
        protocolSettingsAddress: ZooProtocolSettingsAddress[berachainTestnet.id],
        bQueryAddres: '0xEE723BD0bC2449678d37177B7D93cc69D1af4B6F',
        onEnv: ['beta'],
      },
      {
        vault: '0x6A2A4d8Fe425dC783e67b90d88922c5890BfA78c',
        asset: '0x0001513F4a1f86da0f02e647609E9E2c630B3a14',
        assetSymbol: 'WBERA-YEET',
        pToken: '0x890FDA8E5ce053D34aaA64B23d250f9AF04979e4',
        pTokenSymbol: 'pWBERA-YEET',
        yTokenSymbol: 'yWBERA-YEET',
        yeetLiqSymbol: 'LIQ-TRI-YEET',
        rewardSymbol: 'LIQ-TRI-YEET',
        protocolAddress: ZooProtocolAddress[berachainTestnet.id],
        protocolSettingsAddress: ZooProtocolSettingsAddress[berachainTestnet.id],
        bQueryAddres: '0xEE723BD0bC2449678d37177B7D93cc69D1af4B6F',
        onEnv: ['beta'],
      },
    ],
    [berachain.id]: [
      // {
      //   vault: '0xA6C0413f620cD8487Dac7C1770335ee169934826',
      //   asset: '0xdd70a5ef7d8cfe5c5134b5f9874b09fb5ce812b4',
      //   pToken: '0xC26B5F9dC7d61B6703004D642B7EF808FBA7BbEc',
      //   pTokenV2: true,
      //   assetSymbol: 'WBERA-WETH',
      //   pTokenSymbol: 'pWBERAWETH',
      //   yTokenSymbol: 'yWBERAWETH',
      //   rewardSymbol: 'iBGT',
      //   protocolAddress: '0x9Cfd768c1047D20456ab7333E135c16eFD0AE4D2',
      //   protocolSettingsAddress: '0x1C77a85D47974fEa7C8391317326335E35Ee3644',
      //   bQueryAddres: BQueryAddress[berachain.id],
      //   onEnv: ['test'],
      // },
      // {
      //   vault: '0xBC8015241A8445ADd39DE75477D0AC46F5884F55',
      //   asset: '0xf961a8f6d8c69e7321e78d254ecafbcc3a637621',
      //   pToken: '0xF3D282eAbCC4DC7c1e7FB9082b89e1e0760fA666',
      //   pTokenV2: true,
      //   assetSymbol: 'HONEY-USDC',
      //   pTokenSymbol: 'pUSDCeHONEY',
      //   yTokenSymbol: 'yUSDCeHONEY',
      //   rewardSymbol: 'iBGT',
      //   protocolAddress: '0x9Cfd768c1047D20456ab7333E135c16eFD0AE4D2',
      //   protocolSettingsAddress: '0x1C77a85D47974fEa7C8391317326335E35Ee3644',
      //   bQueryAddres: BQueryAddress[berachain.id],
      //   onEnv: ['test'],
      // },
      {
        vault: '0xf579c039c52ab795F0C4E358d3b462bE883cDd9F',
        asset: '0x9659dc8c1565E0bd82627267e3b4eEd1a377ebE6',
        pToken: '0xF0d0CEAE071b3aDfaad4Aa1722c9E9A94fb7Dd04',
        pTokenV2: true,
        assetSymbol: 'WETH-WBERA',
        pTokenSymbol: 'pWETHWBERA',
        yTokenSymbol: 'yWETHWBERA',
        rewardSymbol: 'iBGT',
        protocolAddress: '0x9F0956c33f45141a7D8D5751038ae0A71C562f87',
        protocolSettingsAddress: '0xE34e1C9FC5313D9ac4B121B5F93C51e619dd778A',
        bQueryAddres: BQueryAddress[berachain.id],
        onEnv: ['test'],
      },
      {
        vault: '0x94822b9BA715E9e3079ed12489Dc7A016694FC67',
        asset: '0xdd70a5ef7d8cfe5c5134b5f9874b09fb5ce812b4',
        pToken: '0x0DA715b18AaF66c7c044D4F315D479f6036728Ea',
        pTokenV2: true,
        assetSymbol: 'WBERA-WETH',
        pTokenSymbol: 'pWBERAWETH',
        yTokenSymbol: 'yWBERAWETH',
        rewardSymbol: 'iBGT',
        protocolAddress: '0x9F0956c33f45141a7D8D5751038ae0A71C562f87',
        protocolSettingsAddress: '0xE34e1C9FC5313D9ac4B121B5F93C51e619dd778A',
        bQueryAddres: BQueryAddress[berachain.id],
        onEnv: ['test', 'prod'],
      },

      {
        vault: '0xE6d15592F337f54E8BD47e56BbB22aF12F0D4083',
        asset: '0xf961a8f6d8c69e7321e78d254ecafbcc3a637621',
        pToken: '0xc2C5EaDF0f48702bEEDD2e2a35517e1fC4dBF7A7',
        pTokenV2: true,
        assetSymbol: 'HONEY-USDC',
        pTokenSymbol: 'pUSDCeHONEY',
        yTokenSymbol: 'yUSDCeHONEY',
        rewardSymbol: 'iBGT',
        protocolAddress: '0x9F0956c33f45141a7D8D5751038ae0A71C562f87',
        protocolSettingsAddress: '0xE34e1C9FC5313D9ac4B121B5F93C51e619dd778A',
        bQueryAddres: BQueryAddress[berachain.id],
        onEnv: ['test', 'prod'],
      },
      {
        vault: '0x702B707c2F8dd26F4F1e51cF425035d355A02767',
        asset: '0xdE04c469Ad658163e2a5E860a03A86B52f6FA8C8',
        pToken: '0xA58f5A2487abaBc5c5A23E3e3796E6615d12FCaf',
        assetSymbol: 'HONEY-BYUSD',
        pTokenSymbol: 'pHONEYBYUSD',
        yTokenSymbol: 'yHONEYBYUSD',
        rewardSymbol: 'iBGT',
        protocolAddress: '0xd75Dc0496826FF0C13cE6D6aA5Bf8D64126E4fF1',
        protocolSettingsAddress: '0x45a47E8013425AF3e6e71f1aa24e3B8c523386EA',
        bQueryAddres: BQueryAddress[berachain.id],
        onEnv: ['test', 'prod'],
      },
      {
        vault: '0x6686bDfF3ad20AE45E811c2451DfeE8AA0f338C0',
        asset: '0xdE04c469Ad658163e2a5E860a03A86B52f6FA8C8',
        pToken: '0x83f933af46458102cf54Eabe441DBB659a1B2eA5',
        assetSymbol: 'HONEY-BYUSD',
        pTokenSymbol: 'pHONEYBYUSD',
        yTokenSymbol: 'yHONEYBYUSD',
        rewardSymbol: 'iBGT',
        protocolAddress: ZooProtocolAddress[berachain.id],
        protocolSettingsAddress: ZooProtocolSettingsAddress[berachain.id],
        bQueryAddres: BQueryAddress[berachain.id],
        onEnv: ['test', 'prod'],
      },
      {
        vault: '0x33C42E171cFD7Ec85D3dB34D7f6d3D8121f64E63',
        asset: '0xf961a8f6d8c69e7321e78d254ecafbcc3a637621',
        pToken: '0x70B851f6877D16D6D5aD546B17d06281b8aBDd4b',
        assetSymbol: 'HONEY-USDC',
        pTokenSymbol: 'pHONEY-USDC',
        yTokenSymbol: 'yHONEY-USDC',
        rewardSymbol: 'iBGT',
        protocolAddress: '0xc0fA386aE92f18A783476d09121291A1972C30Dc',
        protocolSettingsAddress: '0x8c6E434Bb1C51728BdCc250255c1F654471d85eB',
        bQueryAddres: BQueryAddress[berachain.id],
        onEnv: ['test', 'prod'],
      },
    ],
  },
  [],
)

/**
 * {
 
  "ZooProtocol": {
    "address": "0x9F0956c33f45141a7D8D5751038ae0A71C562f87",
    "args": []
  },
  "ProtocolSettings": {
    "address": "0xE34e1C9FC5313D9ac4B121B5F93C51e619dd778A",
    "args": [
      "0x9F0956c33f45141a7D8D5751038ae0A71C562f87",
      "0x54c56e149f6d655aa784678057d1f96612b0cf1a"
    ]
  },
  "RedeemPoolFactory": {
    "address": "0x9231e8161249907656A98F369FA08C51fBE69C72",
    "args": [
      "0x9F0956c33f45141a7D8D5751038ae0A71C562f87"
    ]
  },
  "BribesPoolFactory": {
    "address": "0x008eeE3C55B2B1D938EE6345B0aCd9C9dCFd281f",
    "args": [
      "0x9F0956c33f45141a7D8D5751038ae0A71C562f87"
    ]
  },
  "VaultCalculator": {
    "address": "0xFBFAF4EB4eD2e241510a1B7917f58401986492ad",
    "args": []
  },
  "USDC.e-HONEY_InfraredBribeVaultV2": {
    "address": "0xE6d15592F337f54E8BD47e56BbB22aF12F0D4083",
    "args": [
      "0x9F0956c33f45141a7D8D5751038ae0A71C562f87",
      "0xE34e1C9FC5313D9ac4B121B5F93C51e619dd778A",
      "0x9231e8161249907656A98F369FA08C51fBE69C72",
      "0x008eeE3C55B2B1D938EE6345B0aCd9C9dCFd281f",
      "0x1419515d3703d8F2cc72Fa6A341685E4f8e7e8e1",
      "0xf961a8f6d8c69e7321e78d254ecafbcc3a637621",
      "Zoo pUSDC.e-HONEY",
      "pUSDCeHONEY"
    ]
  },
  "USDC.e-HONEY_InfraredBribeVaultV2_PTokenV2": {
    "contract": "zoo-bribe-vault/contracts/tokens/PTokenV2.sol:PTokenV2",
    "address": "0xc2C5EaDF0f48702bEEDD2e2a35517e1fC4dBF7A7",
    "args": [
      "0x9F0956c33f45141a7D8D5751038ae0A71C562f87",
      "0xE34e1C9FC5313D9ac4B121B5F93C51e619dd778A",
      "Zoo pUSDC.e-HONEY",
      "pUSDCeHONEY",
      18
    ]
  },
  "WBERA-WETH_InfraredBribeVaultV2": {
    "address": "0x94822b9BA715E9e3079ed12489Dc7A016694FC67",
    "args": [
      "0x9F0956c33f45141a7D8D5751038ae0A71C562f87",
      "0xE34e1C9FC5313D9ac4B121B5F93C51e619dd778A",
      "0x9231e8161249907656A98F369FA08C51fBE69C72",
      "0x008eeE3C55B2B1D938EE6345B0aCd9C9dCFd281f",
      "0x0dF14916796854d899576CBde69a35bAFb923c22",
      "0xdd70a5ef7d8cfe5c5134b5f9874b09fb5ce812b4",
      "Zoo pWBERA-WETH",
      "pWBERAWETH"
    ]
  },
  "WBERA-WETH_InfraredBribeVaultV2_PTokenV2": {
    "contract": "zoo-bribe-vault/contracts/tokens/PTokenV2.sol:PTokenV2",
    "address": "0x0DA715b18AaF66c7c044D4F315D479f6036728Ea",
    "args": [
      "0x9F0956c33f45141a7D8D5751038ae0A71C562f87",
      "0xE34e1C9FC5313D9ac4B121B5F93C51e619dd778A",
      "Zoo pWBERA-WETH",
      "pWBERAWETH",
      18
    ]
  }
}
}
 */
