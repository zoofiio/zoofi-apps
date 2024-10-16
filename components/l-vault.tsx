'use client'

import { ApproveAndTx } from '@/components/approve-and-tx'
import { AssetInput } from '@/components/asset-input'
import { Tip } from '@/components/ui/tip'
import { LVaultAdvance } from '@/components/lvault-advance'
import { abiStableVault, abiVault, abiVaultQuery } from '@/config/abi'
import { isBerachain, SUPPORT_CHAINS } from '@/config/network'
import { NATIVE_TOKEN_ADDRESS, USB_ADDRESS, USBSymbol, VAULT_QUERY_ADDRESS, VaultConfig } from '@/config/swap'
import { DECIMAL } from '@/constants'
import { useCurrentChainId } from '@/hooks/useCurrentChainId'
import { useTokenApys } from '@/hooks/useTokenApys'
import { useWandContractRead } from '@/hooks/useWand'
import { bnMin, cn, fmtAAR, fmtPercent, getBigint, handleError, parseEthers } from '@/lib/utils'
import { FetcherContext } from '@/providers/fetcher'
import { useLVault, useUpLVaultOnUserAction, useVaultLeverageRatio } from '@/providers/useLVaultsData'
import { useBalances } from '@/providers/useTokenStore'
import { displayBalance } from '@/utils/display'
import { Button } from '@tremor/react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useContext, useMemo, useState } from 'react'
import { MdSettings } from 'react-icons/md'
import { useAccount, useWalletClient } from 'wagmi'
import ConnectBtn from './connet-btn'
import { CoinIcon } from './icons/coinicon'
import { PointCards } from './point-card'
import { SimpleDialog } from './simple-dialog'
import { SimpleTabs } from './simple-tabs'
import { StableLVaultAdvance } from './lvault-stable-advance'
import { renderChoseSide } from './vault-card-ui'
import { toLVault } from '@/app/routes'

const arrowDown = (
  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8' fill='none'>
    <path
      d='M6.50322 7.50486L6.99579 8L13.7977 1.19284C14.0674 0.91867 14.0674 0.478772 13.7977 0.20665C13.6669 0.0736573 13.489 0 13.3051 0C13.1191 0 12.9433 0.0736573 12.8125 0.204604L6.99783 6.02353L1.18926 0.204604C1.05845 0.0736573 0.880637 0 0.696692 0C0.510703 0 0.334934 0.0736573 0.204129 0.204604C-0.0677012 0.478772 -0.0677012 0.91867 0.202085 1.19284L6.47665 7.47622L6.50322 7.50486Z'
      fill='#6466F1'
    />
  </svg>
)

const arrowUp = (
  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8' fill='none'>
    <path
      d='M7.49678 0.495141L7.00421 0L0.202339 6.80716C-0.0674467 7.08133 -0.0674467 7.52123 0.202339 7.79335C0.333144 7.92634 0.510958 8 0.694902 8C0.880891 8 1.05666 7.92634 1.18747 7.7954L7.00217 1.97647L12.8107 7.7954C12.9415 7.92634 13.1194 8 13.3033 8C13.4893 8 13.6651 7.92634 13.7959 7.7954C14.0677 7.52123 14.0677 7.08133 13.7979 6.80716L7.52335 0.523785L7.49678 0.495141Z'
      fill='#6466F1'
    />
  </svg>
)

const greenPoint = (
  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'>
    <circle cx='7' cy='7' r='5' fill='white' stroke='#00DE9C' strokeWidth='4' />
  </svg>
)

const redPoint = (
  <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none'>
    <circle cx='7' cy='7' r='5' fill='white' stroke='#FF3D3D' strokeWidth='4' />
  </svg>
)

const cycle = (
  <div className='mr-[10px]'>
    <svg xmlns='http://www.w3.org/2000/svg' width='5' height='5' viewBox='0 0 5 5' fill='none'>
      <circle cx='2.5' cy='2.5' r='2.5' fill='#64748B' />
    </svg>
  </div>
)

export function VaultSimple({ vc }: { vc: VaultConfig }) {
  const { prices } = useContext(FetcherContext)
  const balances = useBalances()
  const assetPrice = getBigint(prices, vc.assetTokenAddress)
  const vs = useLVault(vc.vault)
  const modeNumber = vs.vaultMode
  const asset = vc.assetTokenSymbol
  const [amount, setAmount] = useState('')
  const amountBn = parseEthers(amount)
  const x = vc.xTokenSymbol
  const balance = balances[vc.assetTokenAddress]
  // withdraw
  const [assetAmount, setAssetAmount] = useState('')
  const chainId = useCurrentChainId()
  const { data: dataOneAssetOut } = useWandContractRead({
    abi: abiVaultQuery,
    address: VAULT_QUERY_ADDRESS[chainId],
    functionName: vc.isStable ? 'calcMintPairsFromStableVault' : 'calcMintPairs',
    args: [vc.vault, parseEthers('1')],
  })
  const { data: firstMintXOut } = useWandContractRead({
    abi: abiVaultQuery,
    address: VAULT_QUERY_ADDRESS[chainId],
    functionName: 'calcMintMarginTokensFromStableVault',
    args: [vc.vault, parseEthers('1')],
    query: { enabled: vc.isStable },
  })

  const oneAssetUsbOut = vc.isStable && vs.isStable && vs.M_USDCx == 0n ? 0n : getBigint(dataOneAssetOut, [1])
  const oneAssetXOut = vc.isStable && vs.isStable && vs.M_USDCx == 0n ? getBigint(firstMintXOut, [1]) : getBigint(dataOneAssetOut, [2])
  const usbBalance = balances[USB_ADDRESS[chainId]]
  const xBalance = balances[vc.xTokenAddress]
  const maxPairAssetOut = bnMin([oneAssetXOut > 0n ? (xBalance * DECIMAL) / oneAssetXOut : 0n, oneAssetUsbOut > 0n ? (usbBalance * DECIMAL) / oneAssetUsbOut : 0n])
  const assetAmountBn = parseEthers(assetAmount)
  const redeemPrepareConfig = useMemo(() => {
    const base: Parameters<typeof ApproveAndTx>[0]['config'] = {
      abi: vc.isStable ? abiStableVault : abiVault,
      address: vc.vault,
      functionName: 'redeemByPairsWithExpectedMarginTokenAmount',
      args: [(assetAmountBn * oneAssetXOut) / DECIMAL],
    }
    // console.info('redeem:', base)
    return base
  }, [modeNumber, assetAmountBn, oneAssetXOut, vc])
  const upForUserAction = useUpLVaultOnUserAction(vc)
  return (
    <div className='w-full relative flex items-center justify-between'>
      <SimpleDialog
        trigger={
          <div className='absolute w-fit h-[21px] right-2 top-3 flex items-center gap-1 cursor-pointer'>
            <MdSettings className='text-primary text-xl' />
            <Tip inFlex className=' text-slate-500'>
              {vc.isStable
                ? `The advanced panel allows for the individual Minting or Redeeming of ${USBSymbol} and ${vc.xTokenSymbol}.`
                : 'More flexible operations can be conducted using the advanced panel in adjustment mode.'}
            </Tip>
          </div>
        }
      >
        {vc.isStable ? <StableLVaultAdvance vc={vc} /> : <LVaultAdvance vc={vc} />}
      </SimpleDialog>
      <SimpleTabs
        data={[
          {
            tab: 'Deposit',
            content: (
              <div className='mt-4'>
                <AssetInput asset={asset} exchange={displayBalance((assetPrice * amountBn) / DECIMAL)} balance={balance} amount={amount} setAmount={setAmount} />
                <div className='text-xs text-[#64748B] dark:text-slate-50/60 leading-[12px] flex items-center pl-[5px] mt-[6px]'>
                  1 <CoinIcon className='mx-1' symbol={asset} size={12} />
                  {asset} = {displayBalance(oneAssetXOut)} <CoinIcon className='mx-1' symbol={x} size={12} /> {x} +{displayBalance(oneAssetUsbOut)}{' '}
                  <CoinIcon className='mx-1' symbol={USBSymbol} size={12} /> {USBSymbol}
                </div>
                <ApproveAndTx
                  tx='Deposit'
                  className={cn(vc.isStable ? '' : 'md:mt-11', 'mx-auto mt-6')}
                  disabled={vc.disableIn || amountBn <= 0n || amountBn > balance}
                  onTxSuccess={() => {
                    setAmount('')
                    upForUserAction()
                  }}
                  config={{
                    abi: abiStableVault,
                    address: vc.vault,
                    args: [amountBn],
                    value: vc.assetTokenAddress == NATIVE_TOKEN_ADDRESS ? amountBn : 0n,
                    functionName: vc.isStable && vs.isStable && vs.M_USDCx == 0n ? 'mintMarginTokens' : 'mintPairs',
                  }}
                  approves={{ [vc.assetTokenAddress]: amountBn }}
                  spender={vc.vault}
                />
              </div>
            ),
          },
          {
            tab: 'Withdraw',
            content: (
              <div className='mt-4'>
                <div className='flex flex-col gap-2'>
                  <AssetInput
                    amount={assetAmount}
                    setAmount={setAssetAmount}
                    balance={maxPairAssetOut}
                    balanceTit='Redeemable amount'
                    asset={asset}
                    exchange={displayBalance((assetPrice * assetAmountBn) / DECIMAL)}
                  />
                </div>
                <div className='text-xs text-[#64748B] dark:text-slate-50/60 leading-[12px] md:flex md:items-center md:justify-between pl-[5px] mt-[6px]'>
                  <span className='flex'>
                    {x} Balance：
                    <CoinIcon className='mx-1' symbol={x} size={12} /> {displayBalance(xBalance)}
                  </span>
                  <span className={cn('flex relative')}>
                    {USBSymbol} Balance: <CoinIcon className='mx-1' symbol={USBSymbol} size={12} /> {displayBalance(usbBalance)}
                  </span>
                </div>
                {!vc.isStable && (
                  <div className='mt-2 text-center text-xs text-slate-500 dark:text-slate-50/70 relative md:text-right '>
                    Maintaining {USBSymbol} balance greater than your Margin
                    <br className='hidden md:block' />
                    Loan allows you to redeem your total Open Position
                  </div>
                )}
                <ApproveAndTx
                  tx='Withdraw'
                  className={cn({ 'md:mt-1': !vc.isStable }, 'mx-auto mt-6')}
                  config={redeemPrepareConfig}
                  disabled={oneAssetUsbOut == 0n || oneAssetXOut == 0n || assetAmountBn <= 0n || assetAmountBn > maxPairAssetOut}
                  onTxSuccess={() => {
                    console.info('Redeem onSuccess:')
                    setAssetAmount('')
                    upForUserAction()
                  }}
                  spender={vc.vault}
                />
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}

const ExpandUI = ({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) => {
  return (
    <div className='flex md:hidden justify-center  items-center py-5'>
      <div className='px-2 py-1 rounded-full border border-solid border-[#6466F1] flex items-center text-xs text-[#6466F1] cursor-pointer ' onClick={onClick}>
        <span className='mr-[5px]'>{isOpen ? 'Hide' : 'Details'}</span>
        {isOpen ? arrowUp : arrowDown}
      </div>
    </div>
  )
}

export function LVaultSimpleWrap({ vc }: { vc: VaultConfig }) {
  const chainId = useCurrentChainId()

  const leverage = useVaultLeverageRatio(vc)
  const { address } = useAccount()
  const vs = useLVault(vc.vault)
  const totalBn = vs.isStable ? vs.M_USDC : vs.M_ETH
  const xTotalBn = vs.isStable ? vs.M_USDCx : vs.M_ETHx
  const mUsbBn = vs.isStable ? vs.M_USB_USDC : vs.M_USB_ETH
  const balances = useBalances()
  const myOpenPosition = xTotalBn > 0n ? (balances[vc.xTokenAddress] * totalBn) / xTotalBn : 0n
  const myMarginLoan = xTotalBn > 0n ? -(balances[vc.xTokenAddress] * mUsbBn) / xTotalBn : 0n

  const { data: walletClient } = useWalletClient()
  const onAddXtoken = () => {
    vc &&
      walletClient
        ?.watchAsset({
          type: 'ERC20',
          options: {
            address: vc.xTokenAddress,
            symbol: vc.xTokenSymbol,
            decimals: 18,
          },
        })
        .catch(handleError)
  }
  const onAddUSB = () => {
    walletClient
      ?.watchAsset({
        type: 'ERC20',
        options: {
          address: USB_ADDRESS[chainId],
          symbol: USBSymbol,
          decimals: 18,
        },
      })
      .catch(handleError)
  }
  const onViewVault = () => {
    const chain = SUPPORT_CHAINS.find((item) => item.id == chainId)
    if (!chain || !vc) return
    open(`${chain.blockExplorers?.default?.url}/address/${vc.vault}`, '_blank')
  }

  return (
    <>
      <PointCards vc={vc} />
      <div className='w-full flex flex-col md:flex-row gap-5'>
        <div className='min-h-[108px] flex flex-col justify-center shrink-0'>
          {address && !vc.isStable && (
            <div className='card h-[84px] w-full p-[20px] shrink-0 text-[#64748B] dark:text-slate-50/60 text-xs font-medium leading-[12px] rounded-2xl mb-5 whitespace-nowrap'>
              <div className='flex items-center justify-between mb-[16px] gap-5'>
                <div>Open Position</div>
                <div className='flex items-center'>
                  <CoinIcon className='mr-1' symbol={vc.assetTokenSymbol} size={12} />
                  {displayBalance(myOpenPosition)}
                </div>
              </div>
              <div className='flex items-center justify-between mb-[16px] gap-5'>
                <div>
                  Margin Loan
                  <Tip>Repay your margin loan to redeem {vc.assetTokenSymbol} corresponding to your open position.</Tip>
                </div>
                <div className='flex items-center'>
                  <CoinIcon className='mr-1' symbol={USBSymbol} size={12} />
                  {displayBalance(myMarginLoan)}
                </div>
              </div>
            </div>
          )}
          <div className='card text-[#64748B] w-full flex-1 dark:text-slate-50/60 text-xs font-medium leading-[12px] px-[30px] py-[23px] rounded-2xl'>
            <div className='flex items-center mb-[16px] whitespace-nowrap'>
              {cycle}
              {leverage.toFixed(2)}x {isBerachain() && vc.isStable ? 'Blast Native Yield' : `Leveraged long on ${vc.assetTokenSymbol}`}
            </div>
            <div className='flex items-center mb-[16px] cursor-pointer whitespace-nowrap' onClick={onAddXtoken}>
              {cycle}Add {vc.xTokenSymbol} to wallet
            </div>
            <div className='flex items-center mb-[16px] cursor-pointer whitespace-nowrap' onClick={onAddUSB}>
              {cycle}Add {USBSymbol} to wallet
            </div>
            <div className='flex items-center cursor-pointer whitespace-nowrap' onClick={onViewVault}>
              {cycle}View contract
            </div>
          </div>
        </div>

        <div className='card w-full'>
          {address && vc && vc.vault.length == 42 ? <VaultSimple vc={vc} /> : vc && vc.vault.length == 42 ? <ConnectBtn /> : <Button className='rounded'>Comming soon</Button>}
        </div>
      </div>
    </>
  )
}

export function LVaultCard({ vc }: { vc: VaultConfig }) {
  const r = useRouter()
  const chainId = useCurrentChainId()

  const lvd = useLVault(vc.vault)
  const leverage = useVaultLeverageRatio(vc)
  const assetPrice = lvd.latestPrice
  const totalBn = lvd.isStable ? lvd.M_USDC : lvd.M_ETH
  const xTotalBn = lvd.isStable ? lvd.M_USDCx : lvd.M_ETHx
  const mUsbBn = lvd.isStable ? lvd.M_USB_USDC : lvd.M_USB_ETH

  const total = displayBalance(totalBn)
  const xTotal = displayBalance(xTotalBn)
  const tapys = useTokenApys()

  const totalDep = displayBalance((totalBn * assetPrice) / DECIMAL)
  const usbDebt = displayBalance(mUsbBn)
  const aar = fmtAAR(lvd.aar, lvd.AARDecimals)
  const modeNumber = lvd.vaultMode

  // console.log(vaultConfig)
  const x = vc.xTokenSymbol

  const itemClassname = 'py-5 flex flex-col items-center gap-2 relative dark:border-border border-solid'
  return (
    <div
      className={cn('card cursor-pointer !p-0 grid grid-cols-2 overflow-hidden', {
        'order-1': !vc.assetTokenSymbol.includes('ETH'),
      })}
      onClick={() => toLVault(r, vc.vault)}
    >
      <div className={cn(itemClassname, 'border-b', 'bg-black/10 dark:bg-white/10 col-span-2 flex-row px-4 md:px-5 py-4 items-center')}>
        <CoinIcon symbol={vc.assetTokenSymbol} size={44} />
        <div>
          <div className=' text-lg font-semibold whitespace-nowrap'>{vc.assetTokenSymbol}</div>
          <div className=' text-sm font-medium'>${displayBalance(assetPrice)}</div>
        </div>
        <div className='ml-auto'>
          <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-semibold whitespace-nowrap'>{'Total Deposit'}</div>
          <div className='text-sm font-medium'>{total}</div>
        </div>
      </div>
      <div className={cn(itemClassname, 'border-b border-r')}>
        <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-semibold leading-[12px] whitespace-nowrap'>Status</div>
        <div className='flex items-center'>
          <span className=' text-[14px] leading-[14px] font-medium'>
            <div className='flex items-center'>
              <div className='mr-[10px]'>{modeNumber <= 1 ? greenPoint : redPoint}</div>
              {modeNumber <= 1 ? 'Stability' : 'Adjustment'}
            </div>
          </span>
        </div>
      </div>
      <div className={cn(itemClassname, 'border-b')}>
        <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-semibold leading-[12px] whitespace-nowrap'>
          {x}
          <Tip>This is a margin token, representing open position in the vault.</Tip>
        </div>
        <div className='flex items-center'>
          <span className=' text-[14px] leading-[14px] font-medium ml-[5px]'>{xTotal}</span>
        </div>
      </div>
      <div className={cn(itemClassname, 'border-b border-r')}>
        <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-semibold leading-[12px] whitespace-nowrap'>
          AAR
          <Tip>Asset Adequacy Ratio</Tip>
        </div>
        <div className='flex items-center'>
          <span className=' text-[14px] leading-[14px] font-medium'>{aar}</span>
        </div>
      </div>
      <div className={cn(itemClassname, 'border-b')}>
        <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-semibold leading-[12px] whitespace-nowrap'>
          {USBSymbol} Debt<Tip>Interest Bearing Stablecoin</Tip>
        </div>
        <div className='flex items-center'>
          <CoinIcon className='mx-1' symbol={USBSymbol} size={14} />
          <span className=' text-[14px] leading-[14px] font-medium ml-[5px]'>{usbDebt}</span>
        </div>
      </div>
      {renderChoseSide('Bera', 'Interest Bear', fmtPercent(tapys[USB_ADDRESS[chainId]], 10), 'Bull', 'Leverage Bull', `${leverage.toFixed(2)}x`)}
    </div>
  )
}

export function LVaultComming({ symbol }: { symbol: string }) {
  const itemClassname = 'py-5 flex flex-col items-center gap-2 relative dark:border-border border-solid even:border-l even:border-b odd:border-b last:!border-b-0 h-[5.3125rem]'
  return (
    <div className={cn('card cursor-pointer !p-0 grid grid-cols-2 overflow-hidden order-5', {})}>
      <div className={cn(itemClassname, 'bg-black/10 dark:bg-white/10')}>
        {/* <CoinIcon symbol={vc.assetTokenSymbol} size={32} /> */}
        <div className=' text-sm font-semibold whitespace-nowrap'>{symbol}</div>
        <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-medium'>-</div>
        {/* <PointsIcons icons={['blast', 'gold', 'wand']} className='ml-auto md:absolute top-10 left-0' /> */}
      </div>
      <div className={cn(itemClassname, 'bg-black/10 dark:bg-white/10')}>
        <div className='text-[#64748B] dark:text-slate-50/60 text-xs font-semibold leading-[12px] whitespace-nowrap'>Total Deposit</div>
        <div className='flex items-center'>
          <span className=' text-[14px] leading-[14px] font-medium ml-[5px]'>-</span>
        </div>
      </div>

      <div className={cn(itemClassname, 'col-span-2')}>
        <div className='text-xs font-semibold leading-[12px] whitespace-nowrap'>New Vault Comming Soon...</div>
      </div>
    </div>
  )
}

export function GroupVaultCollapse({ vcs }: { vcs: VaultConfig[] }) {
  const [vc, setVC] = useState(vcs[vcs.length - 1])
  if (!vc) return null
  if (vcs.length == 1) return <LVaultCard vc={vcs[0]} />
  return (
    <div className={cn('relative')}>
      <LVaultCard vc={vc} />
      <div className='absolute z-10 right-[50px] top-0 flex text-sm'>
        {vcs.map((item, index) => (
          <div
            key={'gvc_' + index}
            className={clsx('cursor-pointer rounded-b-full border border-blue-500 px-1 py-1', {
              'bg-white ': vc !== item,
              'bg-blue-500 text-white': vc === item,
            })}
            onClick={() => setVC(item)}
          >{`V${index + 1}`}</div>
        ))}
      </div>
    </div>
  )
}
