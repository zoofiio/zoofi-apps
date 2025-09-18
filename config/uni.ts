import { TxConfig, withTokenApprove } from '@/components/approve-and-tx'
import { promiseAll } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { Token } from '@uniswap/sdk-core'
import { Pool, Position } from '@uniswap/v4-sdk'
import { now } from 'es-toolkit/compat'
import {
  Address,
  encodeAbiParameters,
  encodePacked,
  erc20Abi,
  Hex,
  isAddressEqual,
  parseAbi,
  parseAbiParameters,
  PublicClient,
  SimulateContractParameters,
  toHex,
  zeroAddress,
} from 'viem'
import { zeroGmainnet } from './network'
export const abiUniRouter = parseAbi([
  'function execute(bytes calldata commands, bytes[] calldata inputs) public payable',
  'function execute(bytes calldata commands, bytes[] calldata inputs, uint256 deadline) public payable',
])

export const abiPermit2 = parseAbi(['function approve(address token,address spender,uint160 amount,uint48 expiration)'])

export const abiPositionManager = parseAbi(['function modifyLiquidities(bytes calldata data,uint256 deadline) public payable'])

const poolKeyAbi = parseAbiParameters(['PoolKey', 'struct PoolKey { address currency0; address currency1 ;uint24 fee; int24 tickSpacing; address hooks;}'])
const modifyLpParams = parseAbiParameters(['ModifyLiquidityParams', 'struct ModifyLiquidityParams { int24 tickLower; int24 tickUpper;int256 liquidityDelta;bytes32 salt;}'])
export const abiPoolManager = parseAbi([
  'function modifyLiquidity(PoolKey memory key, ModifyLiquidityParams memory params, bytes calldata hookData) external returns (int256 callerDelta, int256 feesAccrued)',
  'struct PoolKey { address currency0; address currency1 ;uint24 fee; int24 tickSpacing; address hooks;}',
  'struct ModifyLiquidityParams { int24 tickLower; int24 tickUpper;int256 liquidityDelta;bytes32 salt;}',
])

export const abiStateView = parseAbi([
  'function getSlot0(bytes32 poolId) external view returns(uint160 sqrtPriceX96, int24 tick, uint24 protocolFee, uint24 lpFee)',
  'function getLiquidity(bytes32 poolId) external view returns (uint128 liquidity)',
])

export type UNI_CONFIG = { unirouter: Address; permit2: Address; positionmanager: Address; poolmanager: Address; stateview: Address }
export const UNI_CONFIGS: { [k: number]: UNI_CONFIG } = {
  [1]: {
    unirouter: '0x66a9893cc07d91d95644aedd05d03f95e1dba8af',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0xbd216513d74c8cf14cf4747e6aaa6420ff64ee9e',
    poolmanager: '0x000000000004444c5dc75cB358380D2e3dE08A90',
    stateview: '0x7ffe42c4a5deea5b0fec41c94c136cf115597227',
  },

  [11155111]: {
    unirouter: '0x3a9d48ab9751398bbfa63ad67599bb04e4bdf98b',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0x429ba70129df741B2Ca2a85BC3A2a3328e5c09b4',
    poolmanager: '0xE03A1074c86CFeDd5C142C4F04F1a1536e203543',
    stateview: '0xe1dd9c3fa50edb962e442f60dfbc432e24537e4c',
  },
  [16601]: {
    unirouter: '0xfa2ba0a2743ea9d60caf373482ea3a4200230dcc',
    permit2: '0x45B4798F3d93f3754ea2f28ea3b6449e31E53043',
    positionmanager: '0x429ba70129df741B2Ca2a85BC3A2a3328e5c09b4',
    poolmanager: '0x5cd9e7907522016160a8ce6ad58dc8a80909e79f',
    stateview: '0xe1dd9c3fa50edb962e442f60dfbc432e24537e4c',
  },
  [42161]: {
    unirouter: '0xa51afafe0263b40edaef0df8781ea9aa03e381a3',
    permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    positionmanager: '0xd88f38f930b7952f2db2432cb002e7abbf3dd869',
    poolmanager: '0x360e68faccca8ca495c1b759fd9eee466db9fb32',
    stateview: '0x76fd297e2d437cd7f76d50f01afe6160f86e9990',
  },
  [zeroGmainnet.id]: {
    unirouter: '0x550b031acbc56b309a8ef28914959115f6a97202',
    permit2: '0xA3eD53b6548cED609E6E7100c13D5bF129Acec57',
    positionmanager: '0x429ba70129df741B2Ca2a85BC3A2e3328e5c09b4',
    poolmanager: '0x8d50571796c86fd7018b5711a10a498eeaf5761f',
    stateview: '0xe1dd9c3fa50edb962e442f60dfbc432e24537e4c',  
  },
}
export type UniSwapConfig = {
  user: Address
  chainId: number
  poolkey: {
    currency0: Address
    currency1: Address
    fee: number
    tickSpacing: number
    hooks?: Address
  }
  is0To1?: boolean
  amountIn: bigint
  amountOutMin?: bigint
  deadline?: number
  approveName?: string
  executeName?: string
}

export async function encodeSingleSwap({
  user,
  chainId,
  poolkey,
  is0To1 = true,
  amountIn,
  amountOutMin = 0n,
  deadline = 60 * 10,
  approveName,
  executeName,
}: UniSwapConfig): Promise<TxConfig[]> {
  const cf = UNI_CONFIGS[chainId]
  const commands = encodePacked(['uint8'], [0x10])
  /**  uint256 internal constant SWAP_EXACT_IN_SINGLE = 0x06;
    uint256 internal constant SWAP_EXACT_IN = 0x07;
    uint256 internal constant SWAP_EXACT_OUT_SINGLE = 0x08;
    uint256 internal constant SWAP_EXACT_OUT = 0x09; */
  // action,
  const actions = encodePacked(['uint8', 'uint8', 'uint8'], [0x06, 0x0c, 0x0f])
  const input = is0To1 ? poolkey.currency0 : poolkey.currency1
  const out = is0To1 ? poolkey.currency1 : poolkey.currency0
  const expiration = Math.round(now() / 1000 + deadline)
  const params: Hex[] = ['0x', '0x', '0x']
  if (!poolkey.hooks) poolkey.hooks = zeroAddress
  params[0] = encodeAbiParameters(
    parseAbiParameters([
      'ExactInputSingleParams',
      'struct ExactInputSingleParams { PoolKey poolKey;bool zeroForOne;uint128 amountIn;uint128 amountOutMinimum;bytes hookData;}',
      'struct PoolKey { address currency0; address currency1 ;uint24 fee; int24 tickSpacing; address hooks;}',
    ]),
    [
      {
        poolKey: poolkey as any,
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
  if (isAddressEqual(input, zeroAddress)) {
    return [{ abi: abiUniRouter, functionName: 'execute', address: cf.unirouter, args: [commands, inputs, BigInt(expiration)], value: amountIn, name: executeName }]
  }
  const txs = await withTokenApprove({
    approves: [{ token: input, spender: cf.permit2, amount: amountIn, name: approveName }],
    pc: getPC(chainId),
    user,
    // approve to permit2
    tx: { abi: abiPermit2, address: cf.permit2, functionName: 'approve', args: [input, cf.unirouter, amountIn, expiration], name: approveName },
  })
  return [
    ...txs,
    // router execute
    { abi: abiUniRouter, functionName: 'execute', address: cf.unirouter, args: [commands, inputs, BigInt(expiration)], name: executeName },
  ]
}

export type UniModifyLP = {
  chainId: number
  lp: Address
  poolkey: {
    currency0: Address
    currency1: Address
    fee: number
    tickSpacing: number
    hooks?: Address
  }
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
  lp,
  poolkey,
  liquidity,
  amount0Max,
  amount1Max,
  tickLower = -100000,
  tickUpper = 100000,
  hookData = toHex(0),
  deadline = 60 * 10,
}: UniModifyLP): SimulateContractParameters[] {
  const cf = UNI_CONFIGS[chainId]
  const expiration = Math.round(now() / 1000 + deadline)
  const poolKey = {
    ...poolkey,
    hooks: poolkey.hooks ?? zeroAddress,
  }
  const modifyLpParams = {
    tickLower,
    tickUpper,
    liquidityDelta: liquidity,
    salt: `${lp}000000000000000000000000`,
  }
  if (liquidity == 0n) return []
  if (liquidity > 0n) {
    // withPermit2({ input: token0, permit2: cf.permit2, spender: cf.poolmanager, amountIn: amount0Max!, })
    return [
      // approve to permit2
      { abi: erc20Abi, address: poolKey.currency0, functionName: 'approve', args: [cf.permit2, amount0Max] },
      { abi: erc20Abi, address: poolKey.currency1, functionName: 'approve', args: [cf.permit2, amount1Max] },
      // permit2 approve
      { abi: abiPermit2, address: cf.permit2, functionName: 'approve', args: [poolKey.currency0, cf.poolmanager, amount0Max, expiration] },
      { abi: abiPermit2, address: cf.permit2, functionName: 'approve', args: [poolKey.currency1, cf.poolmanager, amount1Max, expiration] },
      // router execute
      { abi: abiPoolManager, functionName: 'modifyLiquidity', address: cf.poolmanager, args: [poolKey, modifyLpParams, hookData] },
    ]
  } else {
    return [
      // approve to permit2
      { abi: erc20Abi, address: lp, functionName: 'approve', args: [cf.permit2, -liquidity] },
      // permit2 approve
      { abi: abiPermit2, address: cf.permit2, functionName: 'approve', args: [poolKey.currency0, cf.poolmanager, -liquidity, expiration] },
      // router execute
      { abi: abiPoolManager, functionName: 'modifyLiquidity', address: cf.poolmanager, args: [poolKey, modifyLpParams, hookData] },
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
  let pool = new Pool(currency0, currency1, fee, tickSpacing, hooks, '79228162514264337593543950336', '1000000000000000000', 0)
  console.info('calcAddLP:', 'poolId:', pool.poolId)
  const res = await promiseAll({
    slot0: pc.readContract({ abi: abiStateView, address: cf.stateview, functionName: 'getSlot0', args: [pool.poolId as any] }),
    liquidity: pc.readContract({ abi: abiStateView, address: cf.stateview, functionName: 'getLiquidity', args: [pool.poolId as any] }),
  })
  const [sqrtPriceX96, tick] = res.slot0
  pool = new Pool(currency0, currency1, fee, tickSpacing, hooks, sqrtPriceX96.toString(), res.liquidity.toString(), tick)
  console.info('calcAddLP:', 'price,tick,liquidity', sqrtPriceX96, tick, pool.liquidity.toString())
  if (res.liquidity == 0n) {
    return [inputAmount, inputAmount, inputAmount]
  }
  const p = inputIsToken0
    ? Position.fromAmount0({ pool, tickLower, tickUpper, amount0: inputAmount.toString(), useFullPrecision: true })
    : Position.fromAmount1({ pool, tickLower, tickUpper, amount1: inputAmount.toString() })
  console.info('calcAddLP:', p.liquidity.toString(), p.amount0.toExact(), p.amount1.toExact())

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
  let pool = new Pool(currency0, currency1, fee, tickSpacing, hooks, '79228162514264337593543950336', '1000000000000000000', 0)
  const res = await promiseAll({
    slot0: pc.readContract({ abi: abiStateView, address: cf.stateview, functionName: 'getSlot0', args: [pool.poolId as any] }),
    liquidity: pc.readContract({ abi: abiStateView, address: cf.stateview, functionName: 'getLiquidity', args: [pool.poolId as any] }),
  })
  const [sqrtPriceX96, tick] = res.slot0
  pool = new Pool(currency0, currency1, fee, tickSpacing, hooks, sqrtPriceX96.toString(), res.liquidity.toString(), tick)
  const p = new Position({ pool, liquidity: inputAmount.toString(), tickLower, tickUpper })
  const { amount0, amount1 } = p.mintAmounts
  return [BigInt(amount0.toString()), BigInt(amount1.toString())]
}
