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
    [berachain.id]: [
      {
        vault: '0xf579c039c52ab795F0C4E358d3b462bE883cDd9F',
        asset: '0x9659dc8c1565E0bd82627267e3b4eEd1a377ebE6',
        pToken: '0xF0d0CEAE071b3aDfaad4Aa1722c9E9A94fb7Dd04',
        pTokenV2: true,
        assetSymbol: 'WETH-WBERA',
        pTokenSymbol: 'pWETHWBERA',
        yTokenSymbol: 'yWETHWBERA',
        rewardSymbol: 'iBGT',
        protocolAddress: '0xd75Dc0496826FF0C13cE6D6aA5Bf8D64126E4fF1',
        protocolSettingsAddress: '0x45a47E8013425AF3e6e71f1aa24e3B8c523386EA',
        bQueryAddres: BQueryAddress[berachain.id],
        onEnv: ['test', 'prod'],
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