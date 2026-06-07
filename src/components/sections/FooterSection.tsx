import { motion } from "framer-motion"
import { Code, Globe } from "lucide-react"
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons"
import { marqueeText, navLinks, personal } from "@/data/portfolio"
import { fadeUp, staggerContainer } from "@/lib/animations"

function Marquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeText, ...marqueeText]

  return (
    <div className="overflow-hidden border-y border-border/20 py-4">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: reverse ? 35 : 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="mx-8 font-mono-ui text-sm tracking-[0.3em] text-muted-foreground uppercase"
          >
            {text} <span className="text-cyan">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function FooterSection() {
  const socials = [
    { icon: GitHubIcon, href: personal.github, label: "GitHub" },
    { icon: LinkedInIcon, href: personal.linkedin, label: "LinkedIn" },
    { icon: Code, href: personal.leetcode, label: "LeetCode" },
    { icon: Globe, href: personal.portfolio, label: "Portfolio" },
  ]

  return (
    <footer className="relative border-t border-border/20 bg-background pt-16">
      <Marquee />
      <Marquee reverse />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          className="grid gap-12 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp}>
            <h3 className="font-display text-2xl font-light">
              {personal.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {personal.mission}
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="mb-4 font-mono-ui text-[10px] tracking-wider text-cyan uppercase">
              Quick Links
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-cyan"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="mb-4 font-mono-ui text-[10px] tracking-wider text-cyan uppercase">
              Social
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-lg border border-border/30 text-muted-foreground transition-colors hover:border-cyan/30 hover:text-cyan"
                  whileHover={{ y: -3 }}
                  aria-label={social.label}
                >
                  <social.icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/20 pt-8 md:flex-row"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="font-mono-ui text-xs text-muted-foreground">
            © 2024 {personal.name}. All Rights Reserved.
          </p>
          <p className="font-mono-ui text-xs text-muted-foreground">
            Designed & Built with ❤️ by {personal.name}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
