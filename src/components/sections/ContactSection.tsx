import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Code, Globe, Mail, MapPin, Send, Zap, CheckCircle2 } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"
import { personal } from "@/data/portfolio"
import { SectionLabel } from "@/components/layout/SectionLabel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/contact-schema"
import { fadeUp, wipeReveal, staggerContainer, easeFilm } from "@/lib/animations"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  })

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 1500))
    console.log("Form submitted:", data)
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 4000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: LinkedInIcon,
      label: "LinkedIn",
      value: "roshan-kumar-singh-1205-dev",
      href: personal.linkedin,
    },
    {
      icon: GitHubIcon,
      label: "GitHub",
      value: "roshan-1205",
      href: personal.github,
    },
    {
      icon: Code,
      label: "LeetCode",
      value: "roshan-1205",
      href: personal.leetcode,
    },
    {
      icon: Globe,
      label: "Portfolio",
      value: "roshan-portfolio-indol.vercel.app",
      href: personal.portfolio,
    },
    {
      icon: MapPin,
      label: "Location",
      value: `${personal.location} · Open to Remote Worldwide`,
    },
    {
      icon: Zap,
      label: "Status",
      value: personal.status,
    },
  ]

  return (
    <section
      id="contact"
      className="section-angled relative overflow-hidden bg-card py-32 md:py-40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel label="05 / GET IN TOUCH" />

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-6 font-display text-[clamp(2rem,5vw,4rem)] font-light"
        >
          <span className="block">Let&apos;s Build Something</span>
          <span className="block text-gradient-cyan">Remarkable Together</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 max-w-2xl text-muted-foreground"
        >
          I&apos;m open to full-time roles, freelance, consulting, startup
          collaboration, speaking, and strategic partnerships. If you&apos;re
          building at the intersection of AI, cloud, and human-centered product
          — let&apos;s talk.
        </motion.p>

        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.label}
                variants={fadeUp}
                className="flex items-start gap-4"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-cyan/10">
                  <info.icon className="size-5 text-cyan" />
                </div>
                <div>
                  <p className="font-mono-ui text-[10px] tracking-wider text-muted-foreground uppercase">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground hover:text-cyan transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm text-foreground">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={wipeReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 rounded-2xl border border-border/30 bg-background/50 p-8 backdrop-blur-sm"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="font-mono-ui text-xs uppercase">
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="h-11 border-border/50 bg-card/50"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono-ui text-xs uppercase">
                  Your Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-11 border-border/50 bg-card/50"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="subject"
                  className="font-mono-ui text-xs uppercase"
                >
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="Project Inquiry / Collaboration / Say Hi"
                  className="h-11 border-border/50 bg-card/50"
                  {...register("subject")}
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="message"
                  className="font-mono-ui text-xs uppercase"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="border-border/50 bg-card/50"
                  {...register("message")}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full bg-cyan/90 font-mono-ui text-xs tracking-widest text-background uppercase hover:bg-cyan"
              >
                {isSubmitting ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Sending...
                  </motion.span>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 size-4" />
                  </>
                )}
              </Button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: easeFilm }}
                    className="flex items-center justify-center gap-2 rounded-lg bg-cyan/10 py-3 text-sm text-cyan"
                  >
                    <CheckCircle2 className="size-4" />
                    Message sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
