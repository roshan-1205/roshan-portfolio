import type { PortfolioFolder } from "./cloudinary-server-config"
import {
  ALLOWED_PORTFOLIO_FOLDERS,
  ensureCloudinaryConfig,
} from "./cloudinary-server-config"

export type PortfolioImageRecord = {
  url: string
  publicId: string
  updatedAt: string
}

function assetIdFromPublicId(folder: PortfolioFolder, publicId: string) {
  const prefix = `${folder}/`
  return publicId.startsWith(prefix) ? publicId.slice(prefix.length) : publicId
}

export async function listPortfolioImages(
  folder: PortfolioFolder,
): Promise<Record<string, PortfolioImageRecord>> {
  if (!ALLOWED_PORTFOLIO_FOLDERS.has(folder)) {
    throw new Error("Invalid upload folder")
  }

  const cloudinary = ensureCloudinaryConfig()
  const images: Record<string, PortfolioImageRecord> = {}

  let nextCursor: string | undefined

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: `${folder}/`,
      max_results: 500,
      next_cursor: nextCursor,
    })

    for (const resource of result.resources) {
      const assetId = assetIdFromPublicId(folder, resource.public_id)
      if (!assetId) continue

      images[assetId] = {
        url: resource.secure_url,
        publicId: resource.public_id,
        updatedAt: resource.created_at,
      }
    }

    nextCursor = result.next_cursor
  } while (nextCursor)

  return images
}

export async function deletePortfolioImage(
  folder: PortfolioFolder,
  assetId: string,
): Promise<void> {
  if (!ALLOWED_PORTFOLIO_FOLDERS.has(folder)) {
    throw new Error("Invalid upload folder")
  }

  if (!/^[\w-]+$/.test(assetId)) {
    throw new Error("Invalid assetId")
  }

  const cloudinary = ensureCloudinaryConfig()
  const result = await cloudinary.uploader.destroy(`${folder}/${assetId}`, {
    invalidate: true,
  })

  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error("Failed to delete image from Cloudinary")
  }
}
