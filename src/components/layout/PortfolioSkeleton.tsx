import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { ScanOverlay } from "@/components/effects/ScanOverlay"
import { easeFilm } from "@/lib/animations"

type PortfolioSkeletonProps = {
  visible: boolean
}

export function PortfolioSkeleton({ visible }: PortfolioSkeletonProps) {
  const [progress, setProgress] = useState(92)

  useEffect(() => {
    if (!visible) {
      setProgress(92)
      return
    }

    const duration = 1000
    const start = performance.now()
    let frameId = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const next = 92 + t * 8
      setProgress(next)

      if (t < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        setProgress(100)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="portfolio-skeleton"
          className="fixed inset-0 z-[250] overflow-y-auto bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: easeFilm }}
        >
          <ScanOverlay progress={progress} status="RENDERING LAYOUT" />

          <div className="relative mx-auto max-w-7xl px-6 pb-24">
            <div className="flex items-center justify-between border-b border-border/20 py-4">
              <Skeleton className="h-4 w-24 rounded-sm" />
              <div className="hidden gap-3 md:flex">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-3 w-14 rounded-sm" />
                ))}
              </div>
              <Skeleton className="h-8 w-8 rounded-md md:hidden" />
            </div>

            <section className="flex min-h-[85vh] flex-col items-center justify-center pt-16">
              <Skeleton className="mx-auto h-[280px] w-full max-w-2xl rounded-2xl border border-border/20" />
              <Skeleton className="mt-12 h-12 w-3/4 max-w-xl rounded-lg" />
              <Skeleton className="mt-4 h-12 w-1/2 max-w-md rounded-lg" />
              <div className="mt-8 flex gap-4">
                <Skeleton className="h-11 w-36 rounded-full" />
                <Skeleton className="h-11 w-36 rounded-full" />
              </div>
            </section>

            <section className="py-24">
              <Skeleton className="h-3 w-32 rounded-sm" />
              <Skeleton className="mt-6 h-10 w-2/3 max-w-lg rounded-lg" />
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <Skeleton className="h-28 rounded-xl" />
                <Skeleton className="h-28 rounded-xl" />
              </div>
              <Skeleton className="mt-6 h-20 w-full rounded-xl" />
            </section>

            <section className="py-24">
              <Skeleton className="h-3 w-28 rounded-sm" />
              <Skeleton className="mt-6 h-10 w-1/2 max-w-sm rounded-lg" />
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 rounded-2xl" />
                ))}
              </div>
            </section>

            <section className="py-24">
              <Skeleton className="h-3 w-36 rounded-sm" />
              <Skeleton className="mt-6 h-10 w-3/5 max-w-md rounded-lg" />
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="mt-16 grid items-center gap-10 lg:grid-cols-2"
                >
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-20 rounded-sm" />
                    <Skeleton className="h-4 w-40 rounded-sm" />
                    <Skeleton className="h-8 w-full max-w-md rounded-lg" />
                    <Skeleton className="h-20 w-full rounded-xl" />
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Skeleton key={j} className="h-6 w-16 rounded-full" />
                      ))}
                    </div>
                  </div>
                  <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                </div>
              ))}
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
