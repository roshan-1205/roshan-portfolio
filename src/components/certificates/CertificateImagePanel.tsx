import { Award, Expand, ImagePlus } from "lucide-react"
import { useState } from "react"
import { ImageLightbox } from "@/components/shared/ImageLightbox"
import { PortfolioImageDisplay } from "@/components/shared/PortfolioImageDisplay"

type CertificateImagePanelProps = {
  title: string
  imageUrl?: string
  subtitle?: string
}

export function CertificateImagePanel({
  title,
  imageUrl,
  subtitle,
}: CertificateImagePanelProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      <div className="mx-auto w-[95%] max-w-[420px] px-2 pt-4 sm:pt-5">
        {imageUrl ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`View ${title} certificate`}
          >
            <PortfolioImageDisplay
              title={title}
              imageUrl={imageUrl}
              aspectClass="aspect-[3/2] w-full transition-transform duration-300 group-hover:scale-[1.01]"
              imageFit="contain"
            />

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-background/0 transition-colors duration-300 group-hover:bg-background/35">
              <span className="flex translate-y-2 items-center gap-2 rounded-full border border-cyan/30 bg-card/90 px-3 py-1.5 font-mono-ui text-[10px] tracking-[0.2em] text-cyan uppercase opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Expand className="size-3.5" />
                View certificate
              </span>
            </div>
          </button>
        ) : (
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
        )}
      </div>

      {imageUrl && (
        <ImageLightbox
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          src={imageUrl}
          title={title}
          subtitle={subtitle}
        />
      )}
    </>
  )
}
