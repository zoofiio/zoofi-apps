import { parseAbi } from 'viem'

export const abiQueryLNT = parseAbi([
  'function queryLntVault(address vault) external view returns (LntVault memory lv)',
  `struct LntVault {bool closed;uint256 activeDepositCount;address NFT;address VT;address YT;address T;address vATOracle;address tokenPot;address vtSwapPoolHook;uint256 aVT;}`,
  `function earned(address irm,address user) external view returns (Earned[] memory)`,
  `struct Earned { address token; uint256 value;}`,
  'function calcDeposit(address vault,uint256[] calldata nftIds) external view returns (uint256 vt)',
  'function calcRedeem(address vault,uint256 count) external view returns (uint256 vt)',
])

export const abiLntVault = parseAbi([
  'function deposit(uint256 tokenId, uint256 value) external',
  'function deposit(uint256 tokenId) external',
  'function batchDeposit(uint256[] calldata tokenIds, uint256[] calldata values) external',
  'function batchDeposit(uint256[] calldata tokenIds) external',
  'function redeem() external',
  'function batchRedeem(uint256 count) external',
  'function redeemT(uint256 amount) external',
  'function close() external',
  'function withdrawProfitT(address recipient) external',

  'function autoBuyback() external view returns (bool)',
  'function setUserRecordCount() external view returns (uint256)',
  'function setUserRecordsInfo(uint256 index, uint256 count) external view returns (uint256[] memory tokenIds, address[] memory owners, address[] memory users, bool[] memory isBanned)',
  // owner
  'function updateAutoBuyback(bool newAutoBuyback) external',
  'function updateCheckerNode(address newCheckerNode) external',
  'function setUser(uint256 tokenId, address user, uint64 expires) external',
  'function batchSetUser(uint256[] calldata tokenIds, address[] calldata users, uint64 expires) external',
  'function removeLastSetUserRecords(uint256 count, bool force) external',
  'function updateVTPriceEndTime(uint256 newEndTime) external',
  'function updateVTAOracle(address newOracle) external',
  'function updateRedeemStrategy(address newStrategy) external',
  'function updateVTSwapHook(address newHook) external',
  'function vtPriceStartTime() external view returns(uint256)',
  'function vtPriceEndTime() external view returns(uint256)',
  'function redeemStrategy() external view returns(address)',
  'function updateVTPriceTime(uint256 newStartTime, uint256 newEndTime) external',
  'function buybackVT(uint256 amountT) external',
])

export const abiLntProtocol = parseAbi([
  'function owner() public view returns (address)',
  'function transferOwnership(address newowner) public',
  'function acceptOwnership() public',
])

/**
 * 
 *     uint256 public constant FEE_RATE = 30;
    uint256 public constant FEE_DENOMINATOR = 10000;

 */
export const abiLntVTSwapHook = parseAbi([
  'function quoteExactInputSingle(QuoteExactSingleParams memory params) external view returns (uint256 amountOut, uint256 gasEstimate)',
  'function getAmountOutTforVT(uint256 amountT) external view returns (uint256 amountVT)',
  'function getAmountOutVTforT(uint256 amountVT) external view returns (uint256 amountT)',
  'struct QuoteExactSingleParams {PoolKey poolKey;bool zeroForOne;uint128 exactAmount;bytes hookData;}',
  'struct PoolKey {address currency0;address currency1;uint24 fee;int24 tickSpacing;address hooks;}',
  'function addLiquidity(AddLiquidityParams calldata params) external payable returns (int256 delta)',
  'function removeLiquidity(RemoveLiquidityParams calldata params) external payable returns (int256 delta)',
  'struct AddLiquidityParams {uint256 amount0Desired;uint256 amount1Desired;uint256 amount0Min;uint256 amount1Min;uint256 deadline;int24 tickLower;int24 tickUpper;bytes32 userInputSalt;}',
  'struct RemoveLiquidityParams {uint256 liquidity;uint256 amount0Min;uint256 amount1Min;uint256 deadline;int24 tickLower;int24 tickUpper;bytes32 userInputSalt;}',
  'function getVTAndTReserves() external view returns(uint256, uint256)',
  'function reserve0() external view returns(uint256)',
  'function reserve1() external view returns(uint256)',
  'function FEE_RATE() external view returns(uint256)',
  'function poolKey() external view returns(PoolKey memory)',
  'function isToken0VT() external view returns(bool)',
])

export const abiMockaVToracle = parseAbi(['function setaVT(uint256 _aVT_) external'])

export const abiMockNodeDelegator = parseAbi([
  'function addOperator(address operator, uint256 capacity) external',
  'function removeOperator(address operator) external',
  'function operators() external view returns (address[] memory)',
  'function getOperatorInfo(address operator) external view returns (uint256 capacity, uint256 delegations)',
])

export const abiMockRewardDistributor = parseAbi(['function addReward(address token, uint256 amount) external payable', 'function addT(uint256 amount) external payable'])

export const abiAethirNFT = parseAbi([
  'function mint(address to, uint256 amount) public',
  'function setUser(uint256 tokenId,address user,uint64 expires) public',
  'function batchSetUser(uint256[] calldata tokenIds,address[] calldata users,uint64 expires) public',
  'function userOf(uint256 tokenId) public view returns (address)',
  'function userExpires(uint256 tokenId) public view returns (uint256)',
  'function getBanEndTime(uint256 tokenId) public view returns (uint64)',
  'function isBanned(uint256 tokenId) public view returns (bool)',
  'function ban(uint256 tokenId, uint64 endTime) public',
  'function unBan(uint256 tokenId) public',
  'function batchTransfer(address[] calldata toArray,uint256[] calldata tokenIdArray) public',
  'function tokenIdsOfOwnerByAmount(address user, uint256 amount) external view returns (uint256[] memory tokenIds)',
  'function updateTransferWhiteList(address[] calldata addressList,bool inWhitelist) public',
  'function updateWhitelistTransferTime(uint256 startTime,uint256 endTime) public',
  'function getWhitelistTransferTime() public view returns (uint256 startTime, uint256 endTime)',
  'function updateNftTransferable(bool transferable) public',
  'function inTransferWhitelist(address addr) public view returns (bool)',
  'function updateMinterAdmin(address minter) public',
  'function updateWhitelistAdmin(address whitelistAdmin) public',
  'function updateBanAdmin(address banAdmin) public',
])

export const abiAethirVToracle = parseAbi([
  'function aVT() external view returns (uint256)',
  'function updateATHRewardsPerNodePerDay(uint256 newATHRewardsPerNodePerDay) external',
  'function updateATHRewardsEndTime(uint256 newATHRewardsEndTime) external',
])

export const abiAethirRedeemStrategy = parseAbi([
  'function canRedeem() external view returns (bool)',
  'function redeemStrategy() external view returns (uint8)',
  'function redeemTimeWindows(uint256 index, uint256 count) external view returns (uint256[] memory startTimes, uint256[] memory durations)',
  'function updateRedeemStrategy(uint8 newStrategy) external',
  'function appendRedeemTimeWindow(uint256 startTime, uint256 duration) external',
  'function removeLastRedeemTimeWindow() external',
  'function redeemTimeWindowsCount() external view returns (uint256)',
])
