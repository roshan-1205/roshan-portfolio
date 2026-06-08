import {
  ALLOWED_PORTFOLIO_FOLDERS,
  ensureCloudinaryConfig,
} from "./cloudinary-server-config"

export type CloudinaryUploadResult = {
  url: string
  publicId: string
}

export async function uploadPortfolioImage(
  dataUri: string,
  assetId: string,
  folder = "portfolio-projects",
): Promise<CloudinaryUploadResult> {
  if (!ALLOWED_PORTFOLIO_FOLDERS.has(folder)) {
    throw new Error("Invalid upload folder")
  }

  const cloudinary = ensureCloudinaryConfig()

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
