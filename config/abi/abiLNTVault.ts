import { parseAbi } from 'viem'

export const abiQueryLNT = parseAbi([
  'function queryLntVault(address vault) external view returns (LntVault memory lv)',
  `struct LntVault {bool closed;uint256 expiryTime;uint256 depositCount;uint256 activeDepositCount;address NFT;uint256 NFTType;address VT;address YT;address T;address vATOracle;address nodeDelegator;address rewardDistributor;address tokenPot;address vtSwapPoolHook;uint24 vtSwapPoolFee;int24 vtSwapPoolTickSpacing;}`,
  `function earned(address irm,address user) external view returns (Earned[] memory)`,
  `struct Earned { address token; uint256 value;}`,
  'function calcDeposit(address vault,uint256[] calldata nftIds,uint256[] calldata values) external view returns (uint256 vt)',
  'function calcRedeem(address vault,uint256 count) external view returns (uint256 vt)',
])

export const abiLntVault = parseAbi([
  'function deposit(uint256 tokenId, uint256 value) external',
  'function batchDeposit(uint256[] calldata tokenIds, uint256[] calldata values) external',
  'function redeem() external',
  'function batchRedeem(uint256 count) external',
  'function redeemT(uint256 amount) external',
  'function close() external',
])

export const abiLntMarket = parseAbi([
  `function swapTForExactVT(address VT, address T,uint24 fee, int24 tickSpacing, address hooks, int256 amountOutVT, uint256 amountInMaxT) external returns (uint256 amountInT)`,
  'function quoteExactInputT(address VT, address T, uint24 fee, int24 tickSpacing, address hooks, uint256 amountOutVT) external returns (uint256 amountInT)',
])

export const abiLntProtocol = parseAbi(['function owner() public view returns (address)', 'function transferOwnership(address newowner) public'])

export const abiLntVTSwapHook = parseAbi([
  'function quoteExactInputSingle(QuoteExactSingleParams memory params) external view returns (uint256 amountOut, uint256 gasEstimate)',
  'struct QuoteExactSingleParams {PoolKey poolKey;bool zeroForOne;uint128 exactAmount;bytes hookData;}',
  'struct PoolKey {address currency0;address currency1;uint24 fee;int24 tickSpacing;address hooks;}',
])



export const abiMockaVToracle = parseAbi([
  'function setaVT(uint256 _aVT_) external'
])