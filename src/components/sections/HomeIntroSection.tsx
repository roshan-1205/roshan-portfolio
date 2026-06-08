import { motion } from "framer-motion"
import { IntroProfilePanel } from "@/components/intro/IntroProfilePanel"
import { homeIntroduction } from "@/data/portfolio"
import { SectionLabel } from "@/components/layout/SectionLabel"
import { fadeUp, staggerSlow } from "@/lib/animations"

export function HomeIntroSection() {
  return (
    <section className="relative border-t border-border/20 bg-card py-24 md:py-32">
      <div className="pointer-events-none absolute -right-8 top-12 font-display text-[18vw] font-light leading-none text-foreground/[0.02] select-none md:text-[12vw]">
        INTRO
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <SectionLabel label="LET ME INTRODUCE MYSELF" />

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-10 font-display text-[clamp(1.75rem,4vw,3rem)] font-light leading-tight md:mb-12"
            >
              <span className="block">A little about</span>
              <span className="block text-gradient-cyan">who I am</span>
            </motion.h2>

            <motion.div
              className="space-y-6 border-l border-cyan/20 pl-6 md:space-y-8 md:pl-10"
              variants={staggerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              {homeIntroduction.map((paragraph) => (
                <motion.p
                  key={paragraph}
                  variants={fadeUp}
                  className="text-base leading-relaxed text-muted-foreground md:text-lg md:leading-8"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
          </div>

          <div className="flex items-start justify-center lg:sticky lg:top-28 lg:justify-end lg:pr-4 xl:pr-8">
            <IntroProfilePanel />
          </div>
        </div>
      </div>
    </section>
  )
}
