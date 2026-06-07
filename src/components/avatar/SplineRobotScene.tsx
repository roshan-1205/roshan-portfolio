import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { avatarIntro } from "@/data/avatar-intro"

interface SplineRobotSceneProps {
  className?: string
}

export function SplineRobotScene({ className }: SplineRobotSceneProps) {
  return (
    <div
      className={`robot-viewport-inner spline-robot-theme relative h-full w-full overflow-hidden ${className ?? ""}`}
    >
      <Spotlight
        className="-top-32 left-0 opacity-20 md:-top-20 md:left-12"
        fill="#00d4ff"
      />

      <div className="robot-viewport-grid pointer-events-none absolute inset-0 z-[1] opacity-40" />

      <SplineScene scene={avatarIntro.splineScene} className="relative z-[2] h-full w-full" />

      <div className="spline-robot-shine pointer-events-none absolute inset-0 z-[3]" />
      <div className="spline-robot-vignette pointer-events-none absolute inset-0 z-[3]" />
    </div>
  )
}
