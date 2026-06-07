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
]

function pickMaleVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith("en"))
  const male = en.find((v) =>
    MALE_VOICE_HINTS.some((hint) => v.name.toLowerCase().includes(hint)),
  )
  if (male) return male

  const notFemale = en.find(
    (v) =>
      !v.name.toLowerCase().includes("female") &&
      !v.name.toLowerCase().includes("zira") &&
      !v.name.toLowerCase().includes("samantha"),
  )
  return notFemale ?? en[0] ?? voices[0] ?? null
}

interface SpeakOptions {
  onStart?: () => void
  onEnd?: () => void
}

export function useRobotVoice() {
  const [speaking, setSpeaking] = useState(false)
  const [voiceReady, setVoiceReady] = useState(false)
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        voiceRef.current = pickMaleVoice(voices)
        setVoiceReady(true)
      }
    }

    loadVoices()
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices)
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices)
      window.speechSynthesis.cancel()
    }
  }, [])

  const speak = useCallback(
    (text: string, options?: SpeakOptions) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        options?.onStart?.()
        setTimeout(() => {
          setSpeaking(false)
          options?.onEnd?.()
        }, Math.max(1800, text.length * 45))
        return
      }

      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.92
      utterance.pitch = 0.82
      utterance.volume = 1
      if (voiceRef.current) utterance.voice = voiceRef.current

      utterance.onstart = () => {
        setSpeaking(true)
        options?.onStart?.()
      }
      utterance.onend = () => {
        setSpeaking(false)
        options?.onEnd?.()
      }
      utterance.onerror = () => {
        setSpeaking(false)
        options?.onEnd?.()
      }

      window.speechSynthesis.speak(utterance)
    },
    [],
  )

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setSpeaking(false)
  }, [])

  return { speak, stop, speaking, voiceReady }
}
