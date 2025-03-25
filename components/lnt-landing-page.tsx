'use client'

import { ReactNode } from "react"
import { AnimSvg, NLUSvg, NLUSvg2 } from "./icons/LntSvgs"
import { CoinIcon } from "./icons/coinicon"
import { cn } from "@/lib/utils"
import { FiChevronUp } from "react-icons/fi"
import { useToggle } from "react-use"

const mBtnClassName = 'btn-b text-base p-3 min-w-[12.5rem] rounded-lg border border-white cursor-pointer'

function Section1() {
    const lightText = (txt: string) => {
        return <span className="text-primary">{txt}</span>
    }
    return <section style={{ background: `url('/bg_section.svg')` }} className="w-full min-h-screen py-[5.625em] px-[5.25em] flex items-center justify-center gap-[-2rem]">
        <div className="flex flex-col gap-8">
            <div className="text-[4em] font-bold">{lightText('L')}iquid {lightText('N')}ode {lightText('T')}oken</div>
            <div className="whitespace-pre-wrap text-[2.75em] leading-none">
                All-in-one Liquidity Solution for{'\n'}
                Initial Node Offering
            </div>
            <div>
                <button className={mBtnClassName}>Start</button>
            </div>
        </div>
        <AnimSvg />
    </section>
}



function Section2() {
    return <section className="w-full py-[5.625em] px-[5.25em] flex flex-col items-center justify-center gap-[2em]">
        <NLUSvg />
        <NLUSvg2 />
    </section>
}

const sectionTitClassName = 'text-[4em] font-semibold text-center';

const partners: ({ name: string, icon: ReactNode })[] = [
    {
        name: 'Lnfi Network',
        icon: <CoinIcon symbol="Lnfi" size={118} />,
    },
    {
        name: 'Reppo Network',
        icon: <CoinIcon symbol="Reppo" size={60} />,
    },
    {
        name: 'Enreach',
        icon: <CoinIcon symbol="Enreach" size={150} />,
    },
]
function Section3() {
    return <section className="w-full py-[5.625em] px-[5.25em] flex flex-col items-center justify-center gap-[2em]">
        <div className={sectionTitClassName}>Partners</div>
        <div className="flex flex-wrap justify-center gap-10">
            {partners.map(p => <div key={p.name} className="flex flex-col gap-4 items-center ">
                <div className="flex justify-center items-center rounded-[1.25rem] border border-white w-[15rem] h-[6.25rem]">{p.icon}</div>
                <div className="text-sm text-center">{p.name}</div>
            </div>)}
        </div>
    </section>
}

const investors = ['binance', 'ventures', 'certik', 'signum', 'definancex', 'okventures', 'bigbrain', 'pragma', 'cms', 'dorahacks']

function Section4() {
    return <section className="w-full py-[5.625em] px-[5.25em] flex flex-col items-center justify-center gap-[2em]">
        <div className={sectionTitClassName}>Investors & Backers</div>
        <div className='mt-5 flex gap-y-5 gap-x-10 items-center justify-center flex-wrap max-w-[53.75rem]'>
            {investors.map(item => (<div className='w-[8.75rem] flex justify-center items-center' key={item}>
                <img className={cn('object-contain invert dark:invert-0', item == 'pragma' ? 'w-[7.6563rem]' : 'w-[8.75rem]')} src={`/investors/${item}.png`} />
            </div>))}
        </div>
    </section>
}

const faqs = [
    {
        q: 'What is Verio?', a: `All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering`
    },
    {
        q: 'What is Verio?', a: `All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering`
    },
    {
        q: 'What is Verio?', a: `All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering`
    },
    {
        q: 'What is Verio?', a: `All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering`
    },
    {
        q: 'What is Verio?', a: `All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering
All-in-one Liquidity Solution for Initial Node Offering`
    },
]

function QA(p: { qa: (typeof faqs)[number], defExpand?: boolean }) {
    const { qa, defExpand } = p;
    const [expand, toggleExpand] = useToggle(defExpand || false)
    return <div className='flex flex-col gap-3'>
        <div
            className="font-medium text-base rounded-lg p-3 flex justify-between items-center cursor-pointer hover:bg-primary"
            onClick={() => toggleExpand()}>
            {qa.q} <FiChevronUp className={cn("origin-center transition-all", { "rotate-180": !expand })} />
        </div>
        {expand && <div className="text-xs whitespace-pre-wrap px-3">{qa.a}</div>}
    </div>
}
function Section5() {
    return <section className="w-full py-[5.625em] px-[5.25em] flex flex-col items-center justify-center gap-[2em]">
        <div className={sectionTitClassName}>FAQ</div>
        <div className='w-full mt-5 flex flex-col gap-4 p-6 rounded-3xl max-w-[51.875rem] border border-white'>
            {faqs.map((item, i) => (<QA qa={item} key={`faq_${i}`} defExpand={i === 0} />))}
        </div>
    </section>
}



export function LntLandingPage() {
    return <div className="w-screen h-screen overflow-y-auto bg-black">
        <div style={{
            fontSize: 'min(1.11vw, 16px)'
        }} className="w-full max-w-[1440px] overflow-hidden mx-auto">
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
        </div>
    </div>
}