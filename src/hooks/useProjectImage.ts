import { projectImageStorage } from "@/lib/project-images"
import { usePortfolioImage } from "@/hooks/usePortfolioImage"

export function useProjectImage(projectId: string, defaultUrl?: string) {
  return usePortfolioImage(
    projectId,
    projectImageStorage,
    "portfolio-projects",
    defaultUrl,
  )
}
