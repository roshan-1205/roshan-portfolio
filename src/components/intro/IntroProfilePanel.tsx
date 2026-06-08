import { motion } from "framer-motion"
import { User } from "lucide-react"
import { personal } from "@/data/portfolio"
import { fadeUp } from "@/lib/animations"

const SPARKLES = [
  { top: "8%", left: "18%", size: 3, delay: 0 },
  { top: "22%", right: "12%", size: 2, delay: 0.4 },
  { bottom: "18%", left: "10%", size: 2, delay: 0.8 },
  { bottom: "12%", right: "20%", size: 3, delay: 1.2 },
] as const

export function IntroProfilePanel() {
  const profileImageUrl = personal.profileImageUrl

  return (
    <motion.div
      className="flex w-full flex-col items-center lg:items-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      <div className="relative flex items-center justify-center py-4">
        {SPARKLES.map((sparkle, index) => (
          <motion.span
            key={index}
            className="intro-avatar-sparkle absolute rounded-full bg-cyan/40"
            style={{
              top: "top" in sparkle ? sparkle.top : undefined,
              left: "left" in sparkle ? sparkle.left : undefined,
              right: "right" in sparkle ? sparkle.right : undefined,
              bottom: "bottom" in sparkle ? sparkle.bottom : undefined,
              width: sparkle.size,
              height: sparkle.size,
            }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="intro-avatar-glow pointer-events-none absolute size-44 rounded-full sm:size-52 md:size-56" />

        <div className="intro-avatar-orbit pointer-events-none absolute size-48 sm:size-56 md:size-60" />

        <div className="group relative size-44 sm:size-52 md:size-56">
          <div className="intro-avatar-ring absolute -inset-1 rounded-full opacity-60 transition-all duration-500 group-hover:opacity-100" />

          <div className="relative size-full overflow-hidden rounded-full border border-cyan/25 bg-gradient-to-br from-cyan/10 via-card to-purple/10 p-[3px] shadow-[0_16px_48px_rgba(0,0,0,0.45)] transition-all duration-500 group-hover:scale-[1.05] group-hover:border-cyan/45 group-hover:shadow-[0_0_40px_rgba(0,212,255,0.12),0_0_50px_rgba(123,47,247,0.1)]">
            <div className="relative size-full overflow-hidden rounded-full border border-border/30 bg-card">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt={personal.name}
                  className="size-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-cyan/5 via-card to-purple/5">
                  <User className="size-10 text-cyan/30 sm:size-12" />
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-background/50 via-transparent to-cyan/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
