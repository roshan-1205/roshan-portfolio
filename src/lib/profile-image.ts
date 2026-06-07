import type { StoredProjectImage } from "@/types/project"

const STORAGE_KEY = "portfolio-profile-image"
export const PROFILE_IMAGE_ID = "intro-profile"
export const PROFILE_IMAGE_UPDATE_EVENT = "portfolio-profile-image-updated"

function notifyUpdate() {
  window.dispatchEvent(new Event(PROFILE_IMAGE_UPDATE_EVENT))
}

export function getStoredProfileImage(): StoredProjectImage | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredProjectImage
  } catch {
    return null
  }
}

export function saveProfileImage(image: Omit<StoredProjectImage, "updatedAt">) {
  const record: StoredProjectImage = {
    ...image,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  notifyUpdate()
}

export function clearProfileImage() {
  localStorage.removeItem(STORAGE_KEY)
  notifyUpdate()
}

export function resolveProfileImageUrl(defaultUrl?: string): string | undefined {
  return getStoredProfileImage()?.url || defaultUrl
}

export const profileImageStorage = {
  storageKey: STORAGE_KEY,
  updateEvent: PROFILE_IMAGE_UPDATE_EVENT,
  getStored: (): Record<string, StoredProjectImage> => {
    const image = getStoredProfileImage()
    if (!image) return {}
    return { [PROFILE_IMAGE_ID]: image }
  },
  save: (_id: string, image: { url: string; publicId: string }) =>
    saveProfileImage(image),
  clear: (_id: string) => clearProfileImage(),
  resolve: (_id: string, defaultUrl?: string) => resolveProfileImageUrl(defaultUrl),
}
