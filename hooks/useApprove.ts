import { isNativeToken } from '@/config/tokens'
import { getBigint, getErrorMsg } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { keys } from 'es-toolkit/compat'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Address, erc20Abi, erc721Abi } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'
import { useCurrentChainId } from './useCurrentChainId'

const cacheAllowance: { [k: Address]: { [k: Address]: bigint } } = {}

export const useApproves = (needAllownce: { [k: Address]: bigint }, spender: Address | undefined, reqBigAmount: bigint | false = 10000000000n * 10n ** 18n) => {
  const { address } = useAccount()
  const chainId = useCurrentChainId()
  const { data: walletClient } = useWalletClient()
  const [isSuccess, setSuccess] = useState(false)
  const tokens = useMemo(() => Object.keys(needAllownce).filter((item) => !isNativeToken(item as any)) as Address[], [needAllownce])
  const [allowance, setAllownce] = useState<{ [k: Address]: bigint }>(spender ? cacheAllowance[spender] || {} : {})
  const updateAllownce = (token: Address, value: bigint) => {
    if (!spender) return
    cacheAllowance[spender] = { ...(cacheAllowance[spender] || {}), [token]: value }
    setAllownce((old) => ({ ...old, [token]: value }))
  }
  useEffect(() => {
    if (!address || !spender || !chainId) {
      return
    }
    tokens.forEach((t) => {
      getPC(chainId)
        .readContract({ abi: erc20Abi, address: t, functionName: 'allowance', args: [address, spender] })
        .then((value) => updateAllownce(t, value || 0n))
        .catch(console.error)
    })
  }, [tokens, chainId, address])
  const [loading, setLoading] = useState(false)
  const needApproves = useMemo(() => {
    return tokens.filter((t) => getBigint(needAllownce, t) > 0n && getBigint(needAllownce, t) > getBigint(allowance, t))
  }, [needAllownce, tokens, allowance])
  const approve = async () => {
    if (needApproves.length == 0 || !spender || !address) return
    try {
      setLoading(true)
      setSuccess(false)
      for (let index = 0; index < needApproves.length; index++) {
        const token = needApproves[index]
        // const allowanceValue = needAllownce[token]
        const allowanceValue = reqBigAmount === false ? needAllownce[token] : reqBigAmount
        const txHash = await walletClient?.writeContract({
          abi: erc20Abi,
          address: token,
          functionName: 'approve',
          args: [spender, allowanceValue],
        })
        txHash && (await getPC(chainId).waitForTransactionReceipt({ hash: txHash }))
        const currentAllownceValue = await getPC(chainId).readContract({ abi: erc20Abi, address: token, functionName: 'allowance', args: [address, spender] })
        if (currentAllownceValue < needAllownce[token]) {
          toast.error('Insufficient amount of approve')
        }
        updateAllownce(token, currentAllownceValue)
      }
      toast.success('Approve success')
      setLoading(false)
      setSuccess(true)
    } catch (error) {
      toast.error(getErrorMsg(error))
      setLoading(false)
      setSuccess(false)
    }
  }
  return { approve, loading, shouldApprove: needApproves.length > 0, isSuccess }
}

const cacheNftAllowance: { [spender: Address]: { [token: Address]: boolean } } = {}
export const useNftApproves = (needAllownce: { [k: Address]: true }, spender: Address | undefined) => {
  const { address } = useAccount()
  const chainId = useCurrentChainId()
  const { data: walletClient } = useWalletClient()
  const [isSuccess, setSuccess] = useState(false)
  const tokens = keys(needAllownce) as Address[]
  const [allowance, setAllownce] = useState<{ [k: Address]: boolean }>(spender ? cacheNftAllowance[spender] || {} : {})
  const updateAllownce = (token: Address, value: boolean) => {
    if (!spender) return
    cacheNftAllowance[spender] = { ...(cacheNftAllowance[spender] || {}), [token]: value }
    setAllownce((old) => ({ ...old, [token]: value }))
  }
  useEffect(() => {
    if (!address || !spender || !chainId) {
      return
    }
    tokens.forEach((t) => {
      getPC(chainId)
        .readContract({ abi: erc721Abi, address: t, functionName: 'isApprovedForAll', args: [address, spender] })
        .then((value) => value !== allowance[t] && updateAllownce(t, value))
        .catch(console.error)
    })
  }, [tokens, chainId, address])
  const [loading, setLoading] = useState(false)
  const needApproves = useMemo(() => {
    return tokens.filter((t) => {
      return !allowance[t]
    })
  }, [needAllownce, tokens, allowance])
  const approve = async () => {
    if (needApproves.length == 0 || !spender) return
    try {
      setLoading(true)
      setSuccess(false)
      for (let index = 0; index < needApproves.length; index++) {
        const token = needApproves[index]
        // const allowanceValue = needAllownce[token]
        const txHash = await walletClient?.writeContract({
          abi: erc721Abi,
          address: token,
          functionName: 'setApprovalForAll',
          args: [spender, true],
        })
        txHash && (await getPC(chainId).waitForTransactionReceipt({ hash: txHash }))
        updateAllownce(token, true)
      }
      toast.success('Approve success')
      setLoading(false)
      setSuccess(true)
    } catch (error) {
      toast.error(getErrorMsg(error))
      setLoading(false)
      setSuccess(false)
    }
  }
  return { approve, loading, shouldApprove: needApproves.length > 0, isSuccess }
}
