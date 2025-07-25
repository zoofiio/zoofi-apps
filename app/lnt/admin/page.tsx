'use client'

import { ApproveAndTx } from '@/components/approve-and-tx'
import { ContractAll, Erc20Approve, Expandable, GeneralAction, inputClassname } from '@/components/general-action'
import { MultiTxTemp } from '@/components/multitxs'
import { PageWrap } from '@/components/page-wrap'
import { Spinner } from '@/components/spinner'
import { ConfigChainsProvider } from '@/components/support-chains'
import { SimpleSelect } from '@/components/ui/select'
import { abiMockERC20, abiMockERC721, abiProtocolSettings } from '@/config/abi'
import { abiAethirNFT, abiAethirRedeemStrategy, abiAethirVToracle, abiLntProtocol, abiLntVault, abiMockaVToracle, abiMockNodeDelegator, abiMockRewardDistributor } from '@/config/abi/abiLNTVault'
import { LNTVAULTS_CONFIG } from '@/config/lntvaults'
import { isTestnet } from '@/config/network'
import { cn, FMT, fmtDate, promiseAll } from '@/lib/utils'
import { getPC } from '@/providers/publicClient'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useSetState } from 'react-use'
import { Address, formatUnits, parseUnits, stringToHex } from 'viem'


type ParamItem = { show: string; value: string; units?: number /** def 10 */ }

function UpdateVaultParams({ paramList, vault, protocoSettingAddress, chain }: { chain: number, paramList: ParamItem[]; vault: Address; protocoSettingAddress: Address }) {
  const params = useMemo(() => paramList.map((p, i) => ({ ...p, show: `${p.show}(${p.value})`, key: `param:${i}` })), [paramList])
  const [{ value, param }, setState] = useSetState({
    value: '',
    param: params[0],
  })
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['vualtParams:', chain, vault, paramList],
    queryFn: async () => {
      const all: any = {}
      const pc = getPC(chain)
      paramList.forEach(item => {
        all[`${item.show}(${item.value})`] = pc.readContract({ abi: abiProtocolSettings, address: protocoSettingAddress, functionName: 'vaultParamValue', args: [vault, stringToHex(item.value, { size: 32 })] })
          .then((res => formatUnits((res as unknown as bigint) || 0n, typeof item.units == 'number' ? item.units : 10)))
      })
      return promiseAll(all)
    }
  })
  const currentUnits = typeof param.units == 'number' ? param.units : 10
  return (
    <Expandable tit='Vault Param Vaule'>
      <SimpleSelect className='w-full animitem z-50' itemClassName='p-3' currentClassName='p-3' listClassName='max-h-[350px] overflow-y-auto' options={params} onChange={(data) => setState({ param: data })} />
      <input
        value={value.toString()}
        onChange={(e) => {
          const numstr = (e.target.value || '').replaceAll('-', '').replaceAll('+', '')
          setState({ value: numstr })
        }}
        type='number'
        className={cn(inputClassname)}
        pattern='[0-9.]{36}'
        step={1}
        placeholder='0'
      />
      <div className='text-sm flex flex-col items-start min-h-[300px] whitespace-pre-wrap'>
        {isFetching && <Spinner className='text-xl'/>}
        {JSON.stringify(data, undefined, 2)}
      </div>
      <ApproveAndTx
        tx='Write'
        config={{
          abi: abiProtocolSettings,
          address: protocoSettingAddress,
          functionName: 'updateVaultParamValue',
          args: [vault, stringToHex(param.value, { size: 32 }), parseUnits(value, currentUnits)],
        }}
        onTxSuccess={() => {
          setState({ value: '' })
          refetch()
        }}
        className=' w-full flex items-center justify-center gap-4'
      />
    </Expandable>
  )
}
const LntVaultParams: ParamItem[] = [
  { show: '', value: 'VTC', units: 18 },
  { show: '', value: 'BuybackDiscountThreshold', units: 18 },
  { show: '', value: 'BuybackProfitCommissionRate', units: 18 },
  { show: '', value: 'initialAnchor', units: 18 },
  { show: '', value: 'scalarRoot', units: 18 },
  { show: '', value: 'vtSwapFee', units: 18 },
  { show: '', value: 'initialVTTRate', units: 18 },
]

export default function AdminPage() {
  const vcs = LNTVAULTS_CONFIG
  const options = vcs.map(item => ({ key: item.vault, show: `LNT-Vault(${item.vault})`, vc: item }))
  const [current_, setCurrent] = useState<typeof options[0] | undefined>(options[0])
  const current = options.length > 0 ? current_ : undefined;
  return (
    <PageWrap>
      <div className='w-full flex'>
        <MultiTxTemp />
        <div className='flex flex-col gap-4 w-full mx-auto px-5'>
          <div className="animitem text-lg whitespace-pre-wrap p-2 bg-primary/20 rounded-xl">
            {JSON.stringify({
              'Decimal18': '000000000000000000'
            }, undefined, 2)}
          </div>
          <SimpleSelect className='w-full animitem z-50' itemClassName='p-3' currentClassName='p-3' options={options} onChange={setCurrent} />
          {
            current && <ConfigChainsProvider chains={[current.vc.chain]}>
              {current.vc.protocalSettings && <UpdateVaultParams chain={current.vc.chain} vault={current.vc.vault} protocoSettingAddress={current.vc.protocalSettings} paramList={LntVaultParams} />}
              <GeneralAction abi={abiLntVault} functionName='withdrawProfitT' address={current.vc.vault} />
              <GeneralAction abi={abiLntVault} functionName='close' address={current.vc.vault} />
              <GeneralAction abi={abiLntVault} functionName='updateAutoBuyback' address={current.vc.vault}
                infos={() => getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'autoBuyback' })} />
              <GeneralAction abi={abiLntVault} functionName='updateCheckerNode' address={current.vc.vault} />
              <GeneralAction abi={abiLntVault} functionName='setUser' address={current.vc.vault} />
              <GeneralAction abi={abiLntVault} functionName='batchSetUser' address={current.vc.vault} />
              <GeneralAction abi={abiLntVault} functionName='removeLastSetUserRecords' address={current.vc.vault} />
              <GeneralAction abi={abiLntVault} functionName='buybackVT' address={current.vc.vault} />
              <GeneralAction abi={abiLntVault} functionName='updateVTPriceTime' address={current.vc.vault}
                infos={() => promiseAll({
                  vtPriceStartTime: getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'vtPriceStartTime' }),
                  vtPriceEndTime: getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'vtPriceEndTime' })
                })} />
              <GeneralAction abi={abiLntVault} functionName='updateVTAOracle' address={current.vc.vault} />
              <GeneralAction abi={abiLntVault} functionName='updateRedeemStrategy' address={current.vc.vault}
                infos={() => getPC(current.vc.chain).readContract({ abi: abiLntVault, address: current.vc.vault, functionName: 'redeemStrategy' })}
              />
              <GeneralAction abi={abiLntVault} functionName='updateVTSwapHook' address={current.vc.vault} />
              <GeneralAction abi={abiLntProtocol} functionName='transferOwnership' address={current.vc.protocol} />
              <GeneralAction abi={abiLntProtocol} functionName='acceptOwnership' address={current.vc.protocol} />
              {(isTestnet(current.vc.chain)) && <>
                <GeneralAction abi={abiMockERC721} tit={'mockErc721 setTester'} functionName='setTester' address={current.vc.asset} />
                <GeneralAction abi={abiMockERC721} tit={`mintMockErc721 (${current.vc.asset})`} functionName={'safeMint'} address={current.vc.asset} />
              </>}

              {current.vc.AethirNFT && <ContractAll tit='MockAethirNFT' abi={abiAethirNFT} address={current.vc.AethirNFT} />}
              {current.vc.AethirVToracle && <ContractAll tit='AethirVToracle' abi={abiAethirVToracle} address={current.vc.AethirVToracle} />}
              {current.vc.AethirRedeemStrategy && <ContractAll tit='AethirRedeemStrategy' abi={abiAethirRedeemStrategy} address={current.vc.AethirRedeemStrategy}
                itemInfos={{
                  updateRedeemStrategy: {
                    ONLY_WITHIN_REDEEM_TIME_WINDOW: 0,
                    ALLOWED: 1,
                    FORBIDDEN: 2
                  },
                  redeemTimeWindows: async () => {
                    const pc = getPC(current.vc.chain)
                    const count = await pc.readContract({ abi: abiAethirRedeemStrategy, address: current.vc.AethirRedeemStrategy!, functionName: 'redeemTimeWindowsCount' })
                    const tws = await pc.readContract({ abi: abiAethirRedeemStrategy, address: current.vc.AethirRedeemStrategy!, functionName: 'redeemTimeWindows', args: [0n, count] })
                    return tws[0].map((t, i) => `${fmtDate(t * 1000n, FMT.ALL)}       --   ${tws[1][i]}`)
                  }
                }}
              />}
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
