import { useEffect, useState } from "react"
import { PortfolioSkeleton } from "@/components/layout/PortfolioSkeleton"
import { Preloader } from "@/components/layout/Preloader"
import { Navigation } from "@/components/layout/Navigation"
import { ScrollProgress } from "@/components/layout/ScrollProgress"
import { Letterbox } from "@/components/layout/Letterbox"
import { FilmGrain } from "@/components/effects/FilmGrain"
import { HeroSection } from "@/components/sections/HeroSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { AchievementsSection } from "@/components/sections/AchievementsSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { FooterSection } from "@/components/sections/FooterSection"

type LoadPhase = "preloader" | "skeleton" | "ready"

function App() {
  const [phase, setPhase] = useState<LoadPhase>("preloader")

  useEffect(() => {
    if (phase !== "skeleton") return

    const timer = window.setTimeout(() => setPhase("ready"), 1100)
    return () => window.clearTimeout(timer)
  }, [phase])

  const ready = phase === "ready"

  return (
    <>
      {phase === "preloader" && (
        <Preloader onComplete={() => setPhase("skeleton")} />
      )}

      <PortfolioSkeleton visible={phase === "skeleton"} />

      <FilmGrain />
      <ScrollProgress />
      <Letterbox />
      {ready && <Navigation />}

      <main
        className={
          ready
            ? "opacity-100 transition-opacity duration-700"
            : "pointer-events-none opacity-0"
        }
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
        <FooterSection />
      </main>
    </>
  )
}

export default App
