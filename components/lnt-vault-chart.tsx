/* eslint-disable react-hooks/preserve-manual-memoization */

import { getLntVaultVTPriceApy } from '@/config/api'
import { LntVaultConfig } from '@/config/lntvaults'
import { useFet } from '@/lib/useFet'
import { FMT, fmtDate, formatPercent } from '@/lib/utils'
import { graphic } from 'echarts'
import { round } from 'es-toolkit'
import { now } from 'es-toolkit/compat'
import { useMemo, useState } from 'react'
import { useToggle } from 'react-use'
import { formatUnits } from 'viem'
import { SimpleSelect } from './ui/select'
import EChartsReact from 'echarts-for-react'

const bnToNum = (bn: string, decimal: number = 18) => round(parseFloat(formatUnits(BigInt(bn), decimal)), 5)

// const absLog10 = (num: number) => Math.abs(Math.log10(num))
const multip = 90
const logTrans = (num: number) => round(Math.log10(num * multip + 1), 5)
const revertLog = (num: number) => round((Math.pow(10, num) - 1) / multip, 5)
// const logTrans = (num: number) => round(Math.log10(num * 10000), 5)
// const revertLog = (num: number) => round(Math.pow(10, num) / 10000, 5)

function ChartItem({ tit, types, vc, data, yFormater }: { tit: string, types: string[], vc: LntVaultConfig, data: [string, number][], yFormater?: (v: number) => string }) {
  // const chainId = useCurrentChainId()
  const [ct, setCT] = useState(types[0])
  const [isLOG, togLOG] = useToggle(true)
  const { options } = useMemo(() => {
    const options = {
      title: { show: false },
      animation: true,
      animationDuration: 200,
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#4B4F52',
        borderWidth: 0,
        textStyle: { color: '#fff' },
        valueFormatter: yFormater,
      },
      grid: { left: 0, top: 0, right: 0, bottom: 0, show: false },
      toolbox: { show: false },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          onZero: false,
        },
        axisLabel: {
          color: '#999'
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: { show: false },
        max: (value: any) => ((value.max - value.min) * 0.1 + value.max),
        min: (value: any) => (value.min - (value.max - value.min) * 0.1),
        axisLabel: {
          formatter: yFormater,
          showMinLabel: false,
          showMaxLabel: false,
          color: '#999'
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
          minValueSpan: 10,
        },
        {
          show: false,
        },
      ],
      series: [
        {
          name: ct,
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgb(30, 202, 83)',
          },
          areaStyle: {
            origin: 'start',
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(30, 202, 83, 0.26)' },
              { offset: 1, color: 'rgba(30, 202, 83, 0.07)' },
            ]),
          },
          data: data,
        },
      ],
    }
    return { options }
  }, [isLOG, ct, data])
  return <div className='card w-full flex-1 p-2.5 flex flex-col justify-between gap-2 items-center'>
    <div className='flex w-full justify-between gap-2 items-center'>
      <span className='text-base font-medium'>{tit} Chart</span>
      <SimpleSelect className="text-sm" options={types} onChange={(n) => setCT(n as any)} />
    </div>
    <EChartsReact option={options} className='w-full' style={{ height: 240 }}></EChartsReact>
  </div>

}
export default function LntVaultChart({ vc }: { vc: LntVaultConfig }) {
  const endTime = Math.round(now() / 1000)
  const startTime = Math.round(endTime - 60 * 60 * 24 * 90)
  const data = useFet({
    key: `LntVaultVTChartData:${vc.vault}`,
    initResult: [],
    fetfn: async () => getLntVaultVTPriceApy(vc.chain, vc.vault, startTime, endTime)
  })
  const vtApy = data.result.map(item => [fmtDate(item.time * 1000, FMT.ALL3), (bnToNum(item.apy) + 1) ** 2 - 1] as [string, number]);
  const vtPrice = data.result.map(item => [fmtDate(item.time * 1000, FMT.ALL3), bnToNum(item.price)] as [string, number]);
  return (
    <div className='animitem max-w-4xl w-full min-w-0 flex flex-col gap-5 shrink-0'>
      <ChartItem tit='APY' types={vc.ytEnable ? ["YT APY", 'VT APY'] : ['VT APY']} vc={vc} data={vtApy} yFormater={(v) => formatPercent(v, 2, false)} />
      <ChartItem tit='Price' types={vc.ytEnable ? ["YT Price", 'VT Price'] : ['VT Price']} vc={vc} data={vtPrice} />
    </div>
  )
}
