import { useCallback, useState } from "react"
import {
  clearProjectImage,
  resolveProjectImageUrl,
  saveProjectImage,
} from "@/lib/project-images"
import { uploadImageToCloudinary } from "@/lib/upload-to-cloudinary"

export function useProjectImage(projectId: string, defaultUrl?: string) {
  const [imageUrl, setImageUrl] = useState(() =>
    resolveProjectImageUrl(projectId, defaultUrl),
  )
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(
    async (file: File) => {
      setIsUploading(true)
      setError(null)

      try {
        const result = await uploadImageToCloudinary(
          file,
          projectId,
          "portfolio-projects",
        )
        saveProjectImage(projectId, result)
        setImageUrl(result.url)
        return result
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Upload failed. Try again."
        setError(message)
        throw err
      } finally {
        setIsUploading(false)
      }
    },
    [projectId],
  )

  const remove = useCallback(() => {
    clearProjectImage(projectId)
    setImageUrl(defaultUrl)
    setError(null)
  }, [defaultUrl, projectId])

  return { imageUrl, isUploading, error, upload, remove }
}
