import { promiseAll } from '@/lib/utils'
import { Token } from '@uniswap/sdk-core'
import { Pool, Position } from '@uniswap/v4-sdk'
import _ from 'lodash'
import { Address, encodeAbiParameters, encodePacked, erc20Abi, Hex, parseAbi, parseAbiParameters, PublicClient, SimulateContractParameters, toHex, zeroAddress } from 'viem'
export const abiUniRouter = parseAbi([
  'function execute(bytes calldata commands, bytes[] calldata inputs) public payable',
  'function execute(bytes calldata commands, bytes[] calldata inputs, uint256 deadline) public payable',
])

export const abiPermit2 = parseAbi(['function approve(address token,address spender,uint160 amount,uint48 expiration)'])

export const abiPositionManager = parseAbi(['function modifyLiquidities(bytes calldata data,uint256 deadline) public payable'])

const poolKeyAbi = parseAbiParameters(['PoolKey', 'struct PoolKey { address currency0; address currency1 ;uint24 fee; int24 tickSpacing; address hooks;}'])
const modifyLpParams = parseAbiParameters(['ModifyLiquidityParams', 'struct ModifyLiquidityParams { int24 tickLower; int24 tickUpper;int256 liquidityDelta;bytes32 salt;}'])
export const abiPoolManager = parseAbi([
  'function getSlot0(bytes32 poolId) external view returns(uint160 sqrtPriceX96, int24 tick, uint24 protocolFee, uint24 lpFee)',
  'function getLiquidity(bytes32 poolId) external view returns (uint128 liquidity)',
  'function modifyLiquidity(PoolKey memory key, ModifyLiquidityParams memory params, bytes calldata hookData) external returns (int256 callerDelta, int256 feesAccrued)',
  'struct PoolKey { address currency0; address currency1 ;uint24 fee; int24 tickSpacing; address hooks;}',
  'struct ModifyLiquidityParams { int24 tickLower; int24 tickUpper;int256 liquidityDelta;bytes32 salt;}',
])

export type UNI_CONFIG = { unirouter: Address; permit2: Address; positionmanager: Address; poolmanager: Address }
export const UNI_CONFIGS: { [k: number]: UNI_CONFIG } = {
  [1]: {
    unirouter: '0x66a9893cc07d91d95644aedd05d03f95e1dba8af',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0xbd216513d74c8cf14cf4747e6aaa6420ff64ee9e',
    poolmanager: '0x000000000004444c5dc75cB358380D2e3dE08A90',
  },
  [130]: {
    unirouter: '0xef740bf23acae26f6492b10de645d6b98dc8eaf3',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0x4529a01c7a0410167c5740c487a8de60232617bf',
    poolmanager: '0x1f98400000000000000000000000000000000004',
  },
  [10]: {
    unirouter: '0x851116d9223fabed8e56c0e6b8ad0c31d98b3507',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0x3c3ea4b57a46241e54610e5f022e5c45859a1017',
    poolmanager: '0x9a13f98cb987694c9f086b1f5eb990eea8264ec3',
  },
  [8453]: {
    unirouter: '0x6ff5693b99212da76ad316178a184ab56d299b43',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0x7c5f5a4bbd8fd63184577525326123b519429bdc',
    poolmanager: '0x498581ff718922c3f8e6a244956af099b2652b2b',
  },
  [42161]: {
    unirouter: '0xa51afafe0263b40edaef0df8781ea9aa03e381a3',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0xd88f38f930b7952f2db2432cb002e7abbf3dd869',
    poolmanager: '0x360e68faccca8ca495c1b759fd9eee466db9fb32',
  },
  [137]: {
    unirouter: '0x1095692a6237d83c6a72f3f5efedb9a670c49223',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0x1ec2ebf4f37e7363fdfe3551602425af0b3ceef9',
    poolmanager: '0x67366782805870060151383f4bbff9dab53e5cd6',
  },
  [81457]: {
    unirouter: '0xeabbcb3e8e415306207ef514f660a3f820025be3',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0x4ad2f4cca2682cbb5b950d660dd458a1d3f1baad',
    poolmanager: '0x1631559198a9e474033433b2958dabc135ab6446',
  },
  [7777777]: {
    unirouter: '0x3315ef7ca28db74abadc6c44570efdf06b04b020',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0xf66c7b99e2040f0d9b326b3b7c152e9663543d63',
    poolmanager: '0x0575338e4c17006ae181b47900a84404247ca30f',
  },
  [480]: {
    unirouter: '0x8ac7bee993bb44dab564ea4bc9ea67bf9eb5e743',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0xc585e0f504613b5fbf874f21af14c65260fb41fa',
    poolmanager: '0xb1860d529182ac3bc1f51fa2abd56662b7d13f33',
  },
  [57073]: {
    unirouter: '0x112908dac86e20e7241b0927479ea3bf935d1fa0',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0x1b35d13a2e2528f192637f14b05f0dc0e7deb566',
    poolmanager: '0x360e68faccca8ca495c1b759fd9eee466db9fb32',
  },
  [1868]: {
    unirouter: '0x4cded7edf52c8aa5259a54ec6a3ce7c6d2a455df',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0x1b35d13a2e2528f192637f14b05f0dc0e7deb566',
    poolmanager: '0x360e68faccca8ca495c1b759fd9eee466db9fb32',
  },
  [43114]: {
    unirouter: '0x94b75331ae8d42c1b61065089b7d48fe14aa73b7',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0xb74b1f14d2754acfcbbe1a221023a5cf50ab8acd',
    poolmanager: '0x06380c0e0912312b5150364b9dc4542ba0dbbc85',
  },
  [56]: {
    unirouter: '0x1906c1d672b88cd1b9ac7593301ca990f94eae07',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0x7a4a5c919ae2541aed11041a1aeee68f1287f95b',
    poolmanager: '0x28e2ea090877bf75740558f6bfb36a5ffee9e9df',
  },
  [1301]: {
    unirouter: '0xf70536b3bcc1bd1a972dc186a2cf84cc6da6be5d',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0xf969aee60879c54baaed9f3ed26147db216fd664',
    poolmanager: '0x00b036b58a818b1bc34d502d3fe730db729e62ac',
  },
  [11155111]: {
    unirouter: '0x3a9d48ab9751398bbfa63ad67599bb04e4bdf98b',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0x429ba70129df741B2Ca2a85BC3A2a3328e5c09b4',
    poolmanager: '0xE03A1074c86CFeDd5C142C4F04F1a1536e203543',
  },
  [84532]: {
    unirouter: '0x492e6456d9528771018deb9e87ef7750ef184104',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0x4b2c77d209d3405f41a037ec6c77f7f5b8e2ca80',
    poolmanager: '0x05E73354cFDd6745C338b50BcFDfA3Aa6fA03408',
  },
}
export type UniSwapConfig = {
  chainId: number
  token0: Address
  token1: Address
  fee: number
  tickSpacing: number
  hooks?: Address
  is0To1?: boolean
  amountIn: bigint
  amountOutMin?: bigint
  deadline?: number
}

export function encodeSingleSwap({
  chainId,
  token0,
  token1,
  fee,
  tickSpacing,
  hooks = zeroAddress,
  is0To1 = true,
  amountIn,
  amountOutMin = 0n,
  deadline = 60 * 10,
}: UniSwapConfig): SimulateContractParameters[] {
  const cf = UNI_CONFIGS[chainId]
  const commands = encodePacked(['uint8'], [0x10])
  /**  uint256 internal constant SWAP_EXACT_IN_SINGLE = 0x06;
    uint256 internal constant SWAP_EXACT_IN = 0x07;
    uint256 internal constant SWAP_EXACT_OUT_SINGLE = 0x08;
    uint256 internal constant SWAP_EXACT_OUT = 0x09; */
  // action,
  const actions = encodePacked(['uint8', 'uint8', 'uint8'], [0x06, 0x0c, 0x0f])
  const input = is0To1 ? token0 : token1
  const out = is0To1 ? token1 : token0
  const expiration = Math.round(_.now() / 1000 + deadline)
  const params: Hex[] = ['0x', '0x', '0x']
  params[0] = encodeAbiParameters(
    parseAbiParameters([
      'ExactInputSingleParams',
      'struct ExactInputSingleParams { PoolKey poolKey;bool zeroForOne;uint128 amountIn;uint128 amountOutMinimum;bytes hookData;}',
      'struct PoolKey { address currency0; address currency1 ;uint24 fee; int24 tickSpacing; address hooks;}',
    ]),
    [
      {
        poolKey: {
          currency0: token0,
          currency1: token1,
          fee,
          tickSpacing,
          hooks,
        },
        zeroForOne: is0To1,
        amountIn: amountIn,
        amountOutMinimum: amountOutMin,
        hookData: '0x',
      },
    ],
  )

  params[1] = encodeAbiParameters([{ type: 'address' }, { type: 'uint256' }], [input, amountIn])
  params[2] = encodeAbiParameters([{ type: 'address' }, { type: 'uint256' }], [out, amountOutMin])

  const inputs: Hex[] = ['0x']
  inputs[0] = encodeAbiParameters([{ type: 'bytes' }, { type: 'bytes[]' }], [actions, params])
  return [
    // approve to permit2
    { abi: erc20Abi, address: input, functionName: 'approve', args: [cf.permit2, amountIn] },
    // permit2 approve
    { abi: abiPermit2, address: cf.permit2, functionName: 'approve', args: [input, cf.unirouter, amountIn, expiration] },
    // router execute
    { abi: abiUniRouter, functionName: 'execute', address: cf.unirouter, args: [commands, inputs, BigInt(expiration)] },
  ]
}

export type UniModifyLP = {
  chainId: number
  lp: Address
  token0: Address
  token1: Address
  fee: number
  tickSpacing: number
  hooks?: Address
  liquidity: bigint
  amount0Max?: bigint
  amount1Max?: bigint
  tickLower?: number
  tickUpper?: number
  hookData?: Hex
  deadline?: number
}
export function encodeModifyLP({
  chainId,
  fee,
  tickSpacing,
  hooks = zeroAddress,
  lp,
  token0,
  token1,
  liquidity,
  amount0Max,
  amount1Max,
  tickLower = -100000,
  tickUpper = 100000,
  hookData = '0x',
  deadline = 60 * 10,
}: UniModifyLP): SimulateContractParameters[] {
  const cf = UNI_CONFIGS[chainId]
  const expiration = Math.round(_.now() / 1000 + deadline)
  const poolKeyBytes = encodeAbiParameters(poolKeyAbi, [
    {
      currency0: token0,
      currency1: token1,
      fee,
      tickSpacing,
      hooks,
    },
  ])
  const modifyLpParamsBytes = encodeAbiParameters(modifyLpParams, [
    {
      tickLower,
      tickUpper,
      liquidityDelta: liquidity,
      salt: toHex(lp, { size: 32 }),
    },
  ])
  if (liquidity > 0n) {
    return [
      // approve to permit2
      { abi: erc20Abi, address: token0, functionName: 'approve', args: [cf.permit2, amount0Max] },
      { abi: erc20Abi, address: token1, functionName: 'approve', args: [cf.permit2, amount1Max] },
      // permit2 approve
      { abi: abiPermit2, address: cf.permit2, functionName: 'approve', args: [token0, cf.poolmanager, amount0Max, expiration] },
      { abi: abiPermit2, address: cf.permit2, functionName: 'approve', args: [token1, cf.poolmanager, amount1Max, expiration] },
      // router execute
      { abi: abiPoolManager, functionName: 'modifyLiquidity', address: cf.poolmanager, args: [poolKeyBytes, modifyLpParamsBytes, hookData] },
    ]
  } else {
    return [
      // approve to permit2
      { abi: erc20Abi, address: lp, functionName: 'approve', args: [cf.permit2, -liquidity] },
      // permit2 approve
      { abi: abiPermit2, address: cf.permit2, functionName: 'approve', args: [token0, cf.poolmanager, -liquidity, expiration] },
      // router execute
      { abi: abiPoolManager, functionName: 'modifyLiquidity', address: cf.poolmanager, args: [poolKeyBytes, modifyLpParamsBytes, hookData] },
    ]
  }
}

export async function calcAddLP({
  chainId,
  token0,
  token1,
  token0Decimals = 18,
  token1Decimals = 18,
  fee,
  tickSpacing,
  hooks = zeroAddress,
  pc,
  inputAmount,
  inputIsToken0,
  tickLower = -100000,
  tickUpper = 100000,
}: {
  pc: PublicClient
  chainId: number
  token0: Address
  token1: Address
  token0Decimals?: number
  token1Decimals?: number
  fee: number
  tickSpacing: number
  inputAmount: bigint
  inputIsToken0: boolean
  hooks?: Address
  tickLower?: number
  tickUpper?: number
}): Promise<[bigint, bigint, bigint]> {
  if (inputAmount <= 0n) return [0n, 0n, 0n]
  const cf = UNI_CONFIGS[chainId]
  const currency0 = new Token(chainId, token0, token0Decimals)
  const currency1 = new Token(chainId, token1, token1Decimals)
  let pool = new Pool(currency0, currency1, fee, tickSpacing, hooks, '0', '0', 0)
  const res = await promiseAll({
    slot0: pc.readContract({ abi: abiPoolManager, address: cf.poolmanager, functionName: 'getSlot0', args: [pool.poolId as any] }),
    liquidity: pc.readContract({ abi: abiPoolManager, address: cf.poolmanager, functionName: 'getLiquidity', args: [pool.poolId as any] }),
  })
  const [sqrtPriceX96, tick] = res.slot0
  pool = new Pool(currency0, currency1, fee, tickSpacing, hooks, sqrtPriceX96.toString(), res.liquidity.toString(), tick)
  //   new Position({ pool, liquidity: pool.liquidity, tickLower: })
  const p = inputIsToken0
    ? Position.fromAmount0({ pool, tickLower, tickUpper, amount0: inputAmount.toString(), useFullPrecision: true })
    : Position.fromAmount1({ pool, tickLower, tickUpper, amount1: inputAmount.toString() })
  return [BigInt(p.liquidity.toString()), BigInt(p.amount0.toExact()), BigInt(p.amount1.toExact())]
}

export async function calcRemoveLP({
  chainId,
  token0,
  token1,
  token0Decimals = 18,
  token1Decimals = 18,
  fee,
  tickSpacing,
  hooks = zeroAddress,
  pc,
  inputAmount,
  tickLower = -100000,
  tickUpper = 100000,
}: {
  pc: PublicClient
  chainId: number
  token0: Address
  token1: Address
  token0Decimals?: number
  token1Decimals?: number
  fee: number
  tickSpacing: number
  inputAmount: bigint
  hooks?: Address
  tickLower?: number
  tickUpper?: number
}): Promise<[bigint, bigint]> {
  if (inputAmount <= 0n) return [0n, 0n]
  const cf = UNI_CONFIGS[chainId]
  const currency0 = new Token(chainId, token0, token0Decimals)
  const currency1 = new Token(chainId, token1, token1Decimals)
  let pool = new Pool(currency0, currency1, fee, tickSpacing, hooks, '0', '0', 0)
  const res = await promiseAll({
    slot0: pc.readContract({ abi: abiPoolManager, address: cf.poolmanager, functionName: 'getSlot0', args: [pool.poolId as any] }),
    liquidity: pc.readContract({ abi: abiPoolManager, address: cf.poolmanager, functionName: 'getLiquidity', args: [pool.poolId as any] }),
  })
  const [sqrtPriceX96, tick] = res.slot0
  pool = new Pool(currency0, currency1, fee, tickSpacing, hooks, sqrtPriceX96.toString(), res.liquidity.toString(), tick)
  const p = new Position({ pool, liquidity: inputAmount.toString(), tickLower, tickUpper })
  const { amount0, amount1 } = p.mintAmounts
  return [BigInt(amount0.toString()), BigInt(amount1.toString())]
}
