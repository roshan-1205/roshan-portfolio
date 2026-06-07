import { useEffect } from "react"

const SITE_TITLE = "Roshan Kumar Singh | Technology Strategist & AI Engineer"

export function usePageTitle(page: string) {
  useEffect(() => {
    document.title = page === "Home" ? SITE_TITLE : `${page} · ${SITE_TITLE}`
  }, [page])
}
