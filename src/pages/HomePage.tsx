import { PageShell } from "@/components/layout/PageShell"
import { HeroSection } from "@/components/sections/HeroSection"
import { FindMeOnSection } from "@/components/sections/FindMeOnSection"
import { HomeIntroSection } from "@/components/sections/HomeIntroSection"
import { usePageTitle } from "@/hooks/usePageTitle"

export function HomePage() {
  usePageTitle("Home")

  return (
    <PageShell>
      <HeroSection />
      <HomeIntroSection />
      <FindMeOnSection />
    </PageShell>
  )
}
