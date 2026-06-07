import { useState } from "react"
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

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <FilmGrain />
      <ScrollProgress />
      <Letterbox />
      {loaded && <Navigation />}

      <main
        className={
          loaded
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
