import { motion } from "framer-motion"
import { Award } from "lucide-react"
import { certifications, timeline } from "@/data/portfolio"
import { SectionLabel } from "@/components/layout/SectionLabel"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  fadeUp,
  lineGrow,
  slideFromLeft,
  staggerContainer,
  staggerSlow,
} from "@/lib/animations"

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel label="04 / ACHIEVEMENTS & CERTIFICATIONS" />

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 font-display text-[clamp(2rem,5vw,4rem)] font-light"
        >
          <span className="block">Milestones &</span>
          <span className="block text-gradient-cyan">Recognition</span>
        </motion.h2>

        <div className="relative">
          <motion.div
            className="absolute top-0 left-4 w-px origin-top bg-gradient-to-b from-cyan via-purple to-transparent md:left-1/2 md:-translate-x-px"
            variants={lineGrow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ height: "100%" }}
          />

          <motion.div
            className="space-y-16"
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                variants={slideFromLeft}
                transition={{ delay: i * 0.2 }}
                className={`relative grid gap-8 md:grid-cols-2 ${
                  i % 2 === 0
                    ? "md:[&>*:last-child]:pl-12"
                    : "md:[&>*:first-child]:order-2 md:[&>*:last-child]:pr-12 md:[&>*:last-child]:text-right"
                }`}
              >
                <div className={`${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="absolute left-4 size-3 -translate-x-1/2 rounded-full border-2 border-cyan bg-background md:left-1/2" />
                  <span className="font-mono-ui text-sm text-cyan">
                    {item.year}
                  </span>
                  <p className="font-mono-ui text-[10px] tracking-wider text-muted-foreground uppercase">
                    {item.label}
                  </p>
                </div>

                <div
                  className={`ml-10 rounded-xl border border-border/30 bg-card/50 p-6 backdrop-blur-sm md:ml-0 ${
                    i % 2 === 1 ? "md:mr-10" : "md:ml-10"
                  }`}
                >
                  <h4 className="font-display text-xl font-light">
                    {item.title}
                  </h4>
                  <p className="mt-1 font-mono-ui text-xs text-cyan/70">
                    {item.organization}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-32 grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <Card className="h-full border-border/30 bg-card/80 transition-shadow hover:shadow-[0_0_30px_rgba(123,47,247,0.08)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-purple/10"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Award className="size-6 text-purple" />
                    </motion.div>
                    <div>
                      <h4 className="font-display text-lg font-light">
                        {cert.title}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {cert.issuer}
                        {cert.instructor && ` · ${cert.instructor}`}
                      </p>
                      <p className="mt-1 font-mono-ui text-xs text-cyan">
                        {cert.year} · {cert.credential}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {cert.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="font-mono-ui text-[9px]"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
