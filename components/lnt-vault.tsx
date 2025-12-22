import { toLntVault } from '@/app/routes'
import { abiMockERC721 } from '@/config/abi'
import { abiLntVault, abiLntVTSwapHook, abiQueryLNT } from '@/config/abi/abiLNTVault'
import { codeQueryLNT } from '@/config/codes'
import { LntVaultConfig } from '@/config/lntvaults'
import { getChain } from '@/config/network'
import { getTokenBy } from '@/config/tokens'
import { encodeModifyLP, encodeSingleSwap } from '@/config/uni'
import { DECIMAL } from '@/constants'
import { useCalcKey } from '@/hooks/useCalcKey'
import { useCurrentChain } from '@/hooks/useCurrentChainId'
import { calcTPriceVT, calcVtApy, useLntHookPoolkey, useLntVault, useLntVaultLogs, useLntVaultTimes, useLntVaultWithdrawState, useVTTotalSupply } from '@/hooks/useFetLntVault'
import { useBalance, useErc721Balance, useTotalSupply } from '@/hooks/useToken'
import { reFet } from '@/lib/useFet'
import { cn, fmtBn, fmtDate, fmtPercent, formatPercent, genDeadline, handleError, parseEthers, tabToSearchParams, uniSortTokens } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { displayBalance } from '@/utils/display'
import { useQuery } from '@tanstack/react-query'
import { debounce, round } from 'es-toolkit'
import { floor, keys, min, toNumber } from 'es-toolkit/compat'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import { FaAngleRight, FaCheck, FaYoutube } from "react-icons/fa6"
import { useSetState, useToggle } from 'react-use'
import { toast } from 'sonner'
import { erc20Abi, erc721Abi, isAddressEqual, toHex } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'
import { TX, TxConfig, Txs, withTokenApprove } from './approve-and-tx'
import { BridgeToken } from './bridge-token'
import { Fees } from './fees'
import { CoinIcon } from './icons/coinicon'
import { TokenIcon } from './icons/tokenicon'
import { LntVaultBuyback } from './lnt-vault-buyback'
import { LntVaultDepositReppo } from './lnt-vault-reppo'
import { LVTDepositWithdrawVerio } from './lnt-vault-verio'
import { Badge } from './noti'
import { SimpleDialog } from './simple-dialog'
import { SimpleTabs } from './simple-tabs'
import { ConfigChainsProvider } from './support-chains'
import { TokenInput } from './token-input'
import { BBtn, BBtn2, Swap } from './ui/bbtn'
import { NumInput } from './ui/num-input'
import { ProgressBar } from './ui/progress'
import { Tip } from './ui/tip'
import { LgBoardBloom, LgBoardBloom2 } from './ui/effects'
import { LntNodeSvg, LvtNodeSvg } from './anim-svg'

function LntVaultDeposit({ vc, onSuccess }: { vc: LntVaultConfig, onSuccess: () => void }) {
  const vd = useLntVault(vc)
  const withdrawPrice = vd.result?.aVT ?? 0n
  const maxSelected = 30;
  const [selectedNft, setSelectNft] = useSetState<{ [tokenId: string]: boolean }>({})
  const tokenIds = keys(selectedNft).filter(item => selectedNft[item]).map(item => BigInt(item))
  const chainId = vc.deposit?.chain ?? vc.chain
  const mVault = vc.deposit?.vault ?? vc.vault
  const nfts = useErc721Balance(chainId, vd.result!.NFT, vc.nftBalanceBy)
  const vt = getTokenBy(vd.result!.VTbyDeposit ?? vd.result!.VT, chainId, { symbol: 'VT' })!
  const yt = getTokenBy(vd.result!.YT, chainId, { symbol: 'YT' })!
  const { data: outAmountVT } = useQuery({
    ...useCalcKey(['calcLntDeposit', chainId, tokenIds]),
    initialData: 0n,
    queryFn: async () => {
      if (tokenIds.length == 0) return 0n
      return getPC(chainId).readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'calcDeposit', args: [mVault, tokenIds] })
    }
  })
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

  const getTxs: Parameters<typeof Txs>['0']['txs'] = async ({ pc, wc }) => {
    const approves: TX[] = []
    if (!(await pc.readContract({ abi: erc721Abi, address: vc.asset, functionName: 'isApprovedForAll', args: [wc.account.address!, mVault] }))) {
      const alreadyApproves = await Promise.all(tokenIds.map(id => pc.readContract({ abi: erc721Abi, address: vc.asset, functionName: 'getApproved', args: [id] })))
      alreadyApproves.forEach((ap, i) => {
        if (!isAddressEqual(ap, vc.vault)) {
          approves.push({ abi: erc721Abi, address: vc.asset, functionName: 'approve', args: [mVault, tokenIds[i]], name: `Approve #${tokenIds[i].toString()}` })
        }
      })
    }
    return [
      ...approves,
      {
        name: 'Deposit',
        abi: abiLntVault,
        address: mVault,
        functionName: vc.deposit?.fnDepoist ?? 'batchDeposit',
        enabled: tokenIds.length > 0,
        args: vc.isAethir || vc.isZeroG ? [tokenIds] : [tokenIds, tokenIds.map(() => 1n)]
      }
    ]
  }
  return <div className='flex flex-col gap-5 items-center p-5 pt-8 font-sec w-full'>
    <div className='w-full text-start font-def'>Licenses ID
      {/* <span className={cn('text-xs ml-5 opacity-70', { "hidden": vc.isAethir },)}>Wait about 5 minutes after MINT to retrieve the list.</span> */}
    </div>
    <div className='w-full h-72 overflow-y-auto text-sm'>
      <div className='w-full gap-2 grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))]'>
        {nfts.result.map(id => (
          <div key={id.toString()}
            className={cn('flex rounded-xl bg-bg border px-4 py-3 border-transparent gap-1 items-center justify-between cursor-pointer', { 'border-primary': selectedNft[id.toString()] })}
            onClick={() => onClickOne(id)}
          >
            #{id.toString()}
            <FaCheck className={selectedNft[id.toString()] ? 'text-primary' : 'text-fg/20'} />
          </div>))}
      </div>
    </div>
    <BBtn className='max-w-sm' onClick={onClickAll}>Select All</BBtn>
    <div className='flex flex-col gap-1 w-full'>
      <div className='w-full'>Receive</div>
      <TokenInput tokens={[vt]} loading={false} disable amount={fmtBn(outAmountVT, vt.decimals)} />
      {vc.ytEnable && <>
        <div className='w-full text-center'>And</div>
        <TokenInput tokens={[yt]} loading={false} disable amount={fmtBn(DECIMAL * BigInt(tokenIds.length), yt.decimals)} />
      </>}
    </div>
    <div className='text-sm opacity-60 text-center flex justify-between gap-5 w-full'>
      <div className='text-left'>
        {vc.isZeroG ? `Get ${displayBalance(withdrawPrice, undefined, vt.decimals)} ${vt.symbol} immediately Remaining portion will be distributed on BSC` :
          `1 License = ${displayBalance(vd.result?.aVT ?? 0n, undefined, vt.decimals)} ${vt.symbol}`}
      </div>
      <div>
        {`Operation Fees : ${vc.depositFees ?? '5%'}`}
      </div>
    </div>
    <ConfigChainsProvider chains={chainId}>
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
        txs={getTxs} />
    </ConfigChainsProvider>
  </div>
}
function LntVaultWithdraw({ vc, onSuccess }: { vc: LntVaultConfig, onSuccess: () => void }) {
  const vd = useLntVault(vc)
  const chainId = vc.deposit?.chain ?? vc.chain
  const mVault = vc.deposit?.vault ?? vc.vault
  const vt = getTokenBy(vd.result!.VTbyDeposit ?? vd.result!.VT, chainId, { symbol: 'VT' })!
  const yt = getTokenBy(vd.result!.YT, chainId, { symbol: 'YT' })!
  const ytBalance = useBalance(vc.ytEnable ? yt : undefined)
  const vtBalance = useBalance(vt)
  const maxByYT = floor(toNumber(fmtBn(ytBalance.result, yt.decimals)))
  const avt = vd.result?.aVT ?? 0n
  const maxByVT = toNumber((avt > 0n ? vtBalance.result / avt : 0n).toString())
  const maxByActive = toNumber((vd.result?.activeDepositCount ?? 0n).toString())
  const [count, setCount] = useState(0)
  const max = vc.ytEnable ? min([maxByYT, maxByVT, maxByActive])! : min([maxByVT, maxByActive])!
  const withdrawPrice = vd.result?.aVT ?? 0n
  const outAmountVT = withdrawPrice * BigInt(count);
  const withdrawStat = useLntVaultWithdrawState(vc)
  return <div className='flex flex-col gap-5 items-center p-5 pt-8 font-sec'>
    <div className='flex flex-col gap-1 w-full'>
      <div className=' w-full'>Input:</div>
      {vc.ytEnable && <>
        <TokenInput tokens={[yt]} disable amount={count.toString()} />
        <div className='w-full'>Pair With</div>
      </>}
      <TokenInput tokens={[vt]} disable amount={fmtBn(outAmountVT, vt.decimals)} />
      <div className='mt-4 text-sm opacity-60'>
        {`1 License = ${displayBalance(vd.result?.aVT ?? 0n, undefined, vt.decimals)} ${vt.symbol}`}
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
    <ConfigChainsProvider chains={chainId}>
      <Txs
        tx='Withdraw'
        className='mt-6'
        onTxSuccess={() => {
          onSuccess()
        }}
        disabled={count <= 0 || max <= 0 || count > max || outAmountVT < 0n || outAmountVT > vtBalance.result || !withdrawStat.inWindow}
        txs={[{
          abi: abiLntVault,
          address: mVault,
          functionName: vc.deposit?.fnRedeem ?? 'batchRedeem',
          args: [BigInt(count)]
        }]} />
    </ConfigChainsProvider>
  </div>
}

export function LNTVaultCard({ vc }: { vc: LntVaultConfig }) {
  const r = useRouter()
  const vd = useLntVault(vc)
  const logs = useLntVaultLogs(vc)
  const itemClassname = "flex gap-1 font-medium text-xs shrink-0 justify-between md:justify-center md:flex-col"
  const itemTitClassname = "opacity-60 font-sec"
  const vtTotalSupply = useVTTotalSupply(vc)
  // const yt = getTokenBy(vd.result?.YT, vc.chain, { symbol: 'YT' })
  // const ytTotalSupply = useTotalSupply(vc.ytEnable ? yt : undefined)
  const t = getTokenBy(vd.result?.T, vc.chain, { symbol: 'T' })
  const { remainStr, endTimeStr } = useLntVaultTimes(vc)
  const chain = useCurrentChain()
  const vtApy = calcVtApy(vc, vd.result, logs.result)
  return (
    <div className={cn(
      'animitem card overflow-hidden flex p-4 items-center justify-between cursor-pointer overflow-x-auto',
      'md:p-6'
    )} onClick={() => toLntVault(r, vc.vault)}>
      <div className='w-full min-w-max gap-4 grid md:grid-cols-[1.8fr_1.3fr_1fr_1fr_1.2fr_.5fr_.5fr]'>
        <div className='flex items-center gap-2.5 shrink-0 border-r border-board'>
          <CoinIcon symbol={vc.projectIcon} size={40} />
          <span className='text-sm font-medium font-sec'>{vc.tit}</span>
          <BBtn2 className='h-6 w-6 p-0 aspect-square text-xs ml-auto md:hidden'><FaAngleRight /></BBtn2>
          <Badge text='Testnet' className={cn('opacity-0 absolute left-0 top-0', { 'opacity-100': chain.testnet || vc.test })} />
        </div>
        <div className={itemClassname}>
          {
            vc.isLVT ? <>
              <div className={itemTitClassname}>Total Locked</div>
              <div>{displayBalance(vtTotalSupply ?? 0n, undefined, t?.decimals)}</div>
            </> : <>
              <div className={itemTitClassname}>Total Deposited</div>
              <div>{displayBalance(vd.result?.activeDepositCount ?? 0n, 0, 0)}</div>
            </>
          }
        </div>
        <div className={itemClassname}>
          <div className={itemTitClassname}>VT Supply</div>
          <div>{displayBalance(vtTotalSupply)}</div>
        </div>
        <div className={cn(itemClassname, 'items-center')}>
          <div className={itemTitClassname}>VT Apy</div>
          <div className={vtApy >= 0 ? 'text-red-400' : 'text-green-400'}>{formatPercent(vtApy, 2, false)}</div>
        </div>
        <div className={cn(itemClassname, 'items-center')}>
          <div className={itemTitClassname}>Due Date</div>
          {!vd ? '-' : <div className='relative whitespace-nowrap'>
            {endTimeStr}
            <span className='opacity-60 text-xs absolute top-full right-0 font-sec md:right-[unset] md:left-1/2 md:-translate-x-1/2 '>{remainStr}</span>
          </div>}
        </div>
        <div className={cn(itemClassname, 'items-center')}>
          <div className={itemTitClassname}>State</div>
          <div>{!vd ? '-' : vd.result?.closed ? 'Closed' : 'Active'}</div>
        </div>
        <div className={cn(itemClassname, 'items-center hidden md:flex')}>
          <BBtn2 className='h-6 w-6 p-0 aspect-square text-xs'><FaAngleRight /></BBtn2>
        </div>
      </div>
    </div>
  )
}

export function LNTDepositWithdraw({ vc }: { vc: LntVaultConfig }) {
  const depositRef = useRef<HTMLButtonElement>(null)
  const withdrawRef = useRef<HTMLButtonElement>(null)
  const vd = useLntVault(vc)
  const vt = getTokenBy(vd.result!.VT, vc.chain, { symbol: 'VT' })!
  const withdrawPrice = vd.result?.aVT ?? 0n
  return <div className=' flex flex-col h-full justify-between shrink-0 gap-6 w-full md:w-fit'>
    <div className='flex items-center text-sm justify-center whitespace-nowrap'>
      <span className=''>Total Deposited</span>
      <span className='ml-8 text-base font-bold'>{displayBalance(vd.result!.activeDepositCount, 0, 0)}</span>
      <span className='opacity-50 ml-1'>Licenses</span>
    </div>
    <div className='flex flex-col gap-5 justify-between lg:px-8 my-auto'>
      <SimpleDialog
        triggerRef={depositRef}
        trigger={
          <BBtn className='shrink-0'>Deposit</BBtn>
        }
      >
        <LntVaultDeposit vc={vc} onSuccess={() => depositRef.current?.click()} />
      </SimpleDialog>
      {!vc.disWithdrawNFT && <SimpleDialog
        triggerRef={withdrawRef}
        trigger={
          <BBtn className='shrink-0'>Withdraw</BBtn>
        }
      >
        <LntVaultWithdraw vc={vc} onSuccess={() => withdrawRef.current?.click()} />
      </SimpleDialog>}
      {
        vc.isZeroG ? <>
          <div className='text-sm text-center'>
            1 License = 854.7 v0G (Max) <Tip>
              Get {displayBalance(withdrawPrice, undefined, vt.decimals)} {vt.symbol} immediately<br />
              Remaining portion will be<br />
              distributed on BSC
            </Tip>
          </div>
          <div className='flex flex-col items-center text-sm'>
            {/* Claimable : 234.5 v0G */}
            <span>Claimable : - {vt.symbol}</span>
            <Txs
              tx='Claim'
              txs={[]}
            />
          </div>
        </>
          : <div className='mt-4 text-sm opacity-60 text-center'>
            {`1 License = ${displayBalance(withdrawPrice, undefined, vt.decimals)} ${vt.symbol}`}
          </div>
      }
    </div>

  </div>
}

export function LNTInfo({ vc }: { vc: LntVaultConfig }) {
  const { progress, remainStr } = useLntVaultTimes(vc)
  const vd = useLntVault(vc)
  const t = getTokenBy(vd.result!.T, vc.chain, { symbol: 'T' })!
  const vtTotal = useVTTotalSupply(vc)
  return <div className="animitem card flex gap-2.5 p-2.5 flex-wrap justify-center" >
    <div className='flex flex-col items-center md:flex-row p-2.5 pr-5 rounded-[10px] gap-5 bg-bg flex-1'>
      {vc.isLVT ? <LgBoardBloom2 className='w-55 aspect-square flex justify-center items-center shrink-0'>
        <LvtNodeSvg disableAnim node={<CoinIcon size={"100%"} symbol={vc.projectIcon} className='rounded-full border-2 border-amber-300' />} />
      </LgBoardBloom2> : <LgBoardBloom className='w-55 aspect-square flex justify-center items-center shrink-0'>
        <LntNodeSvg disableAnim node={<CoinIcon size={"100%"} symbol={vc.projectIcon} className='rounded-full border-2 border-green-300' />} />
      </LgBoardBloom>}
      <div className="flex flex-col gap-3 min-w-80">
        <div className="leading-10 text-base font-semibold">{vc.tit}</div>
        <div className="opacity-60 text-sm font-medium leading-normal whitespace-pre-wrap font-sec">{vc.info}</div>
        <div className='h-px bg-board' />
        <div className=''>
          <div className='flex justify-between mb-2'>Duration <span className='font-sec opacity-60'>{remainStr}</span></div>
          <ProgressBar progress={progress} />
        </div>
      </div >
    </div>
    <div className='p-5 gap-5 rounded-[10px] bg-bg'>
      {(vc.isFil || vc.isSei) && <div className='flex flex-col h-full items-center justify-between shrink-0 gap-2 md:gap-10 w-full pt-5 my-auto md:pt-10 px-5 md:px-10 md:w-fit'>
        <span className=''>Total Locked</span>
        <div className='font-bold'> {displayBalance(vtTotal, undefined, t.decimals)}</div>
        <div className='flex items-center gap-2.5'>
          <TokenIcon token={t} size={20} />
          {t.symbol}
        </div>
      </div>}
      {vc.isVerio && <LVTDepositWithdrawVerio vc={vc} />}
      {vc.reppo && <LntVaultDepositReppo vc={vc} />}
      {!vc.isLVT && !vc.reppo && <LNTDepositWithdraw vc={vc} />}
    </div>
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
    ...useCalcKey([`calcKey:swapVTYT:${type}`, inputAsset, zeroForOne, vc.chain, poolkey.result, isToggled]),
    initialData: 0n,
    queryFn: async () => {
      if (type == 'yt') return 0n
      const pc = getPC(vc.chain)
      if (!vd.result || inputAssetBn <= 0n || !poolkey.result) return 0n
      console.info('vd:', vd.result)
      // if (vc.isAethir || vc.isZeroG) {
      return pc.readContract({
        abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: isToggled ? 'getAmountOutVTforT' : 'getAmountOutTforVT',
        args: [inputAssetBn],
      })
      // }
      // return pc.readContract({
      //   abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'quoteExactInputSingle',
      //   args: [{
      //     poolKey: poolkey.result,
      //     zeroForOne,
      //     exactAmount: inputAssetBn,
      //     hookData: '0x'
      //   }]
      // }).then(([out]) => out).catch(() => 0n)
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
    if (tPriceVt > 0) {
      const tPriceVtAfter = calcTPriceVT(vc, vd.result, logs.result, isToggled ? -outAmount : inputAssetBn, isToggled ? inputAssetBn : -outAmount)
      swapPrice = isToggled ? `1 ${vt.symbol} = ${round(1 / tPriceVt, 2)} ${t.symbol}` : `1 ${t.symbol} = ${round(tPriceVt, 2)} ${vt.symbol}`
      if (tPriceVt > 0) {
        priceimpcat = formatPercent(Math.abs(tPriceVtAfter - tPriceVt) / tPriceVt)
      }
      apy = calcVtApy(vc, vd.result, logs.result)
      apyto = calcVtApy(vc, vd.result, logs.result, isToggled ? -outAmount : inputAssetBn, isToggled ? inputAssetBn : -outAmount)
      console.info("SwapVT:", tPriceVt, tPriceVtAfter, apy, apyto)
    }
  }
  // const outAmount = 0n
  const disableTx = type != 'vt' || inputAssetBn <= 0n || inputAssetBn > inputBalance.result || outAmount <= 0n || !poolkey.result
  return <div className='flex flex-col gap-1 font-sec'>
    <TokenInput tokens={[input]} disable={vc.isIdle} amount={inputAsset} setAmount={setInputAsset} />
    <Swap onClick={() => toggle()} />
    <TokenInput tokens={[output]} disable checkBalance={false} loading={isFetchingCalc} amount={fmtBn(outAmount, output.decimals)}
      otherInfo={
        <div className="flex justify-between items-center text-xs gap-2 flex-wrap w-full text-fg">
          <div>Price: {swapPrice}</div>
          <div>Price Impact: {priceimpcat}</div>
        </div>
      } />

    <div className="flex justify-between items-center text-xs opacity-60 gap-2 flex-wrap">
      <div className='whitespace-nowrap'>Implied APY Change: {formatPercent(apy)} → {formatPercent(apyto)}</div>
      <Fees fees={fees} />
    </div>
    <Txs
      className='w-full mx-auto mt-4'
      tx={vc.isIdle ? 'Coming Soon' : 'Swap'}
      disabled={disableTx || vc.isIdle}
      txs={({ wc }) => encodeSingleSwap({
        user: wc.account.address,
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
    staleTime: 0,
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
    <TokenInput
      tokens={[input1]} amount={input1Asset} error={errorInput1}
      setAmount={(value: any) => {
        wrapSetCalcKey(token0IsInput1, parseEthers(value, input1.decimals))
        setInput1Asset(value)
      }}
    />
    <TokenInput tokens={[input2]} amount={input2Asset} error={errorInput2}
      setAmount={(value: any) => {
        wrapSetCalcKey(!token0IsInput1, parseEthers(value, input2.decimals))
        setInput2Asset(value)
      }} />
    <div>Receive</div>
    <TokenInput tokens={[output]} loading={outLoading} disable amount={fmtBn(outAmount, output.decimals)} />
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
  const inputTotalSupply = useTotalSupply(input)
  const { data: [out1Amount, out2Amount], isFetching: isFetchingOut } = useQuery({
    ...useCalcKey(['calcLpRemove', vc.vault, inputAssetBn, output1IsToken0]),
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
  const poolShare = inputTotalSupply.result > 0n ? inputBalance.result * DECIMAL / inputTotalSupply.result : 0n
  const poolShareStr = `Pool share: ${fmtPercent(poolShare, input.decimals, 2)}`
  return <div className='flex flex-col gap-1'>
    <TokenInput tokens={[input]} amount={inputAsset} setAmount={setInputAsset} error={errorInput} otherInfo={poolShareStr} />
    <div>Receive</div>
    <TokenInput tokens={[output1]} loading={isFetchingOut && inputAssetBn > 0n} disable amount={fmtBn(out1Amount, output1.decimals)} />
    <TokenInput tokens={[output2]} loading={isFetchingOut && inputAssetBn > 0n} disable amount={fmtBn(out2Amount, output2.decimals)} />
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
  const vtTotal = useVTTotalSupply(vc)
  const r = useRouter()
  return <div className="flex flex-col gap-4 w-full">
    <div className='animitem card p-0! overflow-hidden w-full font-sec'>
      <div className='flex p-5 bg-[#A3D395] gap-4 relative'>
        <TokenIcon size={48} token={vt} />
        <div className='flex flex-col gap-3'>
          <div className='text-xl leading-6 text-black font-semibold'>{vt.symbol}</div>
          <div className='text-xs leading-none text-black/60 font-medium font-sec'>1 {vt.symbol} is equal to 1 {t.symbol} at maturity</div>
        </div>
        {vc.deposit && <div className='text-sm text-black absolute top-5 right-5 font-sec'>
          <span onClick={() => toLntVault(r, vc.vault, 'bridge')}
            className='cursor-pointer underline underline-offset-2'>Bridge</span>
          {` `} to {getChain(vc.chain)!.name} first
        </div>}
      </div>
      <div className='flex whitespace-nowrap flex-wrap items-baseline justify-between px-2.5 pt-2 gap-2.5 font-sec'>
        <div className='flex justify-between gap-2.5 items-baseline'>
          <div className="text-lg font-medium">{formatPercent(apy)}</div>
          <div className="text-xs font-semibold opacity-60">Fixed APY</div>
        </div>
        <div className='flex justify-between gap-2.5 items-baseline'>
          <div className="text-xs font-semibold opacity-60">Circulation amount</div>
          <div className="text-lg font-medium">{displayBalance(vtTotal, undefined, vt.decimals)}</div>
        </div>
      </div>
      <div className='flex px-2 pb-4'>
        <button className='btn-link ml-auto text-primary text-xs underline-offset-2 font-sec' onClick={onAddPToken}>
          Add to wallet
        </button>
      </div>
    </div>
    {vc.vtActive ? <SimpleTabs
      listClassName="p-0 gap-3 mb-4"
      triggerClassName={`text-base font-sec leading-none rounded-[10px] px-4 py-2 bg-bg text-fg/60 data-[state="active"]:bg-[#191F1B] data-[state="active"]:text-primary`}
      data={[
        { tab: 'Swap', content: <SwapVTYT vc={vc} type='vt' /> },
        { tab: 'Add Liquidity', content: <LPAdd vc={vc} type='vt' /> },
        { tab: 'Remove Liquidity', content: <LPRemove vc={vc} type='vt' /> },
      ]}
    /> : <div className='w-full py-[150px] text-center text-base font-semibold'>Swap Coming Soon</div>}
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
    <div className='animitem card p-0! overflow-hidden w-full'>
      <div className='flex p-5 bg-[#F0D187] gap-5'>
        <TokenIcon size={48} token={yt} />
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
    <div className="animitem card p-4!">
      <SimpleTabs
        listClassName="p-0 gap-6 mb-4"
        triggerClassName={`text-base leading-none`}
        data={[
          { tab: 'Swap', content: <SwapVTYT vc={vc} type='yt' /> },
          { tab: 'Add Liquidity', content: <LPAdd vc={vc} type='yt' /> },
          { tab: 'Remove Liquidity', content: <LPRemove vc={vc} type='yt' /> },
        ]}
      />
    </div>
  </div>
}

export function LNT_VT_YT({ vc, tab }: { vc: LntVaultConfig, tab?: string }) {
  const r = useRouter()
  const vd = useLntVault(vc)
  const vt = getTokenBy(vd.result!.VT, vc.chain, { symbol: 'VT' })!
  const vt2 = getTokenBy(vd.result!.VTbyDeposit, vc.deposit?.chain, { symbol: 'VT' })
  const data = [
    { tab: 'Vesting Token', content: <VT vc={vc} /> },
    ...(vc.ytEnable ? [{ tab: 'Yield Token', content: <YT vc={vc} /> }] : []),
    ...(vc.buyback ? [{ tab: 'Put Option', content: <LntVaultBuyback vc={vc} /> }] : []),
    ...(vt2 ? [{ tab: 'Bridge', content: <BridgeToken config={[vt2, vt]} /> }] : []),
  ]
  const currentTab = data.find(item => tabToSearchParams(item.tab) === tab)?.tab
  return <div className='animitem card'>
    <SimpleTabs
      currentTab={currentTab}
      onTabChange={(tab) => toLntVault(r, vc.vault, tab)}
      listClassName="p-0 gap-4 mb-4 w-full"
      triggerClassName={(i) => `text-lg leading-none data-[state="active"]:underline underline-offset-8`}
      data={data}
    />
  </div>
}



export function LNTTestHeader({ vc }: { vc: LntVaultConfig }) {
  const { address } = useAccount()
  if (vc.tit !== "0G AI Alignment Node" || !vc.isZeroG || !vc.test) return null
  const txs = async () => {
    return [{ abi: abiMockERC721, address: vc.asset, functionName: vc.test ? 'safeMint' : 'mint', args: [address] }]
  }
  return <div className='flex justify-end items-center gap-5 lg:gap-10 text-sm lg:text-base'>
    {vc.test && <Link href={"https://faucet.0g.ai/"} target='_blank' className='flex items-center gap-2 underline underline-offset-2'>
      <CoinIcon symbol='ZeroG' size={32} className='object-contain' />
      Faucet
    </Link>}
    <Txs tx='Mint Test Node' className='w-[180px]' txs={txs} disabled={!address} />
  </div>
}

export function LNTAethirHeader({ vc }: { vc: LntVaultConfig }) {
  if (!vc.isAethir) return null
  return <div className='flex justify-end items-center gap-5 lg:gap-10 text-sm lg:text-base'>
    <Link href={"https://youtu.be/mK2ZBujbuR4"} target='_blank' className='flex items-center gap-2 underline underline-offset-2'>
      <FaYoutube className='text-[1.5em] text-red-500' />
      Tutorial
    </Link>
    <Link href={"https://opensea.io/collection/aethir-checker-license"} target='_blank' className='flex items-center gap-2 underline underline-offset-2'>
      <CoinIcon symbol='Opensea' size="1.5em" className='object-contain' />
      Buy Node on Opensea
    </Link>
  </div>
}

