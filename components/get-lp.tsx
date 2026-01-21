import { LP_TOKENS } from "@/config/lpTokens"

import { useCurrentChainId } from "@/hooks/useCurrentChainId"
import Link from 'next/link'
import { Address } from "viem"
import { berachain } from "viem/chains"
import { CoinIcon } from "./icons/coinicon"

export const BEX_URLS: { [k: number]: string } = {
    [berachain.id]: 'https://hub.berachain.com',
}
export const getBexPoolURL = (chainId: number, pool: Address) => {
    if (berachain.id) {
        return `${BEX_URLS[chainId]}/pools/${LP_TOKENS[pool].poolId}/deposit/`
    }
    return ''
}

function getKodiakLink(pool: string) {
    return `https://app.kodiak.finance/#/liquidity/pools/${pool}?chain=berachain_mainnet`
}
export function GetLP({ address }: { address: Address }) {
    const lp = LP_TOKENS[address]
    const isLP = Boolean(lp)
    const chainId = useCurrentChainId()
    if (!isLP) return null
    return <div className='text-xs font-medium flex gap-2 justify-end items-center'>
        {lp.isKodiak ? <CoinIcon symbol="kodiak-logo" size={20} /> : <CoinIcon symbol="berahub" size={18} />}
        <Link target='_blank' className='underline' href={lp.isKodiak ? getKodiakLink(address) : getBexPoolURL(chainId, address)}>
            Get LP on {lp.isKodiak ? 'Kodiak' : 'Berahub'}
        </Link>
    </div>
}