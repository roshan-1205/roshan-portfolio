import { motion, AnimatePresence } from "framer-motion"
import { Download, MessageSquare, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { ChatBot } from "@/components/avatar/ChatBot"
import { personal } from "@/data/portfolio"
import { Starfield } from "@/components/effects/Starfield"
import { TextReveal } from "@/components/effects/TextReveal"
import { Button } from "@/components/ui/button"
import { easeFilm } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function HeroSection() {
  const [chatOpen, setChatOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16"
    >
      <Starfield />

      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 size-96 rounded-full bg-cyan/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 size-80 rounded-full bg-purple/5 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Interactive Logo with Chat Reveal - Centered and Compact */}
        <div className="relative mb-8 flex justify-center lg:mb-12">
          <AnimatePresence mode="wait">
            {!chatOpen ? (
              /* Logo - Clickable */
              <motion.div
                key="logo"
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: easeFilm }}
              >
                <button
                  type="button"
                  onClick={() => setChatOpen(true)}
                  className="group relative w-64"
                  aria-label="Open AI chat assistant"
                >
                  {/* Animated border glow */}
                  <motion.div
                    className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan/20 via-purple/20 to-cyan/20 opacity-0 blur-lg transition-opacity group-hover:opacity-100"
                    initial={false}
                    animate={reducedMotion ? {} : { rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative overflow-hidden rounded-2xl border border-cyan/30 bg-gradient-to-br from-card/80 to-card/40 p-4 shadow-xl backdrop-blur-md transition-all group-hover:border-cyan/50 group-hover:shadow-cyan/20">
                    {/* Scanline effect */}
                    <motion.div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent"
                      animate={
                        reducedMotion
                          ? {}
                          : { y: ["-100%", "100%"] }
                      }
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Logo - Just Image at Top */}
                    <div className="relative flex w-full items-center justify-center py-4">
                      <motion.div
                        className="relative flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: easeFilm }}
                      >
                        {/* Glow effect behind logo */}
                        <motion.div
                          className="pointer-events-none absolute inset-0 rounded-full"
                          animate={
                            reducedMotion
                              ? {}
                              : {
                                  boxShadow: [
                                    "0 0 20px 5px rgba(0,212,255,0.2)",
                                    "0 0 30px 10px rgba(0,212,255,0.3)",
                                    "0 0 20px 5px rgba(0,212,255,0.2)",
                                  ],
                                }
                          }
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        {/* Logo Image */}
                        <img
                          src="/favicon.png"
                          alt="Roshan Kumar Singh"
                          className="relative z-10 size-28 rounded-full border-2 border-cyan/40 shadow-lg"
                        />
                      </motion.div>
                    </div>

                    {/* Click hint with icon */}
                    <motion.div
                      className="relative mt-3 flex items-center justify-center gap-2 rounded-lg border border-cyan/20 bg-cyan/5 px-3 py-2 font-mono-ui text-[10px] tracking-wider text-cyan/90 transition-colors group-hover:border-cyan/40 group-hover:bg-cyan/10"
                      animate={
                        reducedMotion
                          ? {}
                          : { opacity: [0.7, 1, 0.7] }
                      }
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <MessageSquare className="size-3.5" />
                      <span className="uppercase">Ask me anything</span>
                      <motion.span
                        className="ml-1"
                        animate={
                          reducedMotion
                            ? {}
                            : { x: [0, 4, 0] }
                        }
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </button>
              </motion.div>
            ) : (
              /* Chat Widget - Expanded */
              <motion.div
                key="chat"
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.9, y: 20 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.95, y: -20 }
                }
                transition={{ duration: 0.4, ease: easeFilm }}
                className="relative w-full max-w-3xl"
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="absolute -top-3 -right-3 z-20 flex size-9 items-center justify-center rounded-full border border-cyan/30 bg-background/95 text-cyan shadow-lg backdrop-blur-sm transition-all hover:border-cyan/50 hover:bg-cyan/10 hover:scale-110"
                  aria-label="Close chat and show logo"
                >
                  <X className="size-4" />
                </button>

                <ChatBot />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center lg:mt-16">
          <h1 className="font-display text-[clamp(2rem,6vw,5rem)] leading-[0.95] font-light tracking-tight">
            <TextReveal
              text={personal.name}
              as="span"
              className="block text-gradient-cyan"
              delay={0.5}
            />
          </h1>

          <motion.div
            className="mx-auto my-8 h-px w-32 bg-gradient-to-r from-transparent via-cyan to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 2.5, ease: easeFilm }}
          />

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8, ease: easeFilm }}
          >
            <Button
              asChild
              size="lg"
              className="h-12 border-cyan/30 bg-cyan/10 px-8 font-mono-ui text-xs tracking-widest text-cyan uppercase hover:bg-cyan/20"
            >
              <a
                href="#intro"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("intro")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }}
              >
                About Me
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-border/50 px-8 font-mono-ui text-xs tracking-widest uppercase"
            >
              <Link to="/projects">View My Work</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 border-border/50 px-8 font-mono-ui text-xs tracking-widest uppercase"
            >
              <Link to="/resume">
                <Download className="mr-2 size-4" />
                View Resume
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
