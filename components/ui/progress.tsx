import { cn } from "@/lib/utils";

export function ProgressBar({ progress, className, barCalssName }: { progress: number, className?: string, barCalssName?: string }) {
    return (
        <div className={cn("w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 overflow-hidden", className)}>
            <div
                className={cn("bg-primary h-4 rounded-full transition-all duration-500 ease-in-out", barCalssName)}
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    )
}