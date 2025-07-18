'use client'

import { Erc20Approve, GeneralAction } from '@/components/general-action'
import { MultiTxTemp } from '@/components/multitxs'
import { PageWrap } from '@/components/page-wrap'
import { ConfigChainsProvider } from '@/components/support-chains'
import { SimpleSelect } from '@/components/ui/select'
import { abiMockERC20, abiMockERC721 } from '@/config/abi'
import { abiLntProtocol, abiLntVault, abiMockaVToracle, abiMockNodeDelegator, abiMockRewardDistributor } from '@/config/abi/abiLNTVault'
import { LNTVAULTS_CONFIG } from '@/config/lntvaults'
import { useState } from 'react'

export default function AdminPage() {
  const vcs = LNTVAULTS_CONFIG
  const options = vcs.map(item => ({ key: item.vault, show: `LNT-Vault(${item.vault})`, vc: item }))
  const [current_, setCurrent] = useState<typeof options[0] | undefined>(options[0])
  const current = options.length > 0 ? current_ : undefined;
  return (
    <PageWrap>
      <div className='w-full flex'>
        <MultiTxTemp />
        <div className='flex flex-col gap-4 w-full max-w-[840px] mx-auto px-5'>
          <div className="animitem text-lg whitespace-pre-wrap p-2 bg-primary/20 rounded-xl">
            {JSON.stringify({
              'Decimal18': '000000000000000000'
            }, undefined, 2)}
          </div>
          <SimpleSelect className='w-full animitem' itemClassName='p-3' currentClassName='p-3' options={options} onChange={setCurrent} />
          {
            current && <ConfigChainsProvider chains={[current.vc.chain]}>
              <GeneralAction abi={abiLntVault} functionName='withdrawProfitT' address={current.vc.vault} />
              <GeneralAction abi={abiLntVault} functionName='close' address={current.vc.vault} />
              <GeneralAction tit='transferOwnership' abi={abiLntProtocol} functionName='transferOwnership' address={current.vc.protocol} />
              <GeneralAction abi={abiMockERC721} tit={'mockErc721 setTester'} functionName='setTester' address={current.vc.asset} />
              <GeneralAction abi={abiMockERC721} tit={`mintMockErc721 (${current.vc.asset})`} functionName='safeMint' address={current.vc.asset} />
              {current.vc.MockaVTOracle && <GeneralAction abi={abiMockaVToracle} tit={'set aVT mockaVToracle'} functionName='setaVT' address={current.vc.MockaVTOracle} />}
              {current.vc.MockNodeDelegator && <>
                <GeneralAction abi={abiMockNodeDelegator} functionName='addOperator' address={current.vc.MockNodeDelegator} />
                <GeneralAction abi={abiMockNodeDelegator} functionName='removeOperator' address={current.vc.MockNodeDelegator} />
              </>}
              {current.vc.MockT && <>
                <GeneralAction abi={abiMockERC20} tit={'mockT setTester'} functionName='setTester' address={current.vc.MockT} />
                <GeneralAction abi={abiMockERC20} tit={`mintT (${current.vc.MockT})`} functionName='mint' address={current.vc.MockT} />
              </>}
              {current.vc.MockRewardDistribuitor && <>
                <GeneralAction abi={abiMockRewardDistributor} tit={`addReward (${current.vc.MockRewardDistribuitor})`} functionName='addReward' address={current.vc.MockRewardDistribuitor} />
                <GeneralAction abi={abiMockRewardDistributor} tit={`addT (${current.vc.MockRewardDistribuitor})`} functionName='addT' address={current.vc.MockRewardDistribuitor} />
              </>}
              <Erc20Approve />
            </ConfigChainsProvider>
          }
        </div>
      </div>
    </PageWrap>
  )
}
