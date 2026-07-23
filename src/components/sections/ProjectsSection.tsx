import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, Trash2 } from "lucide-react"
import { GitHubIcon } from "@/components/icons/SocialIcons"
import { useRef } from "react"
import { ProjectImagePanel } from "@/components/projects/ProjectImagePanel"
import { useProjectsList } from "@/hooks/useProjectsList"
import type { FeaturedProject } from "@/types/project"
import { SectionLabel } from "@/components/layout/SectionLabel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  fadeUp,
  slideFromLeft,
  slideFromRight,
  wipeReveal,
} from "@/lib/animations"

function FeaturedProject({
  project,
  index,
  onDelete,
}: {
  project: FeaturedProject
  index: number
  onDelete?: (id: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <motion.div
      ref={ref}
      className={`relative grid items-center gap-12 lg:grid-cols-2 ${
        index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
      }`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
    >
      {project.isCustom && onDelete && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute top-0 right-0 z-10 font-mono-ui text-[10px] text-destructive uppercase hover:text-destructive"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 className="mr-1 size-3" />
          Remove
        </Button>
      )}

      <motion.div variants={index % 2 === 0 ? slideFromLeft : slideFromRight}>
        <span className="font-mono-ui text-6xl font-light text-foreground/10 md:text-8xl">
          {project.number}
        </span>
        <p className="mt-2 font-mono-ui text-[10px] tracking-[0.3em] text-cyan uppercase">
          {project.category}
        </p>
        <h3 className="mt-4 font-display text-3xl font-light md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        {project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-cyan/20 font-mono-ui text-[10px] text-cyan/80"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
        {project.features.length > 0 && (
          <ul className="mt-6 space-y-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cyan" />
                {feature}
              </li>
            ))}
          </ul>
        )}
        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-8 flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="font-mono-ui text-xs tracking-wider uppercase"
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 size-3" />
                  Live
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="font-mono-ui text-xs tracking-wider uppercase"
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon className="mr-2 size-3" />
                  GitHub
                </a>
              </Button>
            )}
          </div>
        )}
      </motion.div>

      <motion.div style={{ y }} variants={wipeReveal}>
        <ProjectImagePanel
          projectNumber={project.number}
          title={project.title}
          imageUrl={project.imageUrl}
        />
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const { projects, deleteProject } = useProjectsList()

  return (
    <section
      id="projects"
      className="section-angled relative overflow-hidden bg-card py-32 md:py-40"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <SectionLabel label="03 / FEATURED WORK" />

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 font-display text-[clamp(2rem,5vw,4rem)] font-light md:mb-20"
        >
          <span className="block">Projects That</span>
          <span className="block text-gradient-cyan">Define My Journey</span>
        </motion.h2>

        <div className="space-y-32">
          {projects.map((project, i) => (
            <FeaturedProject
              key={project.id}
              project={project}
              index={i}
              onDelete={project.isCustom ? deleteProject : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
