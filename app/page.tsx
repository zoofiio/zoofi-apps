'use client';

import { LntNodeSvg, LvtNodeSvg } from "@/components/anim-svg";
import { LgBoardBloom, LgBoardBloom2 } from "@/components/ui/effects";
import { useRouter } from "next/navigation";
import { lntDesc, lvtDesc } from "./lnt/vaults/page";

export default function Home() {
  const r = useRouter()
  return <>
    <div className="w-full max-w-320 mx-auto min-h-[calc(100vh-72px)] px-4 flex flex-col justify-center h-max relative pt-22 pb-8">
      <div className="grid md:grid-cols-2 h-max items-center flex-wrap justify-center gap-[clamp(20px,5.5vw,100px)] relative">
        <LgBoardBloom className="animitem h-full flex-1 basis-0 min-w-80 cursor-pointer" onClick={() => r.push("/lnt")}>
          <div className="w-full flex flex-col gap-4 p-4 md:p-5">
            <div className="mx-auto w-8/10 pt-[15%]">
              <LntNodeSvg />
            </div>
            <div className="text-2xl font-semibold">LNT - Vaults</div>
            <div className="font-sec opacity-60 text-sm">{lntDesc}</div>
          </div>
        </LgBoardBloom>
        <LgBoardBloom2 className="animitem h-full flex-1 basis-0 min-w-80 cursor-pointer" onClick={() => r.push("/lvt")}>
          <div className="w-full flex flex-col gap-4 p-4 md:p-5">
            <div className="mx-auto w-8/10">
              <LvtNodeSvg />
            </div>
            <div className="text-2xl font-semibold">LVT - Vaults</div>
            <div className="font-sec opacity-60 text-sm">{lvtDesc}</div>
          </div>
        </LgBoardBloom2>
        <div className="bg-[#21CA53] pointer-events-none opacity-20 blur-[150px] rotate-30 -translate-y-1/2 -translate-x-1/2 w-[clamp(300px,46vw,650px)] aspect-65/43 origin-center absolute left-0"></div>
        <div className="bg-[#FDD849] pointer-events-none opacity-20 blur-[150px] -rotate-30 -translate-y-1/2 translate-x-1/2 w-[clamp(300px,46vw,650px)] aspect-65/43 origin-center absolute right-0"></div>
      </div>
    </div>
  </>
}
