import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import { ArrowRight, Sparkles, Volume2 } from "lucide-react"
import { avatarIntro } from "@/data/avatar-intro"
import { personal } from "@/data/portfolio"
import { RoboticAvatarPresenter } from "@/components/avatar/RoboticAvatarPresenter"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useTypewriter } from "@/hooks/useTypewriter"
import { easeFilm } from "@/lib/animations"

interface AvatarIntroProps {
  onComplete: () => void
}

export function AvatarIntro({ onComplete }: AvatarIntroProps) {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [lineIndex, setLineIndex] = useState(0)
  const [canContinue, setCanContinue] = useState(false)

  const currentLine = avatarIntro.lines[lineIndex] ?? ""
  const { displayed, done } = useTypewriter({
    text: currentLine,
    speed: reducedMotion ? 0 : 28,
    startDelay: lineIndex === 0 ? 600 : 350,
    enabled: !reducedMotion,
  })
  const speaking = !done && !reducedMotion

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    if (!done) return

    const isLast = lineIndex >= avatarIntro.lines.length - 1
    if (isLast) {
      const timer = setTimeout(() => setCanContinue(true), 500)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => setLineIndex((i) => i + 1), 1200)
    return () => clearTimeout(timer)
  }, [done, lineIndex])

  const finish = useCallback(() => {
    setVisible(false)
    setTimeout(onComplete, 900)
  }, [onComplete])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && canContinue) finish()
      if (e.key === "Escape") finish()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [canContinue, finish])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="avatar-intro"
          className="fixed inset-0 z-[250] flex min-h-screen items-center justify-center overflow-y-auto bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: easeFilm }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/3 left-1/4 size-[28rem] rounded-full bg-cyan/10 blur-[120px]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-1/4 bottom-1/4 size-80 rounded-full bg-purple/10 blur-[100px]"
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <button
            type="button"
            onClick={finish}
            className="absolute top-6 right-6 z-20 font-mono-ui text-[10px] tracking-[0.25em] text-muted-foreground uppercase transition-colors hover:text-cyan"
          >
            Skip intro
          </button>

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-8 px-6 py-20 lg:flex-row lg:gap-12">
            <motion.div
              className="relative w-full min-h-[380px] shrink-0 lg:min-h-[480px] lg:flex-1 lg:max-w-xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: easeFilm }}
            >
              {avatarIntro.photoUrl ? (
                <RoboticAvatarPresenter
                  speaking={speaking || (!canContinue && lineIndex < avatarIntro.lines.length)}
                  lineIndex={lineIndex}
                  charProgress={displayed.length}
                />
              ) : (
                <div className="mx-auto flex h-full max-h-[420px] flex-col items-center justify-center rounded-2xl border border-cyan/20 bg-card/60 p-8 text-center backdrop-blur-sm">
                  <div className="flex size-28 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 font-display text-5xl text-cyan">
                    {personal.name.charAt(0)}
                  </div>
                  <p className="mt-6 font-mono-ui text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    {personal.name}
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div
              className="w-full max-w-lg lg:flex-1"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: easeFilm }}
            >
              <div className="mb-4 flex items-center gap-2 font-mono-ui text-[10px] tracking-[0.3em] text-cyan uppercase">
                <Volume2 className="size-3.5" />
                {speaking ? "Robot host · transmitting" : "Robot host · standby"}
              </div>

              <div className="relative rounded-2xl border border-border/40 bg-card/70 p-6 backdrop-blur-md md:p-8">
                <div className="absolute -top-3 left-10 size-6 rotate-45 border-t border-l border-border/40 bg-card/70" />

                <p className="min-h-[5.5rem] font-display text-xl leading-relaxed text-foreground md:text-2xl">
                  {reducedMotion ? currentLine : displayed}
                  {!reducedMotion && !done && (
                    <motion.span
                      className="ml-0.5 inline-block h-5 w-0.5 bg-cyan align-middle"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex gap-1.5">
                    {avatarIntro.lines.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === lineIndex
                            ? "w-6 bg-cyan"
                            : i < lineIndex
                              ? "w-1.5 bg-cyan/50"
                              : "w-1.5 bg-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono-ui text-[10px] text-muted-foreground">
                    {lineIndex + 1}/{avatarIntro.lines.length}
                  </span>
                </div>
              </div>

              <AnimatePresence>
                {canContinue && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: easeFilm }}
                    className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                  >
                    <Button
                      size="lg"
                      onClick={finish}
                      className="h-12 border-cyan/30 bg-cyan/10 px-8 font-mono-ui text-xs tracking-widest text-cyan uppercase hover:bg-cyan/20"
                    >
                      <Sparkles className="mr-2 size-4" />
                      Explore portfolio
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                    <p className="font-mono-ui text-[10px] tracking-wider text-muted-foreground">
                      Press Enter · Esc to skip
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
