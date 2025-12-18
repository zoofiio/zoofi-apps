import { cn } from "@/lib/utils";
import { round } from "es-toolkit";

export function ProgressBar({ progress, className, barCalssName }: { progress: number, className?: string, barCalssName?: string }) {
    return (
        <div className={cn("w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 overflow-hidden", className)}>
            <div

                className={cn("h-4 rounded-full transition-all duration-500 ease-in-out", barCalssName)}
                style={{
                    width: `${round(progress, 2)}%`,
                    background: 'linear-gradient(270deg, #21CA53 0%, rgba(33, 202, 83, 0.2) 100%)'
                }}
            ></div>
        </div>
    )
}