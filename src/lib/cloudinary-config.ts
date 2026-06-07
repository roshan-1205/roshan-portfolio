export type CloudinaryClientConfig = {
  cloudName: string
  uploadPreset: string
}

export function getCloudinaryClientConfig(): CloudinaryClientConfig {
  return {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim() || "",
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim() || "",
  }
}

export function isCloudinaryConfigured() {
  const { cloudName, uploadPreset } = getCloudinaryClientConfig()
  return Boolean(cloudName && uploadPreset)
}
