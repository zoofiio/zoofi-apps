import { erc721Abi, parseAbi } from 'viem'

export default [
  ...erc721Abi,
  ...parseAbi([
    'function setTester(address account, bool tester) external',
    'function safeMint(address to, uint256 tokenId) public',
    'function safeMint(address to) public',
    'function mint(address to) public',
    'function batchSetTesters(address[] calldata accounts, bool tester) external',
    'function getTester(uint256 index) public view returns (address)',
    'function getTestersCount() public view returns (uint256)',
    // for mock 0g Node
    `function airdropByOwner(address[] memory accounts,uint[] memory amounts) external`,
  ]),
] as const
