'use client'

import { LNT_VT_YT, LNTAethirHeader, LNTInfo, LNTVaultCard } from '@/components/lnt-vault'
import { LntVaultActivity } from '@/components/lnt-vault-activity'
import LntVaultChart from '@/components/lnt-vault-chart'
import { LntMyPositions } from '@/components/lnt-vault-positions'
import { Lnt0gHeader } from '@/components/lnt-vualt-0g'
import { PageWrap } from '@/components/page-wrap'
import { Spinner } from '@/components/spinner'
import { ConfigChainsProvider } from '@/components/support-chains'
import { BBtn2 } from '@/components/ui/bbtn'
import { LntVaultConfig, LNTVAULTS_CONFIG } from '@/config/lntvaults'
import { ENV } from '@/constants'
import { useLntVault } from '@/hooks/useFetLntVault'
import { isError, isLoading, isSuccess } from '@/lib/useFet'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import { useRouter, useSearchParams } from 'next/navigation'
import { FaAngleLeft } from 'react-icons/fa6'


function LntVaultPage({ vc, tab }: { vc: LntVaultConfig; tab?: string }) {
  const vd = useLntVault(vc)
  const r = useRouter()
  return (
    <div className='flex flex-col w-full gap-4'>
      {isError(vd) && 'Opps! Network Error!'}
      {isLoading(vd) && <Spinner className="mt-10 mx-auto text-black dark:text-white" />}
      {isSuccess(vd) && <>
        <div className='flex flex-wrap w-full justify-between gap-5 items-center'>
          <BBtn2 className='w-fit gap-0.5 text-xs whitespace-nowrap' onClick={() => r.push(vc.isLVT ? '/lvt' : '/lnt')}><FaAngleLeft /> {vc.isLVT ? 'LVT-Vault' : 'LNT-Vault'}</BBtn2>
          {vc.reppo && <BBtn2 className='w-fit gap-0.5 text-xs' onClick={() => r.push('/lnt/pre-deposit')}> {'Pre Deposit'}</BBtn2>}
          {vc.isAethir && <LNTAethirHeader vc={vc} />}
          {vc.isZeroG && <Lnt0gHeader vc={vc} />}
        </div>
        <LNTInfo vc={vc} />
        <div className='grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4'>
          <LntVaultChart vc={vc} />
          <LNT_VT_YT vc={vc} tab={tab} />
        </div>
        <LntMyPositions vc={vc} />
        {vc.isAethir && <LntVaultActivity vc={vc} />}
      </>}
    </div>
  )
}


export const lntDesc = `LNT (Liquid Node Token) Vault is a decentralized protocol designed to facilitate the issuance and management of node-based assets through Non-Fungible Tokens (NFTs) and derivative financial instruments.`
export const lvtDesc = `LVT (Liquid Vesting Token) Vault is a smart new way to make locked-up tokens in crypto projects tradeable right away, without breaking the rules or the project's long-term plans.`

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
    <PageWrap
      style={{ backgroundPositionX: 'center' }}
      className={cn({
        'bg-[url(/bg_lnt.svg)] bg-cover bg-no-repeat': !currentVc
      })}>
      <div
        className={cn('w-full px-4 relative')}>
        {!currentVc ? (
          <>
            <div className='page-title'>{type.toUpperCase()}-Vaults</div>
            <div className='font-sec mx-auto mt-4 text-center text-fg/60 flex flex-col gap-5 px-4 md:max-w-250 md:px-10 md:block'>
              {type == 'lnt' ? lntDesc : lvtDesc}
              <Link href={`https://docs.zoofi.io/${type}-vault/background`}
                target='_blank'
                className='text-fg underline underline-offset-2 ml-5'>{`Learn More>`}</Link>
            </div>
            <div className='flex flex-col gap-5 mt-4 md:mt-8'>
              {vcs.map((item, index) => (
                <ConfigChainsProvider key={`group_vault_item_${index}`} chains={item.chain}>
                  <LNTVaultCard vc={item} />
                </ConfigChainsProvider>
              ))}
            </div>
          </>
        ) : (
          <ConfigChainsProvider chains={currentVc.chain}>
            <LntVaultPage vc={currentVc} tab={paramsTab as string} />
          </ConfigChainsProvider>
        )}
      </div>
    </PageWrap>
  )
}
