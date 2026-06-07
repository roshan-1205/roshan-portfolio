import { motion } from "framer-motion"
import { fadeUp } from "@/lib/animations"

interface SectionLabelProps {
  label: string
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      className="mb-6"
    >
      <span className="block w-fit font-mono-ui text-[11px] leading-relaxed tracking-[0.22em] text-cyan uppercase sm:text-xs sm:tracking-[0.28em]">
        {label}
      </span>
      <motion.div
        className="mt-3 h-px w-24 bg-gradient-to-r from-cyan/70 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  )
}
