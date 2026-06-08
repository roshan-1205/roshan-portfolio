import { AnimatePresence, motion } from "framer-motion"
import { ScanOverlay } from "@/components/effects/ScanOverlay"
import { BrandedLoadingPanel } from "@/components/layout/BrandedLoadingPanel"
import { useSimulatedLoadingProgress } from "@/hooks/useSimulatedLoadingProgress"
import { easeFilm } from "@/lib/animations"
import { cn } from "@/lib/utils"

type BrandedLoadingOverlayProps = {
  visible: boolean
  status: string
  progress?: number
  simulateProgress?: boolean
  showProgress?: boolean
  showScanOverlay?: boolean
  mode?: "fixed" | "absolute"
  className?: string
  ghost?: React.ReactNode
}

export function BrandedLoadingOverlay({
  visible,
  status,
  progress,
  simulateProgress = false,
  showProgress = false,
  showScanOverlay = true,
  mode = "fixed",
  className,
  ghost,
}: BrandedLoadingOverlayProps) {
  const simulatedProgress = useSimulatedLoadingProgress(
    visible && progress === undefined && simulateProgress,
  )
  const effectiveProgress = progress ?? simulatedProgress

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="branded-loading-overlay"
          className={cn(
            "overflow-hidden bg-background",
            mode === "fixed"
              ? "fixed inset-0 z-[280]"
              : "absolute inset-0 z-20",
            className,
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: easeFilm }}
        >
          {ghost && (
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] blur-[1px]">
              {ghost}
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background/95" />

          {showScanOverlay && (
            <ScanOverlay progress={effectiveProgress} status={status} />
          )}

          <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
            <BrandedLoadingPanel
              status={status}
              progress={effectiveProgress}
              simulateProgress={false}
              showProgress={showProgress}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
