import { motion, AnimatePresence } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { Send, Terminal, AlertTriangle, MessageSquare } from "lucide-react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { easeFilm } from "@/lib/animations"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

const STARTER_PROMPTS = [
  "What's his tech stack?",
  "Show me his GitHub",
  "Tell me about VAANI",
  "How to contact him?",
]

const MAX_MESSAGE_LENGTH = 800

// Helper function to render text with clickable links
function renderTextWithLinks(text: string): React.ReactNode {
  // Pattern: Markdown-style links [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  
  const elements: React.ReactNode[] = []
  let lastIndex = 0
  let match
  
  while ((match = markdownLinkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index))
    }
    
    const linkText = match[1]
    const linkUrl = match[2]
    
    // All links open in the same way - just make them clickable
    elements.push(
      <a
        key={`link-${match.index}`}
        href={linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan underline decoration-cyan/40 underline-offset-2 transition-colors hover:text-cyan/80 hover:decoration-cyan/60"
      >
        {linkText}
      </a>
    )
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex))
  }
  
  // If no markdown links found, return original text split by plain URLs
  if (elements.length === 0) {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g
    const urlParts = text.split(urlRegex)
    
    return urlParts.map((part, index) => {
      if (part.match(urlRegex)) {
        const href = part.startsWith('http') ? part : `https://${part}`
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan underline decoration-cyan/40 underline-offset-2 transition-colors hover:text-cyan/80 hover:decoration-cyan/60"
          >
            {part}
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }
  
  return <>{elements}</>
}

// Fallback responses when API is unavailable
const FALLBACK_RESPONSES: Record<string, string> = {
  "tech stack": "Roshan works with MERN stack (MongoDB, Express, React, Node.js), TypeScript, Python, AWS, and has experience with AI/ML tools like TensorFlow, PyTorch, OpenAI, and LangChain. He also uses Docker and serverless technologies.",
  "about": "Roshan is a 4th-year B.Tech CSE student and full-stack developer passionate about AI/ML. He's been freelancing since September 2025, building real-world projects with MERN stack. [Learn More About Him](https://roshan-portfolio-indol.vercel.app/#about)",
  "achievements": "He reached Grand Finale at Scaler AI Hackathon (top 100 of 30,000+), was Finalist at Meta PyTorch Hackathon (top 800 of 31,000+), and has completed multiple certifications. [View All Achievements](https://roshan-portfolio-indol.vercel.app/achievements)",
  "vaani": "VAANI is his AI-powered civic engagement platform that helps underserved communities access government services through phone and WhatsApp in Hindi, English, and Hinglish. It uses AWS Bedrock + LangChain for voice processing, with geolocation routing and real-time tracking. [View VAANI Live](https://vaani-ai-assistant-419de.web.app)",
  "hackathon": "He reached the Grand Finale at Scaler AI Hackathon (top 100 of 30,000+ teams) and was a Finalist at Meta PyTorch OpenEnv Hackathon (top 800 of 31,000+ teams, traveled to Bangalore). He also participated in Smart India Hackathon 2025.",
  "projects": "His key projects include: VAANI (AI voice civic platform), Vibely (real-time social platform with Socket.io), PHARMILY (healthcare management with emergency SOS), FleetWatch (AI fraud detection for Meta hackathon), and AKS Beauty Hut (e-commerce for a paid client). [View All Projects](https://roshan-portfolio-indol.vercel.app/projects)",
  "open to work": "Yes! He's open to full-time roles, freelance projects, internships (frontend/full-stack), remote work, consulting, and startup collaboration. [Contact Him](https://roshan-portfolio-indol.vercel.app/contact)",
  "experience": "He's a 4th-year B.Tech CSE student who started freelancing in September 2025. He's been building real-world projects for about 10 months, including a paid e-commerce project for a local business. [View Experience](https://roshan-portfolio-indol.vercel.app/#experience)",
  "education": "He's pursuing B.Tech in Computer Science Engineering at AKS University, Satna, Madhya Pradesh (Sep 2023 - Oct 2027) with a CGPA of 7.26. [View Education Details](https://roshan-portfolio-indol.vercel.app/about)",
  "contact": "You can reach Roshan at roshankumarsingh021@gmail.com. He's also on [GitHub](https://github.com/roshan-1205), [LinkedIn](https://linkedin.com/in/roshan-kumar-singh-1205-dev), and [LeetCode](https://leetcode.com/u/roshan_1205/). Or use the [Contact Form](https://roshan-portfolio-indol.vercel.app/contact)",
  "github": "Here's his [GitHub profile](https://github.com/roshan-1205) - You'll find all his open-source projects including VAANI, Vibely, PHARMILY, and FleetWatch!",
  "linkedin": "Connect with him on [LinkedIn](https://linkedin.com/in/roshan-kumar-singh-1205-dev)",
  "leetcode": "Check out his [LeetCode profile](https://leetcode.com/u/roshan_1205/) - He's actively solving DSA problems there!",
  "instagram": "Follow him on [Instagram](https://www.instagram.com/roshansingh.1205/)",
  "portfolio": "Explore his full [Portfolio](https://roshan-portfolio-indol.vercel.app) - You'll find all his projects, skills, and contact information there!",
  "resume": "[Download Roshan's Resume](https://roshan-portfolio-indol.vercel.app/Roshan-Kumar-Singh-CV.pdf) - It includes his full work experience, projects, skills, and education details.",
  "cv": "[Download his CV](https://roshan-portfolio-indol.vercel.app/Roshan-Kumar-Singh-CV.pdf)",
  "skills": "Full-stack development (MERN), TypeScript, Python, AI/ML (TensorFlow, PyTorch, OpenAI, Hugging Face, LangChain), Cloud (AWS, Docker), and databases (MongoDB, PostgreSQL, DynamoDB). He's passionate about Data Structures & Algorithms. [View All Skills](https://roshan-portfolio-indol.vercel.app/#skills)",
  "certifications": "Web Development from AKS University (2024) and Software Developer (IT-ITES) from Skill India Mission/PMKVY - a 420-hour program completed in 2025. [See Certificates](https://roshan-portfolio-indol.vercel.app/#certificates)",
  "vibely": "Vibely is a production-grade real-time social platform with Socket.io messaging, media uploads, and dual authentication (Google OAuth + JWT). [Live Demo](https://vibely-frontend-orpin.vercel.app) | [GitHub](https://github.com/roshan-1205/VIBELY)",
  "pharmily": "PHARMILY is an enterprise healthcare platform with real-time emergency SOS, appointment booking, and hospital search. [Live Demo](https://pharmily-pm.web.app) | [GitHub](https://github.com/roshan-1205/PHARMILY)",
  "fleetwatch": "FleetWatch is an AI-powered fleet fraud detection system built for Meta's PyTorch hackathon using reinforcement learning. [Live Demo](https://shiva0999-fleet-watch.hf.space) | [GitHub](https://github.com/roshan-1205/FleetWatch)",
}

function findFallbackResponse(message: string): string | null {
  const lowerMessage = message.toLowerCase()
  
  for (const [key, response] of Object.entries(FALLBACK_RESPONSES)) {
    if (lowerMessage.includes(key)) {
      return response
    }
  }
  
  // Default fallback
  if (lowerMessage.length > 0) {
    return "I'm Senku, Roshan's digital companion. I'm here to help you learn about his tech stack, [projects](https://roshan-portfolio-indol.vercel.app/#projects), [skills](https://roshan-portfolio-indol.vercel.app/#skills), hackathons, and how to connect with him. For detailed questions, please use the [contact form](https://roshan-portfolio-indol.vercel.app/#contact)."
  }
  
  return null
}

export function ChatBot() {
  const reducedMotion = useReducedMotion()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const hasStarted = messages.length > 0

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: reducedMotion ? "auto" : "smooth",
      })
    }
  }, [messages, loading, reducedMotion])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || loading) return

      setError("")
      setInput("")

      const userMessage: ChatMessage = { role: "user", content: trimmed }
      const updatedMessages = [...messages, userMessage]
      setMessages(updatedMessages)
      setLoading(true)

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history: messages,
          }),
        })

        const data = (await response.json()) as {
          reply?: string
          error?: string
        }

        if (!response.ok || !data.reply) {
          // Check if it's a credit/API error, use fallback
          if (response.status === 400 || response.status === 500) {
            const fallbackReply = findFallbackResponse(trimmed)
            if (fallbackReply) {
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: fallbackReply },
              ])
            } else {
              setError(
                data.error ??
                  "TRANSMISSION FAILED — Try again or use the contact form.",
              )
            }
          } else {
            setError(
              data.error ??
                "TRANSMISSION FAILED — Try again or use the contact form.",
            )
          }
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply! },
          ])
        }
      } catch {
        // Network error - try fallback first
        const fallbackReply = findFallbackResponse(trimmed)
        if (fallbackReply) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: fallbackReply },
          ])
        } else {
          setError("CONNECTION LOST — Check your network and try again.")
        }
      } finally {
        setLoading(false)
        inputRef.current?.focus()
      }
    },
    [messages, loading],
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      void sendMessage(input)
    }
  }

  const messageVariants = reducedMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
      }

  return (
    <motion.div
      className="robot-host-panel relative overflow-hidden rounded-2xl border border-cyan/20 bg-card/50 p-0 backdrop-blur-xl"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: easeFilm }}
    >
      {/* Ambient glow orbs — matching HeroRobotGuide */}
      <div className="pointer-events-none absolute -top-24 -left-16 size-48 rounded-full bg-cyan/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 -bottom-24 size-48 rounded-full bg-purple/10 blur-[100px]" />

      {/* ── Header bar ── */}
      <div className="relative flex items-center justify-between border-b border-cyan/15 bg-background/40 px-4 py-2.5 md:px-5">
        <div className="flex items-center gap-2 font-mono-ui text-[9px] tracking-[0.25em] text-cyan uppercase">
          <Terminal className="size-3.5" />
          <span>Senku</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            className="size-1.5 rounded-full bg-cyan"
            animate={{
              opacity: loading ? [1, 0.3, 1] : 0.45,
            }}
            transition={{
              duration: loading ? 0.4 : 1.4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <span className="font-mono-ui text-[9px] tracking-[0.15em] text-muted-foreground uppercase">
            {loading ? "Processing" : hasStarted ? "Online" : "Ready"}
          </span>
        </div>
      </div>

      {/* ── Chat viewport ── */}
      <div className="relative">
        {/* Scan grid background */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Corner brackets */}
        <div className="pointer-events-none absolute inset-3 z-10">
          <span className="absolute -top-px -left-px size-3 border-t border-l border-cyan/30" />
          <span className="absolute -top-px -right-px size-3 border-t border-r border-cyan/30" />
          <span className="absolute -bottom-px -left-px size-3 border-b border-l border-cyan/20" />
          <span className="absolute -right-px -bottom-px size-3 border-r border-b border-cyan/20" />
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className="scrollbar-hide relative z-[1] flex min-h-[280px] max-h-[400px] flex-col gap-3 overflow-y-auto p-4 md:min-h-[340px] md:max-h-[440px] md:p-5"
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {/* ── Starter prompts ── */}
          {!hasStarted && !loading && (
            <motion.div
              className="flex flex-1 flex-col items-center justify-center gap-4 py-4"
              initial={reducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <MessageSquare className="size-6 text-cyan/50" />
                <p className="font-mono-ui text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Ask me anything about Roshan
                </p>
              </div>

              <div className="grid w-full max-w-sm grid-cols-1 gap-2 sm:grid-cols-2">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void sendMessage(prompt)}
                    className="rounded-lg border border-cyan/20 bg-cyan/5 px-3 py-2.5 font-mono-ui text-[10px] leading-snug tracking-wide text-cyan/80 transition-colors hover:border-cyan/40 hover:bg-cyan/10 hover:text-cyan"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Messages ── */}
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              <motion.div
                key={`${msg.role}-${i}`}
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 font-mono-ui text-xs leading-relaxed sm:max-w-[75%] ${
                    msg.role === "user"
                      ? "border border-cyan/25 bg-cyan/10 text-foreground"
                      : "border border-border/30 bg-card/80 text-foreground/90"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <span className="mb-1 block text-[8px] tracking-[0.3em] text-cyan/60 uppercase">
                      Senku
                    </span>
                  )}
                  <div className="whitespace-pre-wrap break-words">
                    {renderTextWithLinks(msg.content)}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* ── Loading indicator ── */}
            {loading && (
              <motion.div
                key="loading"
                initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-2 rounded-lg border border-border/30 bg-card/80 px-3.5 py-2.5">
                  <span className="text-[8px] tracking-[0.3em] text-cyan/60 font-mono-ui uppercase">
                    Senku
                  </span>
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="size-1.5 rounded-full bg-cyan/70"
                        animate={
                          reducedMotion
                            ? {}
                            : { opacity: [0.3, 1, 0.3] }
                        }
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: dot * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Error state ── */}
            {error && (
              <motion.div
                key="error"
                initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start gap-2 rounded-lg border border-warm/25 bg-warm/5 px-3.5 py-2.5 font-mono-ui text-[10px] leading-relaxed tracking-wide text-warm/90">
                  <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Input bar ── */}
      <div className="relative border-t border-cyan/15 bg-background/40 p-3 md:p-4">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
            onKeyDown={handleKeyDown}
            placeholder="Type a question…"
            rows={1}
            disabled={loading}
            aria-label="Chat message input"
            className="flex-1 resize-none rounded-lg border border-cyan/15 bg-background/60 px-3 py-2.5 font-mono-ui text-xs leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/20 disabled:opacity-50"
            style={{ maxHeight: "80px" }}
          />
          <button
            type="button"
            onClick={() => void sendMessage(input)}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10 text-cyan transition-colors hover:bg-cyan/20 disabled:opacity-30 disabled:hover:bg-cyan/10"
          >
            <Send className="size-3.5" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-end">
          <span className="font-mono-ui text-[7px] text-muted-foreground/40 tabular-nums">
            {input.length}/{MAX_MESSAGE_LENGTH}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
