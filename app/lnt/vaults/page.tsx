'use client'

import { LNT_VT_YT, LNTInfo, LntOperators, LNTTestHeader, LNTVaultCard } from '@/components/lnt-vault'
import LntVaultChart from '@/components/lnt-vault-chart'
import { LntMyPositions } from '@/components/lnt-vault-positions'
import { PageWrap } from '@/components/page-wrap'
import { Spinner } from '@/components/spinner'
import { LntVaultConfig, LNTVAULTS_CONFIG } from '@/config/lntvaults'
import { ENV } from '@/constants'
import { useCurrentChainId } from '@/hooks/useCurrentChainId'
import { useLntVault } from '@/hooks/useFetLntVault'
import { isError, isLoading, isSuccess } from '@/lib/useFet'

import { Grid } from '@tremor/react'
import { useSearchParams } from 'next/navigation'


function LntVaultPage({ vc, tab }: { vc: LntVaultConfig; tab?: string }) {
  const vd = useLntVault(vc)
  return (
    <div className='flex flex-col w-full gap-5 pt-6'>
      {isError(vd) && 'Opps! Network Error!'}
      {isLoading(vd) && <Spinner className="mt-10 mx-auto text-black dark:text-white" />}
      {isSuccess(vd) && <>
        <LNTTestHeader vc={vc}/>
        <div className='grid lg:grid-cols-[1.2fr_1fr] gap-4 xl:gap-5'>
          <LNTInfo vc={vc} />
          {/* <LNTDepositWithdraw vc={vc} /> */}
          <LntVaultChart vc={vc} />
          <LNT_VT_YT vc={vc} />
        </div>
        <LntMyPositions vc={vc} />
        <div>Operators</div>
        <LntOperators vc={vc} />
      </>}
    </div>
  )
}

export default function Vaults() {
  const chainId = useCurrentChainId()
  const vcs = (LNTVAULTS_CONFIG[chainId] || []).filter(item => item.onEnv ? item.onEnv.includes(ENV) : true)
  const params = useSearchParams()
  const paramsVault = params.get('vault')
  const paramsTab = params.get('tab')
  const currentVc = vcs.find((item) => item.vault == paramsVault)
  return (
    <PageWrap>
      <div className='w-full max-w-[1160px] px-4 mx-auto md:pb-8 relative'>
        {!currentVc ? (
          <>
            <div className='page-title'>LNT-Vaults</div>
            {/* <Noti data='Deposit assets into the Vaults to pair-mint stablecoin and margin token' /> */}
            <Grid numItems={1} className='gap-5 mt-4'>
              {vcs.map((item, index) => (
                <LNTVaultCard key={`group_vault_item_${index}`} vc={item} />
              ))}
            </Grid>
          </>
        ) : (
          <>
            {/* <Demo className='absolute top-3 right-5 z-50' /> */}
            <LntVaultPage vc={currentVc} tab={paramsTab as string} />
          </>
        )}
      </div>
    </PageWrap>
  )
}
