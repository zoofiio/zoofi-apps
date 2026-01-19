import { parseAbi } from 'viem'

export const abiQueryLNT = parseAbi([
  'function queryLntVault(address vault) external view returns (LntVault memory lv)',
  `struct LntVault {bool closed;uint256 activeDepositCount;address VT;address YT;address T;address vATOracle;uint256 aVT;}`,
  `function earned(address irm,address user) external view returns (Earned[] memory)`,
  `struct Earned { address token; uint256 value;}`,
  'function calcDeposit(address vault,uint256[] calldata nftIds) external view returns (uint256 vt)',
  'function calcRedeem(address vault,uint256 count) external view returns (uint256 vt)',
  'struct LogData {uint256 VTc;uint256 YTc;uint256 Tc;uint256 t;uint256 vt;uint256 timeparam;uint256 Feerate;uint256 ShareTotal;uint256 rateScalar;uint256 rateAnchor;uint256 R;}',
  'function getLog(address vault,address hook) external view returns (LogData memory log)',
])

export const abiLntVault = parseAbi([
  'function deposit(uint256 tokenId) external',
  'function deposit(uint256[] calldata tokenIds) external',
  'function batchDeposit(uint256[] calldata tokenIds) external',
  'function redeem() external',
  'function redeem(uint256 count) external',
  'function batchRedeem(uint256 count) external',
  'function redeemT(uint256 amount) external',
  'function close() external',
  'function withdrawProfitT(address recipient) external',

  'function VT() external view returns (address)',
  'function T() external view returns (address)',
  'function pausedDeposit() external view returns (bool)',
  'function paused() external view returns (bool)',
  'function autoBuyback() external view returns (bool)',
  'function depositTokensCount() external view returns (uint256)',
  'function setUserRecordCount() external view returns (uint256)',
  'function setUserRecordsInfo(uint256 index, uint256 count) external view returns (uint256[] memory tokenIds, address[] memory owners, address[] memory users, bool[] memory isBanned)',
  'function paramValue(bytes32 param) public view returns (uint256)',
  // owner
  'function updateAutoBuyback(bool newAutoBuyback) external',
  'function updateCheckerNode(address newCheckerNode) external',
  'function checkerNode() external view returns(address)',
  'function updateAethirClaimAndWithdraw(address _signerOracle, address _claimAndWithdraw) external',

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
  'function updateBuybackPool(address newPool) external',
])


export const abiLntProtocol = parseAbi([
  'function owner() public view returns (address)',
  'function pendingOwner() public view returns (address)',
  'function transferOwnership(address newowner) public',
  'function acceptOwnership() public',
  'function addOperator(address operator) external',
  'function removeOperator(address operator) external',
  'function addUpgrader(address upgrader) external',
  'function removeUpgrader(address upgrader) external',
  'function isUpgrader(address account) public view returns (bool)',
  'function isOperator(address account) public view returns (bool)',
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

export const abiRedeemStrategy = parseAbi([
  'function canRedeem() external view returns (bool)',
  'function redeemStrategy() external view returns (uint8)',
  'function redeemTimeWindows(uint256 index, uint256 count) external view returns (uint256[] memory startTimes, uint256[] memory durations)',
  'function updateRedeemStrategy(uint8 newStrategy) external',
  'function appendRedeemTimeWindow(uint256 startTime, uint256 duration) external',
  'function removeLastRedeemTimeWindow() external',
  'function redeemTimeWindowsCount() external view returns (uint256)',
])

export const abiZeroGVToracale = parseAbi([
  'function aVT() external view returns (uint256)',
  'function updateRewardsPerNodePerDay(uint256 newRewardsPerNodePerDay) external',
  'function updateRewardsEndTime(uint256 newRewardsEndTime) external',
  'function rewardsEndTime() external view returns (uint256)',
])

export const abiPausedable = parseAbi([
  'function pausedDeposit() external view returns (bool)',
  'function pausedRedeem() external view returns (bool)',
  'function pauseDeposit() external',
  'function unpauseDeposit() external',
  'function pauseRedeem() external',
  'function unpauseRedeem() external',
])

export const abiLVTVault = [
  ...parseAbi([
    'function deposit(uint256 value) external',
    'function buyback(uint256 amountT) external',
    'function updateaVT(uint256 newAVT) external',
    'function mintVestingTokens(address to, uint256 amount) external',
    'function burnVestingTokens(uint256 amount) external',
  ]),
  ...abiPausedable,
]
export const abiLntVaultDepositExt = [
  ...parseAbi([
    'function operatorNode() external view returns (address)',
    'function tokenRewardsInfoCount() external view returns (uint256)',
    'function redeem(uint256 count) external',
    'function mintVestingTokens(address to, uint256 amount) external',
    'function burnVestingTokens(uint256 amount) external',
    'function updateOperatorNode(address newOperatorNode) external',
    'function updateTokenRewardsInfo(uint256[] calldata tokenId, uint256[] calldata remainingRewards) external',
    'function delegate(address toOperatorNode, uint256[] calldata tokenIds) external',
    'function undelegate(uint256[] calldata tokenIds) external',
  ]),
  ...abiPausedable,
]

export const abiLntBuyback = parseAbi([
  'function stakingTokenPotCount() external view returns (uint256)',
  'function stakingTokenPotsRange(uint256 start, uint256 end) external view returns (address[] memory pots)',
  'function totalStakingAmountVT(address stakingTokenPot) public view returns (uint256)',
  'function userStakingAmountVT(address stakingTokenPot, address account) public view returns (uint256)',
  'function boughtAmountT(address stakingTokenPot, address account) public view returns (uint256)',
  'function buybackDustAmountVT() public view returns (uint256)',
  'function minStakeAmountVT() public view returns (uint256)',

  'function stake(uint256 amount) external',
  'function withdraw(address stakingTokenPot, uint256 amount) external',
  'function claimBoughtT(address stakingTokenPot) external',
  'function redeemT(uint256 amount) external',
  'function pause() external',
  'function unpause() external',

  // admin
  'function addRewards(uint256 amountT) external',
  'function settle() external',
  'function rescue(address token, address recipient, uint256 amount) external',
  'function rescueFromStakingTokenPot(address stakingTokenPot, address token, address recipient, uint256 amount) external',
  'function updateBuybackDustAmountVT(uint256 newAmountVT) external',
  'function updateBurnRecipientAddress(address newAddress) external',
  'function updateStakingTokenPotRotateThreshold(uint256 newThreshold) external',
])

export const abiReppoLntVault = parseAbi([
  'function NFTs() external view returns (address[] memory nfts, uint256[] memory aVTs)',
  'function deposit(address NFT, uint256[] calldata tokenIds) external',
  'function upsertNFT(address nft, uint256 aVT) external',
  'function removeNFT(address nft) external',
  'function buyback(uint256 amountT) external',
  'function rewardsOperators() external view returns (address[] memory operators)',
  'function addRewardsOperator(address operator) external',
  'function removeRewardsOperator(address operator) external',
])

export const abiLvtVerio = parseAbi([
  'function calculateIPWithdrawal(uint256 verioIPToBurn) public view returns (uint256)',
  'function calculateVerioIPMint(uint256 ipAmount) public view returns (uint256)',
])

export const abi0GMarginAccount = parseAbi([
  'function stake() external payable',
  'function unstake(uint256 amount) external',
  'function updateUnstakeStartTime(uint256 newStartTime) external',
  'function totalStakeAmount() public view returns (uint256)',
  'function userStakeAmount(address user) public view returns (uint256)',
  'function unstakeStartTime() public view returns (uint256)',
])