import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { NAME_REVEAL_AT } from "@/components/layout/LoadingBrandMark"
import { BrandedLoadingOverlay } from "@/components/layout/BrandedLoadingOverlay"

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
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!visible) {
      setProgress(0)
      return
    }

    const duration = 1100
    const start = performance.now()
    let frameId = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 2.2)
      let next = eased * 100

      if (elapsed < 650) {
        next = Math.min(next, NAME_REVEAL_AT - 1)
      }

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
    <BrandedLoadingOverlay
      visible={visible}
      status="Rendering layout"
      progress={progress}
      showProgress
      ghost={<GhostPageLayout />}
    />
  )
}
