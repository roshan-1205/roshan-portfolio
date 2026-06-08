import { ImagePlus } from "lucide-react"
import { PortfolioImageUploader } from "@/components/shared/PortfolioImageUploader"
import { useProjectImage } from "@/hooks/useProjectImage"

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
  const { imageUrl, displayUrl, isUploading, isRemoving, error, upload, remove } =
    useProjectImage(projectId, defaultImageUrl)

  return (
    <PortfolioImageUploader
      title={title}
      assetId={projectId}
      storageLabel="portfolio-projects"
      aspectClass="aspect-[4/3]"
      imageFit="cover"
      imageUrl={imageUrl}
      displayUrl={displayUrl}
      isUploading={isUploading}
      isRemoving={isRemoving}
      error={error}
      onUpload={upload}
      onRemove={remove}
      placeholder={
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan/20 to-transparent" />
          <ImagePlus className="relative z-10 size-10 text-cyan/40" />
          <span className="relative z-10 font-display text-6xl font-light text-foreground/10 md:text-8xl">
            {projectNumber}
          </span>
          <p className="relative z-10 font-mono-ui text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            {isUploading ? "Uploading…" : "Tap to upload project image"}
          </p>
        </>
      }
    />
  )
}
