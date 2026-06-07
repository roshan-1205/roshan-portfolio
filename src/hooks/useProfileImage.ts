import { PROFILE_IMAGE_ID, profileImageStorage } from "@/lib/profile-image"
import { usePortfolioImage } from "@/hooks/usePortfolioImage"

export function useProfileImage(defaultUrl?: string) {
  return usePortfolioImage(
    PROFILE_IMAGE_ID,
    profileImageStorage,
    "portfolio-profile",
    defaultUrl,
  )
}
