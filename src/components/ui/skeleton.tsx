import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type SkeletonProps = HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted/30",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="skeleton-shimmer absolute inset-0"
      />
    </div>
  )
}
