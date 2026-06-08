import { Award, ImagePlus } from "lucide-react"
import { PortfolioImageUploader } from "@/components/shared/PortfolioImageUploader"
import { useCertificateImage } from "@/hooks/useCertificateImage"

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
  const { imageUrl, displayUrl, isUploading, isRemoving, error, upload, remove } =
    useCertificateImage(certificateId, defaultImageUrl)

  return (
    <div className="mx-auto w-[95%] max-w-[420px] px-2 pt-4 sm:pt-5">
      <PortfolioImageUploader
        title={title}
        assetId={certificateId}
        storageLabel="portfolio-certificates"
        aspectClass="aspect-[3/2] w-full"
        imageFit="contain"
        imageUrl={imageUrl}
        displayUrl={displayUrl}
        isUploading={isUploading}
        isRemoving={isRemoving}
        error={error}
        onUpload={upload}
        onRemove={remove}
        placeholder={
          <>
            <Award className="size-10 text-purple/40" />
            <ImagePlus className="size-8 text-cyan/30" />
            <p className="font-mono-ui text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              {isUploading ? "Uploading…" : "Tap to upload certificate"}
            </p>
          </>
        }
      />
    </div>
  )
}
