import { v2 as cloudinary } from "cloudinary"

export type CloudinaryUploadResult = {
  url: string
  publicId: string
}

function ensureConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Missing Cloudinary config. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    )
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })
}

const ALLOWED_FOLDERS = new Set([
  "portfolio-projects",
  "portfolio-certificates",
])

export async function uploadPortfolioImage(
  dataUri: string,
  assetId: string,
  folder = "portfolio-projects",
): Promise<CloudinaryUploadResult> {
  ensureConfig()

  if (!ALLOWED_FOLDERS.has(folder)) {
    throw new Error("Invalid upload folder")
  }

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      public_id: assetId,
      overwrite: true,
      resource_type: "image",
      invalidate: true,
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Cloudinary upload failed"

    if (message.toLowerCase().includes("invalid cloud_name")) {
      throw new Error(
        `Invalid CLOUDINARY_CLOUD_NAME "${process.env.CLOUDINARY_CLOUD_NAME}". Get the exact cloud name from console.cloudinary.com → Settings → API Keys (not "Portfolio").`,
      )
    }

    throw new Error(message)
  }
}

/** @deprecated Use uploadPortfolioImage */
export async function uploadProjectImage(
  dataUri: string,
  projectId: string,
): Promise<CloudinaryUploadResult> {
  return uploadPortfolioImage(dataUri, projectId, "portfolio-projects")
}
