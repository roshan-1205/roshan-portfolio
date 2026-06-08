import { Award, ImagePlus } from "lucide-react"
import { PortfolioImageDisplay } from "@/components/shared/PortfolioImageDisplay"

type CertificateImagePanelProps = {
  title: string
  imageUrl?: string
}

export function CertificateImagePanel({
  title,
  imageUrl,
}: CertificateImagePanelProps) {
  return (
    <div className="mx-auto w-[95%] max-w-[420px] px-2 pt-4 sm:pt-5">
      <PortfolioImageDisplay
        title={title}
        imageUrl={imageUrl}
        aspectClass="aspect-[3/2] w-full"
        imageFit="contain"
        placeholder={
          <>
            <Award className="size-10 text-purple/40" />
            <ImagePlus className="size-8 text-cyan/30" />
            <p className="font-mono-ui text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Certificate image
            </p>
          </>
        }
      />
    </div>
  )
}
