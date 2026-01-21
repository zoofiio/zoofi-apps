import { abiBVault } from '@/config/abi'
import { BVaultConfig } from '@/config/bvaults'
import { berachain } from '@/config/network'
import { isNativeToken, Token } from '@/config/tokens'
import { useCalcKey } from '@/hooks/useCalcKey'
import { useCurrentChainId } from '@/hooks/useCurrentChainId'
import { useBalance } from '@/hooks/useToken'
import { reFet } from '@/lib/useFet'
import { cn, handleError, parseEthers } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { useBVault } from '@/providers/useBVaultsData'
import { displayBalance } from '@/utils/display'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isEmpty } from 'es-toolkit/compat'
import { useMemo, useRef, useState } from 'react'
import { FiArrowDown } from 'react-icons/fi'
import { toast } from 'sonner'
import { Address, erc20Abi, isAddress } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'
import { CoinIcon } from './icons/coinicon'
import { AssetInput } from './input-asset'
import { PulseTokenItem } from './pulse-ui'
import { SimpleDialog } from './simple-dialog'
import { BBtn } from './ui/bbtn'
export type TokenItem = Token & {
  name?: string
  url?: string
}
const defTokens: TokenItem[] = [
  { chain: berachain.id, symbol: 'iBGT', name: 'Infrared BGT', address: '0xac03CABA51e17c86c921E1f6CBFBdC91F8BB2E6b', decimals: 18 },
  { chain: berachain.id, symbol: 'HONEY', name: 'HONEY Token', address: '0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce', decimals: 18 },
  { chain: berachain.id, symbol: 'USDC', name: 'USDC Token', address: '0x549943e04f40284185054145c6E4e9568C1D3241', decimals: 6 },
  { chain: berachain.id, symbol: 'WBERA', name: 'Wrapped Bera', address: '0x6969696969696969696969696969696969696969', decimals: 18 },
]


function TokenBalance({ t }: { t: TokenItem }) {
  const balance = useBalance(t).data
  return <span className='ml-auto'>{displayBalance(balance, 3, t.decimals)}</span>
}
function TokenSelect({ tokens, onSelect, hiddenNative }: { tokens?: TokenItem[]; hiddenNative?: boolean; onSelect?: (item: TokenItem) => void }) {
  const chainId = useCurrentChainId()
  const originTokens = useMemo(() => {
    const list = !isEmpty(tokens) ? tokens! : defTokens
    if (hiddenNative) return list.filter((item) => !isNativeToken(item.address))
    return list
  }, [tokens, hiddenNative, chainId])

  const [input, setInput] = useState('')
  const { address: user } = useAccount()
  const { data: searchdTokens, isFetching } = useQuery({
    ...useCalcKey(['searchTokens', input, originTokens]),
    initialData: originTokens,
    queryFn: async () => {
      if (isAddress(input)) {
        const t = originTokens.find((item) => item.address == input)
        if (t) return [t]
        const pc = getPC(chainId)
        const address = input as Address
        const [symbol, decimals] = await Promise.all([
          pc.readContract({ abi: erc20Abi, address, functionName: 'symbol' }),
          pc.readContract({ abi: erc20Abi, address, functionName: 'decimals' }),
        ])
        return [{ symbol, address, decimals }] as TokenItem[]
      } else {
        if (!input) return originTokens
        return originTokens.filter((item) => {
          const inputLow = input.toLowerCase()
          const symbolMatched = !!item.symbol.toLowerCase().match(inputLow)
          const nameMatched = !!item.name && !!item.name.toLowerCase().match(inputLow)
          return symbolMatched || nameMatched
        })
      }
    },

  })
  const showTokens = searchdTokens || originTokens

  return (
    <div className='flex flex-col gap-4 p-5'>
      <div className='text-base font-bold text-center'>Select a token</div>
      <input
        className={cn(
          'bg-white dark:bg-transparent',
          'border-slate-400  focus:border-primary',
          'w-full h-14 text-right px-4 font-bold text-base border-[#4A5546] border focus:border-2 text-slate-700 rounded-lg outline-hidden dark:text-slate-50',
        )}
        placeholder='Search by name, symbol or address'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className='flex flex-col overflow-y-auto h-75'>
        {isFetching ? (
          <>
            <PulseTokenItem />
            <PulseTokenItem />
            <PulseTokenItem />
          </>
        ) : (
          <>
            {showTokens.map((t) => (
              <div
                key={t.address}
                className='flex px-4 py-2 items-center gap-4 rounded-lg cursor-pointer hover:bg-primary/20'
                onClick={() => {
                  onSelect?.(t)
                }}
              >
                <CoinIcon className='rounded-full' size={40} symbol={t.symbol} url={t.url} />
                <span>{t.symbol}</span>
                <TokenBalance t={t} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export function BVaultAddReward({ bvc }: { bvc: BVaultConfig }) {
  const bvd = useBVault(bvc)
  const defToken = defTokens[0]
  const [stoken, setStoken] = useState(defToken)
  const [input, setInput] = useState('')
  const balanceFet = useBalance({ ...stoken, chain: bvc.chain })
  const balance = balanceFet.data
  const inputBn = parseEthers(input, stoken.decimals)
  const triggerRef = useRef<HTMLDivElement>(null)
  const wc = useWalletClient()
  const { address } = useAccount()
  const chainId = useCurrentChainId()
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (disableAdd) return
      const pc = getPC(chainId)
      const allownce = await pc.readContract({ abi: erc20Abi, address: stoken.address, functionName: 'allowance', args: [address, bvc.vault] })
      if (allownce < inputBn) {
        const hash = await wc.data.writeContract({ abi: erc20Abi, address: stoken.address, functionName: 'approve', args: [bvc.vault, inputBn - allownce] })
        await pc.waitForTransactionReceipt({ hash, confirmations: 3 })
      }
      const hash = await wc.data.writeContract({ abi: abiBVault, address: bvc.vault, functionName: 'addAdhocBribes', args: [stoken.address, inputBn] })
      await pc.waitForTransactionReceipt({ hash, confirmations: 3 })
      reFet(balanceFet.key)
      setInput('')
      toast.success('Transaction success')
    },
    mutationKey: ['addReward'],
    onError: handleError,
  })
  const disableAdd = !wc.data || !address || inputBn == 0n || inputBn > balance || isPending || bvd.epochCount == 0n
  return (
    <div className='max-w-4xl mx-auto mt-8 animitem card'>
      <div className='relative'>
        <AssetInput decimals={stoken.decimals} asset={stoken.symbol} assetURL={stoken.url} balance={balance} amount={input} setAmount={setInput} />
        <SimpleDialog
          trigger={
            <div ref={triggerRef} className='absolute left-0 top-0 flex cursor-pointer justify-end items-center py-4'>
              <span className='invisible pl-12'>{stoken.symbol}</span>
              <FiArrowDown className='ml-2' />
            </div>
          }
        >
          <TokenSelect
            hiddenNative
            onSelect={(t) => {
              setStoken(t)
              triggerRef.current?.click()
            }}
          />
        </SimpleDialog>
      </div>
      <BBtn busy={isPending} className='w-full flex justify-center items-center gap-2' disabled={disableAdd} onClick={() => mutate()}>
        Add
      </BBtn>
    </div>
  )
}
