import type { StoredProjectImage } from "@/types/project"

const STORAGE_KEY = "portfolio-project-images"

export function getStoredProjectImages(): Record<string, StoredProjectImage> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, StoredProjectImage>
  } catch {
    return {}
  }
}

export function saveProjectImage(
  projectId: string,
  image: Omit<StoredProjectImage, "updatedAt">,
) {
  const all = getStoredProjectImages()
  all[projectId] = {
    ...image,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function clearProjectImage(projectId: string) {
  const all = getStoredProjectImages()
  delete all[projectId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function resolveProjectImageUrl(
  projectId: string,
  defaultUrl?: string,
): string | undefined {
  const stored = getStoredProjectImages()[projectId]?.url
  return stored || defaultUrl
}
