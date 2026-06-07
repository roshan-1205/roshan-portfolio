import { motion } from "framer-motion"
import { Award, Trash2 } from "lucide-react"
import { AddCertificateForm } from "@/components/certificates/AddCertificateForm"
import { CertificateImagePanel } from "@/components/certificates/CertificateImagePanel"
import { timeline } from "@/data/portfolio"
import { useCertificatesList } from "@/hooks/useCertificatesList"
import { SectionLabel } from "@/components/layout/SectionLabel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  fadeUp,
  lineGrow,
  slideFromLeft,
  staggerContainer,
  staggerSlow,
} from "@/lib/animations"

export function AchievementsSection() {
  const { certs, addCertificate, deleteCertificate } = useCertificatesList()

  return (
    <section
      id="achievements"
      className="relative overflow-x-clip py-20 sm:py-28 md:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 md:px-6">
        <SectionLabel label="04 / ACHIEVEMENTS & CERTIFICATIONS" />

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 font-display text-[clamp(1.75rem,5vw,4rem)] font-light sm:mb-16 md:mb-20"
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
            className="space-y-12 sm:space-y-16"
            variants={staggerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                variants={slideFromLeft}
                transition={{ delay: i * 0.2 }}
                className={`relative grid gap-6 md:grid-cols-2 md:gap-8 ${
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
                  className={`ml-10 rounded-xl border border-border/30 bg-card/50 p-4 backdrop-blur-sm sm:p-6 md:ml-0 ${
                    i % 2 === 1 ? "md:mr-10" : "md:ml-10"
                  }`}
                >
                  <h4 className="font-display text-lg font-light sm:text-xl">
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
          className="mt-20 sm:mt-28 md:mt-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mb-8 flex flex-col gap-2 sm:mb-10">
            <p className="font-mono-ui text-[10px] tracking-[0.35em] text-purple/80 uppercase">
              Verified Credentials
            </p>
            <h3 className="font-display text-2xl font-light sm:text-3xl">
              Certificate Gallery
            </h3>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Upload certificate photos — saved to Cloudinary under{" "}
              <span className="font-mono-ui text-cyan/80">
                portfolio-certificates/
              </span>
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {certs.map((cert, i) => (
              <motion.div
                key={cert.id}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="relative min-w-0"
              >
                {cert.isCustom && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10 font-mono-ui text-[10px] text-destructive uppercase hover:text-destructive"
                    onClick={() => deleteCertificate(cert.id)}
                  >
                    <Trash2 className="mr-1 size-3" />
                    Remove
                  </Button>
                )}

                <Card className="h-full overflow-hidden border-border/30 bg-card/80 transition-shadow hover:shadow-[0_0_30px_rgba(123,47,247,0.08)]">
                  <CertificateImagePanel
                    certificateId={cert.id}
                    title={cert.title}
                    defaultImageUrl={cert.imageUrl}
                  />

                  <CardContent className="space-y-3 p-4 sm:p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple/10 sm:size-12">
                        <Award className="size-5 text-purple sm:size-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display text-base font-light sm:text-lg">
                          {cert.title}
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                          {cert.issuer}
                          {cert.instructor && ` · ${cert.instructor}`}
                        </p>
                        <p className="mt-1 font-mono-ui text-[10px] text-cyan sm:text-xs">
                          {cert.year} · {cert.credential}
                        </p>
                      </div>
                    </div>

                    {cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
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
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 flex justify-center sm:mt-10">
            <AddCertificateForm onAdd={addCertificate} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
