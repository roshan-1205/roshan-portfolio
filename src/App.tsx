import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { BrandedLoadingOverlay } from "@/components/layout/BrandedLoadingOverlay"
import { Navigation } from "@/components/layout/Navigation"
import { PortfolioSkeleton } from "@/components/layout/PortfolioSkeleton"
import { Preloader } from "@/components/layout/Preloader"
import { usePageTransitionLoading } from "@/hooks/usePageTransitionLoading"
import { AboutPage } from "@/pages/AboutPage"
import { AchievementsPage } from "@/pages/AchievementsPage"
import { ContactPage } from "@/pages/ContactPage"
import { HomePage } from "@/pages/HomePage"
import { ProjectsPage } from "@/pages/ProjectsPage"
import { ResumePage } from "@/pages/ResumePage"
import { ResumeLayout } from "@/components/layout/ResumeLayout"

type LoadPhase = "preloader" | "skeleton" | "ready"

function AppRoutes({ ready }: { ready: boolean }) {
  const { visible, progress } = usePageTransitionLoading(ready)

  return (
    <>
      <BrandedLoadingOverlay
        visible={visible}
        status="Loading page"
        progress={progress}
        showProgress
        className="z-[240]"
      />

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
    </>
  )
}

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
        <AppRoutes ready={ready} />
      </BrowserRouter>
    </>
  )
}

export default App
