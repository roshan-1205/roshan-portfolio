import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Bot, Volume2, VolumeX } from "lucide-react"
import { avatarIntro } from "@/data/avatar-intro"
import { RoboticAvatarPresenter } from "@/components/avatar/RoboticAvatarPresenter"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useRobotVoice } from "@/hooks/useRobotVoice"
import { easeFilm } from "@/lib/animations"

export function HeroRobotGuide() {
  const reducedMotion = useReducedMotion()
  const { speak, stop, speaking, voiceReady } = useRobotVoice()
  const [lineIndex, setLineIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [displayText, setDisplayText] = useState("Booting introduction protocol...")
  const [muted, setMuted] = useState(false)
  const [voiceReplay, setVoiceReplay] = useState(0)
  const spokeRef = useRef(-1)

  const currentLine = avatarIntro.lines[lineIndex] ?? ""

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 900)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!started || muted || reducedMotion) return
    if (spokeRef.current === lineIndex) return
    spokeRef.current = lineIndex

    setDisplayText(currentLine)

    speak(currentLine, {
      onEnd: () => {
        if (lineIndex < avatarIntro.lines.length - 1) {
          setTimeout(() => setLineIndex((i) => i + 1), 500)
        }
      },
    })
  }, [started, lineIndex, currentLine, speak, muted, reducedMotion, voiceReplay])

  useEffect(() => {
    if (!started || !reducedMotion) return
    setDisplayText(currentLine)
    if (lineIndex >= avatarIntro.lines.length - 1) return
    const timer = setTimeout(() => setLineIndex((i) => i + 1), 3200)
    return () => clearTimeout(timer)
  }, [lineIndex, reducedMotion, started, currentLine])

  useEffect(() => () => stop(), [stop])

  const isTalking = speaking && !muted && !reducedMotion

  return (
    <motion.div
      className="robot-host-panel relative overflow-hidden rounded-2xl border border-cyan/20 bg-card/50 p-5 backdrop-blur-xl md:p-8"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: easeFilm }}
    >
      <div className="pointer-events-none absolute -top-24 -left-16 size-48 rounded-full bg-cyan/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 -bottom-24 size-48 rounded-full bg-purple/10 blur-[100px]" />

      <div className="relative mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Bot className="size-4 text-cyan" />
          <span className="font-mono-ui text-xs tracking-[0.3em] text-cyan uppercase">
            AI Host
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-cyan/50 via-cyan/20 to-transparent" />
        <div className="flex items-center gap-2">
          <motion.span
            className="size-1.5 rounded-full bg-cyan"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-mono-ui text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
            Online
          </span>
        </div>
      </div>

      <div className="relative flex flex-col items-stretch gap-8 lg:flex-row lg:gap-0">
        <motion.div
          className="w-full shrink-0 lg:w-[min(42%,380px)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: easeFilm }}
        >
          <RoboticAvatarPresenter
            speaking={isTalking}
            lineIndex={lineIndex}
            charProgress={displayText.length}
            className="w-full"
          />
        </motion.div>

        <div className="hidden w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-cyan/25 to-transparent lg:mx-8 lg:block" />

        <motion.div
          className="flex w-full flex-1 flex-col justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: easeFilm }}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono-ui text-[10px] tracking-[0.3em] text-cyan uppercase">
              <Volume2 className="size-3.5" />
              {isTalking
                ? "Speaking now"
                : voiceReady
                  ? "Male voice · ready"
                  : "Loading voice"}
            </div>
            <button
              type="button"
              onClick={() => {
                if (muted) {
                  setMuted(false)
                  spokeRef.current = -1
                  setVoiceReplay((n) => n + 1)
                } else {
                  setMuted(true)
                  stop()
                }
              }}
              className="flex items-center gap-1.5 rounded-md border border-border/40 px-2.5 py-1 font-mono-ui text-[9px] tracking-wider text-muted-foreground uppercase transition-colors hover:border-cyan/30 hover:text-cyan"
              aria-label={muted ? "Unmute robot voice" : "Mute robot voice"}
            >
              {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>

          <div className="relative rounded-xl border border-cyan/25 bg-card/80 p-5 shadow-[inset_0_1px_0_rgba(0,212,255,0.06)] backdrop-blur-md md:p-6">
            <div className="pointer-events-none absolute top-1/2 -left-1.5 hidden size-3 -translate-y-1/2 rotate-45 border-b border-l border-cyan/25 bg-card/80 lg:block" />

            <p className="min-h-[4.5rem] font-display text-lg leading-relaxed text-foreground md:text-xl">
              {displayText}
              {isTalking && (
                <motion.span
                  className="ml-0.5 inline-block h-4 w-0.5 bg-cyan align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
              )}
            </p>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/30 pt-4">
              <div className="flex gap-1.5">
                {avatarIntro.lines.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === lineIndex
                        ? "w-5 bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.5)]"
                        : i < lineIndex
                          ? "w-1.5 bg-cyan/50"
                          : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono-ui text-[10px] text-muted-foreground">
                {Math.min(lineIndex + 1, avatarIntro.lines.length)}/
                {avatarIntro.lines.length}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
