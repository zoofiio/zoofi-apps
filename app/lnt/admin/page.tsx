'use client'

import { GeneralAction } from '@/components/general-action'
import { PageWrap } from '@/components/page-wrap'
import { nodelicense } from '@/components/pre-deposit'
import { abiMockERC721 } from '@/config/abi'

export default function AdminPage() {
  const nodes = nodelicense.filter(item => item.preDeposit)
  return (
    <PageWrap>
      <div className='w-full flex'>
        <div className='flex flex-col gap-4 w-full max-w-[840px] mx-auto px-5'>
          {nodes.map(item => <GeneralAction key={'mintErc721' + item.preDeposit!.nft} abi={abiMockERC721} tit="" functionName='mint' address={item.preDeposit!.nft} />)}
        </div>
      </div>
    </PageWrap>
  )
}
