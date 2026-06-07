import { useCallback, useMemo, useState } from "react"
import { featuredProjects } from "@/data/portfolio"
import {
  getCustomProjects,
  removeCustomProject,
  saveCustomProject,
  slugify,
  uniqueId,
} from "@/lib/custom-items"
import { clearProjectImage } from "@/lib/project-images"
import type { FeaturedProject } from "@/types/project"

export type NewProjectInput = {
  title: string
  category: string
  description: string
  techStack: string
  features: string
  liveUrl?: string
  githubUrl?: string
}

function parseList(value: string) {
  return value
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function formatNumber(index: number) {
  return String(index + 1).padStart(2, "0")
}

export function useProjectsList() {
  const [customProjects, setCustomProjects] = useState(getCustomProjects)

  const projects = useMemo(
    () =>
      [...featuredProjects, ...customProjects].map((project, index) => ({
        ...project,
        number: formatNumber(index),
      })),
    [customProjects],
  )

  const refresh = useCallback(() => {
    setCustomProjects(getCustomProjects())
  }, [])

  const addProject = useCallback(
    (input: NewProjectInput) => {
      const baseId = slugify(input.title) || "project"
      const project: FeaturedProject = {
        id: uniqueId(baseId),
        number: "00",
        title: input.title.trim(),
        category: input.category.trim() || "CUSTOM · 2026",
        description: input.description.trim(),
        techStack: parseList(input.techStack),
        features: parseList(input.features),
        liveUrl: input.liveUrl?.trim() || undefined,
        githubUrl: input.githubUrl?.trim() || undefined,
        isCustom: true,
      }

      saveCustomProject(project)
      refresh()
      return project
    },
    [refresh],
  )

  const deleteProject = useCallback(
    (id: string) => {
      removeCustomProject(id)
      clearProjectImage(id)
      refresh()
    },
    [refresh],
  )

  return { projects, addProject, deleteProject }
}
