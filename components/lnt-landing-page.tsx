
import { ReactNode } from "react"
import { AnimSvg, NLUSvg, NLUSvg2 } from "./icons/LntSvgs"
import { CoinIcon } from "./icons/coinicon"

const mBtnClassName = 'text-[1em]'

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
        icon: <CoinIcon symbol="Lnfi"  size={118}/>,
    },
    {
        name: 'Reppo Network',
        icon: <CoinIcon symbol="Reppo" size={60}/>,
    },
    {
        name: 'Enreach',
        icon: <CoinIcon symbol="Enreach" size={150}/>,
    },
]
function Section3() {
    return <section className="w-full py-[5.625em] px-[5.25em] flex flex-col items-center justify-center gap-[2em]">
        <div className={sectionTitClassName}>Partners</div>
        <div className="flex flex-wrap justify-center gap-10">
            {partners.map(p => <div key={p.name} className="flex flex-col gap-4 items-center ">
                <div className="flex justify-center items-center rounded-[1.25em] border border-white w-[15em] h-[6.25em]">{p.icon}</div>
                <div className="text-sm text-center">{p.name}</div>
            </div>)}
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
        </div>
    </div>
}