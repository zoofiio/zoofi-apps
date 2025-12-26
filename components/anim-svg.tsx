import { ReactNode } from "react";

export function LntNodeSvg({ node, disableAnim }: { node?: ReactNode, disableAnim?: boolean }) {
    return <svg className="mx-auto bg-no-repeat bg-contain bg-center bg-[url(/bg_lnt_icon2.svg)] dark:bg-[url(/bg_lnt_icon.svg)]" width="100%" viewBox="0 0 368 284" fill="none" xmlns="http://www.w3.org/2000/svg">
        {!disableAnim && <circle cx="184" cy="228" r="183" transform-origin="center 228" transform="scale(1 .3)" stroke="url(#paint0_linear_57_1167)" strokeWidth="2" strokeDasharray="4 10" strokeDashoffset="0">
            <animate attributeName="stroke-dashoffset" from="0" to="-140" dur="1.5s" repeatCount="indefinite" />
        </circle>}
        {node ? <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 15;0 0" dur="2s" repeatCount="indefinite" />
            <foreignObject x="184" y="45" width="80" height="80" transform="translate(-40,-40)">
                {node}
            </foreignObject>

        </g>
            :
            <g>
                <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 15;0 0" dur="2s" repeatCount="indefinite" />
                <foreignObject x="184" y="45" width="96" height="110" transform="translate(-48,-40)">
                    <img className="w-full h-full" src={'/lnt_icon.svg'} />
                </foreignObject>
            </g>}
        <defs>
            <linearGradient id="paint0_linear_57_1167" x1="184" y1="113" x2="184" y2="283" gradientUnits="userSpaceOnUse">
                <stop stopColor="#006A1F" stopOpacity="0" />
                <stop offset="1" stopColor="#1ECA53" />
            </linearGradient>
        </defs>
    </svg>

}


export function LvtNodeSvg({ node, disableAnim = false }: { node?: ReactNode, disableAnim?: boolean }) {
    return <svg className="bg-no-repeat bg-contain bg-center bg-[url(/bg_lvt_icon2.svg)] dark:bg-[url(/bg_lvt_icon.svg)]" width="100%" viewBox="0 0 366 349" fill="none" xmlns="http://www.w3.org/2000/svg">
        {!disableAnim && <circle cx="182" cy="293" r="182" transform-origin="center 293" transform="scale(1 .3)" stroke="url(#paint_0_linear_57_1168)" strokeWidth="2" strokeDasharray="4 10" strokeDashoffset="0">
            <animate attributeName="stroke-dashoffset" from="0" to="-140" dur="1.5s" repeatCount="indefinite" />
        </circle>}
        {node ?
            <g>
                <animateTransform attributeName="transform" type="translate" values="0 0;0 20;0 0" dur="2s" repeatCount="indefinite" />
                <foreignObject x="184" y="100" width="80" height="80" transform="translate(-40,-40)">
                    {node}
                </foreignObject>
            </g>
            : <g>
                <animateTransform attributeName="transform" type="translate" values="0 0;0 -20;0 0" dur="2s" repeatCount="indefinite" />
                <foreignObject x="184" y="100" width="144" height="130" transform="translate(-72,-20)">
                    <img className="w-full h-full" src={'/lvt_icon.svg'} />
                </foreignObject>
            </g>
        }
        <defs>
            <linearGradient id="paint_0_linear_57_1168" x1="184" y1="179" x2="184" y2="349" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8C6F00" stopOpacity="0" />
                <stop offset="1" stopColor="#FDD849" />
            </linearGradient>
        </defs>
    </svg>

}