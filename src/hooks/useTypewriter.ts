import { useEffect, useState } from "react"

interface UseTypewriterOptions {
  text: string
  speed?: number
  startDelay?: number
  enabled?: boolean
}

export function useTypewriter({
  text,
  speed = 32,
  startDelay = 0,
  enabled = true,
}: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setDisplayed("")
      setDone(false)
      return
    }

    setDisplayed("")
    setDone(false)

    let index = 0
    let intervalId: ReturnType<typeof setInterval>
    const delayId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(delayId)
      clearInterval(intervalId)
    }
  }, [text, speed, startDelay, enabled])

  return { displayed, done }
}
