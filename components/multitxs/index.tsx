'use client'

import { cn, shortStr } from "@/lib/utils"
import { size } from "es-toolkit/compat"
import { IoIosRemoveCircleOutline } from "react-icons/io"
import { SimulateContractParameters } from "viem"
import { create } from "zustand"
import { Txs } from "../approve-and-tx"
import { SimpleDialog } from "../simple-dialog"
import { BBtn } from "../ui/bbtn"
import { Tip } from "../ui/tip"
import { toJson } from "@/lib/bnjson"
export type MultiTxStore = {
    txs: SimulateContractParameters[],
    addTx: (...args: SimulateContractParameters[]) => void,
    editTx: (index: number, nTx: SimulateContractParameters) => void,
    removeTx: (...is: number[]) => void,
}
const useMultiTxStore = create<MultiTxStore>((set, get) => ({
    txs: [],
    addTx(...args) {
        if (args.length > 0) {
            set({ txs: get().txs.concat(args) })
        }
    },
    editTx(index, nTx) {
        const old = get().txs
        if (index < 0 || index >= old.length) return
        const nTxs = [...old]
        nTxs[index] = nTx
        set({ txs: nTxs })
    },
    removeTx(...is) {
        if (is.length == 0) return
        const nTxs = [...get().txs].filter((_item, i) => !is.includes(i))
        set({ txs: nTxs })
    },
}))




export function MultiTxTemp({ className }: { className?: string }) {
    const { txs, removeTx } = useMultiTxStore()
    if (txs.length == 0) return null
    const clearTxs = () => useMultiTxStore.setState({ txs: [] })
    return <SimpleDialog
        trigger={
            <div
                style={{ textShadow: ' 0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1)' }}
                className={cn("fixed top-28 right-12 shadow-lg rounded-md px-3 py-2 bg-primary/60 text-red-500 font-medium text-shadow cursor-pointer", className)}>
                {txs.length}
            </div>
        }>
        <div className="w-full flex flex-col gap-4 p-5">
            <div className="font-medium text-lg">Multi Tx</div>
            <div className="w-full flex flex-col gap-2 overflow-y-auto max-h-125">
                {txs.map((tx, index) => <div key={`tx_item_${index}`} className="flex bg-primary/20 rounded-md items-center gap-4 px-3 py-1">
                    <span>({shortStr(tx.address)})</span>
                    <span>{shortStr(tx.functionName)}</span>
                    {size(tx.args) > 0 && <Tip>{toJson(tx.args, undefined, 2)}</Tip>}
                    <IoIosRemoveCircleOutline className="text-3xl cursor-pointer hover:text-red-500 ml-auto shrink-0" onClick={() => removeTx(index)} />
                </div>)}
            </div>
            <div className="flex gap-4">
                <Txs tx="Execute" className="flex-1" txs={txs} onTxSuccess={clearTxs} />
                <BBtn className="w-20 shrink-0" onClick={clearTxs}>Clear</BBtn>
            </div>
        </div>
    </SimpleDialog>
}

export function AddMultiTx({ disabled, txs, className, ...props }: Parameters<typeof BBtn>[0] & { txs: SimulateContractParameters[] }) {
    const { addTx } = useMultiTxStore()
    return <BBtn disabled={disabled || txs.length === 0} onClick={() => addTx(...txs)} className={cn("w-36 shrink-0 h-6.5 text-xs", className)} {...props} >{'Add to Temp'}</BBtn>
}