import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { navLinks } from "@/data/portfolio"
import { cn } from "@/lib/utils"
import { easeFilm } from "@/lib/animations"

export function Navigation() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 right-0 left-0 z-[200] border-b border-border/30 bg-background/60 backdrop-blur-xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeFilm }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="font-mono-ui text-xs tracking-widest text-cyan uppercase"
            onClick={() => setOpen(false)}
          >
            Roshan.dev
          </Link>

          <div className="hidden items-center gap-1 md:flex">
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
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 h-px w-6 -translate-x-1/2 bg-cyan"
                  />
                )}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            className="text-foreground md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[199] flex items-center justify-center bg-background/95 backdrop-blur-2xl md:hidden"
            initial={{ clipPath: "circle(0% at 90% 5%)" }}
            animate={{ clipPath: "circle(150% at 90% 5%)" }}
            exit={{ clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.8, ease: easeFilm }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      "font-display text-3xl transition-colors",
                      isActive(link.path)
                        ? "text-cyan"
                        : "text-foreground",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
