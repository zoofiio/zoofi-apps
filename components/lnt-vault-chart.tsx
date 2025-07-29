
import { LntVaultConfig } from '@/config/lntvaults'
import { useCurrentChainId } from '@/hooks/useCurrentChainId'
import { FMT, fmtDate } from '@/lib/utils'
import { graphic } from 'echarts'
import { random, range, round } from 'es-toolkit'
import { now } from 'es-toolkit/compat'
import { useMemo, useState } from 'react'
import { useToggle } from 'react-use'
import { formatEther } from 'viem'
import { SimpleSelect } from './ui/select'

const bnToNum = (bn: string) => round(parseFloat(formatEther(BigInt(bn))), 5)

// const absLog10 = (num: number) => Math.abs(Math.log10(num))
const multip = 90
const logTrans = (num: number) => round(Math.log10(num * multip + 1), 5)
const revertLog = (num: number) => round((Math.pow(10, num) - 1) / multip, 5)
// const logTrans = (num: number) => round(Math.log10(num * 10000), 5)
// const revertLog = (num: number) => round(Math.pow(10, num) / 10000, 5)

function ChartItem({ tit, types, vc }: { tit: string, types: string[], vc: LntVaultConfig }) {
  const chainId = useCurrentChainId()
  const [ct, setCT] = useState(types[0])
  const [isLOG, togLOG] = useToggle(true)
  const { options } = useMemo(() => {
    const nowtime = now()
    const total = 20
    const data = range(0, total).map(item => [fmtDate(nowtime - (total - item) * 60 * 60 * 1000, FMT.ALL), round(random(0.9, 1.1), 3)])
    // const data = prices.map((p) => [fmtDate(p.time * 1000, FMT.ALL), isLOG ? logTrans(bnToNum(p.price)) : bnToNum(p.price)])
    const valueFormater = (value: number) => (isLOG ? revertLog(value).toString() : value.toString())
    const calcMax = (v: any) => {
      //    const max = value.max * 1.1
    }
    const options = {
      animation: true,
      animationDuration: 200,
      tooltip: {
        trigger: 'axis',
        valueFormatter: valueFormater,
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
          formatter: valueFormater,
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
          name: 'YT Price',
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
  }, [isLOG, ct])
  return <>
    <div className='flex justify-between gap-2 items-center'>
      <span className='text-base font-bold'>{tit} Chart</span>
      <SimpleSelect className="text-sm" options={types} onChange={(n) => setCT(n as any)} />
    </div>
    {/* <EChartsReact option={options} style={{ height: 240 }}></EChartsReact> */}
    <div className='h-[240px] flex justify-center items-center bg-primary/10 rounded-xl'>
      Coming Soon...
    </div>
  </>
}
export default function LntVaultChart({ vc }: { vc: LntVaultConfig }) {
  return (
    <div className='animitem card bg-white p-4 mx-auto max-w-4xl w-full min-w-0 flex flex-col gap-5'>
      <ChartItem tit='APY' types={vc.ytEnable ? ["YT APY", 'VT APY'] : ['VT APY']} vc={vc} />
      <ChartItem tit='Price' types={vc.ytEnable ? ["YT Price", 'VT Price'] : ['VT Price']} vc={vc} />
    </div>
  )
}
