import type { StoredProjectImage } from "@/types/project"
import type { UploadFolder } from "@/lib/upload-to-cloudinary"

const cache: Partial<Record<UploadFolder, Record<string, StoredProjectImage>>> =
  {}
const hydratePromises: Partial<Record<UploadFolder, Promise<void>>> = {}

export const IMAGE_REGISTRY_UPDATE_EVENT = "portfolio-image-registry-updated"

function notifyRegistryUpdate() {
  window.dispatchEvent(new Event(IMAGE_REGISTRY_UPDATE_EVENT))
}

export function getRegistryImage(
  folder: UploadFolder,
  assetId: string,
): StoredProjectImage | undefined {
  return cache[folder]?.[assetId]
}

export function setRegistryImage(
  folder: UploadFolder,
  assetId: string,
  image: Omit<StoredProjectImage, "updatedAt">,
) {
  if (!cache[folder]) {
    cache[folder] = {}
  }

  cache[folder]![assetId] = {
    ...image,
    updatedAt: new Date().toISOString(),
  }
  notifyRegistryUpdate()
}

export function removeRegistryImage(folder: UploadFolder, assetId: string) {
  if (!cache[folder]) return

  delete cache[folder]![assetId]
  notifyRegistryUpdate()
}

export async function hydrateImageRegistry(folder: UploadFolder) {
  if (hydratePromises[folder]) {
    return hydratePromises[folder]
  }

  hydratePromises[folder] = (async () => {
    try {
      const response = await fetch(
        `/api/images?folder=${encodeURIComponent(folder)}`,
      )

      if (!response.ok) return

      const payload = (await response.json()) as {
        images?: Record<string, StoredProjectImage>
      }

      cache[folder] = payload.images ?? {}
      notifyRegistryUpdate()
    } catch {
      // API unavailable in local dev without server env vars.
    }
  })()

  return hydratePromises[folder]
}

export async function hydrateAllImageRegistries() {
  const folders: UploadFolder[] = [
    "portfolio-projects",
    "portfolio-certificates",
    "portfolio-profile",
  ]

  await Promise.all(folders.map((folder) => hydrateImageRegistry(folder)))
}

export async function deleteImageFromCloudinary(
  folder: UploadFolder,
  assetId: string,
) {
  const response = await fetch("/api/images", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder, assetId }),
  })

  const payload = (await response.json().catch(() => ({}))) as {
    error?: string
  }

  if (!response.ok) {
    throw new Error(payload.error || "Failed to remove image")
  }

  removeRegistryImage(folder, assetId)
}
