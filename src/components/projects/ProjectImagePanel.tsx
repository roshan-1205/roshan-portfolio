import { useRef } from "react"
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react"
import { useProjectImage } from "@/hooks/useProjectImage"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ProjectImagePanelProps = {
  projectId: string
  projectNumber: string
  title: string
  defaultImageUrl?: string
}

export function ProjectImagePanel({
  projectId,
  projectNumber,
  title,
  defaultImageUrl,
}: ProjectImagePanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { imageUrl, isUploading, error, upload, remove } = useProjectImage(
    projectId,
    defaultImageUrl,
  )

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      await upload(file)
    } catch {
      // Error state handled in hook
    } finally {
      event.target.value = ""
    }
  }

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-cyan/10 via-card to-purple/10">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${title} preview`}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <ImagePlus className="size-10 text-cyan/40" />
            <span className="font-display text-6xl font-light text-foreground/10 md:text-8xl">
              {projectNumber}
            </span>
            <p className="font-mono-ui text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              No image yet
            </p>
          </div>
        </>
      )}

      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/75 opacity-0 backdrop-blur-sm transition-opacity duration-300",
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
          aria-label={`Upload image for ${title}`}
        />

        <Button
          type="button"
          size="sm"
          className="font-mono-ui text-xs tracking-wider uppercase"
          disabled={isUploading}
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
              {imageUrl ? "Replace Image" : "Upload Image"}
            </>
          )}
        </Button>

        {imageUrl && !isUploading && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="font-mono-ui text-xs tracking-wider text-destructive uppercase hover:text-destructive"
            onClick={remove}
          >
            <Trash2 className="mr-2 size-3" />
            Remove
          </Button>
        )}

        <p className="max-w-[220px] text-center font-mono-ui text-[9px] tracking-wide text-muted-foreground">
          Saved to Cloudinary · portfolio-projects/{projectId}
        </p>
      </div>

      {error && (
        <div className="absolute inset-x-0 bottom-0 bg-destructive/90 px-3 py-2 text-center text-xs text-white">
          {error}
        </div>
      )}
    </div>
  )
}
