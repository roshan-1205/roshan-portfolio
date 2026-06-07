import type { Certification } from "@/types/certificate"
import type { FeaturedProject } from "@/types/project"

const PROJECTS_KEY = "portfolio-custom-projects"
const CERTS_KEY = "portfolio-custom-certificates"

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function uniqueId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`
}

export function getCustomProjects(): FeaturedProject[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as FeaturedProject[]
  } catch {
    return []
  }
}

export function saveCustomProject(project: FeaturedProject) {
  const all = getCustomProjects()
  all.push({ ...project, isCustom: true })
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(all))
}

export function removeCustomProject(id: string) {
  const all = getCustomProjects().filter((p) => p.id !== id)
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(all))
}

export function getCustomCertificates(): Certification[] {
  try {
    const raw = localStorage.getItem(CERTS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Certification[]
  } catch {
    return []
  }
}

export function saveCustomCertificate(cert: Certification) {
  const all = getCustomCertificates()
  all.push({ ...cert, isCustom: true })
  localStorage.setItem(CERTS_KEY, JSON.stringify(all))
}

export function removeCustomCertificate(id: string) {
  const all = getCustomCertificates().filter((c) => c.id !== id)
  localStorage.setItem(CERTS_KEY, JSON.stringify(all))
}
