import { parseAbi } from 'viem'

export const abiRewardManager = parseAbi([
  'function getUserRewards(address user) external view returns (uint256[] memory rewardAmounts)',
  'function getRewardTokens() public view returns (address[] memory rewardTokens)',
  'function claimRewards(address user) external',
  'function updateRewardIndexes() external',
  'function updateUserRewards(address user) external',
])
