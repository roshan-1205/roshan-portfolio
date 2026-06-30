import { motion } from "framer-motion"

export function RobotChestLogo() {
  return (
    <motion.div
      className="robot-chest-logo pointer-events-none absolute left-1/2 z-[4] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Outer pulsing glow ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 72, height: 72 }}
        animate={{
          boxShadow: [
            "0 0 16px 4px rgba(0,212,255,0.15), 0 0 40px 8px rgba(0,212,255,0.06)",
            "0 0 24px 8px rgba(0,212,255,0.3), 0 0 60px 16px rgba(0,212,255,0.12)",
            "0 0 16px 4px rgba(0,212,255,0.15), 0 0 40px 8px rgba(0,212,255,0.06)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating orbital ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 64,
          height: 64,
          background: "conic-gradient(from 0deg, rgba(0,212,255,0.4), transparent 40%, transparent 60%, rgba(123,47,247,0.35), rgba(0,212,255,0.4))",
          maskImage: "radial-gradient(circle, transparent 55%, black 57%, black 100%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 55%, black 57%, black 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Static cyan border ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/30"
        style={{ width: 58, height: 58 }}
      />

      {/* Logo container with glassmorphism */}
      <motion.div
        className="relative flex items-center justify-center overflow-hidden rounded-full border border-cyan/40 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
        style={{
          width: 50,
          height: 50,
          background: "radial-gradient(circle at 35% 35%, rgba(13,13,26,0.95), rgba(2,2,7,0.98))",
          backdropFilter: "blur(12px)",
        }}
        animate={{
          borderColor: [
            "rgba(0,212,255,0.4)",
            "rgba(123,47,247,0.5)",
            "rgba(0,212,255,0.4)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Inner subtle glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 25%, rgba(0,212,255,0.12), transparent 60%)",
          }}
        />

        <img
          src="/favicon.png"
          alt=""
          className="relative z-[1] rounded-full"
          style={{ width: 32, height: 32 }}
          decoding="async"
        />
      </motion.div>
    </motion.div>
  )
}
