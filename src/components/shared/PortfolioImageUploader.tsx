import { useRef } from "react"
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react"
import { isCloudinaryConfigured } from "@/lib/cloudinary-config"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const cloudinaryReady = isCloudinaryConfigured()

type PortfolioImageUploaderProps = {
  title: string
  assetId: string
  storageLabel: string
  aspectClass?: string
  imageFit?: "cover" | "contain"
  placeholder?: React.ReactNode
  imageUrl?: string
  displayUrl?: string
  isUploading: boolean
  isRemoving?: boolean
  error: string | null
  onUpload: (file: File) => Promise<unknown>
  onRemove: () => void | Promise<void>
}

export function PortfolioImageUploader({
  title,
  assetId,
  storageLabel,
  aspectClass = "aspect-[4/3]",
  imageFit = "cover",
  placeholder,
  imageUrl,
  displayUrl,
  isUploading,
  isRemoving = false,
  error,
  onUpload,
  onRemove,
}: PortfolioImageUploaderProps) {
  const busy = isUploading || isRemoving
  const inputRef = useRef<HTMLInputElement>(null)
  const hasImage = Boolean(imageUrl && displayUrl)

  const openFilePicker = () => {
    if (!busy && cloudinaryReady) {
      inputRef.current?.click()
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      await onUpload(file)
    } catch {
      // Error surfaced via hook state
    } finally {
      event.target.value = ""
    }
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        className="sr-only"
        onChange={handleFileChange}
        disabled={busy || !cloudinaryReady}
        aria-label={`Upload image for ${title}`}
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-cyan/10 via-card to-purple/10",
          aspectClass,
        )}
      >
        {hasImage ? (
          <img
            key={displayUrl}
            src={displayUrl}
            alt={`${title} preview`}
            className={cn(
              "absolute inset-0 size-full bg-background/80",
              imageFit === "contain" ? "object-contain p-2" : "object-cover",
            )}
            loading="eager"
            decoding="async"
          />
        ) : (
          <button
            type="button"
            className={cn(
              "absolute inset-0 flex w-full flex-col items-center justify-center gap-3 px-4 text-center transition-colors",
              cloudinaryReady && !busy
                ? "cursor-pointer hover:bg-cyan/5"
                : "cursor-default",
            )}
            onClick={openFilePicker}
            disabled={busy || !cloudinaryReady}
            aria-label={`Upload image for ${title}`}
          >
            {placeholder ?? (
              <>
                <ImagePlus className="size-10 text-cyan/40" />
                <p className="font-mono-ui text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                  {isUploading ? "Uploading…" : "Tap to upload image"}
                </p>
              </>
            )}
          </button>
        )}

        {busy && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-background/70 backdrop-blur-sm">
            <Loader2 className="size-8 animate-spin text-cyan" />
            <p className="font-mono-ui text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              {isRemoving ? "Removing image…" : "Uploading to Cloudinary…"}
            </p>
          </div>
        )}

        {!cloudinaryReady && !hasImage && (
          <p className="absolute inset-x-3 bottom-3 z-20 rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-1.5 text-center font-mono-ui text-[9px] leading-snug text-amber-200">
            Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in
            .env.local
          </p>
        )}
      </div>

      {hasImage && (
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex items-center justify-center gap-2"
            role="toolbar"
            aria-label={`Image actions for ${title}`}
          >
            <Button
              type="button"
              size="icon-xs"
              className="size-7 rounded-full border border-cyan/30 bg-cyan/10 text-cyan shadow-sm hover:border-cyan/50 hover:bg-cyan/20"
              disabled={busy || !cloudinaryReady}
              onClick={openFilePicker}
              aria-label={`Replace image for ${title}`}
              title="Replace image"
            >
              {isUploading ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Upload className="size-3.5" />
              )}
            </Button>
            <Button
              type="button"
              size="icon-xs"
              className="size-7 rounded-full border border-destructive/35 bg-destructive/10 text-destructive shadow-sm hover:border-destructive/50 hover:bg-destructive/20"
              disabled={busy}
              onClick={() => void onRemove()}
              aria-label={`Remove image for ${title}`}
              title="Remove image"
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>

          <p className="font-mono-ui text-[8px] tracking-wide text-muted-foreground sm:text-[9px]">
            {storageLabel}/{assetId}
          </p>
        </div>
      )}

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-center text-[10px] leading-snug break-words text-destructive sm:text-xs">
          {error}
        </p>
      )}
    </div>
  )
}
