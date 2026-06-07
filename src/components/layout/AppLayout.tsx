import { Outlet, useLocation } from "react-router-dom"
import { FilmGrain } from "@/components/effects/FilmGrain"
import { CompactFooter } from "@/components/layout/CompactFooter"
import { FooterSection } from "@/components/sections/FooterSection"
import { Letterbox } from "@/components/layout/Letterbox"
import { Navigation } from "@/components/layout/Navigation"
import { ScrollProgress } from "@/components/layout/ScrollProgress"
import { ScrollToTop } from "@/components/layout/ScrollToTop"

export function AppLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === "/"

  return (
    <>
      <FilmGrain />
      <ScrollProgress />
      <Letterbox />
      <Navigation />
      <ScrollToTop />
      <Outlet />
      {isHome ? <FooterSection /> : <CompactFooter />}
    </>
  )
}
