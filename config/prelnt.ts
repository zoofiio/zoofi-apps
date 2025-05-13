import { NodeLicense } from "@/components/pre-deposit";

export const nodelicense: NodeLicense[] = [
//   {
//     name: 'Lnfi',
//     tit: 'Lnfi Network',
//     about:
//       'LNFI Network appears to be a platform that brings together Bitcoin, the Lightning Network, and Nostr to create a financialization layer called LightningFi. This layer is designed to manage Taproot Assets, which are tokens issued on the Bitcoin blockchain, allowing for efficient and scalable asset transfers.',
//     totalNodes: 100000n,
//     totalTokenSupply: 10000000000000n,
//     nodeMining: 'Node Mining: 26% ~ 2years',
//     net: 'Ethereum',
//   },
  {
    name: 'Reppo',
    tit: 'Reppo Network',
    about:
      'Reppo is pioneering plug & play infrastructure for AI Agents & Developers to discover, negotiate, commit, and settle on specialized datasets and data pipelines, on-demand.',
    totalNodes: 100000n,
    totalTokenSupply: 10000000000000n,
    nodeMining: 'Node Mining: 26% ~ 2years',
    net: 'Base',
    preDeposit: {
      nft: '0xe7CC7Ec042bC7B75B93eeF9BdB8b64AE8C6CBC6E',
      prelnt: '0x4b9cEffba8B29970E66194e635E4B9A449156e4b',
      // withdrawTime:
    },
  },
]
