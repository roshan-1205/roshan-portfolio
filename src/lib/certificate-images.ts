import type { StoredProjectImage } from "@/types/project"

const STORAGE_KEY = "portfolio-certificate-images"

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
}

export function clearCertificateImage(certificateId: string) {
  const all = getStoredCertificateImages()
  delete all[certificateId]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function resolveCertificateImageUrl(
  certificateId: string,
  defaultUrl?: string,
): string | undefined {
  const stored = getStoredCertificateImages()[certificateId]?.url
  return stored || defaultUrl
}
