
const mBtnClassName = 'text-[1em]'

function Section1() {
    const lightText = (txt: string) => {
        return <span className="text-primary">{txt}</span>
    }
    return <section style={{ background: `url('/bg_section.svg')` }} className="w-full min-h-screen py-[5.625em] px-[5.25em]">
        <div className="flex items-center">
            <div className="flex flex-col gap-8">
                <div className="text-[4em] font-bold">{lightText('L')}iquid {lightText('N')}ode {lightText('T')}oken</div>
                <div className="whitespace-pre-wrap text-[4em] font-bold">
                    All-in-one Liquidity Solution for{'\n'}
                    Initial Node Offering
                </div>
                <div>
                    <button className={mBtnClassName}>Start</button>
                </div>
            </div>
            <div>

            </div>
        </div>
    </section>
}

export function LntLandingPage() {
    return <div className="w-screen h-screen overflow-y-auto bg-black">
        <div style={{
            fontSize: 'min(1.11vw, 16px)'
        }} className="w-full max-w-[1440px] overflow-hidden mx-auto">
            <Section1 />
        </div>
    </div>
}