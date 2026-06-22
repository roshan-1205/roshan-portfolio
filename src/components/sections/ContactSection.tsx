import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { useState } from "react"
import {
  Code,
  Globe,
  Mail,
  MapPin,
  Send,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react"
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
import {
  getDirectEmailFallback,
  sendContactMessage,
} from "@/lib/send-contact"
import { useIsMobile } from "@/hooks/useIsMobile"
import { fadeUp, staggerContainer, easeFilm } from "@/lib/animations"
import { cn } from "@/lib/utils"

const MESSAGE_MAX = 2000

const fieldClassName =
  "h-11 min-h-[44px] w-full max-w-full border-border/50 bg-card/50 text-base sm:text-sm"

export function ContactSection() {
  const isMobile = useIsMobile()
  const [submitState, setSubmitState] = useState<
    "idle" | "success" | "error"
  >("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  })

  const messageValue = watch("message") ?? ""
  const messageCount = messageValue.length

  const onSubmit = async (data: ContactFormData) => {
    if (data.website) return

    setSubmitState("idle")
    setSubmitMessage("")

    try {
      const result = await sendContactMessage(data)
      setSubmitState("success")
      setSubmitMessage(result.message)
      reset()
      window.setTimeout(() => setSubmitState("idle"), 6000)
    } catch (error) {
      setSubmitState("error")
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      )
    }
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
      className="section-angled relative overflow-x-clip bg-card py-16 sm:py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto box-border w-full max-w-7xl px-3 sm:px-5 md:px-6">
        <SectionLabel label="05 / GET IN TOUCH" />

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-4 font-display text-[clamp(1.65rem,7vw,4rem)] leading-tight font-light sm:mb-6"
        >
          <span className="block">Let&apos;s Build Something</span>
          <span className="block text-gradient-cyan">Remarkable Together</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mb-12 sm:text-base"
        >
          I&apos;m open to full-time roles, freelance, consulting, startup
          collaboration, speaking, and strategic partnerships. If you&apos;re
          building at the intersection of AI, cloud, and human-centered product
          — let&apos;s talk.
        </motion.p>

        <div className="grid w-full min-w-0 grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: isMobile ? 0.05 : 0.2 }}
            className="contact-form-panel order-1 w-full min-w-0 max-w-full lg:order-2"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="box-border w-full max-w-full space-y-3.5 rounded-xl border border-border/30 bg-background/50 p-3 backdrop-blur-sm sm:space-y-4 sm:rounded-2xl sm:p-5 md:space-y-5 md:p-8"
              noValidate
            >
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden
                {...register("website")}
              />

              <div className="min-w-0 space-y-1.5 sm:space-y-2">
                <Label
                  htmlFor="name"
                  className="font-mono-ui text-[11px] uppercase sm:text-xs"
                >
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  autoComplete="name"
                  className={cn(
                    fieldClassName,
                    touchedFields.name &&
                      !errors.name &&
                      "border-cyan/40 ring-1 ring-cyan/20",
                  )}
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-destructive" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="min-w-0 space-y-1.5 sm:space-y-2">
                <Label
                  htmlFor="email"
                  className="font-mono-ui text-[11px] uppercase sm:text-xs"
                >
                  Your Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="name@mail.com"
                  className={cn(
                    fieldClassName,
                    touchedFields.email &&
                      !errors.email &&
                      "border-cyan/40 ring-1 ring-cyan/20",
                  )}
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-destructive" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="min-w-0 space-y-1.5 sm:space-y-2">
                <Label
                  htmlFor="subject"
                  className="font-mono-ui text-[11px] uppercase sm:text-xs"
                >
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="Project / Collaboration / Say Hi"
                  autoComplete="off"
                  className={cn(
                    fieldClassName,
                    touchedFields.subject &&
                      !errors.subject &&
                      "border-cyan/40 ring-1 ring-cyan/20",
                  )}
                  {...register("subject")}
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive" role="alert">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="min-w-0 space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label
                    htmlFor="message"
                    className="font-mono-ui text-[11px] uppercase sm:text-xs"
                  >
                    Message
                  </Label>
                  <span
                    className={cn(
                      "shrink-0 font-mono-ui text-[10px] tabular-nums",
                      messageCount > MESSAGE_MAX
                        ? "text-destructive"
                        : "text-muted-foreground",
                    )}
                  >
                    {messageCount}/{MESSAGE_MAX}
                  </span>
                </div>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={isMobile ? 4 : 5}
                  className={cn(
                    "box-border min-h-[120px] w-full max-w-full resize-y border-border/50 bg-card/50 text-base sm:min-h-[140px] sm:text-sm",
                    touchedFields.message &&
                      !errors.message &&
                      "border-cyan/40 ring-1 ring-cyan/20",
                  )}
                  {...register("message")}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="text-xs text-destructive" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="h-12 min-h-[48px] w-full max-w-full touch-manipulation whitespace-normal bg-cyan/90 font-mono-ui text-[11px] tracking-widest text-background uppercase hover:bg-cyan disabled:opacity-50 sm:whitespace-nowrap sm:text-xs"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 shrink-0 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 size-4 shrink-0" />
                  </>
                )}
              </Button>

              <div aria-live="polite" aria-atomic="true">
                <AnimatePresence mode="wait">
                  {submitState === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, ease: easeFilm }}
                      className="flex items-center justify-center gap-2 rounded-lg bg-cyan/10 px-3 py-3 text-center text-xs text-cyan sm:text-sm"
                    >
                      <CheckCircle2 className="size-4 shrink-0" />
                      <span className="break-words">{submitMessage}</span>
                    </motion.div>
                  )}

                  {submitState === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, ease: easeFilm }}
                      className="rounded-lg bg-destructive/10 px-3 py-3 text-xs text-destructive sm:text-sm"
                    >
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 size-4 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="break-words">{submitMessage}</p>
                          <a
                            href={`mailto:${getDirectEmailFallback()}`}
                            className="mt-2 inline-block font-mono-ui text-[10px] tracking-wider text-cyan uppercase underline-offset-2 hover:underline"
                          >
                            Email directly instead
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="order-2 w-full min-w-0 max-w-full space-y-4 sm:space-y-5 md:space-y-6 lg:order-1"
          >
            {contactInfo.map((info) => (
              <motion.div
                key={info.label}
                variants={fadeUp}
                className="flex min-w-0 items-start gap-3 sm:gap-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan/10 sm:size-10">
                  <info.icon className="size-4 text-cyan sm:size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono-ui text-[10px] tracking-wider text-muted-foreground uppercase">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm break-all text-foreground transition-colors hover:text-cyan sm:break-words"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm break-words text-foreground">
                      {info.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
