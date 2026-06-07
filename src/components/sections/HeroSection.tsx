import { motion } from "framer-motion"
import { ArrowDown, Download } from "lucide-react"
import { HeroRobotGuide } from "@/components/avatar/HeroRobotGuide"
import { personal } from "@/data/portfolio"
import { Starfield } from "@/components/effects/Starfield"
import { TextReveal } from "@/components/effects/TextReveal"
import { Button } from "@/components/ui/button"
import { easeFilm } from "@/lib/animations"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16"
    >
      <Starfield />

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 size-96 rounded-full bg-cyan/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 size-80 rounded-full bg-purple/5 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <HeroRobotGuide />

        <div className="mt-12 text-center lg:mt-16">
          <h1 className="font-display text-[clamp(2rem,6vw,5rem)] leading-[0.95] font-light tracking-tight">
            <TextReveal
              text={personal.name}
              as="span"
              className="block text-gradient-cyan"
              delay={0.5}
            />
          </h1>

          <motion.div
            className="mx-auto my-8 h-px w-32 bg-gradient-to-r from-transparent via-cyan to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 2.5, ease: easeFilm }}
          />

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8, ease: easeFilm }}
          >
            <Button
              asChild
              size="lg"
              className="h-12 border-cyan/30 bg-cyan/10 px-8 font-mono-ui text-xs tracking-widest text-cyan uppercase hover:bg-cyan/20"
            >
              <a href="#projects">View My Work</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 border-border/50 px-8 font-mono-ui text-xs tracking-widest uppercase"
            >
              <a href={personal.cvUrl} download>
                <Download className="mr-2 size-4" />
                Download CV
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-5 text-muted-foreground" />
        </motion.div>
        <span className="font-mono-ui text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          Scroll to Explore
        </span>
      </motion.div>
    </section>
  )
}
