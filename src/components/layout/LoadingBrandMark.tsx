import { AnimatePresence, motion } from "framer-motion"
import { personal } from "@/data/portfolio"
import { easeFilm } from "@/lib/animations"
import { cn } from "@/lib/utils"

type BrandSize = "sm" | "md" | "lg"

export const NAME_REVEAL_AT = 10

type LoadingBrandMarkProps = {
  className?: string
  logoSize?: BrandSize
  showLogo?: boolean
  showName?: boolean
  showDivider?: boolean
  animateName?: boolean
  progress?: number
}

const logoShellClass: Record<BrandSize, string> = {
  sm: "size-20 md:size-24",
  md: "size-24 md:size-28",
  lg: "size-[7.5rem] md:size-[8.5rem]",
}

const logoImageClass: Record<BrandSize, string> = {
  sm: "size-11 md:size-12",
  md: "size-14 md:size-16",
  lg: "size-14 md:size-16",
}

const nameClass: Record<BrandSize, string> = {
  sm: "text-xl tracking-[0.2em] md:text-2xl",
  md: "text-2xl tracking-[0.25em] md:text-4xl",
  lg: "text-2xl tracking-[0.25em] md:text-4xl",
}

export const loadingScreenPositionClass =
  "absolute inset-0 z-10 flex items-center justify-center px-6 pb-[54vh] md:pb-[48vh]"

/** Home + Resume page-transition logo/name (raised above hero / robot) */
export const pageTransitionBrandPositionClass =
  "pb-[22vh] md:pb-[15vh]"

export function shouldRevealLoadingName(
  progress?: number,
  showName?: boolean,
): boolean {
  if (showName === false) return false
  if (showName === true) return true
  return progress !== undefined && progress >= NAME_REVEAL_AT
}

export function LoadingBrandLogo({
  size = "md",
  bare = false,
  className,
}: {
  size?: BrandSize
  bare?: boolean
  className?: string
}) {
  const image = (
    <img
      src="/favicon.png"
      alt=""
      className={cn("rounded-full", logoImageClass[size], bare && className)}
    />
  )

  if (bare) return image

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-full border border-cyan/30 bg-card/85 shadow-[0_0_40px_rgba(0,212,255,0.15)] backdrop-blur-sm",
        logoShellClass[size],
        className,
      )}
    >
      {image}
    </div>
  )
}

export function LoadingBrandName({
  size = "md",
  animate = false,
  className,
}: {
  size?: BrandSize
  animate?: boolean
  className?: string
}) {
  const NameTag = animate ? motion.h1 : "h1"

  return (
    <NameTag
      className={cn(
        "font-display font-light text-foreground",
        nameClass[size],
        className,
      )}
      {...(animate
        ? {
            initial: { opacity: 0, y: 10, clipPath: "inset(0 100% 0 0)" },
            animate: { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" },
            exit: { opacity: 0, y: -6 },
            transition: { duration: 0.7, ease: easeFilm },
          }
        : {})}
    >
      {personal.name.toUpperCase()}
    </NameTag>
  )
}

export function LoadingBrandMark({
  className,
  logoSize = "md",
  showLogo = true,
  showName,
  showDivider = false,
  animateName = false,
  progress,
}: LoadingBrandMarkProps) {
  const revealName = shouldRevealLoadingName(progress, showName)
  const instantName = showName === true

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {showLogo && <LoadingBrandLogo size={logoSize} />}

      <AnimatePresence mode="wait">
        {revealName && (
          <motion.div
            key="loading-brand-name"
            initial={instantName ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: instantName ? 0.2 : 0.35, ease: easeFilm }}
            className={cn(showLogo && "mt-6")}
          >
            <LoadingBrandName
              size={logoSize}
              animate={!instantName && (animateName || revealName)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showDivider && revealName && (
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

export function LoadingScreenCenter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(loadingScreenPositionClass, className)}>
      {children}
    </div>
  )
}
