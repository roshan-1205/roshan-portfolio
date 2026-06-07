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
      viewport={{ once: true, margin: "-10%" }}
      className="mb-4 flex items-center gap-4"
    >
      <span className="font-mono-ui text-xs tracking-[0.3em] text-cyan uppercase">
        {label}
      </span>
      <motion.div
        className="h-px flex-1 max-w-24 bg-gradient-to-r from-cyan/60 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  )
}
