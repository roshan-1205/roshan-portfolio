import { ImagePlus } from "lucide-react"
import { PortfolioImageDisplay } from "@/components/shared/PortfolioImageDisplay"

type ProjectImagePanelProps = {
  projectNumber: string
  title: string
  imageUrl?: string
}

export function ProjectImagePanel({
  projectNumber,
  title,
  imageUrl,
}: ProjectImagePanelProps) {
  return (
    <PortfolioImageDisplay
      title={title}
      imageUrl={imageUrl}
      aspectClass="aspect-[4/3]"
      imageFit="cover"
      placeholder={
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan/20 to-transparent" />
          <ImagePlus className="relative z-10 size-10 text-cyan/40" />
          <span className="relative z-10 font-display text-6xl font-light text-foreground/10 md:text-8xl">
            {projectNumber}
          </span>
        </>
      }
    />
  )
}
