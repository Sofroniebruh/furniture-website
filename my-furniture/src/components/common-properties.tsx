import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Common({
    children,
    className,
}: {
    children: ReactNode,
    className?: string
}) {
    return (
        <div className={cn("w-full h-full px-4", className)}>
            {children}
        </div>
    )
}