import { useRef } from "react"
import { Award, ImagePlus, Loader2, Trash2, Upload } from "lucide-react"
import { useCertificateImage } from "@/hooks/useCertificateImage"
import { isCloudinaryConfigured } from "@/lib/cloudinary-config"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const cloudinaryReady = isCloudinaryConfigured()

type CertificateImagePanelProps = {
  certificateId: string
  title: string
  defaultImageUrl?: string
}

export function CertificateImagePanel({
  certificateId,
  title,
  defaultImageUrl,
}: CertificateImagePanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { imageUrl, isUploading, error, upload, remove } = useCertificateImage(
    certificateId,
    defaultImageUrl,
  )

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      await upload(file)
    } catch {
      // Error handled in hook
    } finally {
      event.target.value = ""
    }
  }

  return (
    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border/30 bg-gradient-to-br from-purple/10 via-card to-cyan/10 sm:rounded-2xl">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${title} certificate`}
          className="absolute inset-0 size-full object-contain bg-background/80 p-2"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
          <Award className="size-10 text-purple/40" />
          <ImagePlus className="size-8 text-cyan/30" />
          <p className="font-mono-ui text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Upload certificate photo
          </p>
        </div>
      )}

      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 px-3 opacity-0 backdrop-blur-sm transition-opacity duration-300 sm:gap-3",
          "group-hover:opacity-100 group-focus-within:opacity-100",
          isUploading && "opacity-100",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          className="sr-only"
          onChange={handleFileChange}
          disabled={isUploading}
          aria-label={`Upload certificate photo for ${title}`}
        />

        {!cloudinaryReady && (
          <p className="max-w-[220px] rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-1.5 text-center font-mono-ui text-[8px] leading-snug text-amber-200 sm:text-[9px]">
            Set VITE_CLOUDINARY_CLOUD_NAME in .env.local + preset portfolio_unsigned
          </p>
        )}

        <Button
          type="button"
          size="sm"
          className="font-mono-ui text-[10px] tracking-wider uppercase sm:text-xs"
          disabled={isUploading || !cloudinaryReady}
          onClick={() => inputRef.current?.click()}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 size-3 animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <Upload className="mr-2 size-3" />
              {imageUrl ? "Replace Photo" : "Upload Photo"}
            </>
          )}
        </Button>

        {imageUrl && !isUploading && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="font-mono-ui text-[10px] tracking-wider text-destructive uppercase hover:text-destructive sm:text-xs"
            onClick={remove}
          >
            <Trash2 className="mr-2 size-3" />
            Remove
          </Button>
        )}

        <p className="max-w-[200px] text-center font-mono-ui text-[8px] tracking-wide text-muted-foreground sm:text-[9px]">
          Cloudinary · portfolio-certificates/{certificateId}
        </p>
      </div>

      {error && (
        <div className="absolute inset-x-0 bottom-0 max-h-24 overflow-y-auto bg-destructive/95 px-2 py-2 text-center text-[10px] leading-snug break-words text-white sm:text-xs">
          {error}
        </div>
      )}
    </div>
  )
}
