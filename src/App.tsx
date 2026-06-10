import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { BrandedLoadingOverlay } from "@/components/layout/BrandedLoadingOverlay"
import { pageTransitionBrandPositionClass } from "@/components/layout/LoadingBrandMark"
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

function isSkeletonOnlyEntryPath() {
  if (typeof window === "undefined") return false
  const path = window.location.pathname.replace(/\/$/, "") || "/"
  return path === "/contact" || path === "/resume"
}

function getInitialLoadPhase(): LoadPhase {
  return isSkeletonOnlyEntryPath() ? "skeleton" : "preloader"
}

function usesPageTransitionBrandPosition(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/"
  return path === "/" || path === "/resume"
}

function AppRoutes({
  ready,
  chromeHidden,
  pageTransitionsEnabled,
}: {
  ready: boolean
  chromeHidden: boolean
  pageTransitionsEnabled: boolean
}) {
  const { pathname } = useLocation()
  const { visible, progress } = usePageTransitionLoading(
    ready && pageTransitionsEnabled,
  )
  const showPageLoader = visible
  const showChrome = !chromeHidden && !showPageLoader

  return (
    <>
      <BrandedLoadingOverlay
        visible={showPageLoader}
        status="Loading page"
        progress={progress}
        showProgress
        showName
        logoSize="lg"
        contentClassName={
          showPageLoader && usesPageTransitionBrandPosition(pathname)
            ? pageTransitionBrandPositionClass
            : undefined
        }
      />

      {showChrome && <Navigation />}

      <div
        className={
          ready && !showPageLoader
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

function AppShell() {
  const [phase, setPhase] = useState<LoadPhase>(getInitialLoadPhase)
  const [pageTransitionsEnabled, setPageTransitionsEnabled] = useState(false)

  useEffect(() => {
    if (phase !== "skeleton") return

    const timer = window.setTimeout(() => setPhase("ready"), 1100)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== "ready") {
      setPageTransitionsEnabled(false)
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      setPageTransitionsEnabled(true)
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [phase])

  const ready = phase === "ready"

  return (
    <>
      {phase === "preloader" && (
        <Preloader onComplete={() => setPhase("skeleton")} />
      )}

      <PortfolioSkeleton visible={phase === "skeleton"} />

      <AppRoutes
        ready={ready}
        chromeHidden={phase !== "ready"}
        pageTransitionsEnabled={pageTransitionsEnabled}
      />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
