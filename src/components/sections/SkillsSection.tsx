import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { skillCategories } from "@/data/portfolio"
import { ProgressBar } from "@/components/effects/ProgressBar"
import { SectionLabel } from "@/components/layout/SectionLabel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { slamIn, staggerContainer, fadeUp, easeFilm } from "@/lib/animations"

function SkillCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]))
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]))

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      variants={slamIn}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-[1000px]"
    >
      <Card className="h-full border-border/30 bg-card/80 backdrop-blur-sm transition-shadow hover:shadow-[0_0_40px_rgba(0,212,255,0.08)]">
        <CardHeader>
          <motion.span
            className="text-3xl"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: easeFilm }}
          >
            {category.icon}
          </motion.span>
          <CardTitle className="font-display text-xl font-light">
            {category.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {category.skills.map((skill, si) => (
            <div key={skill.name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/80">{skill.name}</span>
                <span className="font-mono-ui text-xs text-cyan">
                  {skill.level}%
                </span>
              </div>
              <ProgressBar level={skill.level} delay={si * 0.1 + index * 0.2} />
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel label="02 / SKILLS & EXPERTISE" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light">
            What I Work With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Real-time systems · Clean UI/UX · Production-ready architecture —
            spanning AI/ML, full-stack development, data infrastructure, and
            cloud DevOps.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {skillCategories.map((category, i) => (
            <SkillCard key={category.title} category={category} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
