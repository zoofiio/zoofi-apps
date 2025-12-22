'use client'

import { BVaultB, BVaultCard, BVaultCardComming, BVaultP, BVaultRedeemAll } from '@/components/b-vault'
import { BVaultAddReward } from '@/components/b-vault-add-reward'
import { Noti } from '@/components/noti'
import { PageWrap } from '@/components/page-wrap'
import { SimpleTabs } from '@/components/simple-tabs'
import { ConfigChainsProvider } from '@/components/support-chains'
import { SimpleSelect } from '@/components/ui/select'
import { abiBVault } from '@/config/abi'
import { BVaultConfig, BvaultsByEnv } from '@/config/bvaults'
import { useCurrentChainId } from '@/hooks/useCurrentChainId'
import { useLoadBVaults } from '@/hooks/useLoads'
import { tabToSearchParams } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { useBoundStore, useStore } from '@/providers/useBoundStore'
import { useBVault, useBVaultEpoches } from '@/providers/useBVaultsData'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useMemo, useState } from 'react'
import { FaAngleLeft, FaSpinner } from 'react-icons/fa6'
import { isAddressEqual } from 'viem'
import { useAccount } from 'wagmi'
import { toBVault } from '../routes'
import { BBtn2 } from '@/components/ui/bbtn'
function StrongSpan({ children }: { children: ReactNode }) {
  return <span className='font-extrabold'>{children}</span>
}

const SupportTabs = ['redeem', 'principal_panda', 'boost_venom'] as const

function BVaultPage({ bvc, currentTab }: { bvc: BVaultConfig; currentTab?: string }) {
  const { address } = useAccount()
  const bvd = useBVault(bvc.vault)
  const chainId = useCurrentChainId()
  useQuery({
    queryKey: ['UpdateVaultDetails', chainId, bvc, bvd],
    queryFn: async () => {
      if (bvd.epochCount == 0n) return false
      await useBoundStore.getState().sliceBVaultsStore.updateEpoches(chainId, bvc)
      return true
    },
  })
  const epoches = useBVaultEpoches(bvc.vault)
  useQuery({
    queryKey: ['UpdateUserData', bvc, epoches, address],
    queryFn: async () => {
      if (epoches.length == 0 || !address) return false
      console.info('epochesOld:', epoches)
      await useBoundStore.getState().sliceUserBVaults.updateEpoches(chainId, bvc, address!, epoches)
      return true
    },
  })
  const { data: showAddReward } = useQuery({
    queryKey: ['checkIsBriber', chainId, address, bvc],
    queryFn: async () => {
      if (!address) return false
      const pc = getPC(chainId)
      const passes = await Promise.all([
        pc.readContract({ abi: abiBVault, address: bvc.vault, functionName: 'isBriber', args: [address] }),
        pc.readContract({ abi: abiBVault, address: bvc.vault, functionName: 'owner' }).then((owner) => owner == address),
      ])
      return passes.includes(true) || isAddressEqual(address, '0xFE18Aa1EFa652660F36Ab84F122CD36108f903B6')
    },
  })
  const odata = [
    ...(bvd.closed ? [
      {
        tab: 'Redeem',
        content: <div className='max-w-xl mx-auto pt-8 w-full'>
          <BVaultRedeemAll bvc={bvc} />
        </div>
      }
    ] : [
      {
        tab: 'Principal Panda',
        content: <BVaultP bvc={bvc} />,
      }
    ])
    ,
    {
      tab: 'Boost Venom',
      content: <BVaultB bvc={bvc} />,
    },
  ]
  const data =
    showAddReward
      ? [
        ...odata,
        {
          tab: 'Add Reward',
          content: <BVaultAddReward bvc={bvc} />,
        },
      ]
      : odata
  const ctab = data.find((item) => tabToSearchParams(item.tab) == currentTab)?.tab
  const r = useRouter()

  return (
    <div className='w-full flex flex-col gap-5'>
      <BBtn2 className='w-fit gap-0.5 text-xs' onClick={() => r.push('/b-vaults')}><FaAngleLeft /> {'B-Vault'}</BBtn2>
      <SimpleTabs
        currentTab={ctab}
        onTabChange={(tab) => toBVault(r, bvc.vault, tab)}
        listClassName='flex-wrap p-0 mb-5 md:gap-14'
        triggerClassName='text-lg sm:text-xl md:text-2xl py-0 data-[state="active"]:border-b border-b-black dark:border-b-white leading-[0.8] rounded-none whitespace-nowrap'
        contentClassName='gap-5'
        data={data}
      />
    </div>
  )
}


const vaultsFilters = ['Active', 'All', 'Closed'] as const
type VaultsFilterType = typeof vaultsFilters[number]

export default function Vaults() {
  const bvcs = BvaultsByEnv
  const params = useSearchParams()
  const paramsVault = params.get('vault')
  const paramsTab = params.get('tab')
  const currentTab = SupportTabs.includes(paramsTab as any) ? (paramsTab as (typeof SupportTabs)[number]) : ''
  const currentVc = bvcs.find((item) => item.vault == paramsVault)
  // useUpdateBVaultsData(bvcs)
  const { loading } = useLoadBVaults()
  const [currentFilter, setFilter] = useState(vaultsFilters.find(item => item === sessionStorage.getItem('bvualts-filter')) ?? vaultsFilters[0])
  const wrapSetFilter = (nf: VaultsFilterType) => {
    setFilter(nf)
    sessionStorage.setItem("bvualts-filter", nf)
  }
  const bvaults = useStore(s => s.sliceBVaultsStore.bvaults, ['sliceBVaultsStore.bvaults'])
  const fVcs = useMemo(() => {
    if (loading) return bvcs
    if (currentFilter == 'All') return bvcs
    if (currentFilter == 'Active') return bvcs.filter(vc => !Boolean(bvaults[vc.vault]?.closed))
    return bvcs.filter(vc => Boolean(bvaults[vc.vault]?.closed))
  }, [loading, bvaults, currentFilter, bvcs])
  return (
    <PageWrap>
      <div className='w-full max-w-[1232px] px-4 mx-auto md:pb-8 font-sec'>
        {!currentVc ? (
          <>
            <div className='page-title'>B-Vaults</div>
            <div className='flex flex-wrap gap-5 w-full items-center justify-between'>
              <Noti className='w-auto' data='A Pendle-like Yield Tokenization Protocol Tailored for Proof-of-Liquidity (POL).' />
              <SimpleSelect
                options={vaultsFilters}
                value={currentFilter}
                onChange={wrapSetFilter}
                className='w-27'
              />
            </div>

            {loading ? <div className='w-full flex items-center justify-center pt-40'>
              <FaSpinner className='animate-spin text-4xl opacity-80' />
            </div> : <div className='grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-5 mt-4'>
              {fVcs.map((item, index) => (
                <BVaultCard key={`group_vault_item_${index}`} vc={item} />
              ))}
              {bvcs.length == 0 && (
                <>
                  <BVaultCardComming symbol='HONEY-USDC' />
                  <BVaultCardComming symbol='HONEY-WBERA' />
                  <BVaultCardComming symbol='HONEY-WETH' />
                </>
              )}
              {bvcs.length == 1 && (
                <>
                  <BVaultCardComming symbol='HONEY-WBERA' />
                  <BVaultCardComming symbol='HONEY-WETH' />
                </>
              )}
              {bvcs.length == 2 && (
                <>
                  <BVaultCardComming symbol='HONEY-WETH' />
                </>
              )}
            </div>}

          </>
        ) : (
          <ConfigChainsProvider chains={currentVc.chain}>
            <BVaultPage bvc={currentVc} currentTab={currentTab} />
          </ConfigChainsProvider>
        )}
      </div>
    </PageWrap>
  )
}
