import { motion } from "framer-motion"
import { personal } from "@/data/portfolio"
import { SplineRobotScene } from "@/components/avatar/SplineRobotScene"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import robotRef from "@/assets/avatar/white-ball-robot-ref.png"

interface RoboticAvatarPresenterProps {
  speaking: boolean
  lineIndex: number
  charProgress: number
  className?: string
}

export function RoboticAvatarPresenter({
  speaking,
  charProgress,
  className,
}: RoboticAvatarPresenterProps) {
  const reducedMotion = useReducedMotion()

  const mouthBars = Math.min(
    5,
    Math.max(1, Math.floor((charProgress % 12) / 3) + 1),
  )

  return (
    <div className={`w-full ${className ?? ""}`}>
      <div className="overflow-hidden rounded-xl border border-cyan/25 bg-card/70 shadow-[0_0_30px_rgba(0,212,255,0.06)] backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-cyan/15 bg-background/40 px-4 py-2.5">
          <span className="font-mono-ui text-[9px] tracking-[0.25em] text-cyan uppercase">
            Unit · {personal.name.split(" ")[0]}-BOT
          </span>
          <div className="flex items-center gap-2">
            <motion.span
              className="size-1.5 rounded-full bg-cyan"
              animate={{ opacity: speaking ? [1, 0.3, 1] : 0.45 }}
              transition={{
                duration: speaking ? 0.4 : 1.4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="font-mono-ui text-[9px] tracking-[0.15em] text-muted-foreground uppercase">
              {speaking ? "Transmitting" : "Standby"}
            </span>
          </div>
        </div>

        <div className="relative h-[min(52vw,400px)] min-h-[320px] w-full">
          {reducedMotion ? (
            <div className="robot-viewport-inner spline-robot-theme flex h-full items-center justify-center p-4">
              <img
                src={robotRef}
                alt="Robot assistant"
                className="h-full w-full object-contain object-center"
              />
            </div>
          ) : (
            <SplineRobotScene className="h-full" />
          )}

          <div className="pointer-events-none absolute inset-3 z-10 rounded-lg border border-cyan/15">
            <span className="absolute -top-px -left-px size-4 border-t-2 border-l-2 border-cyan/50" />
            <span className="absolute -top-px -right-px size-4 border-t-2 border-r-2 border-cyan/50" />
            <span className="absolute -bottom-px -left-px size-4 border-b-2 border-l-2 border-cyan/25" />
            <span className="absolute -right-px -bottom-px size-4 border-r-2 border-b-2 border-cyan/25" />
          </div>

          <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-end gap-1 rounded-md border border-cyan/20 bg-card/90 px-3 py-2 shadow-[0_0_20px_rgba(0,212,255,0.08)] backdrop-blur-md">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-sm bg-cyan"
                animate={{
                  height: speaking && i < mouthBars ? [5, 14, 7, 16, 5] : 4,
                  opacity: speaking && i < mouthBars ? 1 : 0.25,
                }}
                transition={
                  speaking
                    ? {
                        duration: 0.32,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.04,
                      }
                    : { duration: 0.1 }
                }
              />
            ))}
            <span className="ml-2 font-mono-ui text-[8px] tracking-widest text-cyan/70 uppercase">
              Voc
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 border-t border-cyan/10 bg-background/30 px-4 py-2">
          <span className="size-1 rounded-full bg-purple/60" />
          <span className="font-mono-ui text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
            Spline 3D · Voice Guide
          </span>
          <span className="size-1 rounded-full bg-cyan/60" />
        </div>
      </div>
    </div>
  )
}
