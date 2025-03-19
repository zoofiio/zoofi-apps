import { Address } from 'viem'

export const LP_TOKENS: { [k: Address]: { poolType: bigint; base: Address; quote: Address; poolId?: Address; baseDecimal?: number; quoteDecimal?: number; isStable?: boolean } } = {
  '0xD69ADb6FB5fD6D06E6ceEc5405D95A37F96E3b96': { poolType: 36000n, base: '0x0e4aaf1351de4c0264c5c7056ef3777b41bd8e03', quote: '0xd6d83af58a19cd14ef3cf6fe848c9a4d21e5727c' },
  '0xd28d852cbcc68dcec922f6d5c7a8185dbaa104b7': { poolType: 36000n, base: '0x0e4aaf1351de4c0264c5c7056ef3777b41bd8e03', quote: '0x7507c1dc16935b82698e4c63f2746a2fcf994df8' },
  // mainnet
  '0xf961a8f6d8c69e7321e78d254ecafbcc3a637621': {
    isStable: true,
    poolType: 36000n,
    base: '0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce',
    quoteDecimal: 6,
    quote: '0x549943e04f40284185054145c6E4e9568C1D3241',
    poolId: '0xf961a8f6d8c69e7321e78d254ecafbcc3a637621000000000000000000000001',
  },
  '0xdE04c469Ad658163e2a5E860a03A86B52f6FA8C8': {
    isStable: true,
    poolType: 36000n,
    base: '0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce',
    quoteDecimal: 6,
    quote: '0x688e72142674041f8f6Af4c808a4045cA1D6aC82',
    poolId: '0xde04c469ad658163e2a5e860a03a86b52f6fa8c8000000000000000000000000',
  },
  '0xdd70a5ef7d8cfe5c5134b5f9874b09fb5ce812b4': {
    isStable: false,
    poolType: 36000n,
    base: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
    quote: '0x6969696969696969696969696969696969696969',
    poolId: '0xdd70a5ef7d8cfe5c5134b5f9874b09fb5ce812b4000200000000000000000003',
  },
}
