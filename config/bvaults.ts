import { Address } from 'viem'
import { berachainTestnet } from './network'
import { TypeENV } from './env'

export type BVaultConfig = {
  vault: Address
  asset: Address
  assetSymbol: string
  pToken: Address
  pTokenSymbol: string
  yTokenSymbol: string
  protocolAddress: Address
  protocolSettingsAddress: Address
  bQueryAddres: Address
  lpPoolIdx?: number
  isOld?: boolean
  onEnv?: TypeENV[]
}
export const ZooProtocolAddress = '0xF86a9a53D963B7a845F3496a97d0dB11cEc3c4E0'
export const ZooProtocolSettingsAddress = '0x97d82C639835F4EfaCC366fdE78CA0c4EC2a2A83'
export const CrocQueryAddress: { [k: number]: Address } = {
  [berachainTestnet.id]: '0x8685CE9Db06D40CBa73e3d09e6868FE476B5dC89',
}

export const HONEY_Address: { [k: number]: Address } = {
  [berachainTestnet.id]: '0x0e4aaf1351de4c0264c5c7056ef3777b41bd8e03',
}
export const BQueryAddress: { [k: number]: Address } = {
  [berachainTestnet.id]: '0xDf1126d3627b7f5D2a44d978A7180AcbD3c34aB6',
}

export const BVAULTS_CONFIG: { [key: number]: BVaultConfig[] } = {
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
      protocolAddress: ZooProtocolAddress,
      protocolSettingsAddress: ZooProtocolSettingsAddress,
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
      protocolAddress: ZooProtocolAddress,
      protocolSettingsAddress: ZooProtocolSettingsAddress,
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
      protocolAddress: ZooProtocolAddress,
      protocolSettingsAddress: ZooProtocolSettingsAddress,
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
      protocolAddress: ZooProtocolAddress,
      protocolSettingsAddress: ZooProtocolSettingsAddress,
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
      protocolAddress: ZooProtocolAddress,
      protocolSettingsAddress: ZooProtocolSettingsAddress,
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
      protocolAddress: ZooProtocolAddress,
      protocolSettingsAddress: ZooProtocolSettingsAddress,
      bQueryAddres: '0xEE723BD0bC2449678d37177B7D93cc69D1af4B6F',
      onEnv: ['beta'],
    },
  ],
}

export const CALC_LIQ: { [k: number]: Address } = {
  [berachainTestnet.id]: '0xa6b985dDa4D24B66fd4Ac2041395a82DcAdfD877',
}
