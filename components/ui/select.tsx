import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useClickAway } from "react-use";

export type OptionBase = string | {
    key: string
    show: ReactNode,
}
export function SimpleSelect<T extends OptionBase>({ options, value, defValue, onChange, className, itemClassName, currentClassName, listClassName }: {
    options: T[] | readonly T[],
    value?: T,
    onChange?: (data: T) => void,
    className?: string
    itemClassName?: string
    currentClassName?: string
    listClassName?: string
    defValue?: T
}) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defValue || options[0]);
    useEffect(() => {
        if (options.length && (!selectedValue || !options.find(item => item !== selectedValue))) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedValue((defValue || options[0]))
            onChange?.(defValue || options[0])
        }
    }, [options, defValue, selectedValue])
    const current = value || selectedValue
    const ref = useRef<HTMLDivElement>(null)
    useClickAway(ref, () => setIsOpen(false))
    const renderItem = (item: T) => {
        if (!item) return null
        if (typeof item == 'string') return item
        return item.show
    }
    if (options.length == 0) return null
    return <div ref={ref} className={cn("w-auto rounded-sm relative border-board border select-none cursor-pointer z-60", className)}>
        <div className={cn("flex items-center justify-between gap-5 px-2 py-1", currentClassName)} onClick={() => setIsOpen(!isOpen)}>
            <div className="flex items-center">
                {renderItem(current)}
            </div>
            {isOpen ? <BsChevronUp /> : <BsChevronDown />}
        </div>
        {isOpen && (
            <div className={cn("mt-1 absolute bg-main overflow-hidden top-full w-full right-0 flex flex-col rounded-sm border-board border", listClassName)}>
                {options.map(item => (
                    <div
                        key={typeof item === 'string' ? item : item.key}
                        className={cn("w-auto cursor-pointer px-2 py-1 hover:bg-primary/30", itemClassName)}
                        onClick={() => {
                            setSelectedValue(item)
                            onChange?.(item)
                            setIsOpen(false)
                        }}
                    >
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        )}
    </div>
}