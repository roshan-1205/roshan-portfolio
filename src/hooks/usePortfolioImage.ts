import { useCallback, useEffect, useMemo, useState } from "react"
import { blurActiveElement, withCacheBust } from "@/lib/image-display"
import type { UploadFolder } from "@/lib/upload-to-cloudinary"
import { uploadImageToCloudinary } from "@/lib/upload-to-cloudinary"

type ImageStorage = {
  getStored: () => Record<string, { url: string; publicId: string; updatedAt?: string }>
  save: (id: string, image: { url: string; publicId: string }) => void
  clear: (id: string) => void
  resolve: (id: string, defaultUrl?: string) => string | undefined
  storageKey: string
  updateEvent: string
}

export function usePortfolioImage(
  assetId: string,
  storage: ImageStorage,
  folder: UploadFolder,
  defaultUrl?: string,
) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(() =>
    storage.resolve(assetId, defaultUrl),
  )
  const [cacheVersion, setCacheVersion] = useState(() => Date.now())
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const syncFromStorage = useCallback(() => {
    setImageUrl(storage.resolve(assetId, defaultUrl))
    setCacheVersion(Date.now())
  }, [assetId, defaultUrl, storage])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === storage.storageKey) syncFromStorage()
    }

    const onCustom = () => syncFromStorage()

    window.addEventListener("storage", onStorage)
    window.addEventListener(storage.updateEvent, onCustom)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener(storage.updateEvent, onCustom)
    }
  }, [storage.storageKey, storage.updateEvent, syncFromStorage])

  const displayUrl = useMemo(
    () => (imageUrl ? withCacheBust(imageUrl, cacheVersion) : undefined),
    [cacheVersion, imageUrl],
  )

  const upload = useCallback(
    async (file: File) => {
      setIsUploading(true)
      setError(null)

      try {
        const result = await uploadImageToCloudinary(file, assetId, folder)
        storage.save(assetId, result)
        setImageUrl(result.url)
        setCacheVersion(Date.now())
        blurActiveElement()
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
    [assetId, folder, storage],
  )

  const remove = useCallback(() => {
    storage.clear(assetId)
    setImageUrl(undefined)
    setCacheVersion(Date.now())
    setError(null)
    blurActiveElement()
  }, [assetId, storage])

  return {
    imageUrl,
    displayUrl,
    isUploading,
    error,
    upload,
    remove,
    hasImage: Boolean(imageUrl),
  }
}
