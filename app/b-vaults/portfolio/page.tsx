/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { toBVault } from '@/app/routes'
import BeraLine from '@/components/icons/BeraLine'
import BullLine from '@/components/icons/BullLine'
import { CoinIcon } from '@/components/icons/coinicon'
import PandaLine from '@/components/icons/PandaLine'
import VenomLine from '@/components/icons/VenomLine'
import { PageWrap } from '@/components/page-wrap'
import STable, { TableProps } from '@/components/simple-table'
import { BvaultsByEnv } from '@/config/bvaults'
import { LP_TOKENS } from '@/config/lpTokens'
import { Token } from '@/config/tokens'
import { useBalance } from '@/hooks/useToken'
import { fmtDate } from '@/lib/utils'
import { useBVault, useBVaultApy, useBVaultEpoches, useUserBVaultEpoches } from '@/providers/useBVaultsData'
import { displayBalance } from '@/utils/display'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { MdArrowOutward } from 'react-icons/md'

function PortfolioItem({
  title,
  sub,
  tHeader,
  tData,
  tableProps,
}: {
  title: ReactNode
  sub?: ReactNode
  tHeader: ReactNode[]
  tData: ReactNode[][]
  tableProps?: Omit<TableProps, 'header' | 'data'>
}) {
  return (
    <div className='animitem card whitespace-nowrap'>
      {typeof title == 'string' ? <div className='text-2xl leading-none font-semibold'>{title}</div> : title}
      {typeof sub == 'string' ? <div className='text-[2rem] text-primary leading-none font-semibold mt-2'>{sub}</div> : sub}
      <div className='my-4 h-px bg-border/60 dark:bg-border'></div>
      <div className='w-full overflow-x-auto'>
        <STable headerClassName='border-b-0' tbodyClassName='text-sm font-medium' header={tHeader} data={tData} {...(tableProps || {})} />
      </div>
    </div>
  )
}

const IconMap = { BeraLine, BullLine, PandaLine, VenomLine } as const

function IconTitle(p: { icon: keyof typeof IconMap; tit: string }) {
  const Micon = IconMap[p.icon]
  return (
    <div className='flex text-2xl leading-none font-semibold items-center gap-4'>
      <Micon className='text-[2rem]' showbg={true} />
      <span>{p.tit}</span>
    </div>
  )
}

function CoinText(p: { symbol: string; txt?: string; size?: number }) {
  return (
    <div className='flex gap-2 items-center'>
      <CoinIcon className='shrink-0' symbol={p.symbol} size={p.size || 20} />
      <span>{p.txt || p.symbol}</span>
    </div>
  )
}

function PrincipalItem() {
  const r = useRouter()
  const bvcs = BvaultsByEnv
  const data: ReactNode[][] = []
  for (const vc of bvcs) {
    const bvd = useBVault(vc)
    const userepoches = useUserBVaultEpoches(vc)
    const pBalance = useBalance({ chain: vc.chain, address: vc.pToken } as Token).data
    const [fmtApy, ptApy] = useBVaultApy(vc)
    const yieldDay = (ptApy * pBalance) / 10n ** 10n / 365n

    const pRedeeming = (userepoches).reduce((sum, item) => sum + item.redeemingBalance, 0n)
    const pClaimAble = (userepoches).reduce((sum, item) => sum + item.claimableAssetBalance, 0n)
    const pTotalUser = pBalance + pRedeeming + pClaimAble
    const lp = LP_TOKENS[vc.asset]
    const [baseSymbol, quoteSymbol] = lp ? vc.assetSymbol.split('-') : ['', '']

    const totalLP = bvd?.lpLiq || 0n
    const totalLPBase = bvd?.lpBase || 0n
    const totalLPQuote = bvd?.lpQuote || 0n
    const uBase = lp && totalLP && totalLPBase && pTotalUser ? (pTotalUser * totalLPBase) / totalLP : 0n
    const uQuote = lp && totalLP && totalLPQuote && pTotalUser ? (pTotalUser * totalLPQuote) / totalLP : 0n
    const fmtTotalUser = displayBalance(pTotalUser)
    if (pTotalUser > 0n) {
      data.push([
        <CoinText key={'coin'} symbol={vc.assetSymbol} txt={vc.pTokenSymbol} size={32} />,
        displayBalance(pBalance),
        displayBalance(pRedeeming),
        <div key={'claim'} className='flex w-fit cursor-pointer items-center gap-2 underline' onClick={() => toBVault(r, vc.vault, 'principal_panda', 'claim')}>
          {displayBalance(pClaimAble)}
          <MdArrowOutward />
        </div>,
        <div key={'total'} className='flex items-center gap-2'>
          <div>{fmtTotalUser}</div>
          {lp && (
            <div>
              <CoinText size={14} symbol={baseSymbol} txt={displayBalance(uBase)} />
              <CoinText size={14} symbol={quoteSymbol} txt={displayBalance(uQuote)} />
            </div>
          )}
        </div>,
        fmtApy,
        displayBalance(yieldDay),
      ])
    }
  }
  return (
    <PortfolioItem
      title={<IconTitle tit='Principal Panda' icon='PandaLine' />}
      tHeader={['', 'Balance', 'In Redemption', 'Claimable', 'Total Amount', 'APY', 'Est.Yield/day']}
      tableProps={{ span: { 0: 1.5 }, cellClassName: (_index, celIndex) => (celIndex == 0 ? 'flex items-center py-3' : '') }}
      tData={data}
    />
  )
}
//

function BoostItem() {
  const r = useRouter()
  const bvcs = BvaultsByEnv
  const data: ReactNode[][] = []
  for (const vc of bvcs) {
    const epoches = useBVaultEpoches(vc)
    const userepoches = useUserBVaultEpoches(vc)
    const epochsData = userepoches
      .map((epoch) => ({
        ...epoch,
        epochInfo: epoches.find(e => e.epochId == epoch.epochId),
      }))
      .filter((item) => !!item.epochInfo && (item.userBalanceYToken > 0n || item.userBalanceYTokenSyntyetic > 0n))
    if (epochsData.length) {
      data.push([
        <CoinText key={'coin'} symbol={vc.assetSymbol} txt={vc.yTokenSymbol} size={32} />,
        <div key={'epochs'}>
          {epochsData.map((epoch) => (
            <div key={epoch.epochId.toString()} className='flex items-baseline'>
              <div className='w-16'>Epoch {epoch.epochId.toString()}</div>
              <div className='opacity-60 text-xs'>
                {fmtDate(epoch.epochInfo!.startTime * 1000n)} - {fmtDate((epoch.epochInfo!.startTime + epoch.epochInfo!.duration) * 1000n)}
              </div>
            </div>
          ))}
        </div>,
        <div key={'amount'}>
          {epochsData.map((epoch) => (
            <div key={epoch.epochId.toString()}>{displayBalance(epoch.userBalanceYToken)}</div>
          ))}
        </div>,
        <div key={'time weighted'}>
          {epochsData.map((epoch) => (
            <div key={epoch.epochId.toString()}>{displayBalance(epoch.userBalanceYTokenSyntyetic, undefined, 23)}</div>
          ))}
        </div>,
        <div key={'status'}>
          {epochsData.map((epoch) => (
            <div key={epoch.epochId.toString()}>
              {epoch.epochInfo?.settled ? (
                <div key={'claim'} className='flex w-fit cursor-pointer items-center gap-2 underline' onClick={() => toBVault(r, vc.vault, 'boost_venom')}>
                  {'Ready to Harvest'}
                  <MdArrowOutward />
                </div>
              ) : (
                'Ongoing'
              )}
            </div>
          ))}
        </div>,
      ])
    }
  }
  return (
    <PortfolioItem
      title={<IconTitle tit='Boost Venom' icon='VenomLine' />}
      tHeader={['', 'Epoch', 'YT Balance', 'YT Points', 'Status']}
      tData={data}
      tableProps={{ cellClassName: (_index, celIndex) => (celIndex == 0 ? 'flex flex-col' : 'leading-[30px]') }}
    />
  )
}
export default function Dashboard() {
  return (
    <PageWrap>
      <div className='w-full max-w-[1200px] px-4 mx-auto flex flex-col gap-5 md:pb-8'>
        <PrincipalItem />
        <BoostItem />
      </div>
    </PageWrap>
  )
}
