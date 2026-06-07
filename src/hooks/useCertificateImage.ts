import { certificateImageStorage } from "@/lib/certificate-images"
import { usePortfolioImage } from "@/hooks/usePortfolioImage"

export function useCertificateImage(certificateId: string, defaultUrl?: string) {
  return usePortfolioImage(
    certificateId,
    certificateImageStorage,
    "portfolio-certificates",
    defaultUrl,
  )
}
