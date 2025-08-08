import { toLntVault } from '@/app/routes'
import { abiMockERC721 } from '@/config/abi'
import { abiLntVault, abiLntVTSwapHook, abiQueryLNT } from '@/config/abi/abiLNTVault'
import { codeQueryLNT } from '@/config/codes'
import { LntVaultConfig } from '@/config/lntvaults'
import { zeroGTestnet } from '@/config/network'
import { getTokenBy } from '@/config/tokens'
import { encodeModifyLP, encodeSingleSwap } from '@/config/uni'
import { DECIMAL, isLOCL } from '@/constants'
import { useCalcKey } from '@/hooks/useCalcKey'
import { useCurrentChain } from '@/hooks/useCurrentChainId'
import { calcTPriceVT, calcVtApy, useLntHookPoolkey, useLntVault, useLntVaultLogs, useLntVaultOperators, useLntVaultTimes, useLntVaultWithdrawState, useLntWithdrawPrice } from '@/hooks/useFetLntVault'
import { useBalance, useErc721Balance, useTotalSupply } from '@/hooks/useToken'
import { reFet } from '@/lib/useFet'
import { cn, fmtBn, fmtDate, fmtPercent, formatPercent, genDeadline, handleError, parseEthers, shortStr, uniSortTokens } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { displayBalance } from '@/utils/display'
import { useQuery } from '@tanstack/react-query'
import { debounce, round } from 'es-toolkit'
import { floor, keys, min, toNumber } from 'es-toolkit/compat'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import { useSetState, useToggle } from 'react-use'
import { erc20Abi, erc721Abi, isAddressEqual, toHex } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'
import { TxConfig, Txs, withTokenApprove } from './approve-and-tx'
import { AssetInput } from './asset-input'
import { Fees } from './fees'
import { CoinIcon } from './icons/coinicon'
import { Badge } from './noti'
import { SimpleDialog } from './simple-dialog'
import STable from './simple-table'
import { SimpleTabs } from './simple-tabs'
import { BBtn, Swap } from './ui/bbtn'
import { NumInput } from './ui/num-input'
import { toast } from 'sonner'

function LntVaultDeposit({ vc, onSuccess }: { vc: LntVaultConfig, onSuccess: () => void }) {
  const vd = useLntVault(vc)
  const maxSelected = 30;
  const [selectedNft, setSelectNft] = useSetState<{ [tokenId: string]: boolean }>({})
  const tokenIds = keys(selectedNft).filter(item => selectedNft[item]).map(item => BigInt(item))
  const nfts = useErc721Balance(vd.result!.NFT, vc.chain == zeroGTestnet.id ? 'zoofi' : 'alchemy')
  const vt = getTokenBy(vd.result!.VT, vc.chain, { symbol: 'VT' })!
  const yt = getTokenBy(vd.result!.YT, vc.chain, { symbol: 'YT' })!
  const { data: outAmountVT } = useQuery({
    queryKey: useCalcKey(['calcLntDeposit', vc.chain, tokenIds]),
    initialData: 0n,
    queryFn: async () => {
      if (tokenIds.length == 0) return 0n
      return getPC(vc.chain).readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'calcDeposit', args: [vc.vault, tokenIds] })
    }
  })
  const withdrawPrice = useLntWithdrawPrice(vc)
  const onClickOne = (id: string) => {
    if (selectedNft[id.toString()]) {
      setSelectNft({ [id.toString()]: false })
    } else {
      if (tokenIds.length >= maxSelected) {
        toast.error(`Up to ${maxSelected}`)
      } else {
        setSelectNft({ [id.toString()]: true })
      }
    }
  }
  const onClickAll = () => {
    if (tokenIds.length >= maxSelected) {
      toast.error(`Up to ${maxSelected}`)
    } else {
      const snft: { [tokenId: string]: boolean } = {}
      nfts.result.filter(item => !selectedNft[item.toString()]).slice(0, maxSelected - tokenIds.length).forEach(item => {
        snft[item] = true
      })
      console.info('onClickAll:', snft, selectedNft, tokenIds)
      setSelectNft(snft)
    }
  }
  return <div className='flex flex-col gap-5 items-center p-5'>
    <div className='w-full text-start'>Licenses ID <span className={cn('text-xs ml-5 opacity-70', { "hidden": vc.isAethir },)}>Wait about 5 minutes after MINT to retrieve the list.</span></div>
    <div className='w-[32rem] h-72 overflow-y-auto'>
      <div className='w-full gap-2 grid grid-cols-4 '>
        {nfts.result.map(id => (
          <div key={id.toString()}
            className={cn('flex gap-1 items-center cursor-pointer', { 'text-primary': selectedNft[id.toString()] })}
            onClick={() => onClickOne(id)}
          >
            <div className={cn('w-3 h-3 border border-black/20 bg-[#EBEBEB] rounded-full', { 'bg-primary': selectedNft[id.toString()] })} />
            #{id.toString()}
          </div>))}
      </div>
    </div>
    <BBtn className='' onClick={onClickAll}>Select All</BBtn>
    <div className='flex flex-col gap-1 w-full'>
      <div className='w-full'>Receive</div>
      <AssetInput asset={vt.symbol} loading={false} disable amount={fmtBn(outAmountVT, vt.decimals)} />
      {vc.ytEnable && <>
        <div className='w-full text-center'>And</div>
        <AssetInput asset={yt.symbol} loading={false} disable amount={fmtBn(DECIMAL * BigInt(tokenIds.length), yt.decimals)} />
      </>}
    </div>
    <div className='text-sm opacity-60 text-center flex justify-between gap-5 w-full'>
      <div>
        {`1 License = ${displayBalance(withdrawPrice.result, undefined, vt.decimals)} ${vt.symbol}`}
      </div>
      <div>
        {'Operation Fees : 5%'}
      </div>
    </div>
    <Txs
      tx='Deposit'
      onTxSuccess={() => {
        const nStat: { [id: string]: boolean } = {}
        tokenIds.forEach((id) => {
          nStat[id.toString()] = false
        })
        setSelectNft(nStat)
        reFet(nfts.key, vd.key)
        onSuccess()
      }}
      disabled={tokenIds.length == 0}
      txs={() => [
        ...tokenIds.map(id => ({ abi: erc721Abi, address: vc.asset, functionName: 'approve', args: [vc.vault, id], name: 'Approve NFT' })),
        {
          name: 'Deposit',
          abi: abiLntVault,
          address: vc.vault,
          functionName: 'batchDeposit',
          enabled: tokenIds.length > 0,
          args: vc.isAethir ? [tokenIds] : [tokenIds, tokenIds.map(() => 1n)]
        }
      ]} />
  </div>
}
function LntVaultWithdraw({ vc, onSuccess }: { vc: LntVaultConfig, onSuccess: () => void }) {
  const vd = useLntVault(vc)
  const vt = getTokenBy(vd.result!.VT, vc.chain, { symbol: 'VT' })!
  const yt = getTokenBy(vd.result!.YT, vc.chain, { symbol: 'YT' })!
  const ytBalance = useBalance(vc.ytEnable ? yt : undefined)
  const vtBalance = useBalance(vt)
  const maxByYT = floor(toNumber(fmtBn(ytBalance.result, yt.decimals)))
  const avt = vd.result?.aVT ?? 0n
  const maxByVT = toNumber((avt > 0n ? vtBalance.result / avt : 0n).toString())
  const maxByActive = toNumber((vd.result?.activeDepositCount ?? 0n).toString())
  const [count, setCount] = useState(0)
  const max = vc.ytEnable ? min([maxByYT, maxByVT, maxByActive])! : min([maxByVT, maxByActive])!
  const withdrawPrice = useLntWithdrawPrice(vc)
  const outAmountVT = withdrawPrice.result * BigInt(count);
  const withdrawStat = useLntVaultWithdrawState(vc)
  return <div className='flex flex-col gap-5 items-center p-5'>
    <div className='flex flex-col gap-1 w-full'>
      <div className=' w-full'>Input:</div>
      {vc.ytEnable && <>
        <AssetInput asset={yt.symbol} disable amount={count.toString()} balance={ytBalance.result} />
        <div className='w-full'>Pair With</div>
      </>}
      <AssetInput asset={vt.symbol} disable amount={fmtBn(outAmountVT, vt.decimals)} balance={vtBalance.result} />
      <div className='mt-4 text-sm opacity-60 text-center'>
        {`1 License = ${displayBalance(withdrawPrice.result, undefined, vt.decimals)} ${vt.symbol}`}
      </div>
      {!withdrawStat.inWindow && withdrawStat.nWindow &&
        <div className='text-sm opacity-60 text-center'>
          The next withdraw window is from {fmtDate(withdrawStat.nWindow.startTime * 1000n)} to {fmtDate((withdrawStat.nWindow.startTime + withdrawStat.nWindow.duration) * 1000n)}.
        </div>}
    </div>
    <div className='flex flex-col gap-1 w-full'>
      <div className='w-full'>Receive:</div>
      <NumInput title='Licenses' min={0} max={max} value={count} onChange={setCount} />
    </div>

    <Txs
      tx='Withdraw'
      className='mt-6'
      onTxSuccess={() => {
        onSuccess()
      }}
      disabled={count <= 0 || max <= 0 || count > max || outAmountVT < 0n || outAmountVT > vtBalance.result || !withdrawStat.inWindow}
      txs={[{
        abi: abiLntVault,
        address: vc.vault,
        functionName: 'batchRedeem',
        args: [BigInt(count)]
      }]} />
  </div>
}

export function LntOperators({ vc }: { vc: LntVaultConfig }) {
  const operators = useLntVaultOperators(vc)
  return <div className='animitem card'>
    <STable
      header={["Operator", "Address", "Delegted", "Fill rate(7d)", "Status"]}
      data={operators.result.map((item, index) => [
        `Operator${index + 1}`,
        shortStr(item.address),
        `${item.delegations.toString()}`,
        `${fmtPercent(item.delegations * DECIMAL / item.capacity, 18, 2)}`,
        <div key="status" className='px-2 py-1 rounded-xl bg-green-400 w-fit text-white dark:text-black'>Active</div>
      ])}
    />
  </div>
}



export function LNTVaultCard({ vc }: { vc: LntVaultConfig }) {
  const r = useRouter()
  const vd = useLntVault(vc)
  const itemClassname = "flex flex-col gap-1 font-medium text-sm shrink-0"
  const itemTitClassname = "opacity-60 text-xs font-semibold"
  const vtTotalSupply = useTotalSupply(getTokenBy(vd.result?.VT, vc.chain, { symbol: 'VT' }))
  const yt = getTokenBy(vd.result?.YT, vc.chain, { symbol: 'YT' })
  const ytTotalSupply = useTotalSupply(vc.ytEnable ? yt : undefined)

  const { remainStr } = useLntVaultTimes(vc)
  const chain = useCurrentChain()
  return (
    <div className={cn('animitem card overflow-hidden flex p-6 items-center gap-5 justify-between cursor-pointer overflow-x-auto', {})} onClick={() => toLntVault(r, vc.vault)}>
      <div className='flex items-center gap-5 shrink-0'>
        <CoinIcon symbol={vc.projectIcon} size={120} className='object-contain' style={{ height: 60 }} />
        <Badge text='Testnet' className={cn('opacity-0', { 'opacity-100': chain.testnet })} />
      </div>
      <div className={itemClassname}>
        <div className={itemTitClassname}>Total Delegated</div>
        <div>{displayBalance(vd.result?.activeDepositCount ?? 0n, 0, 0)}</div>
      </div>
      <div className={itemClassname}>
        <div className={itemTitClassname}>VT Supply</div>
        <div>{displayBalance(vtTotalSupply.result)}</div>
      </div>
      <div className={cn(itemClassname, 'opacity-0', { 'opacity-100': vc.ytEnable })}>
        <div className={itemTitClassname}>YT Supply</div>
        <div>{displayBalance(ytTotalSupply.result)}</div>
      </div>
      <div className={itemClassname}>
        <div className={itemTitClassname}>VT Buyback</div>
        <div className="flex w-36 items-center ">
          <div className="flex w-full h-4 bg-gray-200 rounded-full ">
            <div
              className="h-full rounded-full"
              style={{ width: `${0}%`, background: 'linear-gradient(90deg, #C2B7FD 0%, #6466F1 100%)' }}
            />
          </div>
          <div className="text-sm  text-right opacity-60 ml-[10px]">{0}%</div>
        </div>
      </div>
      <div className={itemClassname}>
        <div className={itemTitClassname}>State</div>
        <div>{!vd ? '-' : vd.result?.closed ? 'Closed' : <>Active <span className='opacity-60 text-xs ml-3'>{remainStr}</span></>}</div>
      </div>
    </div>
  )
}

export function LNTDepositWithdraw({ vc }: { vc: LntVaultConfig }) {
  const depositRef = useRef<HTMLButtonElement>(null)
  const withdrawRef = useRef<HTMLButtonElement>(null)
  const vd = useLntVault(vc)
  const vt = getTokenBy(vd.result!.VT, vc.chain, { symbol: 'VT' })!
  const withdrawPrice = useLntWithdrawPrice(vc)
  return <div className=' flex flex-col h-full justify-between shrink-0 gap-10 w-full md:w-fit'>
    <div className='flex items-center text-sm justify-center whitespace-nowrap'>
      <span className=''>Total Deposited</span>
      <span className='ml-8 text-base font-bold'>{displayBalance(vd.result!.activeDepositCount, 0, 0)}</span>
      <span className='opacity-50 ml-1'>Licenses</span>
    </div>
    <div className='flex flex-col gap-5 justify-between px-8 my-auto'>
      <SimpleDialog
        triggerRef={depositRef}
        triggerProps={{ className: 'flex-1' }}
        trigger={
          <BBtn className='flex-1'>Deposit</BBtn>
        }
      >
        <LntVaultDeposit vc={vc} onSuccess={() => depositRef.current?.click()} />
      </SimpleDialog>
      <SimpleDialog
        triggerRef={withdrawRef}
        triggerProps={{ className: 'flex-1' }}
        trigger={
          <BBtn className='flex-1'>Withdraw</BBtn>
        }
      >
        <LntVaultWithdraw vc={vc} onSuccess={() => withdrawRef.current?.click()} />
      </SimpleDialog>
      <div className='mt-4 text-sm opacity-60 text-center'>
        {`1 License = ${displayBalance(withdrawPrice.result, undefined, vt.decimals)} ${vt.symbol}`}
      </div>
    </div>

  </div>
}

export function LNTInfo({ vc }: { vc: LntVaultConfig }) {
  const { progressPercent, remainStr } = useLntVaultTimes(vc)
  return <div style={{
    backdropFilter: 'blur(20px)'
  }} className="animitem card bg-white flex gap-5 h-full col-span-2 flex-wrap justify-center md:flex-nowrap" >
    <div className='flex flex-col'>
      <div className="flex gap-5 relative justify-center flex-wrap md:flex-nowrap">
        {/* <NodeLicenseImage icon={nlImages[data.name] ? <img {...nlImages[data.name]} className="invert" /> : null} /> */}
        <CoinIcon symbol={vc.icon} size={161} className='object-contain' />
        <div className="flex flex-col whitespace-nowrap gap-5 h-full text-sm font-medium">
          <div className='flex justify-between gap-5 flex-wrap'>
            <div className="text-base font-semibold">{vc.tit}</div>
            <div></div>
            {/* {vc.isIdle && <div className='underline underline-offset-2 text-red-500 flex items-center gap-2 whitespace-pre-wrap'><CoinIcon size={16} symbol='Fire' /> Vault will officially launch on 2025/7/31 06:00 (UTC)</div>} */}
          </div>
          <div className="opacity-60 text-sm font-medium leading-normal whitespace-pre-wrap">{vc.info}</div>
        </div>

      </div >
      <div className='my-4 flex justify-between opacity-60'>Duration <span>{remainStr}</span></div>
      <div className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: progressPercent, background: 'linear-gradient(90deg, #C2B7FD 0%, #6466F1 100%)' }}
        />
      </div>
    </div>
    <LNTDepositWithdraw vc={vc} />
  </div>
}




function SwapVTYT({ vc, type }: { vc: LntVaultConfig, type: 'vt' | 'yt' }) {
  const vd = useLntVault(vc)
  const logs = useLntVaultLogs(vc)
  const [inputAsset, setInputAsset] = useState(vc.isIdle ? '1' : '')
  const inputAssetBn = parseEthers(inputAsset)
  const [isToggled, toggle] = useToggle(true)
  const t = getTokenBy(vd.result!.T, vc.chain, { symbol: 'T' })!
  const vt = getTokenBy(vd.result!.VT, vc.chain, { symbol: 'VT' })!
  const yt = getTokenBy(vd.result!.YT, vc.chain, { symbol: 'YT' })!
  const swapTo = type == 'vt' ? vt : yt;
  const input = isToggled ? swapTo : t;
  const output = isToggled ? t : swapTo;
  const inputBalance = useBalance(input);
  const outputBalance = useBalance(output);
  const [token0, token1] = useMemo(() => uniSortTokens([vd.result!.T, vd.result!.VT]), [vd.result])
  const poolkey = useLntHookPoolkey(vc)
  const zeroForOne = isAddressEqual(input.address, token0)
  const { data: outAmount, isFetching: isFetchingCalc } = useQuery({
    queryKey: useCalcKey([`calcKey:swapVTYT:${type}`, inputAsset, zeroForOne, vc.chain, poolkey.result, isToggled]),
    initialData: 0n,
    queryFn: async () => {
      if (type == 'yt') return 0n
      const pc = getPC(vc.chain)
      if (!vd.result || inputAssetBn <= 0n || !poolkey.result) return 0n
      console.info('vd:', vd.result)
      if (vc.isAethir) {
        return pc.readContract({
          abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: isToggled ? 'getAmountOutVTforT' : 'getAmountOutTforVT',
          args: [inputAssetBn],
        })
      }
      return pc.readContract({
        abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'quoteExactInputSingle',
        args: [{
          poolKey: poolkey.result,
          zeroForOne,
          exactAmount: inputAssetBn,
          hookData: '0x'
        }]
      }).then(([out]) => out).catch(() => 0n)
    }
  })
  let fees = '-'
  if (logs.result && logs.result.Feerate > DECIMAL) {
    fees = `${fmtPercent(logs.result.Feerate - DECIMAL, 18, 3)}`
  }
  let swapPrice = '-'
  let priceimpcat = '-'
  let apy = 0
  let apyto = 0
  if (type == 'vt') {
    const tPriceVt = calcTPriceVT(vc, vd.result, logs.result)
    const tPriceVtAfter = calcTPriceVT(vc, vd.result, logs.result, isToggled ? outAmount : -inputAssetBn, isToggled ? -inputAssetBn : outAmount)
    swapPrice = isToggled ? `1 ${vt.symbol} = ${round(1 / tPriceVt, 2)} ${t.symbol}` : `1 ${t.symbol} = ${round(tPriceVt, 2)} ${vt.symbol}`
    if (tPriceVt > 0) {
      priceimpcat = formatPercent(Math.abs(tPriceVtAfter - tPriceVt) / tPriceVt)
    }
    apy = calcVtApy(vc, vd.result, logs.result)
    apyto = calcVtApy(vc, vd.result, logs.result, isToggled ? outAmount : -inputAssetBn, isToggled ? -inputAssetBn : outAmount)
    console.info("SwapVT:", tPriceVt, tPriceVtAfter, apy, apyto)
  }
  // const outAmount = 0n
  const disableTx = type != 'vt' || inputAssetBn <= 0n || inputAssetBn > inputBalance.result || outAmount <= 0n || !poolkey.result
  return <div className='flex flex-col gap-1'>
    <AssetInput asset={input.symbol} disable={vc.isIdle} balance={inputBalance.result} amount={inputAsset} setAmount={setInputAsset} />
    <Swap onClick={() => toggle()} />
    <AssetInput checkBalance={false} asset={output.symbol} balance={outputBalance.result} loading={isFetchingCalc} disable amount={fmtBn(outAmount, output.decimals)} />
    <div className="flex justify-between items-center text-xs font-medium">
      <div>Price: {swapPrice}</div>
      <div>Price Impact: {priceimpcat}</div>
    </div>
    <div className="flex justify-between items-center text-xs font-medium opacity-60">
      <div>Implied APY Change: {formatPercent(apy)} → {formatPercent(apyto)}</div>
      <Fees fees={fees} />
    </div>
    <Txs
      className='mx-auto mt-4'
      tx={vc.isIdle ? 'Coming Soon' : 'Swap'}
      disabled={disableTx || vc.isIdle}
      txs={() => encodeSingleSwap({
        approveName: `Approve ${input.symbol}`,
        executeName: `Swap ${input.symbol} for ${output.symbol}`,
        chainId: vc.chain,
        poolkey: poolkey.result!,
        amountIn: inputAssetBn,
        is0To1: zeroForOne
      })}
      onTxSuccess={() => {
        setInputAsset('')
        reFet(vd.key, inputBalance.key, outputBalance.key)
      }}
    />
  </div>
}

function LPAdd({ vc, type }: { vc: LntVaultConfig, type: 'vt' | 'yt' }) {

  const { address } = useAccount()
  const vd = useLntVault(vc)
  const poolkey = useLntHookPoolkey(vc)
  const [isToggled, toggle] = useToggle(false)
  const t = getTokenBy(vd.result!.T, vc.chain, { symbol: 'T' })!
  const vt = getTokenBy(vd.result!.VT, vc.chain, { symbol: 'VT' })!
  const yt = getTokenBy(vd.result!.YT, vc.chain, { symbol: 'YT' })!

  const [input1Asset, setInput1Asset] = useState('')
  const input1AssetBn = parseEthers(input1Asset)
  const [input2Asset, setInput2Asset] = useState('')
  const input2AssetBn = parseEthers(input2Asset)
  const input1 = t;
  const input2 = type == 'vt' ? vt : yt;
  const output = type == 'vt' ? getTokenBy(vd.result!.vtSwapPoolHook, vc.chain, { symbol: 'lpTVT' })! : getTokenBy(vc.lpTYT, vc.chain, { symbol: 'lpTYT' })!;
  const [token0, token1] = useMemo(() => uniSortTokens([vd.result!.T, type == 'vt' ? vd.result!.VT : vd.result!.YT]), [type, vd.result])
  const token0IsInput1 = isAddressEqual(token0, input1.address)
  const input1Balance = useBalance(input1);
  const input2Balance = useBalance(input2);
  const swapPrice = ''
  const errorInput1 = ''
  const errorInput2 = ''
  const priceimpcat = 0
  const apy = 1.2
  const apyto = apy
  const [calcKey, setCalcKey] = useState<any[]>(['calcLPAdd'])
  const wrapSetCalcKey = useMemo(() =>
    debounce((isToken0: boolean, amount: bigint) => {
      console.info('setCalcKey:', isToken0, amount, token0IsInput1)
      setCalcKey([isToken0, amount, 'calcLPAdd', token0IsInput1])
    }, 300), [token0IsInput1])
  const { data: [liquidity, amount0Max, amount1Max], isFetching: isFetchingOut } = useQuery({
    queryKey: calcKey,
    initialData: [0n, 0n, 0n],
    throwOnError(error, query) {
      console.error(error);
      return false
    },
    queryFn: async ({ queryKey }) => {
      let data: [bigint, bigint, bigint] = [0n, 0n, 0n]
      if (queryKey.length <= 1) return data
      const pc = getPC(vc.chain)
      const inputIsToken0 = queryKey[0] as boolean
      const inputAmount = queryKey[1] as bigint
      console.info('calcLPAdd1:', inputIsToken0, inputAmount)
      if (type == 'vt') {
        const [liq0, liq1, totalShares] = await Promise.all([
          pc.readContract({ abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'reserve0' }),
          pc.readContract({ abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'reserve1' }),
          pc.readContract({ abi: erc20Abi, address: vd.result!.vtSwapPoolHook, functionName: 'totalSupply' }),
        ])
        console.info('liq0,liq1:', fmtBn(liq0), fmtBn(liq1))
        if (liq0 == 0n || liq1 == 0n) {
          data = [inputAmount, inputAmount, inputAmount]
        } else if (inputIsToken0) {
          data = [inputAmount * totalShares / liq0, inputAmount, inputAmount * liq1 / liq0]
        } else {
          data = [inputAmount * totalShares / liq1, inputAmount * liq0 / liq1, inputAmount]
        }
      } else {
        return data
        // data = await calcAddLP({ chainId, pc, token0, token1, token0Decimals: vt.decimals, token1Decimals: t.decimals, fee: vd.result!.vtSwapPoolFee, tickSpacing: vd.result!.vtSwapPoolTickSpacing, hooks: vd.result!.vtSwapPoolHook, inputIsToken0, inputAmount })
      }
      console.info('calcLPAdd2:', inputIsToken0, token0IsInput1, inputAmount, data)
      if (token0IsInput1) { // 
        setInput1Asset(fmtBn(data[1], t.decimals))
        setInput2Asset(fmtBn(data[2], vt.decimals))
      } else {
        setInput1Asset(fmtBn(data[2], t.decimals))
        setInput2Asset(fmtBn(data[1], vt.decimals))
      }
      return data
    },
  })

  const outAmount = liquidity
  const disableTx = type !== 'vt' || input1AssetBn <= 0n || input1AssetBn > input1Balance.result || input2AssetBn <= 0n || input2AssetBn > input2Balance.result
  const outLoading = isFetchingOut && input1AssetBn > 0n
  const txs = async () => {
    if (type == 'yt') {
      return encodeModifyLP({ chainId: vc.chain, lp: vd.result!.vtSwapPoolHook, poolkey: poolkey.result!, liquidity, amount0Max, amount1Max, })
    }
    // struct AddLiquidityParams {uint256 amount0Desired;uint256 amount1Desired;uint256 amount0Min;uint256 amount1Min;uint256 deadline;int24 tickLower;int24 tickUpper;bytes32 userInputSalt;}
    return withTokenApprove({
      approves: [
        { spender: vd.result!.vtSwapPoolHook, token: input1.address, amount: input1AssetBn },
        { spender: vd.result!.vtSwapPoolHook, token: input2.address, amount: input2AssetBn },
      ],
      user: address!,
      pc: getPC(vc.chain),
      tx: {
        name: 'Add Liquidity',
        abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'addLiquidity', args: [{
          amount0Desired: token0IsInput1 ? input1AssetBn : input2AssetBn,
          amount1Desired: token0IsInput1 ? input2AssetBn : input1AssetBn,
          amount0Min: 0n,
          amount1Min: 0n,
          deadline: genDeadline(),
          tickLower: -100000,
          tickUpper: 100000,
          userInputSalt: toHex(0, { size: 32 })
        }]
      }
    })
  }
  return <div className='flex flex-col gap-1'>
    <AssetInput asset={input1.symbol} amount={input1Asset} balance={input1Balance.result} setAmount={(value: any) => {
      wrapSetCalcKey(token0IsInput1, parseEthers(value, input1.decimals))
      setInput1Asset(value)
    }} error={errorInput1} />
    <AssetInput asset={input2.symbol} amount={input2Asset} balance={input2Balance.result} setAmount={(value: any) => {
      wrapSetCalcKey(!token0IsInput1, parseEthers(value, input2.decimals))
      setInput2Asset(value)
    }} error={errorInput2} />
    {/* <Swap onClick={() => toggle()} /> */}
    <div>Receive</div>
    <AssetInput asset={output.symbol} loading={outLoading} disable amount={fmtBn(outAmount, output.decimals)} />
    <Txs
      className='mx-auto mt-4'
      tx='Add'
      disabled={disableTx}
      txs={txs}
      onTxSuccess={() => {
        setInput1Asset('')
        setInput2Asset('')
        wrapSetCalcKey(false, 0n)
        reFet(vd.key, input1Balance.key, input1Balance.key)
      }}
    />
  </div>
}
function LPRemove({ vc, type }: { vc: LntVaultConfig, type: 'vt' | 'yt' }) {
  const vd = useLntVault(vc)
  const poolkey = useLntHookPoolkey(vc)
  const [inputAsset, setInputAsset] = useState('')
  const inputAssetBn = parseEthers(inputAsset)
  const t = getTokenBy(vd.result!.T, vc.chain, { symbol: 'T' })!
  const vt = getTokenBy(vd.result!.VT, vc.chain, { symbol: 'VT' })!
  const yt = getTokenBy(vd.result!.YT, vc.chain, { symbol: 'YT' })!
  const input = type == 'vt' ? getTokenBy(vd.result!.vtSwapPoolHook, vc.chain, { symbol: 'lpTVT' })! : getTokenBy(vc.lpTYT, vc.chain, { symbol: 'lpTYT' })!;
  const output1 = t;
  const output2 = type == 'vt' ? vt : yt;
  const [token0, token1] = useMemo(() => uniSortTokens([vd.result!.T, type == 'vt' ? vd.result!.VT : vd.result!.YT]), [type, vd.result])
  const output1IsToken0 = isAddressEqual(token0, output1.address)
  const inputBalance = useBalance(input);

  const { data: [out1Amount, out2Amount], isFetching: isFetchingOut } = useQuery({
    queryKey: useCalcKey(['calcLpRemove', vc.vault, inputAssetBn, output1IsToken0]),
    initialData: [0n, 0n],
    queryFn: async () => {
      if (inputAssetBn <= 0n) return [0n, 0n]
      const pc = getPC(vc.chain)
      if (type == 'yt') {
        return [0n, 0n]
        // return calcRemoveLP({ chainId, pc, token0, token1, token0Decimals: vt.decimals, token1Decimals: t.decimals, fee: vd.result!.vtSwapPoolFee, tickSpacing: vd.result!.vtSwapPoolTickSpacing, hooks: vd.result!.vtSwapPoolHook, inputAmount: inputAssetBn })
      }
      const [liq0, liq1, totalShares] = await Promise.all([
        pc.readContract({ abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'reserve0' }),
        pc.readContract({ abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'reserve1' }),
        pc.readContract({ abi: erc20Abi, address: vd.result!.vtSwapPoolHook, functionName: 'totalSupply' }),
      ])
      // const [vtLiq, tLiq] = await pc.readContract({ abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'getVTAndTReserves' })
      if (liq0 == 0n || liq1 == 0n) return [0n, 0n]
      // const liqXX2 = inputAssetBn * inputAssetBn
      if (output1IsToken0) {
        return [inputAssetBn * liq0 / totalShares, inputAssetBn * liq1 / totalShares]
      } else {
        return [inputAssetBn * liq1 / totalShares, inputAssetBn * liq0 / totalShares]
      }
    },
  })
  const swapPrice = ''
  const errorInput = ''
  const priceimpcat = 0
  const apy = 1.2
  const apyto = apy
  const disableTx = type != 'vt' || inputAssetBn <= 0n || inputAssetBn > inputBalance.result
  const txs = (): TxConfig[] => {
    if (type == 'yt') {
      return encodeModifyLP({ chainId: vc.chain, poolkey: poolkey.result!, lp: vd.result!.vtSwapPoolHook, liquidity: -inputAssetBn, })
    }
    // struct RemoveLiquidityParams {uint256 liquidity;uint256 amount0Min;uint256 amount1Min;uint256 deadline;int24 tickLower;int24 tickUpper;bytes32 userInputSalt;}
    return [
      // { abi: erc20Abi, address: vd.result!.vtSwapPoolHook, functionName: 'approve', args: [vd.result!.vtSwapPoolHook, inputAssetBn] },
      {
        name: 'Remove Liquidity',
        abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'removeLiquidity', args: [{
          liquidity: inputAssetBn,
          amount0Min: 0n,
          amount1Min: 0n,
          deadline: genDeadline(),
          tickLower: -100000,
          tickUpper: 100000,
          userInputSalt: toHex(0, { size: 32 })
        }]
      }
    ]
  }
  return <div className='flex flex-col gap-1'>
    <AssetInput asset={input.symbol} amount={inputAsset} balance={inputBalance.result} setAmount={setInputAsset} error={errorInput} />
    {/* <Swap onClick={() => toggle()} /> */}
    <div>Receive</div>
    <AssetInput asset={output1.symbol} loading={isFetchingOut && inputAssetBn > 0n} disable amount={fmtBn(out1Amount, output1.decimals)} />
    <AssetInput asset={output2.symbol} loading={isFetchingOut && inputAssetBn > 0n} disable amount={fmtBn(out2Amount, output2.decimals)} />
    <Txs
      className='mx-auto mt-4'
      tx='Remove'
      disabled={disableTx}
      txs={txs}
      onTxSuccess={() => {
        setInputAsset('')
        reFet(vd.key, inputBalance.key)
      }}
    />
  </div>
}

function VT({ vc }: { vc: LntVaultConfig }) {
  const vd = useLntVault(vc)
  const logs = useLntVaultLogs(vc)
  const apy = calcVtApy(vc, vd.result, logs.result)
  const vt = getTokenBy(vd.result!.VT, vc.chain, { symbol: 'VT' })!
  const t = getTokenBy(vd.result!.T, vc.chain, { symbol: 'T' })!
  const { data: walletClient } = useWalletClient()
  const onAddPToken = () => {
    walletClient?.watchAsset({ type: 'ERC20', options: vt }).catch(handleError)
  }
  const vtTotal = useTotalSupply(vt)
  return <div className="flex flex-col gap-4 w-full">
    <div className='animitem card !p-0 overflow-hidden w-full'>
      <div className='flex p-5 bg-[#A3D395] gap-5'>
        <CoinIcon size={48} symbol={vt.symbol} />
        <div className='flex flex-col gap-3'>
          <div className='text-xl leading-6 text-black font-semibold'>{vt.symbol}</div>
          <div className='text-xs leading-none text-black/60 font-medium'>1 {vt.symbol} is equal to 1 {t.symbol} at maturity</div>
        </div>
      </div>
      <div className='flex whitespace-nowrap items-baseline justify-between px-2.5 pt-2 gap-2.5'>
        <div className="text-lg font-medium">{formatPercent(apy)}</div>
        <div className="text-xs font-semibold opacity-60">Fixed APY</div>
        <div className="text-xs font-semibold opacity-60 ml-auto">Circulation amount</div>
        <div className="text-lg font-medium">{displayBalance(vtTotal.result, undefined, vt.decimals)}</div>
      </div>
      <div className='flex px-2 pb-4'>
        <button className='btn-link ml-auto text-primary text-xs underline-offset-2' onClick={onAddPToken}>
          Add to wallet
        </button>
      </div>
    </div>
    <div className="animitem card !p-4 min-h-[390px]">
      {vc.vtActive ? <SimpleTabs
        listClassName="p-0 gap-6 mb-4"
        triggerClassName={`text-base font-bold leading-none data-[state="active"]:text-black`}
        data={[
          { tab: 'Swap', content: <SwapVTYT vc={vc} type='vt' /> },
          { tab: 'Add Liquidity', content: <LPAdd vc={vc} type='vt' /> },
          { tab: 'Remove Liquidity', content: <LPRemove vc={vc} type='vt' /> },
        ]}
      /> : <div className='w-full py-[150px] text-center text-base font-semibold'>Swap Coming Soon</div>}
    </div>
  </div>
}
function YT({ vc }: { vc: LntVaultConfig }) {
  const { data: walletClient } = useWalletClient()
  const vd = useLntVault(vc)
  const yt = getTokenBy(vd.result!.YT, vc.chain, { symbol: 'YT' })!
  const t = getTokenBy(vd.result!.T, vc.chain, { symbol: 'T' })!
  const onAddPToken = () => {
    walletClient?.watchAsset({ type: 'ERC20', options: yt }).catch(handleError)
  }
  return <div className="flex flex-col gap-4 w-full">
    <div className='animitem card !p-0 overflow-hidden w-full'>
      <div className='flex p-5 bg-[#F0D187] gap-5'>
        <CoinIcon size={48} symbol={yt.symbol} />
        <div className='flex flex-col gap-3'>
          <div className='text-xl leading-6 text-black font-semibold'>{yt.symbol}</div>
          <div className='text-xs leading-none text-black/60 font-medium'>1 {yt.symbol} is equal to 1 {t.symbol} at maturity</div>
        </div>
      </div>
      <div className='flex whitespace-nowrap items-baseline justify-between px-2.5 pt-2 gap-2.5'>
        <div className="text-lg font-medium">{formatPercent(1)}</div>
        <div className="text-xs font-semibold opacity-60">Fixed APY</div>
        <div className="text-xs font-semibold opacity-60 ml-auto">Circulation amount</div>
        <div className="text-lg font-medium">{displayBalance(0n)}</div>
      </div>
      <div className='flex px-2 pb-4'>
        <button className='btn-link ml-auto text-primary text-xs underline-offset-2' onClick={onAddPToken}>
          Add to wallet
        </button>
      </div>
    </div>
    <div className="animitem card !p-4">
      <SimpleTabs
        listClassName="p-0 gap-6 mb-4"
        triggerClassName={`text-base font-bold leading-none data-[state="active"]:text-black`}
        data={[
          { tab: 'Swap', content: <SwapVTYT vc={vc} type='yt' /> },
          { tab: 'Add Liquidity', content: <LPAdd vc={vc} type='yt' /> },
          { tab: 'Remove Liquidity', content: <LPRemove vc={vc} type='yt' /> },
        ]}
      />
    </div>
  </div>
}

export function LNT_VT_YT({ vc }: { vc: LntVaultConfig }) {
  return <div className='animitem card bg-white'>
    <SimpleTabs
      listClassName="p-0 gap-8 mb-4 w-full"
      triggerClassName={(i) => `text-2xl font-semibold leading-none data-[state="active"]:underline underline-offset-2`}
      data={vc.ytEnable ? [
        { tab: 'Vesting Token', content: <VT vc={vc} /> },
        { tab: 'Yield Token', content: <YT vc={vc} /> },
      ] : [
        { tab: 'Vesting Token', content: <VT vc={vc} /> },
      ]}
    />
  </div>
}



export function LNTTestHeader({ vc }: { vc: LntVaultConfig }) {
  const { address } = useAccount()
  if (vc.tit !== "0G AI Alignment Node") return null
  const txs = async () => {
    return [{ abi: abiMockERC721, address: vc.asset, functionName: 'safeMint', args: [address] }]
  }
  return <div className='flex justify-end items-center gap-10'>
    <Link href={"https://faucet.0g.ai/"} target='_blank' className='flex items-center gap-2 underline underline-offset-2'>
      <CoinIcon symbol='ZeroG' size={32} className='object-contain' />
      Faucet
    </Link>
    <Txs tx='Mint Test Node' className='w-[180px]' txs={txs} disabled={!address} />
  </div>
}

export function LNTAethirHeader({ vc }: { vc: LntVaultConfig }) {
  if (!vc.isAethir) return null
  return <div className='flex justify-end items-center gap-10'>
    <Link href={"https://opensea.io/collection/aethir-checker-license"} target='_blank' className='flex items-center gap-2 underline underline-offset-2'>
      <CoinIcon symbol='Opensea' size={24} className='object-contain' />
      Buy Node on Opensea
    </Link>
  </div>
}

