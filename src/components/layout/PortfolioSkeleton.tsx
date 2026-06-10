import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from "react-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { easeFilm } from "@/lib/animations"

type PortfolioSkeletonProps = {
  visible: boolean
}

function GhostPageLayout() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex items-center justify-between border-b border-border/15 py-4">
        <Skeleton className="h-4 w-28 rounded-sm" />
        <div className="hidden gap-3 md:flex">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-16 rounded-sm" />
          ))}
        </div>
        <Skeleton className="size-9 rounded-md md:hidden" />
      </div>

      <section className="flex min-h-[72vh] flex-col items-center justify-center gap-6 pt-12">
        <Skeleton className="h-[min(42vh,320px)] w-full max-w-3xl rounded-2xl" />
        <Skeleton className="h-10 w-4/5 max-w-2xl rounded-lg" />
        <Skeleton className="h-10 w-3/5 max-w-xl rounded-lg" />
      </section>
    </div>
  )
}

export function PortfolioSkeleton({ visible }: PortfolioSkeletonProps) {
  const overlay = (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="portfolio-skeleton"
          className="fixed inset-0 z-[100000] bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: easeFilm }}
        >
          <GhostPageLayout />
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (typeof document !== "undefined") {
    return createPortal(overlay, document.body)
  }

  return overlay
}
