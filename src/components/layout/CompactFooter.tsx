import { Globe, Mail } from "lucide-react"
import {
  GitHubIcon,
  LeetCodeIcon,
  LinkedInIcon,
} from "@/components/icons/SocialIcons"
import { personal } from "@/data/portfolio"

const socialLinks = [
  { icon: GitHubIcon, href: personal.github, label: "GitHub" },
  { icon: LinkedInIcon, href: personal.linkedin, label: "LinkedIn" },
  { icon: LeetCodeIcon, href: personal.leetcode, label: "LeetCode" },
  { icon: Globe, href: personal.portfolio, label: "Portfolio" },
  { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
] as const

const copyrightYear = new Date().getFullYear()

export function CompactFooter() {
  return (
    <footer className="relative border-t border-border/20 bg-background py-6 md:py-8">
      <div className="bg-starfield pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-5 text-sm text-foreground/90 md:grid-cols-3 md:gap-6">
          <p className="text-center md:text-left">
            Designed and Developed by{" "}
            <span className="text-foreground">{personal.name}</span>
          </p>

          <p className="text-center">
            Copyright © {copyrightYear}{" "}
            <span className="text-foreground">Roshan</span>
          </p>

          <div className="flex items-center justify-center gap-4 md:justify-end md:gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.label === "Email" ? undefined : "_blank"}
                rel={
                  social.label === "Email" ? undefined : "noopener noreferrer"
                }
                aria-label={social.label}
                className="text-foreground/80 transition-colors hover:text-cyan"
              >
                <social.icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
