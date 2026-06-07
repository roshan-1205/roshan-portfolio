import type { StoredProjectImage } from "@/types/project"

const STORAGE_KEY = "portfolio-certificate-images"
export const CERTIFICATE_IMAGE_UPDATE_EVENT = "portfolio-certificate-image-updated"

function notifyUpdate() {
  window.dispatchEvent(new Event(CERTIFICATE_IMAGE_UPDATE_EVENT))
}

export function getStoredCertificateImages(): Record<string, StoredProjectImage> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, StoredProjectImage>
  } catch {
    return {}
  }
}

export function saveCertificateImage(
  certificateId: string,
  image: Omit<StoredProjectImage, "updatedAt">,
) {
  const all = getStoredCertificateImages()
  all[certificateId] = {
    ...image,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  notifyUpdate()
}

export function clearCertificateImage(certificateId: string) {
  const all = getStoredCertificateImages()
  delete all[certificateId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  notifyUpdate()
}

export function resolveCertificateImageUrl(
  certificateId: string,
  defaultUrl?: string,
): string | undefined {
  const stored = getStoredCertificateImages()[certificateId]?.url
  return stored || defaultUrl
}

export const certificateImageStorage = {
  storageKey: STORAGE_KEY,
  updateEvent: CERTIFICATE_IMAGE_UPDATE_EVENT,
  getStored: getStoredCertificateImages,
  save: saveCertificateImage,
  clear: clearCertificateImage,
  resolve: resolveCertificateImageUrl,
}
