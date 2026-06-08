import { useEffect, useState } from "react"
import { NAME_REVEAL_AT } from "@/components/layout/LoadingBrandMark"

const MIN_MS_BEFORE_TEN = 650

export function useSimulatedLoadingProgress(
  enabled: boolean,
  duration = 1800,
) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setProgress(0)
      return
    }

    const start = performance.now()
    let frameId = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const linear = Math.min(1, elapsed / duration)

      let next: number
      if (elapsed < MIN_MS_BEFORE_TEN) {
        next = (elapsed / MIN_MS_BEFORE_TEN) * (NAME_REVEAL_AT - 1)
      } else {
        const postTenDuration = Math.max(duration - MIN_MS_BEFORE_TEN, 1)
        const postTenT = Math.min(
          1,
          (elapsed - MIN_MS_BEFORE_TEN) / postTenDuration,
        )
        const eased = 1 - Math.pow(1 - postTenT, 2.2)
        next = NAME_REVEAL_AT + eased * (100 - NAME_REVEAL_AT)
      }

      setProgress(Math.min(100, next))

      if (linear < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        setProgress(100)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [enabled, duration])

  return progress
}
