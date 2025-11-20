import { cn } from "@/lib/utils"
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

    return <div className={cn("flex gap-5 justify-center items-center select-none", className)}>
        <div className={cn("shrink-0 text-4xl rounded-lg hover:bg-primary/20 cursor-pointer dark:text-white", btnClassName, subClassName)}
            onClick={() => setNewValue((mvalue ?? 0) - step)}>
            <IoIosRemove />
        </div>
        <div className="relative">
            <input
                className={cn(
                    "h-14 w-14 text-center font-bold text-lg border-[#4A5546] border focus:border-2 text-slate-700 rounded-lg outline-hidden dark:text-slate-50",
                    "shrink-0 bg-white dark:bg-transparent border-slate-400  focus:border-primary",
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
            {Boolean(title) && <div className="font-medium text-xs text-center absolute top-full leading-5 opacity-80">{title}</div>}
        </div>
        <div className={cn("shrink-0 text-4xl rounded-lg hover:bg-primary/20 cursor-pointer dark:text-white", btnClassName, addClassName)}
            onClick={() => setNewValue((mvalue ?? 0) + step)}>
            <IoIosAdd />
        </div>
        {isNumber(max) && <div className="shrink-0 text-xs font-medium cursor-pointer dark:text-white" onClick={() => setNewValue(max)}>Max</div>}
    </div>
}