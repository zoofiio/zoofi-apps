'use client'

import { HTMLAttributes, ReactNode } from "react"
import { AnimSvg, NLUSvg, NLUSvg2 } from "./icons/LntSvgs"
import { CoinIcon } from "./icons/coinicon"
import { cn } from "@/lib/utils"
import { FiChevronUp } from "react-icons/fi"
import { useToggle } from "react-use"

function BtnB(p: HTMLAttributes<HTMLButtonElement>) {
    const { children, ...props } = p;
    return <button {...props} className="text-[1em] p-[.75em] w-[12.5em] rounded-[.5em]  cursor-pointer border border-white btn-b">
        {children}
    </button >
}
function Section1() {
    const lightText = (txt: string) => {
        return <span className="text-primary">{txt}</span>
    }
    return <section style={{ background: `url('/bg_section.svg')` }} className="w-full h-screen max-h-[100vw] py-[5.625em] px-[5.25em] flex items-center justify-center gap-[-2rem] z-10">
        <div className="flex flex-col gap-8">
            <div className="text-[4em] font-bold whitespace-nowrap">{lightText('L')}iquid {lightText('N')}ode {lightText('T')}oken</div>
            <div className="text-[2.75em] leading-none">
                All-in-one Liquidity Solution for{'\n'}
                Initial Node Offering
            </div>
            <div>
                <BtnB>Start</BtnB>
            </div>
        </div>
        <AnimSvg />
    </section>
}



function Section2() {
    return <section className="w-full py-[5.625em] px-[5.25em] flex flex-col items-center justify-center gap-[2em] z-10">
        <NLUSvg />
        <NLUSvg2 />
    </section>
}

const sectionTitClassName = 'text-[4em] font-semibold text-center';

const partners: ({ name: string, icon: ReactNode })[] = [
    {
        name: 'Lnfi Network',
        icon: <CoinIcon symbol="Lnfi" className="object-contain" size='7.375em' />,
    },
    {
        name: 'Reppo Network',
        icon: <CoinIcon symbol="Reppo" className="object-contain" size='3.75em' />,
    },
    {
        name: 'Enreach',
        icon: <CoinIcon symbol="Enreach" className="object-contain" size='9.375em' />,
    },
]
function Section3() {
    return <section className="w-full py-[5.625em] px-[5.25em] flex flex-col items-center justify-center gap-[2em] z-10">
        <div className={sectionTitClassName}>Partners</div>
        <div style={{ fontSize: 'min(1.6vw,16px)' }} className="flex flex-wrap justify-center gap-10">
            {partners.map(p => <div key={p.name} className="flex flex-col gap-[1em] items-center ">
                <div className="flex justify-center items-center rounded-[1.25em] border border-white w-[15em] h-[6.25em]">{p.icon}</div>
                <div className="text-[.75em] text-center">{p.name}</div>
            </div>)}
        </div>
    </section>
}

const investors = ['binance', 'ventures', 'certik', 'signum', 'definancex', 'okventures', 'bigbrain', 'pragma', 'cms', 'dorahacks']

function Section4() {
    return <section className="w-full py-[5.625em] px-[5.25em] flex flex-col items-center justify-center gap-[2em] z-10">
        <div className={sectionTitClassName}>Investors & Backers</div>
        <div className='mt-5 flex gap-y-5 gap-x-10 items-center justify-center flex-wrap max-w-[53.75rem]'>
            {investors.map(item => (<div className='w-[8.75rem] flex justify-center items-center' key={item}>
                <img className={cn('object-contain', item == 'pragma' ? 'w-[7.6563rem]' : 'w-[8.75rem]')} src={`/investors/${item}.png`} />
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
            className="font-medium text-base rounded-lg p-3 flex justify-between items-center cursor-pointer hover:bg-[#2bbd34]/60"
            onClick={() => toggleExpand()}>
            {qa.q} <FiChevronUp className={cn("origin-center transition-all", { "rotate-180": !expand })} />
        </div>
        {expand && <div className="text-xs whitespace-pre-wrap px-3">{qa.a}</div>}
    </div>
}
function Section5() {
    return <section className="w-full py-[5.625em] px-[5.25em] flex flex-col items-center justify-center gap-[2em] z-10">
        <div className={sectionTitClassName}>FAQ</div>
        <div className='w-full mt-5 flex flex-col gap-4 p-6 rounded-3xl max-w-[51.875rem] border border-white'>
            {faqs.map((item, i) => (<QA qa={item} key={`faq_${i}`} defExpand={i === 0} />))}
        </div>
    </section>
}



export function LntLandingPage() {
    return <div className="w-screen h-screen overflow-y-auto bg-black">
        <div style={{ fontSize: 'min(1.11vw,16px)' }} className="w-full max-w-[1440px] overflow-hidden mx-auto relative">
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <img style={{ width: '40.0625em', height: '50.6875em', top: '36.25em' }} src="/bg_lnt_r.svg" className="absolute right-0" />
            <img style={{ width: '31.3125em', height: '61.375em', top: '82.875em' }} src="/bg_lnt_l.svg" className="absolute left-0 opacity-50" />
            <img style={{ width: '40.0625em', height: '50.6875em', top: '160em' }} src="/bg_lnt_r.svg" className="absolute right-0" />
            <img style={{ width: '31.3125em', height: '61.375em', top: '200em' }} src="/bg_lnt_l.svg" className="absolute left-0 opacity-50" />
        </div>
    </div>
}