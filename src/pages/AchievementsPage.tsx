import { PageShell } from "@/components/layout/PageShell"
import { AchievementsSection } from "@/components/sections/AchievementsSection"
import { usePageTitle } from "@/hooks/usePageTitle"

export function AchievementsPage() {
  usePageTitle("Achievements")

  return (
    <PageShell className="pt-16 md:pt-20">
      <AchievementsSection />
    </PageShell>
  )
}
