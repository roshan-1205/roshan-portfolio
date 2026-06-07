import type { StoredProjectImage } from "@/types/project"

const STORAGE_KEY = "portfolio-project-images"
export const PROJECT_IMAGE_UPDATE_EVENT = "portfolio-project-image-updated"

function notifyUpdate() {
  window.dispatchEvent(new Event(PROJECT_IMAGE_UPDATE_EVENT))
}

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
  notifyUpdate()
}

export function clearProjectImage(projectId: string) {
  const all = getStoredProjectImages()
  delete all[projectId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  notifyUpdate()
}

export function resolveProjectImageUrl(
  projectId: string,
  defaultUrl?: string,
): string | undefined {
  const stored = getStoredProjectImages()[projectId]?.url
  return stored || defaultUrl
}

export const projectImageStorage = {
  storageKey: STORAGE_KEY,
  updateEvent: PROJECT_IMAGE_UPDATE_EVENT,
  getStored: getStoredProjectImages,
  save: saveProjectImage,
  clear: clearProjectImage,
  resolve: resolveProjectImageUrl,
}
