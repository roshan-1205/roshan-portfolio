import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { personal } from "@/data/portfolio"
import { easeFilm } from "@/lib/animations"

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState<"countdown" | "logo" | "exit">("countdown")
  const [count, setCount] = useState(5)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    if (phase !== "countdown") return

    const timer = setTimeout(() => {
      if (count <= 3) {
        if (count === 3) setPhase("logo")
        else setCount((c) => c - 1)
      } else {
        setCount((c) => c - 1)
      }
    }, count <= 3 ? 800 : 500)

    return () => clearTimeout(timer)
  }, [count, phase])

  useEffect(() => {
    if (phase !== "logo") return
    const timer = setTimeout(() => setPhase("exit"), 2200)
    return () => clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== "exit") return
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 1800)
    return () => clearTimeout(timer)
  }, [phase, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[300] flex items-center justify-center bg-background"
          initial={{ clipPath: "circle(100% at 50% 50%)" }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          transition={{ duration: phase === "exit" ? 0.6 : 0.3, ease: easeFilm }}
        >
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <motion.div
              className="h-px w-full bg-cyan"
              animate={{ y: ["0vh", "100vh"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {phase === "countdown" && count >= 3 && (
            <motion.div
              className="relative flex size-32 items-center justify-center rounded-full border border-cyan/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 70%, rgba(0,212,255,0.3) 100%)",
                }}
              />
              <motion.span
                key={count}
                className="font-display text-6xl font-light text-cyan"
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {count}
              </motion.span>
            </motion.div>
          )}

          {phase === "logo" && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.h1
                className="font-display text-4xl font-light tracking-[0.3em] text-foreground md:text-6xl"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1.6, ease: easeFilm }}
              >
                {personal.name.toUpperCase()}
              </motion.h1>
              <motion.div
                className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-cyan to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 1.2, delay: 0.4, ease: easeFilm }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
