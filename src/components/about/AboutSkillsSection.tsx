import { motion } from "framer-motion"
import type { ComponentType, SVGProps } from "react"
import {
  AwsIcon,
  Css3Icon,
  DockerIcon,
  ExpressIcon,
  GitIcon,
  Html5Icon,
  JavaScriptIcon,
  LinuxIcon,
  MongoDbIcon,
  NextJsIcon,
  NodeJsIcon,
  PostmanIcon,
  PythonIcon,
  ReactIcon,
  TypeScriptIcon,
  VsCodeIcon,
} from "@/components/icons/TechIcons"
import { CodingActivityCalendar } from "@/components/about/CodingActivityCalendar"
import { GitHubIcon } from "@/components/icons/SocialIcons"
import { fadeUp, staggerContainer } from "@/lib/animations"

type SkillItem = {
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const professionalSkillset: SkillItem[] = [
  { label: "TypeScript", icon: TypeScriptIcon },
  { label: "JavaScript", icon: JavaScriptIcon },
  { label: "React", icon: ReactIcon },
  { label: "Node.js", icon: NodeJsIcon },
  { label: "Express", icon: ExpressIcon },
  { label: "MongoDB", icon: MongoDbIcon },
  { label: "Python", icon: PythonIcon },
  { label: "Next.js", icon: NextJsIcon },
  { label: "HTML5", icon: Html5Icon },
  { label: "CSS3", icon: Css3Icon },
]

const toolsUsed: SkillItem[] = [
  { label: "VS Code", icon: VsCodeIcon },
  { label: "Linux", icon: LinuxIcon },
  { label: "Git", icon: GitIcon },
  { label: "Postman", icon: PostmanIcon },
  { label: "GitHub", icon: GitHubIcon },
  { label: "Docker", icon: DockerIcon },
  { label: "AWS", icon: AwsIcon },
]

function SkillGrid({ items }: { items: SkillItem[] }) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {items.map((item) => (
        <motion.div
          key={item.label}
          variants={fadeUp}
          title={item.label}
          className="flex aspect-[5/4] items-center justify-center rounded-lg border border-purple/45 bg-background/50 p-4 transition-colors hover:border-purple hover:bg-purple/5"
        >
          <item.icon className="size-9 text-foreground sm:size-10" />
        </motion.div>
      ))}
    </motion.div>
  )
}

export function AboutSkillsSection() {
  return (
    <motion.div
      id="skills"
      className="relative mt-20 overflow-hidden rounded-2xl border border-border/25 py-14 md:mt-24 md:py-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7 }}
    >
      <div className="bg-starfield pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,47,247,0.12)_0%,transparent_70%)]" />

      <div className="relative z-10 space-y-14 px-4 sm:px-8 md:space-y-16 md:px-10">
        <div className="space-y-8">
          <h3 className="text-center font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light">
            <span className="text-foreground">Professional </span>
            <span className="text-purple">Skillset</span>
          </h3>
          <SkillGrid items={professionalSkillset} />
        </div>

        <div className="space-y-8">
          <h3 className="text-center font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light">
            <span className="text-purple">Tools </span>
            <span className="text-foreground">I use</span>
          </h3>
          <SkillGrid items={toolsUsed} />
        </div>

        <CodingActivityCalendar />
      </div>
    </motion.div>
  )
}
