import { cn } from "@/lib/utils"
import { isNil } from "es-toolkit"
import { isNumber, round, toNumber } from "es-toolkit/compat"
import { IoIosAdd, IoIosRemove } from "react-icons/io"

export type NumInputProps = {
    className?: string
    btnClassName?: string
    subClassName?: string
    addClassName?: string
    numClassName?: string
    value?: number
    step?: number
    min?: number
    max?: number
    integer?: boolean
    decimals?: number
    title?: string
    onChange?: (value: number) => void
}

const tryToNumber = (num: any, def: number = 0) => {
    try {
        return toNumber(num);
    } catch (error) {
        return def
    }
}

export function NumInput({
    className,
    btnClassName,
    subClassName,
    addClassName,
    numClassName,
    value = 0,
    step = 1,
    min,
    max,
    integer = true,
    decimals = 2,
    title,
    onChange
}: NumInputProps) {
    const clampValue = (v: number) => {
        let nv = round(v, integer ? 0 : decimals)
        if (isNumber(min) && nv < min) nv = min
        if (isNumber(max) && nv > max) nv = max
        return nv
    }
    const setNewValue = (v: number) => {
        onChange?.(clampValue(v))
    }
    const mvalue = clampValue(value)

    return <div className={cn("flex gap-5 items-center select-none p-4 bg-bg rounded-xl", className)}>
        <span className="mr-auto">{title}</span>
        <div className={cn("shrink-0 text-2xl rounded-full bg-primary/80 cursor-pointer ", { 'cursor-not-allowed bg-fg/10': !isNil(min) && mvalue <= min }, btnClassName, subClassName)}
            onClick={() => setNewValue((mvalue ?? 0) - step)}>
            <IoIosRemove />
        </div>
        <input
            className={cn(
                "w-8 px-2 text-center min-w-4 font-bold text-lg outline-hidden ",
                "shrink-0",
                numClassName)}
            type="number"
            value={mvalue}
            onChange={(e) => {
                const num = tryToNumber(e.target.value)
                const nv = integer ? round(num) : num
                onChange?.(nv)
                setNewValue(nv)
            }}
        />
        <div className={cn("shrink-0 text-2xl rounded-full bg-primary/80 cursor-pointer", { 'cursor-not-allowed bg-fg/10': !isNil(max) && mvalue >= max }, btnClassName, addClassName)}
            onClick={() => setNewValue((mvalue ?? 0) + step)}>
            <IoIosAdd />
        </div>
        {isNumber(max) && <div className="shrink-0 text-xs font-medium cursor-pointer text-primary" onClick={() => setNewValue(max)}>Max</div>}
    </div>
}