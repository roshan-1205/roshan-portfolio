import { motion } from "framer-motion"
import { personal } from "@/data/portfolio"
import { easeFilm } from "@/lib/animations"
import { cn } from "@/lib/utils"

type LoadingBrandMarkProps = {
  className?: string
  logoSize?: "sm" | "md" | "lg"
  showLogo?: boolean
  showName?: boolean
  showDivider?: boolean
  animateName?: boolean
}

const logoShellClass = {
  sm: "size-20 md:size-24",
  md: "size-24 md:size-28",
  lg: "size-[7.5rem] md:size-[8.5rem]",
} as const

const logoImageClass = {
  sm: "size-11 md:size-12",
  md: "size-14 md:size-16",
  lg: "size-14 md:size-16",
} as const

const nameClass = {
  sm: "text-xl tracking-[0.2em] md:text-2xl",
  md: "text-2xl tracking-[0.25em] md:text-4xl",
  lg: "text-2xl tracking-[0.25em] md:text-4xl",
} as const

export const loadingScreenPositionClass =
  "absolute inset-0 z-10 flex items-center justify-center px-6 pb-[54vh] md:pb-[48vh]"

export function LoadingBrandMark({
  className,
  logoSize = "md",
  showLogo = true,
  showName = true,
  showDivider = false,
  animateName = false,
}: LoadingBrandMarkProps) {
  const NameTag = animateName ? motion.h1 : "h1"

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {showLogo && (
        <div
          className={cn(
            "flex items-center justify-center overflow-hidden rounded-full border border-cyan/30 bg-card/85 shadow-[0_0_40px_rgba(0,212,255,0.15)] backdrop-blur-sm",
            logoShellClass[logoSize],
          )}
        >
          <img
            src="/favicon.png"
            alt=""
            className={cn("rounded-full", logoImageClass[logoSize])}
          />
        </div>
      )}

      {showName && (
        <NameTag
          className={cn(
            "font-display font-light text-foreground",
            showLogo ? "mt-6" : "",
            nameClass[logoSize],
          )}
          {...(animateName
            ? {
                initial: { opacity: 0, y: 12, clipPath: "inset(0 100% 0 0)" },
                animate: { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" },
                transition: { duration: 1.2, ease: easeFilm },
              }
            : {})}
        >
          {personal.name.toUpperCase()}
        </NameTag>
      )}

      {showDivider && showName && (
        <motion.div
          className="mt-5 h-px bg-gradient-to-r from-transparent via-cyan to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 220, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: easeFilm }}
        />
      )}
    </div>
  )
}
