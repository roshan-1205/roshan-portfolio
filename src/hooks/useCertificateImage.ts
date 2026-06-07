import { useCallback, useState } from "react"
import {
  clearCertificateImage,
  resolveCertificateImageUrl,
  saveCertificateImage,
} from "@/lib/certificate-images"
import { uploadImageToCloudinary } from "@/lib/upload-to-cloudinary"

export function useCertificateImage(certificateId: string, defaultUrl?: string) {
  const [imageUrl, setImageUrl] = useState(() =>
    resolveCertificateImageUrl(certificateId, defaultUrl),
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
          certificateId,
          "portfolio-certificates",
        )
        saveCertificateImage(certificateId, result)
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
    [certificateId],
  )

  const remove = useCallback(() => {
    clearCertificateImage(certificateId)
    setImageUrl(defaultUrl)
    setError(null)
  }, [certificateId, defaultUrl])

  return { imageUrl, isUploading, error, upload, remove }
}
