import { useCallback, useEffect, useMemo, useState } from "react"
import { blurActiveElement, withCacheBust } from "@/lib/image-display"
import {
  deleteImageFromCloudinary,
  hydrateImageRegistry,
  IMAGE_REGISTRY_UPDATE_EVENT,
  setRegistryImage,
} from "@/lib/image-registry"
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
  const [isRemoving, setIsRemoving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const syncFromStorage = useCallback(() => {
    setImageUrl(storage.resolve(assetId, defaultUrl))
    setCacheVersion(Date.now())
  }, [assetId, defaultUrl, storage])

  useEffect(() => {
    let active = true

    void hydrateImageRegistry(folder).then(() => {
      if (active) syncFromStorage()
    })

    const onStorage = (event: StorageEvent) => {
      if (event.key === storage.storageKey) syncFromStorage()
    }

    const onCustom = () => syncFromStorage()
    const onRegistry = () => syncFromStorage()

    window.addEventListener("storage", onStorage)
    window.addEventListener(storage.updateEvent, onCustom)
    window.addEventListener(IMAGE_REGISTRY_UPDATE_EVENT, onRegistry)

    return () => {
      active = false
      window.removeEventListener("storage", onStorage)
      window.removeEventListener(storage.updateEvent, onCustom)
      window.removeEventListener(IMAGE_REGISTRY_UPDATE_EVENT, onRegistry)
    }
  }, [folder, storage.storageKey, storage.updateEvent, syncFromStorage])

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
        setRegistryImage(folder, assetId, result)
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

  const remove = useCallback(async () => {
    setIsRemoving(true)
    setError(null)

    try {
      await deleteImageFromCloudinary(folder, assetId)
      storage.clear(assetId)
      setImageUrl(undefined)
      setCacheVersion(Date.now())
      blurActiveElement()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to remove image."
      setError(message)
      throw err
    } finally {
      setIsRemoving(false)
    }
  }, [assetId, folder, storage])

  return {
    imageUrl,
    displayUrl,
    isUploading,
    isRemoving,
    error,
    upload,
    remove,
    hasImage: Boolean(imageUrl),
  }
}
