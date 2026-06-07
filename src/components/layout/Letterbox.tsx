import { motion, useScroll, useTransform } from "framer-motion"

export function Letterbox() {
  const { scrollYProgress } = useScroll()
  const height = useTransform(scrollYProgress, [0, 0.15], ["8vh", "0vh"])

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 right-0 left-0 z-[150] bg-black"
        style={{ height }}
      />
      <motion.div
        className="pointer-events-none fixed right-0 bottom-0 left-0 z-[150] bg-black"
        style={{ height }}
      />
    </>
  )
}
