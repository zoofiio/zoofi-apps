'use client'

import { LNT_VT_YT, LNTAethirHeader, LNTInfo, LNTTestHeader, LNTVaultCard } from '@/components/lnt-vault'
import { LntVaultActivity } from '@/components/lnt-vault-activity'
import LntVaultChart from '@/components/lnt-vault-chart'
import { LntMyPositions } from '@/components/lnt-vault-positions'
import { PageWrap } from '@/components/page-wrap'
import { Spinner } from '@/components/spinner'
import { ConfigChainsProvider } from '@/components/support-chains'
import { LntVaultConfig, LNTVAULTS_CONFIG } from '@/config/lntvaults'
import { ENV } from '@/constants'
import { useLntVault } from '@/hooks/useFetLntVault'
import { isError, isLoading, isSuccess } from '@/lib/useFet'
import Link from 'next/link'

import { useSearchParams } from 'next/navigation'
import { IoDocumentText } from 'react-icons/io5'


function LntVaultPage({ vc, tab }: { vc: LntVaultConfig; tab?: string }) {
  const vd = useLntVault(vc)
  return (
    <div className='flex flex-col w-full gap-5 pt-6'>
      {isError(vd) && 'Opps! Network Error!'}
      {isLoading(vd) && <Spinner className="mt-10 mx-auto text-black dark:text-white" />}
      {isSuccess(vd) && <>
        <LNTTestHeader vc={vc} />
        <LNTAethirHeader vc={vc} />
        <LNTInfo vc={vc} />
        <div className='grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4 xl:gap-5'>
          <LntVaultChart vc={vc} />
          <LNT_VT_YT vc={vc} tab={tab} />
        </div>
        <LntMyPositions vc={vc} />
        {vc.isAethir && <LntVaultActivity vc={vc} />}
      </>}
    </div>
  )
}

export default function Vaults({ type = 'lnt' }: { type?: 'lnt' | 'lvt' }) {
  const vcs = (LNTVAULTS_CONFIG).filter(item => {
    const byEnv = item.onEnv ? item.onEnv.includes(ENV) : true
    const byType = (item.isLVT ? 'lvt' : 'lnt') == type
    return byEnv && byType
  })
  const params = useSearchParams()
  const paramsVault = params.get('vault')
  const paramsTab = params.get('tab')
  const currentVc = vcs.find((item) => item.vault == paramsVault)
  return (
    <PageWrap>
      <div className='w-full max-w-[1160px] px-4 mx-auto md:pb-8 relative'>
        {!currentVc ? (
          <>
            <div className='page-title'>{type.toUpperCase()}-Vaults</div>
            {
              type == 'lnt' &&
              <div className='flex flex-col  md:flex-row justify-between text-sm font-sec gap-2 md:gap-10 pt-6 pb-4'>
                <div className=''>LNT (Liquid Node Token) Vault is a decentralized protocol designed to facilitate the issuance and management of node-based assets through Non-Fungible Tokens (NFTs) and derivative financial instruments.</div>
                <div className='flex  items-center gap-2.5 whitespace-nowrap'>
                  <IoDocumentText className='text-xl' />
                  <Link href={'https://docs.zoofi.io/lnt-vault/background'} target='_blank' className='underline underline-offset-2'>Learn More</Link>
                </div>
              </div>
            }
            {
              type == 'lvt' &&
              <div className='flex flex-col  md:flex-row justify-between text-sm font-sec gap-2 md:gap-10 pt-6 pb-4'>
                <div>{`LVT (Liquid Vesting Token) Vault is a smart new way to make locked-up tokens in crypto projects tradeable right away, without breaking the rules or the project's long-term plans.`}</div>
                <div className='flex  items-center gap-2.5 whitespace-nowrap'>
                  <IoDocumentText className='text-xl' />
                  <Link href={'https://docs.zoofi.io/lvt-vault/background'} target='_blank' className='underline underline-offset-2'>Learn More</Link>
                </div>
              </div>
            }
            {/* <Noti data='Deposit assets into the Vaults to pair-mint stablecoin and margin token' /> */}
            <div className='flex flex-col gap-5 mt-4'>
              {vcs.map((item, index) => (
                <ConfigChainsProvider key={`group_vault_item_${index}`} chains={[item.chain]}>
                  <LNTVaultCard vc={item} />
                </ConfigChainsProvider>
              ))}
            </div>
          </>
        ) : (
          <ConfigChainsProvider chains={[currentVc.chain]}>
            {/* <Demo className='absolute top-3 right-5 z-50' /> */}
            <LntVaultPage vc={currentVc} tab={paramsTab as string} />
          </ConfigChainsProvider>
        )}
      </div>
    </PageWrap>
  )
}
