import { Menu, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { navLinks } from "@/data/portfolio"
import { cn } from "@/lib/utils"

function useIsMobileNav() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : true,
  )

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)")
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return isMobile
}

export function Navigation() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isMobile = useIsMobileNav()

  const closeMenu = useCallback(() => setOpen(false), [])
  const toggleMenu = useCallback(() => setOpen((value) => !value), [])

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, closeMenu])

  return (
    <header
      className="pointer-events-auto fixed top-0 right-0 left-0 border-b border-border/30 bg-[#020207]/98 backdrop-blur-xl"
      style={{ zIndex: 99999, paddingTop: "max(0px, env(safe-area-inset-top))" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="font-mono-ui text-xs tracking-widest text-cyan uppercase"
          onClick={closeMenu}
        >
          Roshan.dev
        </Link>

        {!isMobile && (
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={cn(
                  "relative px-4 py-2 font-mono-ui text-xs tracking-wider uppercase transition-colors",
                  isActive(link.path)
                    ? "text-cyan"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 h-px w-6 -translate-x-1/2 bg-cyan" />
                )}
              </NavLink>
            ))}
          </nav>
        )}

        {isMobile && (
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border/40 bg-card text-foreground"
            onClick={toggleMenu}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {isMobile && open && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile navigation"
          className="border-t border-border/25 bg-[#0d0d1a]/95 px-3 py-2 sm:px-4"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    "block rounded-lg px-4 py-3.5 text-center font-mono-ui text-sm tracking-[0.2em] uppercase transition-colors",
                    isActive(link.path)
                      ? "bg-cyan/15 text-cyan"
                      : "text-[#f0ede8] hover:bg-cyan/5 hover:text-cyan",
                  )}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
