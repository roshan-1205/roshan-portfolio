export type UploadFolder = "portfolio-projects" | "portfolio-certificates"

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsDataURL(file)
  })
}

export async function uploadImageToCloudinary(
  file: File,
  assetId: string,
  folder: UploadFolder = "portfolio-projects",
): Promise<{ url: string; publicId: string }> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select an image file (PNG, JPG, WebP, etc.)")
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Image must be smaller than 10 MB")
  }

  const image = await fileToDataUri(file)

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image, assetId, folder }),
  })

  const text = await response.text()
  let payload: { url?: string; publicId?: string; error?: string } = {}

  try {
    payload = JSON.parse(text) as typeof payload
  } catch {
    throw new Error("Upload failed. Check Cloudinary env vars.")
  }

  if (!response.ok || !payload.url || !payload.publicId) {
    throw new Error(payload.error || "Upload failed. Check Cloudinary env vars.")
  }

  return { url: payload.url, publicId: payload.publicId }
}

/** @deprecated Use uploadImageToCloudinary */
export async function uploadProjectImageToCloudinary(
  file: File,
  projectId: string,
) {
  return uploadImageToCloudinary(file, projectId, "portfolio-projects")
}
