import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ScanOverlay } from "@/components/effects/ScanOverlay"
import { personal } from "@/data/portfolio"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { easeFilm } from "@/lib/animations"

interface PreloaderProps {
  onComplete: () => void
}

const SCAN_STATUSES = [
  "INITIALIZING CORE",
  "SCANNING PORTFOLIO",
  "LOADING MODULES",
  "SYNCING ASSETS",
  "VERIFYING SYSTEMS",
] as const

const RING_SIZE = 176
const RING_STROKE = 3
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export function Preloader({ onComplete }: PreloaderProps) {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<"scan" | "logo" | "exit">("scan")
  const [progress, setProgress] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)

  const displayPercent = Math.min(100, Math.max(0, Math.round(progress)))

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      const timer = setTimeout(() => {
        setVisible(false)
        onComplete()
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [reducedMotion, onComplete])

  useEffect(() => {
    if (reducedMotion || phase !== "scan") return

    const duration = 3600
    const start = performance.now()
    let frameId = 0
    let cancelled = false

    const tick = (now: number) => {
      if (cancelled) return

      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 2.4)
      const next = eased * 100

      setProgress(next)
      setStatusIndex(
        Math.min(
          SCAN_STATUSES.length - 1,
          Math.floor((next / 100) * SCAN_STATUSES.length),
        ),
      )

      if (t < 1) {
        frameId = requestAnimationFrame(tick)
        return
      }

      setProgress(100)
      setStatusIndex(SCAN_STATUSES.length - 1)
      window.setTimeout(() => setPhase("logo"), 300)
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
    }
  }, [phase, reducedMotion])

  useEffect(() => {
    if (reducedMotion || phase !== "logo") return
    const timer = setTimeout(() => setPhase("exit"), 1800)
    return () => clearTimeout(timer)
  }, [phase, reducedMotion])

  useEffect(() => {
    if (reducedMotion || phase !== "exit") return
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 900)
    return () => clearTimeout(timer)
  }, [phase, reducedMotion, onComplete])

  if (reducedMotion) return null

  const ringOffset = RING_CIRCUMFERENCE * (1 - progress / 100)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase === "exit" ? 0 : 1,
            clipPath:
              phase === "exit" ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
          }}
          transition={{ duration: phase === "exit" ? 0.7 : 0.3, ease: easeFilm }}
        >
          <ScanOverlay
            progress={progress}
            status={SCAN_STATUSES[statusIndex]}
          />

          {phase === "scan" && (
            <motion.div
              className="relative z-10 flex flex-col items-center px-6"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: easeFilm }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ width: RING_SIZE, height: RING_SIZE }}
              >
                <svg
                  className="absolute inset-0 -rotate-90"
                  width={RING_SIZE}
                  height={RING_SIZE}
                  viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
                  aria-hidden
                >
                  <circle
                    cx={RING_SIZE / 2}
                    cy={RING_SIZE / 2}
                    r={RING_RADIUS}
                    fill="none"
                    stroke="rgba(0,212,255,0.12)"
                    strokeWidth={RING_STROKE}
                  />
                  <circle
                    cx={RING_SIZE / 2}
                    cy={RING_SIZE / 2}
                    r={RING_RADIUS}
                    fill="none"
                    stroke="url(#scanRingGradient)"
                    strokeWidth={RING_STROKE}
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={ringOffset}
                    className="scan-ring-progress"
                  />
                  <defs>
                    <linearGradient
                      id="scanRingGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="rgba(0,212,255,0.9)" />
                      <stop offset="100%" stopColor="rgba(123,47,247,0.9)" />
                    </linearGradient>
                  </defs>
                </svg>

                <motion.div
                  className="absolute inset-3 rounded-full border border-dashed border-cyan/25"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative flex size-[7.5rem] items-center justify-center overflow-hidden rounded-full border border-cyan/30 bg-card/85 shadow-[0_0_40px_rgba(0,212,255,0.15)] backdrop-blur-sm md:size-[8.5rem]">
                  <img
                    src="/favicon.png"
                    alt=""
                    className="relative z-10 size-14 rounded-full md:size-16"
                  />
                  <motion.div
                    className="scan-radar-sweep absolute inset-0 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  />
                  <div
                    className="scan-radar-ping absolute inset-0 rounded-full"
                    style={{ opacity: 0.15 + (progress / 100) * 0.35 }}
                  />
                </div>
              </div>

              <div className="mt-10 text-center">
                <motion.p
                  className="font-mono-ui text-[10px] tracking-[0.4em] text-cyan/80 uppercase"
                  animate={{ opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  {SCAN_STATUSES[statusIndex]}
                </motion.p>

                <div
                  className="mt-4 flex items-end justify-center gap-1"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="min-w-[3ch] font-display text-6xl font-light leading-none tracking-tight text-foreground tabular-nums md:min-w-[4ch] md:text-7xl">
                    {displayPercent}
                  </span>
                  <span className="mb-2 font-mono-ui text-2xl font-medium text-cyan md:text-3xl">
                    %
                  </span>
                </div>

                <p className="mt-3 font-mono-ui text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
                  System scan in progress
                </p>
              </div>
            </motion.div>
          )}

          {phase === "logo" && (
            <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.p
                className="mb-4 font-mono-ui text-[10px] tracking-[0.4em] text-cyan/70 uppercase"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Scan complete · 100%
              </motion.p>
              <motion.h1
                className="font-display text-4xl font-light tracking-[0.3em] text-foreground md:text-6xl"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1.2, ease: easeFilm }}
              >
                {personal.name.toUpperCase()}
              </motion.h1>
              <motion.div
                className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-cyan to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: easeFilm }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
