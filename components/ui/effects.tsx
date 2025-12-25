import { cn } from "@/lib/utils";
import { HTMLProps } from "react";
export function LgBoardBloom({ children, className, ...p }: HTMLProps<HTMLDivElement>) {
    return <div style={{
        boxShadow: '0px 0px 40px 0px #32D65233 inset,0px 0px 10px 0px #4CE54F66',
        background: `
        linear-gradient(180deg,var(--bg-main,#00000033),var(--bg-main,#66666633)) padding-box,
        linear-gradient(180deg, #4EEB7E, #006D21) border-box`,
        border: '1px solid transparent'
    }} className={cn("rounded-[20px]", className)} {...p}>{children}</div>
}

export function LgBoardBloom2({ children, className, ...p }: HTMLProps<HTMLDivElement>) {
    return <div style={{
        boxShadow: '0px 0px 40px 0px #FDD84933 inset,0px 0px 10px 0px #FDD84966',
        background: `
        linear-gradient(180deg,var(--bg-main,#00000033),var(--bg-main,#66666633)) padding-box,
        linear-gradient(180deg, #FDD849, #FDA103) border-box`,
        border: '1px solid transparent'
    }} className={cn("rounded-[20px]", className)} {...p}>{children}</div>
}