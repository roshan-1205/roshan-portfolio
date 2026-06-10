import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

const TRANSITION_MS = 1400
const EXIT_DELAY_MS = 320

/**
 * Entry path for this document load. Survives Strict Mode remounts so reload
 * never triggers a fake "navigation" loader on /resume, /contact, etc.
 */
let bootPathname: string | null = null

export function usePageTransitionLoading(appReady: boolean) {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const previousPathname = useRef<string | null>(null)

  useEffect(() => {
    if (!appReady) return

    const current = location.pathname

    if (bootPathname === null) {
      bootPathname = current
      previousPathname.current = current
      return
    }

    if (previousPathname.current === null) {
      previousPathname.current = bootPathname
    }

    if (previousPathname.current === current) return

    previousPathname.current = current

    setVisible(true)
    setProgress(0)

    const duration = TRANSITION_MS
    const start = performance.now()
    let frameId = 0
    let exitTimer = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 2.2)
      setProgress(eased * 100)

      if (t < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        exitTimer = window.setTimeout(() => setVisible(false), EXIT_DELAY_MS)
      }
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
      window.clearTimeout(exitTimer)
      setVisible(false)
      setProgress(0)
    }
  }, [location.pathname, appReady])

  return { visible, progress }
}
