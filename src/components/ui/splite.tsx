import { Suspense, lazy } from "react"
import { BrandedLoadingOverlay } from "@/components/layout/BrandedLoadingOverlay"

const Spline = lazy(() => import("@splinetool/react-spline"))

interface SplineSceneProps {
  scene: string
  className?: string
}

function SplineLoadingFallback() {
  return (
    <div className="relative h-full min-h-[280px] w-full">
      <BrandedLoadingOverlay
        visible
        mode="absolute"
        status="Loading 3D scene"
        simulateProgress
        showScanOverlay={false}
      />
    </div>
  )
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={<SplineLoadingFallback />}>
      <Spline
        scene={scene}
        className={className}
        style={{ background: "transparent" }}
      />
    </Suspense>
  )
}
