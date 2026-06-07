import { motion } from "framer-motion"
import { letterReveal } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface TextRevealProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  delay?: number
}

export function TextReveal({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
}: TextRevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={`inline-flex flex-wrap overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i + delay}
          variants={letterReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="inline-block"
          style={{ perspective: "600px" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  )
}
