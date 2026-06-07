import type { Variants } from "framer-motion"

export const easeFilm = [0.16, 1, 0.3, 1] as const
export const easeDrift = [0.22, 1, 0.36, 1] as const
export const easeSpring = [0.34, 1.56, 0.64, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: easeFilm },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: easeDrift },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.4 },
  },
}

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: "100%", rotateX: -80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 1.4,
      ease: easeFilm,
      delay: i * 0.04,
    },
  }),
}

export const slamIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeSpring },
  },
}

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -80, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: easeFilm },
  },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 80, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: easeFilm },
  },
}

export const wipeReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.8, ease: easeFilm },
  },
}

export const lineGrow: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 2.5, ease: easeDrift },
  },
}

export const irisWipe: Variants = {
  hidden: { clipPath: "circle(0% at 50% 50%)" },
  visible: {
    clipPath: "circle(150% at 50% 50%)",
    transition: { duration: 2.2, ease: easeFilm },
  },
}
