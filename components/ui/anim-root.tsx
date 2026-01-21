'use client'

import { useInitAnimRoot } from "@/hooks/useAnim";
import { HtmlHTMLAttributes } from "react";

export function AnimRoot(p: HtmlHTMLAttributes<HTMLDivElement>) {
    const root = useInitAnimRoot()
    return <div {...p} ref={root} />
}