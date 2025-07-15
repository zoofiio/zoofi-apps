import { toLntVault } from '@/app/routes'
import { abiMockERC721 } from '@/config/abi'
import { abiLntVault, abiLntVTSwapHook, abiQueryLNT } from '@/config/abi/abiLNTVault'
import { codeQueryLNT } from '@/config/codes'
import { LntVaultConfig } from '@/config/lntvaults'
import { isTestnet, zeroGTestnet } from '@/config/network'
import { getTokenBy } from '@/config/tokens'
import { encodeModifyLP, encodeSingleSwap } from '@/config/uni'
import { DECIMAL } from '@/constants'
import { useCalcKey } from '@/hooks/useCalcKey'
import { useCurrentChain, useCurrentChainId } from '@/hooks/useCurrentChainId'
import { useLntVault, useLntVaultOperators } from '@/hooks/useFetLntVault'
import { useBalance, useErc721Balance, useTotalSupply } from '@/hooks/useToken'
import { reFet } from '@/lib/useFet'
import { cn, fmtBn, fmtDuration, fmtPercent, formatPercent, genDeadline, handleError, parseEthers, shortStr, sqrt, uniSortTokens } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { displayBalance } from '@/utils/display'
import { useQuery } from '@tanstack/react-query'
import _, { floor, min, now, toNumber } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import { useSetState, useToggle } from 'react-use'
import { erc721Abi, isAddressEqual, SimulateContractParameters, toHex } from 'viem'
import { useAccount, useWalletClient } from 'wagmi'
import { Txs, withTokenApprove } from './approve-and-tx'
import { AssetInput } from './asset-input'
import { Fees } from './fees'
import { CoinIcon } from './icons/coinicon'
import { Badge } from './noti'
import { SimpleDialog } from './simple-dialog'
import STable from './simple-table'
import { SimpleTabs } from './simple-tabs'
import { BBtn, Swap } from './ui/bbtn'
import { NumInput } from './ui/num-input'

function LntVaultDeposit({ vc, onSuccess }: { vc: LntVaultConfig, onSuccess: () => void }) {
  const chainId = useCurrentChainId()
  const vd = useLntVault(vc)
  const [selectedNft, setSelectNft] = useSetState<{ [tokenId: string]: boolean }>({})
  const tokenIds = _.keys(selectedNft).filter(item => selectedNft[item]).map(item => BigInt(item))
  const nfts = useErc721Balance(vd.result!.NFT, chainId == zeroGTestnet.id ? 'zoofi' : 'alchemy')
  const vt = getTokenBy(vd.result!.VT, chainId, { symbol: 'VT' })!
  const yt = getTokenBy(vd.result!.YT, chainId, { symbol: 'YT' })!

  const { data: outAmountVT } = useQuery({
    queryKey: useCalcKey(['calcLntDeposit', chainId, tokenIds]),
    initialData: 0n,
    queryFn: async () => {
      if (tokenIds.length == 0) return 0n
      return getPC(chainId).readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'calcDeposit', args: [vc.vault, tokenIds, tokenIds.map(() => 1n)] })
    }
  })
  return <div className='flex flex-col gap-5 items-center p-5'>
    <div className='w-full text-start'>Licenses ID <span className='text-xs ml-5 opacity-70'>Wait about 5 minutes after MINT to retrieve the list.</span></div>
    <div className='w-[32rem] h-72 overflow-y-auto'>
      <div className='w-full gap-2 grid grid-cols-4 '>
        {nfts.result.map(id => (
          <div key={id.toString()}
            className={cn('flex gap-1 items-center cursor-pointer', { 'text-primary': selectedNft[id.toString()] })}
            onClick={() => setSelectNft({ [id.toString()]: !selectedNft[id.toString()] })}
          >
            <div className={cn('w-3 h-3 border border-black/20 bg-[#EBEBEB] rounded-full', { 'bg-primary': selectedNft[id.toString()] })} />
            #{id.toString()}
          </div>))}
      </div>
    </div>
    <div className='flex flex-col gap-1 w-full'>
      <div className='w-full'>Receive</div>
      <AssetInput asset={vt.symbol} loading={false} disable amount={fmtBn(outAmountVT, vt.decimals)} />
      {vc.ytEnable && <>
        <div className='w-full text-center'>And</div>
        <AssetInput asset={yt.symbol} loading={false} disable amount={fmtBn(DECIMAL * BigInt(tokenIds.length), yt.decimals)} />
      </>}
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
        ...tokenIds.map(id => ({ abi: erc721Abi, address: vc.asset, functionName: 'approve', args: [vc.vault, id] })),
        {
          abi: abiLntVault,
          address: vc.vault,
          functionName: 'batchDeposit',
          enabled: tokenIds.length > 0,
          args: [tokenIds, tokenIds.map(() => 1n)]
        }
      ]} />
  </div>
}
function LntVaultWithdraw({ vc, onSuccess }: { vc: LntVaultConfig, onSuccess: () => void }) {
  const chainId = useCurrentChainId()
  const vd = useLntVault(vc)
  const vt = getTokenBy(vd.result!.VT, chainId, { symbol: 'VT' })!
  const yt = getTokenBy(vd.result!.YT, chainId, { symbol: 'YT' })!
  const ytBalance = useBalance(vc.ytEnable ? yt : undefined)
  const vtBalance = useBalance(vt)
  const maxByYT = floor(toNumber(fmtBn(ytBalance.result, yt.decimals)))
  const avt = vd.result?.aVT ?? 0n
  const maxByVT = toNumber((avt > 0n ? vtBalance.result / avt : 1n).toString())
  const maxByActive = toNumber((vd.result?.activeDepositCount ?? 0n).toString())
  const [count, setCount] = useState(1)
  const max = vc.ytEnable ? min([maxByYT, maxByVT, maxByActive])! : min([maxByVT, maxByActive])!
  const { data: outAmountVT, isFetching: isFetchingOut } = useQuery({
    queryKey: useCalcKey(['calcLntWithdraw', chainId, count, vd.result?.activeDepositCount]),
    initialData: 0n,
    queryFn: async () => {
      if (count <= 0 || BigInt(count) > (vd.result?.activeDepositCount ?? 0n)) return 0n;
      return getPC(chainId).readContract({ abi: abiQueryLNT, code: codeQueryLNT, functionName: 'calcRedeem', args: [vc.vault, BigInt(count)] })
    }
  })
  return <div className='flex flex-col gap-5 items-center p-5'>
    <div className='flex flex-col gap-1 w-full'>
      <div className=' w-full'>Input:</div>
      {vc.ytEnable && <>
        <AssetInput asset={yt.symbol} loading={isFetchingOut && count > 0} disable amount={count.toString()} balance={ytBalance.result} />
        <div className='w-full'>Pair With</div>
      </>}
      <AssetInput asset={vt.symbol} loading={isFetchingOut && count > 0} disable amount={fmtBn(outAmountVT, vt.decimals)} balance={vtBalance.result} />
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
      disabled={count <= 0 || max <= 0 || count > max || outAmountVT < 0n || outAmountVT > vtBalance.result || isFetchingOut}
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
  const itemClassname = "flex flex-col gap-1 font-medium text-sm"
  const itemTitClassname = "opacity-60 text-xs font-semibold"
  const chainId = useCurrentChainId()
  const vtTotalSupply = useTotalSupply(getTokenBy(vd.result?.VT, chainId, { symbol: 'VT' }))
  const yt = getTokenBy(vd.result?.YT, chainId, { symbol: 'YT' })
  const ytTotalSupply = useTotalSupply(vc.ytEnable ? yt : undefined)
  const remain = fmtDuration((vd.result?.expiryTime ?? 0n) * 1000n - BigInt(now()))
  const chain = useCurrentChain()
  return (
    <div className={cn('animitem card overflow-hidden flex p-6 items-center justify-between cursor-pointer', {})} onClick={() => toLntVault(r, vc.vault)}>
      <div className='flex items-center gap-5'>
        <CoinIcon symbol={vc.icon} size={120} className='object-contain' style={{ height: 60 }} />
        {chain.testnet && <Badge text='Testnet' />}
      </div>
      <div className={itemClassname}>
        <div className={itemTitClassname}>Total Delegated</div>
        <div>{displayBalance(vd.result?.activeDepositCount ?? 0n, 0, 0)}</div>
      </div>
      <div className={itemClassname}>
        <div className={itemTitClassname}>VT Supply</div>
        <div>{displayBalance(vtTotalSupply.result)}</div>
      </div>
      {vc.ytEnable && <div className={itemClassname}>
        <div className={itemTitClassname}>YT Supply</div>
        <div>{displayBalance(ytTotalSupply.result)}</div>
      </div>}
      <div className={itemClassname}>
        <div className={itemTitClassname}>VT Buyback</div>
        <div className="flex w-36 items-center ">
          <div className="flex w-full h-4 bg-gray-200 rounded-full ">
            <div
              className="h-full rounded-full"
              style={{ width: `${40}%`, background: 'linear-gradient(90deg, #C2B7FD 0%, #6466F1 100%)' }}
            />
          </div>
          <div className="text-sm  text-right opacity-60 ml-[10px]">{40}%</div>
        </div>
      </div>
      <div className={itemClassname}>
        <div className={itemTitClassname}>State</div>
        <div>{!vd ? '-' : vd.result?.closed ? 'Closed' : `Active ${remain}`}</div>
      </div>
    </div>
  )
}

export function LNTDepositWithdraw({ vc }: { vc: LntVaultConfig }) {
  const depositRef = useRef<HTMLButtonElement>(null)
  const withdrawRef = useRef<HTMLButtonElement>(null)
  const vd = useLntVault(vc)
  return <div className=' flex flex-col h-full justify-between shrink-0 gap-10'>
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
    </div>

  </div>
}

export function LNTInfo({ vc }: { vc: LntVaultConfig }) {
  const vd = useLntVault(vc)
  const remain = fmtDuration((vd.result?.expiryTime ?? 0n) * 1000n - BigInt(now()))
  return <div style={{
    backdropFilter: 'blur(20px)'
  }} className="animitem card bg-white flex gap-5 h-full col-span-2" >
    <div className='flex flex-col'>
      <div className="flex gap-5">
        {/* <NodeLicenseImage icon={nlImages[data.name] ? <img {...nlImages[data.name]} className="invert" /> : null} /> */}
        <CoinIcon symbol={vc.icon} size={161} className='object-contain' />
        <div className="flex flex-col whitespace-nowrap gap-5 h-full text-sm font-medium">
          <div className="text-base font-semibold">{vc.tit}</div>
          <div className="opacity-60 text-sm font-medium leading-normal whitespace-pre-wrap">{vc.info}</div>
        </div>
      </div >
      <div className='my-4 flex justify-between opacity-60'>Duration <span>{`~ ${remain} remaining`}</span></div>
      <div className="flex w-full h-4 bg-gray-200 rounded-full ">
        <div
          className="h-full rounded-full"
          style={{ width: `${40}%`, background: 'linear-gradient(90deg, #C2B7FD 0%, #6466F1 100%)' }}
        />
      </div>
    </div>
    <LNTDepositWithdraw vc={vc} />
  </div>
}




function SwapVTYT({ vc, type }: { vc: LntVaultConfig, type: 'vt' | 'yt' }) {
  const chainId = useCurrentChainId()
  const vd = useLntVault(vc)
  const [inputAsset, setInputAsset] = useState('')
  const inputAssetBn = parseEthers(inputAsset)
  const [isToggled, toggle] = useToggle(false)
  const t = getTokenBy(vd.result!.T, chainId, { symbol: 'T' })!
  const vt = getTokenBy(vd.result!.VT, chainId, { symbol: 'VT' })!
  const yt = getTokenBy(vd.result!.YT, chainId, { symbol: 'YT' })!
  const swapTo = type == 'vt' ? vt : yt;
  const input = isToggled ? swapTo : t;
  const output = isToggled ? t : swapTo;
  const inputBalance = useBalance(input);
  const outputBalance = useBalance(output);
  const [token0, token1] = useMemo(() => uniSortTokens([vd.result!.T, vd.result!.VT]), [vd.result])
  const zeroForOne = isAddressEqual(input.address, token0)
  const { data: outAmount, isFetching: isFetchingCalc } = useQuery({
    queryKey: useCalcKey([`calcKey:swapVTYT:${type}`, inputAsset, zeroForOne, chainId]),
    initialData: 0n,
    queryFn: async () => {
      if (type == 'yt') return 0n
      const pc = getPC(chainId)
      if (!vd.result || inputAssetBn <= 0n) return 0n
      console.info('vd:', vd.result)
      return pc.readContract({
        abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'quoteExactInputSingle',
        args: [{
          poolKey: {
            currency0: token0,
            currency1: token1,
            fee: vd.result.vtSwapPoolFee,
            tickSpacing: vd.result.vtSwapPoolTickSpacing,
            hooks: vd.result.vtSwapPoolHook
          },
          zeroForOne,
          exactAmount: inputAssetBn,
          hookData: '0x'
        }]
      }).then(([out]) => out).catch(() => 0n)
    }
  })
  const { data: feeRate } = useQuery({
    queryKey: ['calcFee', vc.vault, vt.address, type],
    initialData: 30n,
    queryFn: async () => 30n
  })

  const fees = inputAssetBn > 0n ? `${fmtBn(inputAssetBn * feeRate / 10000n, input.decimals)} ${input.symbol}` : ''
  const swapPrice = ''
  const errorInput = ''
  const priceimpcat = 0
  const apy = 1.2
  const apyto = apy
  // const outAmount = 0n
  const disableTx = type != 'vt' || inputAssetBn <= 0n || inputAssetBn > inputBalance.result || outAmount <= 0n
  return <div className='flex flex-col gap-1'>
    <AssetInput asset={input.symbol} balance={inputBalance.result} amount={inputAsset} setAmount={setInputAsset} />
    <Swap onClick={() => toggle()} />
    <AssetInput checkBalance={false} asset={output.symbol} balance={outputBalance.result} loading={isFetchingCalc} disable amount={fmtBn(outAmount, output.decimals)} />
    <div className="flex justify-between items-center text-xs font-medium">
      <div>Price: {swapPrice}</div>
      <div>Price Impact: {formatPercent(priceimpcat)}</div>
    </div>
    <div className="flex justify-between items-center text-xs font-medium opacity-60">
      <div>Implied APY Change: {formatPercent(apy)} → {formatPercent(apyto)}</div>
      <Fees fees={fees} />
    </div>
    <Txs
      className='mx-auto mt-4'
      tx='Swap'
      disabled={disableTx}
      txs={() => encodeSingleSwap({
        chainId, token0, token1, fee: vd.result!.vtSwapPoolFee, tickSpacing: vd.result!.vtSwapPoolTickSpacing, hooks: vd.result!.vtSwapPoolHook, amountIn: inputAssetBn,
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
    _.debounce((isToken0: boolean, amount: bigint) => {
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
        const [liq0, liq1] = await Promise.all([
          pc.readContract({ abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'reserve0' }),
          pc.readContract({ abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'reserve1' }),
        ])
        console.info('liq0,liq1:', fmtBn(liq0), fmtBn(liq1))
        if (liq0 == 0n || liq1 == 0n) {
          data = [inputAmount, inputAmount, inputAmount]
        } else if (inputIsToken0) {
          data = [sqrt(inputAmount * inputAmount * liq1 / liq0), inputAmount, inputAmount * liq1 / liq0]
        } else {
          data = [sqrt(inputAmount * inputAmount * liq0 / liq1), inputAmount * liq0 / liq1, inputAmount]
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
      return encodeModifyLP({ chainId: vc.chain, lp: vd.result!.vtSwapPoolHook, token0, token1, liquidity, amount0Max, amount1Max, fee: vd.result!.vtSwapPoolFee, tickSpacing: vd.result!.vtSwapPoolTickSpacing, hooks: vd.result!.vtSwapPoolHook, })
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
      wrapSetCalcKey(token0IsInput1, parseEthers(value))
      setInput1Asset(value)
    }} error={errorInput1} />
    <AssetInput asset={input2.symbol} amount={input2Asset} balance={input2Balance.result} setAmount={(value: any) => {
      wrapSetCalcKey(!token0IsInput1, parseEthers(value))
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
  const chainId = useCurrentChainId()
  const vd = useLntVault(vc)
  const [inputAsset, setInputAsset] = useState('')
  const inputAssetBn = parseEthers(inputAsset)
  const t = getTokenBy(vd.result!.T, chainId, { symbol: 'T' })!
  const vt = getTokenBy(vd.result!.VT, chainId, { symbol: 'VT' })!
  const yt = getTokenBy(vd.result!.YT, chainId, { symbol: 'YT' })!
  const input = type == 'vt' ? getTokenBy(vd.result!.vtSwapPoolHook, chainId, { symbol: 'lpTVT' })! : getTokenBy(vc.lpTYT, chainId, { symbol: 'lpTYT' })!;
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
      const pc = getPC(chainId)
      if (type == 'yt') {
        return [0n, 0n]
        // return calcRemoveLP({ chainId, pc, token0, token1, token0Decimals: vt.decimals, token1Decimals: t.decimals, fee: vd.result!.vtSwapPoolFee, tickSpacing: vd.result!.vtSwapPoolTickSpacing, hooks: vd.result!.vtSwapPoolHook, inputAmount: inputAssetBn })
      }
      const [liq0, liq1] = await Promise.all([
        pc.readContract({ abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'reserve0' }),
        pc.readContract({ abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'reserve1' }),
      ])
      // const [vtLiq, tLiq] = await pc.readContract({ abi: abiLntVTSwapHook, address: vd.result!.vtSwapPoolHook, functionName: 'getVTAndTReserves' })
      if (liq0 == 0n || liq1 == 0n) return [0n, 0n]
      const liqXX2 = inputAssetBn * inputAssetBn
      if (output1IsToken0) {
        return [sqrt(liqXX2 * liq0 / liq1), sqrt(liqXX2 * liq1 / liq0)]
      } else {
        return [sqrt(liqXX2 * liq1 / liq0), sqrt(liqXX2 * liq0 / liq1)]
      }
    },
  })
  const swapPrice = ''
  const errorInput = ''
  const priceimpcat = 0
  const apy = 1.2
  const apyto = apy
  const disableTx = type != 'vt' || inputAssetBn <= 0n || inputAssetBn > inputBalance.result
  const txs = (): SimulateContractParameters[] => {
    if (type == 'yt') {
      return encodeModifyLP({ chainId, lp: vd.result!.vtSwapPoolHook, token0, token1, liquidity: -inputAssetBn, fee: vd.result!.vtSwapPoolFee, tickSpacing: vd.result!.vtSwapPoolTickSpacing, hooks: vd.result!.vtSwapPoolHook, })
    }
    // struct RemoveLiquidityParams {uint256 liquidity;uint256 amount0Min;uint256 amount1Min;uint256 deadline;int24 tickLower;int24 tickUpper;bytes32 userInputSalt;}
    return [
      // { abi: erc20Abi, address: vd.result!.vtSwapPoolHook, functionName: 'approve', args: [vd.result!.vtSwapPoolHook, inputAssetBn] },
      {
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
  const chainId = useCurrentChainId()
  const vd = useLntVault(vc)
  const vt = getTokenBy(vd.result!.VT, chainId, { symbol: 'VT' })!
  const { data: walletClient } = useWalletClient()
  const onAddPToken = () => {
    walletClient?.watchAsset({ type: 'ERC20', options: vt }).catch(handleError)
  }
  return <div className="flex flex-col gap-4 w-full">
    <div className='animitem card !p-0 overflow-hidden w-full'>
      <div className='flex p-5 bg-[#A3D395] gap-5'>
        <CoinIcon size={48} symbol={vt.symbol} />
        <div className='flex flex-col gap-3'>
          <div className='text-xl leading-6 text-black font-semibold'>{vt.symbol}</div>
          <div className='text-xs leading-none text-black/60 font-medium'>1 VT is equal to 1 T at maturity</div>
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
  const chainId = useCurrentChainId()
  const vd = useLntVault(vc)
  const yt = getTokenBy(vd.result!.YT, chainId, { symbol: 'YT' })!
  const onAddPToken = () => {
    walletClient?.watchAsset({ type: 'ERC20', options: yt }).catch(handleError)
  }
  return <div className="flex flex-col gap-4 w-full">
    <div className='animitem card !p-0 overflow-hidden w-full'>
      <div className='flex p-5 bg-[#F0D187] gap-5'>
        <CoinIcon size={48} symbol={yt.symbol} />
        <div className='flex flex-col gap-3'>
          <div className='text-xl leading-6 text-black font-semibold'>{yt.symbol}</div>
          <div className='text-xs leading-none text-black/60 font-medium'>1 YT is equal to1 T at maturity</div>
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
  // const chainId = useCurrentChainId()
  if (vc.tit !== "0G AI Alignment Node" && isTestnet(vc.chain)) return null
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