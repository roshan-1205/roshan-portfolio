import { NAME_REVEAL_AT } from "@/components/layout/LoadingBrandMark"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

export function usePageTransitionLoading(appReady: boolean) {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const isFirstRoute = useRef(true)

  useEffect(() => {
    if (!appReady) return

    if (isFirstRoute.current) {
      isFirstRoute.current = false
      return
    }

    setVisible(true)
    setProgress(0)

    const duration = 900
    const start = performance.now()
    let frameId = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 2.2)
      let next = eased * 100

      if (elapsed < 650) {
        next = Math.min(next, NAME_REVEAL_AT - 1)
      }

      setProgress(next)

      if (t < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        window.setTimeout(() => setVisible(false), 180)
      }
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
      setVisible(false)
      setProgress(0)
    }
  }, [location.pathname, appReady])

  return { visible, progress }
}
