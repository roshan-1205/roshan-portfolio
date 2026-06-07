import { Outlet } from "react-router-dom"
import { FilmGrain } from "@/components/effects/FilmGrain"
import { CompactFooter } from "@/components/layout/CompactFooter"
import { Navigation } from "@/components/layout/Navigation"
import { ScrollProgress } from "@/components/layout/ScrollProgress"
import { ScrollToTop } from "@/components/layout/ScrollToTop"

export function ResumeLayout() {
  return (
    <>
      <FilmGrain />
      <ScrollProgress />
      <Navigation />
      <ScrollToTop />
      <Outlet />
      <CompactFooter />
    </>
  )
}
