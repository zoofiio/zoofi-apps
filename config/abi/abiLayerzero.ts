import { parseAbi } from 'viem'

export const abiLayerzeroOFT = parseAbi([
  'struct SendParams {uint32 dstEid;bytes32 to;uint256 amountLD,uint256 minAmountLD;bytes extraOptions;bytes composeMsg;bytes oftCmd;}',
  'struct MessagingFee { uint256 nativeFee;uint256 lzTokenFee; }',
  'struct MessagingReceipt {bytes32 guid;uint64 nonce;MessagingFee fee;}',
  'struct OFTReceipt {uint256 amountSentLD;uint256 amountReceivedLD;}',
  'function quoteSend(SendParam calldata _sendParam,bool _payInLzToken) external view returns (MessagingFee memory)',
  'function send(SendParam calldata _params, MessagingFee calldata _fee,address _refundAddress) external payable returns (MessagingReceipt memory, OFTReceipt memory)',
])
