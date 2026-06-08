import { motion } from "framer-motion"
import { MapPin, User } from "lucide-react"
import { personal } from "@/data/portfolio"
import { fadeUp } from "@/lib/animations"

function optimizeProfileImageUrl(url: string): string {
  if (!url.includes("res.cloudinary.com")) return url
  if (url.includes("/upload/c_")) return url
  return url.replace(
    "/upload/",
    "/upload/c_fill,g_face,w_800,h_1000,q_auto,f_auto/",
  )
}

export function IntroProfilePanel() {
  const profileImageUrl = personal.profileImageUrl
    ? optimizeProfileImageUrl(personal.profileImageUrl)
    : undefined

  return (
    <motion.div
      className="flex w-full max-w-sm flex-col items-center gap-6 sm:max-w-md"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      <div className="relative w-full">
        <div
          className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(0,212,255,0.08) 0%, rgba(123,47,247,0.04) 45%, transparent 72%)",
          }}
        />

        <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-[0_24px_64px_rgba(0,0,0,0.45)] transition-shadow duration-500 hover:shadow-[0_28px_72px_rgba(0,0,0,0.5)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

          <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/10">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={personal.name}
                className="size-full object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-cyan/5 via-card to-purple/5">
                <User className="size-12 text-cyan/30" />
                <p className="font-mono-ui text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Photo coming soon
                </p>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
          </div>

          <div className="absolute top-4 left-4 z-20 h-8 w-px bg-gradient-to-b from-cyan/70 to-transparent" />
          <div className="absolute right-4 bottom-4 z-20 h-8 w-px bg-gradient-to-t from-purple/70 to-transparent" />
        </div>
      </div>

      <div className="w-full space-y-3 text-center">
        <p className="font-mono-ui text-[10px] tracking-[0.35em] text-cyan/70 uppercase">
          About me
        </p>
        <h3 className="font-display text-2xl font-light tracking-tight sm:text-[1.75rem]">
          {personal.name}
        </h3>
        <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-cyan/60" />
          <span>Full Stack Developer · {personal.location}</span>
        </div>
      </div>
    </motion.div>
  )
}
