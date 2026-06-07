import { PageShell } from "@/components/layout/PageShell"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { usePageTitle } from "@/hooks/usePageTitle"

export function ProjectsPage() {
  usePageTitle("Projects")

  return (
    <PageShell className="pt-16 md:pt-20">
      <ProjectsSection />
    </PageShell>
  )
}
