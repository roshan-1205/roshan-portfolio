import { PageShell } from "@/components/layout/PageShell"
import { AboutSection } from "@/components/sections/AboutSection"
import { usePageTitle } from "@/hooks/usePageTitle"

export function AboutPage() {
  usePageTitle("About")

  return (
    <PageShell className="pt-16 md:pt-20">
      <AboutSection />
    </PageShell>
  )
}
