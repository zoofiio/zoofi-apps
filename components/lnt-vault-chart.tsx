
import { getLntVaultVTPriceApy } from '@/config/api'
import { LntVaultConfig } from '@/config/lntvaults'
import { useFet } from '@/lib/useFet'
import { FMT, fmtDate } from '@/lib/utils'
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

function ChartItem({ tit, types, vc, data }: { tit: string, types: string[], vc: LntVaultConfig, data: [string, number][] }) {
  // const chainId = useCurrentChainId()
  const [ct, setCT] = useState(types[0])
  const [isLOG, togLOG] = useToggle(true)
  const { options } = useMemo(() => {


    const options = {
      animation: true,
      animationDuration: 200,
      tooltip: {
        trigger: 'axis',
        // valueFormatter: ,
      },
      grid: { top: 30, bottom: 30, right: 20, show: false },
      toolbox: { show: false },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          onZero: false,
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: { show: false },
        max: (value: any) => value.max * 1.1,
        axisLabel: {
          // formatter: ,
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
              {
                offset: 0,
                color: 'rgb(30, 202, 83)',
              },
              {
                offset: 1,
                color: 'rgba(30, 202, 83, 0.2)',
              },
            ]),
          },
          data: data,
        },
      ],
    }
    return { options }
  }, [isLOG, ct, data])
  return <>
    <div className='flex justify-between gap-2 items-center'>
      <span className='text-base font-bold'>{tit} Chart</span>
      <SimpleSelect className="text-sm" options={types} onChange={(n) => setCT(n as any)} />
    </div>
    <EChartsReact option={options} style={{ height: 240 }}></EChartsReact>
  </>
}
export default function LntVaultChart({ vc }: { vc: LntVaultConfig }) {
  const endTime = Math.round(now() / 1000)
  const startTime = Math.round(endTime - 60 * 60 * 24 * 90)
  const data = useFet({
    key: `LntVaultVTChartData:${vc.vault}`,
    initResult: [],
    fetfn: async () => getLntVaultVTPriceApy(vc.chain, vc.vault, startTime, endTime)
  })
  const vtApy = data.result.map(item => [fmtDate(item.time * 1000, FMT.ALL), bnToNum(item.apy)] as [string, number]);
  const vtPrice = data.result.map(item => [fmtDate(item.time * 1000, FMT.ALL), bnToNum(item.price)] as [string, number]);
  return (
    <div className='animitem card bg-white p-4 mx-auto max-w-4xl w-full min-w-0 flex flex-col gap-5'>
      <ChartItem tit='APY' types={vc.ytEnable ? ["YT APY", 'VT APY'] : ['VT APY']} vc={vc} data={vtApy} />
      <ChartItem tit='Price' types={vc.ytEnable ? ["YT Price", 'VT Price'] : ['VT Price']} vc={vc} data={vtPrice} />
    </div>
  )
}
