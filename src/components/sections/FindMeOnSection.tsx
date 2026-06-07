import { motion } from "framer-motion"
import { Globe, Mail } from "lucide-react"
import {
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from "@/components/icons/SocialIcons"
import { personal } from "@/data/portfolio"
import { fadeUp, staggerContainer } from "@/lib/animations"

const socialLinks = [
  { icon: GitHubIcon, href: personal.github, label: "GitHub" },
  { icon: LinkedInIcon, href: personal.linkedin, label: "LinkedIn" },
  { icon: LeetCodeIcon, href: personal.leetcode, label: "LeetCode" },
  { icon: Globe, href: personal.portfolio, label: "Portfolio" },
  { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
] as const

export function FindMeOnSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/20 bg-background py-20 md:py-28">
      <div className="bg-starfield pointer-events-none absolute inset-0 opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,47,247,0.08)_0%,transparent_65%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2rem,5vw,3.25rem)] font-light tracking-wide text-foreground"
          >
            FIND ME ON
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-md text-base text-muted-foreground md:text-lg"
          >
            Feel free to{" "}
            <span className="font-medium text-purple">connect</span> with me
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:mt-12"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label === "Email" ? undefined : "_blank"}
                rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="group flex size-12 items-center justify-center rounded-full bg-cream text-purple shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-shadow hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] sm:size-[52px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.6 }}
                whileHover={{ scale: 1.12, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="size-5 transition-colors group-hover:text-cyan sm:size-[22px]" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
