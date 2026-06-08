import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { Navigation } from "@/components/layout/Navigation"
import { ResumeLayout } from "@/components/layout/ResumeLayout"
import { PortfolioSkeleton } from "@/components/layout/PortfolioSkeleton"
import { Preloader } from "@/components/layout/Preloader"
import { AboutPage } from "@/pages/AboutPage"
import { AchievementsPage } from "@/pages/AchievementsPage"
import { ContactPage } from "@/pages/ContactPage"
import { HomePage } from "@/pages/HomePage"
import { ProjectsPage } from "@/pages/ProjectsPage"
import { ResumePage } from "@/pages/ResumePage"

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

      <BrowserRouter>
        <Navigation />

        <div
          className={
            ready
              ? "opacity-100 transition-opacity duration-700"
              : "pointer-events-none opacity-0"
          }
        >
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route element={<ResumeLayout />}>
              <Route path="/resume" element={<ResumePage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
