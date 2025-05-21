import { getNftsByAlchemy } from '@/config/api'
import { NodeLicense } from '@/config/prelnt'
import { bnMin, promiseAll } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { useQuery } from '@tanstack/react-query'
import { flatten } from 'lodash'
import { parseAbi } from 'viem'
import { useAccount } from 'wagmi'
import { useCurrentChainId } from './useCurrentChainId'

export const abiPreDeposit = parseAbi([
  'function deposit(uint256 nftId) external',
  'function withdraw(uint256 nftId) external',
  'function multicall(bytes[] calldata data) external returns (bytes[] memory results)',
  'function deposited(address user) external view returns (uint256[] memory)',
  'function deposited(address user,uint256 count,uint256 skip) external view returns (uint256[] memory)',
  'function depositedCount(address user) external view returns (uint256)',
  'function totalDeposit() external view returns (uint256)',
])
export function usePreDepositData(node: NodeLicense) {
  const chainId = useCurrentChainId()
  return useQuery({
    queryKey: ['preDepositData:', chainId, node.preDeposit],
    enabled: Boolean(node.preDeposit),
    initialData: { totalDeposit: 0n },
    queryFn: async () => {
      const pc = getPC(chainId)
      return promiseAll({
        totalDeposit: pc.readContract({ abi: abiPreDeposit, address: node.preDeposit!.prelnt, functionName: 'totalDeposit' }),
      })
    },
  })
}

const chunckCount = (count: bigint, chunk: bigint = 50n) => {
  const chunks: [bigint, bigint][] = []
  if (count <= chunk) {
    chunks.push([bnMin([count, chunk]), 0n])
    return chunks
  }
  for (let index = 0n; index < count; index += chunk) {
    if (chunk + index <= count) {
      chunks.push([chunk, index])
    } else {
      chunks.push([count % chunk, chunk * BigInt(chunks.length)])
    }
  }
  return chunks
}
export function usePreDepositByUser(node: NodeLicense) {
  const { address } = useAccount()
  const chainId = useCurrentChainId()
  return useQuery({
    queryKey: ['preDepositDataByUser:', chainId, node.preDeposit, address],
    enabled: Boolean(node.preDeposit) && Boolean(address),
    initialData: { deposited: [], nfts: [] },
    queryFn: async () => {
      try {
        const pc = getPC(chainId)
        const lnt = node.preDeposit!.prelnt
        const nft = node.preDeposit!.nft
        const user = address!
        // const user = '0xb3880D65a28951b7E5f3c2Dd59e8E59FF8821640'
        const count = await pc.readContract({ abi: abiPreDeposit, address: lnt, functionName: 'depositedCount', args: [user] })
        console.info('chunks:', chunckCount(count))
        const deposited: Promise<readonly bigint[]> =
          count > 50n
            ? Promise.all(
                chunckCount(count).map(([count, skip]) => pc.readContract({ abi: abiPreDeposit, address: lnt, functionName: 'deposited', args: [user, count, skip] })),
              ).then((data) => flatten(data))
            : pc.readContract({ abi: abiPreDeposit, address: lnt, functionName: 'deposited', args: [user] })

        return await promiseAll({
          deposited,
          nfts: getNftsByAlchemy(nft, user),
        })
      } catch (error) {
        console.error('preDepositData:', error)
        throw error
      }
    },
  })
}
