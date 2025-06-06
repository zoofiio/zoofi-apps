'use client'

import { GeneralAction } from '@/components/general-action'
import { PageWrap } from '@/components/page-wrap'
import { SimpleSelect } from '@/components/ui/select'
import { abiMockERC721 } from '@/config/abi'
import { abiLntProtocol, abiMockaVToracle } from '@/config/abi/abiLNTVault'
import { LNTVAULTS_CONFIG } from '@/config/lntvaults'
import { useCurrentChainId } from '@/hooks/useCurrentChainId'
import { useState } from 'react'

export default function AdminPage() {
  const chainId = useCurrentChainId()
  const vcs = LNTVAULTS_CONFIG[chainId]
  const options = vcs.map(item => ({ key: item.vault, show: `LNT-Vault(${item.vault})`, vc: item }))
  const [current_, setCurrent] = useState<typeof options[0] | undefined>(options[0])
  const current = options.length > 0 ? current_ : undefined;
  return (
    <PageWrap>
      <div className='w-full flex'>
        <div className='flex flex-col gap-4 w-full max-w-[840px] mx-auto px-5'>
          <SimpleSelect className='w-full' itemClassName='p-3' currentClassName='p-3' options={options} onChange={setCurrent} />
          {
            current && <>
              <GeneralAction tit='transferOwnership' abi={abiLntProtocol} functionName='transferOwnership' address={current.vc.protocol} />
              <GeneralAction abi={abiMockERC721} tit={'mockErc721 setTester'} functionName='setTester' address={current.vc.asset} />
              <GeneralAction abi={abiMockERC721} tit={`mintMockErc721 (${current.vc.asset})`} functionName='safeMint' address={current.vc.asset} />
              {current.vc.MockaVTOracle && <GeneralAction abi={abiMockaVToracle} tit={'set aVT mockaVToracle'} functionName='setaVT' address={current.vc.MockaVTOracle} />}
            </>
          }
        </div>
      </div>
    </PageWrap>
  )
}
