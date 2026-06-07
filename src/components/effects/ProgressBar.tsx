import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { easeFilm } from "@/lib/animations"

interface ProgressBarProps {
  level: number
  delay?: number
}

export function ProgressBar({ level, delay = 0 }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <div
      ref={ref}
      className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-cyan to-purple"
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.8, ease: easeFilm, delay }}
      />
    </div>
  )
}
