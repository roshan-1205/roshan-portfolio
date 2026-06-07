import { useCallback, useEffect, useRef, useState } from "react"

const MALE_VOICE_HINTS = [
  "david",
  "mark",
  "james",
  "daniel",
  "guy",
  "male",
  "george",
  "christopher",
  "microsoft david",
  "google uk english male",
  "google us english male",
  "rishi",
  "aaron",
]

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith("en"))
  const male = en.find((v) =>
    MALE_VOICE_HINTS.some((hint) => v.name.toLowerCase().includes(hint)),
  )
  if (male) return male

  const notFemale = en.find(
    (v) =>
      !v.name.toLowerCase().includes("female") &&
      !v.name.toLowerCase().includes("zira") &&
      !v.name.toLowerCase().includes("samantha") &&
      !v.name.toLowerCase().includes("karen"),
  )
  return notFemale ?? en[0] ?? voices[0] ?? null
}

function waitForVoices(timeoutMs = 4000): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve([])
      return
    }

    const synth = window.speechSynthesis
    const existing = synth.getVoices()
    if (existing.length > 0) {
      resolve(existing)
      return
    }

    let settled = false
    const finish = (voices: SpeechSynthesisVoice[]) => {
      if (settled) return
      settled = true
      synth.removeEventListener("voiceschanged", onChange)
      clearInterval(pollId)
      clearTimeout(timeoutId)
      resolve(voices)
    }

    const onChange = () => {
      const voices = synth.getVoices()
      if (voices.length > 0) finish(voices)
    }

    synth.addEventListener("voiceschanged", onChange)

    const pollId = setInterval(() => {
      const voices = synth.getVoices()
      if (voices.length > 0) finish(voices)
    }, 120)

    const timeoutId = setTimeout(() => finish(synth.getVoices()), timeoutMs)
  })
}

/** Estimated ms per character at given speech rate (fallback when boundary events missing). */
function msPerChar(rate: number) {
  return Math.max(28, Math.round(52 / rate))
}

export interface SpeakOptions {
  onStart?: () => void
  onEnd?: () => void
  onProgress?: (visibleText: string) => void
}

export function useRobotVoice() {
  const [speaking, setSpeaking] = useState(false)
  const [voiceReady, setVoiceReady] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(false)
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)
  const resumeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const revealTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const boundarySeenRef = useRef(false)

  const clearTimers = useCallback(() => {
    if (resumeTimerRef.current) {
      clearInterval(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
    if (revealTimerRef.current) {
      clearInterval(revealTimerRef.current)
      revealTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      "SpeechSynthesisUtterance" in window
    setSpeechSupported(supported)
    if (!supported) return

    const loadVoices = async () => {
      const voices = await waitForVoices(2500)
      if (voices.length > 0) {
        voiceRef.current = pickVoice(voices)
        setVoiceReady(true)
      }
    }

    void loadVoices()

    return () => {
      clearTimers()
      window.speechSynthesis?.cancel()
    }
  }, [clearTimers])

  const startChromeResumeHack = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return
    clearInterval(resumeTimerRef.current ?? undefined)
    resumeTimerRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.resume()
      }
    }, 140)
  }, [])

  const startRevealFallback = useCallback(
    (text: string, rate: number, onProgress?: (visibleText: string) => void) => {
      let index = 0
      clearInterval(revealTimerRef.current ?? undefined)
      revealTimerRef.current = setInterval(() => {
        if (boundarySeenRef.current) {
          clearInterval(revealTimerRef.current ?? undefined)
          revealTimerRef.current = null
          return
        }
        index += 1
        onProgress?.(text.slice(0, index))
        if (index >= text.length) {
          clearInterval(revealTimerRef.current ?? undefined)
          revealTimerRef.current = null
        }
      }, msPerChar(rate))
    },
    [],
  )

  const speak = useCallback(
    async (text: string, options?: SpeakOptions) => {
      clearTimers()
      boundarySeenRef.current = false

      const finish = () => {
        clearTimers()
        setSpeaking(false)
        options?.onProgress?.(text)
        options?.onEnd?.()
      }

      if (typeof window === "undefined" || !window.speechSynthesis) {
        options?.onStart?.()
        setSpeaking(true)
        options?.onProgress?.("")
        let index = 0
        const id = setInterval(() => {
          index += 1
          options?.onProgress?.(text.slice(0, index))
          if (index >= text.length) {
            clearInterval(id)
            finish()
          }
        }, msPerChar(0.92))
        revealTimerRef.current = id
        return
      }

      const synth = window.speechSynthesis
      synth.cancel()

      const voices = await waitForVoices(3000)
      if (voices.length > 0) {
        voiceRef.current = pickVoice(voices)
        setVoiceReady(true)
      }

      const utterance = new SpeechSynthesisUtterance(text)
      const rate = 0.92
      utterance.rate = rate
      utterance.pitch = 0.85
      utterance.volume = 1
      utterance.lang = voiceRef.current?.lang ?? "en-US"
      if (voiceRef.current) utterance.voice = voiceRef.current

      utterance.onstart = () => {
        setSpeaking(true)
        options?.onStart?.()
        options?.onProgress?.("")
        startChromeResumeHack()
        startRevealFallback(text, rate, options?.onProgress)
      }

      utterance.onboundary = (event) => {
        boundarySeenRef.current = true
        const end = event.charIndex + (event.charLength || 1)
        options?.onProgress?.(text.slice(0, Math.min(end, text.length)))
      }

      utterance.onend = () => finish()

      utterance.onerror = () => finish()

      synth.speak(utterance)

      // iOS / Safari sometimes needs an extra resume right after speak()
      setTimeout(() => {
        if (synth.paused) synth.resume()
      }, 0)
      setTimeout(() => {
        if (synth.paused) synth.resume()
      }, 250)
    },
    [clearTimers, startChromeResumeHack, startRevealFallback],
  )

  const stop = useCallback(() => {
    clearTimers()
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setSpeaking(false)
  }, [clearTimers])

  const primeSpeech = useCallback(async () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return false

    const voices = await waitForVoices(3000)
    if (voices.length > 0) {
      voiceRef.current = pickVoice(voices)
      setVoiceReady(true)
    }

    // Empty utterance unlocks audio on iOS after a user gesture
    const unlock = new SpeechSynthesisUtterance("")
    unlock.volume = 0
    unlock.rate = 1
    window.speechSynthesis.speak(unlock)
    window.speechSynthesis.cancel()
    return true
  }, [])

  return {
    speak,
    stop,
    speaking,
    voiceReady,
    speechSupported,
    primeSpeech,
  }
}
