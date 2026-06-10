import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from "react-dom"
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
  contentClassName?: string
  showName?: boolean
  logoSize?: "sm" | "md" | "lg"
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
  contentClassName,
  showName,
  logoSize = "md",
  ghost,
}: BrandedLoadingOverlayProps) {
  const simulatedProgress = useSimulatedLoadingProgress(
    visible && progress === undefined && simulateProgress,
  )
  const effectiveProgress = progress ?? simulatedProgress
  const instantReveal = showName === true

  const overlay = (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="branded-loading-overlay"
          className={cn(
            "overflow-hidden bg-background",
            mode === "fixed"
              ? "fixed inset-0 z-[100000]"
              : "absolute inset-0 z-20",
            className,
          )}
          initial={{ opacity: instantReveal ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: instantReveal ? 0.15 : 0.35,
            ease: easeFilm,
          }}
        >
          {ghost && (
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] blur-[1px]">
              {ghost}
            </div>
          )}

          {showScanOverlay && (
            <ScanOverlay progress={effectiveProgress} status={status} />
          )}

          <div
            className={cn(
              "absolute inset-0 z-30 flex items-center justify-center px-6",
              contentClassName,
            )}
          >
            <BrandedLoadingPanel
              status={status}
              progress={effectiveProgress}
              simulateProgress={false}
              showProgress={showProgress}
              showName={showName}
              logoSize={logoSize}
              instantReveal={instantReveal}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (mode === "fixed" && typeof document !== "undefined") {
    return createPortal(overlay, document.body)
  }

  return overlay
}
