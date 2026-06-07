import { getCloudinaryClientConfig } from "@/lib/cloudinary-config"

export type UploadFolder =
  | "portfolio-projects"
  | "portfolio-certificates"
  | "portfolio-profile"

type UploadResult = { url: string; publicId: string }

function validateFile(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select an image file (PNG, JPG, WebP, etc.)")
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Image must be smaller than 10 MB")
  }
}

async function parseJsonResponse(response: Response) {
  const text = await response.text()

  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    if (text.includes("<!DOCTYPE") || text.includes("<html")) {
      throw new Error(
        "Upload API unavailable. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env.local",
      )
    }
    throw new Error("Unexpected upload response.")
  }
}

async function uploadDirectToCloudinary(
  file: File,
  assetId: string,
  folder: UploadFolder,
): Promise<UploadResult> {
  const { cloudName, uploadPreset } = getCloudinaryClientConfig()

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env.local",
    )
  }

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", uploadPreset)
  formData.append("folder", folder)
  formData.append("public_id", assetId)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
  )

  const payload = await parseJsonResponse(response)
  const error = payload.error as { message?: string } | string | undefined
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message ||
        (payload.message as string | undefined) ||
        "Cloudinary upload failed"

  if (!response.ok || !payload.secure_url) {
    if (errorMessage.toLowerCase().includes("cloud_name")) {
      throw new Error(
        `Invalid Cloudinary cloud name "${cloudName}". Copy the exact value from console.cloudinary.com → Settings → API Keys.`,
      )
    }
    if (errorMessage.toLowerCase().includes("upload preset")) {
      throw new Error(
        `Upload preset "${uploadPreset}" not found. Create an Unsigned preset in Cloudinary → Settings → Upload → Upload presets.`,
      )
    }
    throw new Error(errorMessage)
  }

  return {
    url: payload.secure_url as string,
    publicId: payload.public_id as string,
  }
}

async function uploadViaServer(
  file: File,
  assetId: string,
  folder: UploadFolder,
): Promise<UploadResult> {
  const image = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsDataURL(file)
  })

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image, assetId, folder }),
  })

  const payload = await parseJsonResponse(response)

  if (!response.ok || !payload.url || !payload.publicId) {
    const err =
      (payload.error as string | undefined) ||
      (payload.message as string | undefined) ||
      "Server upload failed. Use VITE_CLOUDINARY_* vars for direct upload."
    throw new Error(err)
  }

  return {
    url: payload.url as string,
    publicId: payload.publicId as string,
  }
}

export async function uploadImageToCloudinary(
  file: File,
  assetId: string,
  folder: UploadFolder = "portfolio-projects",
): Promise<UploadResult> {
  validateFile(file)

  const { cloudName, uploadPreset } = getCloudinaryClientConfig()

  if (cloudName && uploadPreset) {
    return uploadDirectToCloudinary(file, assetId, folder)
  }

  return uploadViaServer(file, assetId, folder)
}

/** @deprecated Use uploadImageToCloudinary */
export async function uploadProjectImageToCloudinary(
  file: File,
  projectId: string,
) {
  return uploadImageToCloudinary(file, projectId, "portfolio-projects")
}
