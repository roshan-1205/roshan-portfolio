import { motion } from "framer-motion"
import { LoadingBrandMark } from "@/components/layout/LoadingBrandMark"
import { useSimulatedLoadingProgress } from "@/hooks/useSimulatedLoadingProgress"
import { easeFilm } from "@/lib/animations"
import { cn } from "@/lib/utils"

type BrandedLoadingPanelProps = {
  status: string
  progress?: number
  className?: string
  logoSize?: "sm" | "md" | "lg"
  showProgress?: boolean
  simulateProgress?: boolean
}

export function BrandedLoadingPanel({
  status,
  progress,
  className,
  logoSize = "md",
  showProgress = false,
  simulateProgress = true,
}: BrandedLoadingPanelProps) {
  const simulatedProgress = useSimulatedLoadingProgress(
    progress === undefined && simulateProgress,
  )
  const effectiveProgress = progress ?? simulatedProgress

  const displayPercent = Math.min(
    100,
    Math.max(0, Math.round(effectiveProgress)),
  )

  return (
    <motion.div
      className={cn("flex flex-col items-center text-center", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeFilm }}
    >
      <LoadingBrandMark logoSize={logoSize} progress={effectiveProgress} />

      <motion.p
        className="mt-8 font-mono-ui text-[10px] tracking-[0.35em] text-cyan/80 uppercase"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {status}
      </motion.p>

      {showProgress && (
        <div
          className="mt-5 flex items-end justify-center gap-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="min-w-[3ch] font-display text-5xl font-light leading-none tracking-tight text-foreground tabular-nums md:text-6xl">
            {displayPercent}
          </span>
          <span className="mb-1.5 font-mono-ui text-xl font-medium text-cyan md:text-2xl">
            %
          </span>
        </div>
      )}
    </motion.div>
  )
}
