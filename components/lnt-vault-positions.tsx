import { LntVaultConfig } from "@/config/lntvaults";
import STable from "./simple-table"
const claimColSize = 1.3;
const statuColSize = 1.6

function VT({ vc }: { vc: LntVaultConfig }) {
    const data = []
    const header = ['VT', 'Value', 'Status', 'Redeemable', '']
    return <div className="card !p-4 bg-white">
        <STable
            headerClassName='text-left font-semibold border-b-0'
            headerItemClassName='py-1 px-0 text-base'
            rowClassName='text-left text-black text-sm leading-none font-medium'
            cellClassName='py-2 px-0'
            header={header}
            span={{ 2: statuColSize, 3: 2, [header.length - 1]: claimColSize }}
            data={[]}
        />
    </div>
}
function YT({ vc }: { vc: LntVaultConfig }) {
    const data = []
    const header = ['YT', 'Value', 'Status', 'Yield', 'Airdrops', '']
    return <div className="card !p-4 bg-white">
        <STable
            headerClassName='text-left font-semibold border-b-0'
            headerItemClassName='py-1 px-0 text-base'
            rowClassName='text-left text-black text-sm leading-none font-medium'
            cellClassName='py-2 px-0'
            header={header}
            span={{ 2: statuColSize, [header.length - 1]: claimColSize }}
            data={[]}
        />
    </div>
}
function LP({ vc }: { vc: LntVaultConfig }) {
    const data = []
    const header = ['LP', 'Value', '', 'Yield', 'Airdrops', '']
    return <div className="card !p-4 bg-white">
        <STable
            headerClassName='text-left font-semibold border-b-0'
            headerItemClassName='py-1 px-0 text-base'
            rowClassName='text-left text-black text-sm leading-none font-medium'
            cellClassName='py-2 px-0'
            header={header}
            span={{ 2: statuColSize, [header.length - 1]: claimColSize }}
            data={[]}
        />
    </div>
}

export function LntMyPositions({ vc }: { vc: LntVaultConfig }) {
    return <div className="flex flex-col gap-5">
        <div className="font-semibold text-2xl leading-none">My Positions</div>
        <VT vc={vc} />
        <YT vc={vc} />
        <LP vc={vc} />
    </div>
}