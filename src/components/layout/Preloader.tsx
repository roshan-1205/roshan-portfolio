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

export function Preloader({ onComplete }: PreloaderProps) {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<"scan" | "logo" | "exit">("scan")
  const [progress, setProgress] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)

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

    const duration = 3200
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const next = Math.min(100, (elapsed / duration) * 100)
      setProgress(next)
      setStatusIndex(
        Math.min(
          SCAN_STATUSES.length - 1,
          Math.floor((next / 100) * SCAN_STATUSES.length),
        ),
      )

      if (next >= 100) {
        setPhase("logo")
        return
      }

      requestAnimationFrame(tick)
    }

    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
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
              phase === "exit"
                ? "inset(0 0 100% 0)"
                : "inset(0 0 0 0)",
          }}
          transition={{ duration: phase === "exit" ? 0.7 : 0.3, ease: easeFilm }}
        >
          <ScanOverlay
            progress={progress}
            status={SCAN_STATUSES[statusIndex]}
          />

          {phase === "scan" && (
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: easeFilm }}
            >
              <div className="relative flex size-36 items-center justify-center md:size-44">
                <motion.div
                  className="absolute inset-0 rounded-full border border-cyan/20"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-dashed border-cyan/25"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 62%, rgba(0,212,255,0.45) 78%, transparent 94%)",
                  }}
                />

                <div className="relative flex size-24 items-center justify-center rounded-full border border-cyan/30 bg-card/80 backdrop-blur-sm md:size-28">
                  <img
                    src="/favicon.png"
                    alt=""
                    className="size-14 rounded-full md:size-16"
                  />
                  <motion.div
                    className="scan-radar-sweep absolute inset-0 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>

              <motion.p
                className="mt-8 font-mono-ui text-[10px] tracking-[0.4em] text-cyan/80 uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                {SCAN_STATUSES[statusIndex]}
              </motion.p>

              <p className="mt-2 font-mono-ui text-3xl font-light tracking-widest text-foreground tabular-nums">
                {Math.round(progress).toString().padStart(3, "0")}
                <span className="text-cyan/60">%</span>
              </p>
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
                Access granted
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
