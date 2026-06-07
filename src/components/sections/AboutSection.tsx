import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { aboutParagraphs, stats, techPillars } from "@/data/portfolio"
import { AnimatedCounter } from "@/components/effects/AnimatedCounter"
import { SectionLabel } from "@/components/layout/SectionLabel"
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  staggerSlow,
} from "@/lib/animations"

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section
      id="about"
      ref={ref}
      className="section-angled relative overflow-hidden bg-card py-32 md:py-40"
    >
      <motion.div
        className="pointer-events-none absolute -top-20 right-0 font-display text-[20vw] leading-none font-light text-foreground/[0.02] select-none"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        ABOUT
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionLabel label="01 / ABOUT ME" />

        <div className="grid items-start gap-16 lg:grid-cols-2">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
          >
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-tight font-light">
              <span className="block">Building Systems Where</span>
              <span className="block text-gradient-cyan">
                AI Meets Human Needs
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="space-y-6"
          >
            {aboutParagraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-base leading-relaxed text-muted-foreground md:text-lg"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-20 grid gap-6 md:grid-cols-3"
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {techPillars.map((pillar) => (
            <motion.div
              key={pillar.stack}
              variants={fadeUp}
              className="rounded-xl border border-border/30 bg-background/50 p-6 backdrop-blur-sm"
            >
              <span className="text-2xl">{pillar.icon}</span>
              <p className="mt-4 font-mono-ui text-xs tracking-wider text-cyan">
                {pillar.stack}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{pillar.focus}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={slideFromRight}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-border/30 bg-background/50 p-6 backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-purple/5 opacity-0 transition-opacity group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />
              <div className="relative">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-4xl font-light text-cyan md:text-5xl"
                />
                <p className="mt-2 font-mono-ui text-[10px] tracking-wider text-muted-foreground uppercase">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
