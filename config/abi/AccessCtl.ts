import { parseAbi } from 'viem'

export default [
  ...parseAbi([
    'function grantRole(bytes32 role, address account) public',
    'function revokeRole(bytes32 role, address account) public',
    'function hasRole(bytes32 role, address account) public view returns (bool)',
    'function DEFAULT_ADMIN_ROLE() public view returns(bytes32)',
  ]),
] as const
