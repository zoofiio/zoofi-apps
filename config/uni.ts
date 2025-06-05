import _ from 'lodash'
import { Address, encodeAbiParameters, encodePacked, erc20Abi, Hex, parseAbi, parseAbiParameters, SimulateContractParameters, WriteContractParameters, zeroAddress } from 'viem'

export const abiUniRouter = parseAbi([
  'function execute(bytes calldata commands, bytes[] calldata inputs) public payable',
  'function execute(bytes calldata commands, bytes[] calldata inputs, uint256 deadline) public payable',
])

export const abiPermit2 = parseAbi(['function approve(address token,address spender,uint160 amount,uint48 expiration)'])

export type UNI_CONFIG = { unirouter: Address; permit2: Address }
export const UNI_CONFIGS: { [k: number]: UNI_CONFIG } = {
  [1]: { unirouter: '0x66a9893cc07d91d95644aedd05d03f95e1dba8af', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [130]: { unirouter: '0xef740bf23acae26f6492b10de645d6b98dc8eaf3', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [10]: { unirouter: '0x851116d9223fabed8e56c0e6b8ad0c31d98b3507', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [8453]: { unirouter: '0x6ff5693b99212da76ad316178a184ab56d299b43', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [42161]: { unirouter: '0xa51afafe0263b40edaef0df8781ea9aa03e381a3', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [137]: { unirouter: '0x1095692a6237d83c6a72f3f5efedb9a670c49223', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [81457]: { unirouter: '0xeabbcb3e8e415306207ef514f660a3f820025be3', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [7777777]: { unirouter: '0x3315ef7ca28db74abadc6c44570efdf06b04b020', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [480]: { unirouter: '0x8ac7bee993bb44dab564ea4bc9ea67bf9eb5e743', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [57073]: { unirouter: '0x112908dac86e20e7241b0927479ea3bf935d1fa0', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [1868]: { unirouter: '0x4cded7edf52c8aa5259a54ec6a3ce7c6d2a455df', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [43114]: { unirouter: '0x94b75331ae8d42c1b61065089b7d48fe14aa73b7', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [56]: { unirouter: '0x1906c1d672b88cd1b9ac7593301ca990f94eae07', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },

  [1301]: { unirouter: '0xf70536b3bcc1bd1a972dc186a2cf84cc6da6be5d', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [11155111]: { unirouter: '0x3a9d48ab9751398bbfa63ad67599bb04e4bdf98b', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
  [84532]: { unirouter: '0x492e6456d9528771018deb9e87ef7750ef184104', permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
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
