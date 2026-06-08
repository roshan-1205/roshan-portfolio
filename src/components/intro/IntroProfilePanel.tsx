import { useRef } from "react"
import { motion } from "framer-motion"
import { ImagePlus, Loader2, Trash2, Upload, User } from "lucide-react"
import { isCloudinaryConfigured } from "@/lib/cloudinary-config"
import { useProfileImage } from "@/hooks/useProfileImage"
import { Button } from "@/components/ui/button"
import { fadeUp } from "@/lib/animations"

const cloudinaryReady = isCloudinaryConfigured()

const SPARKLES = [
  { top: "8%", left: "18%", size: 3, delay: 0 },
  { top: "22%", right: "12%", size: 2, delay: 0.4 },
  { bottom: "18%", left: "10%", size: 2, delay: 0.8 },
  { bottom: "12%", right: "20%", size: 3, delay: 1.2 },
] as const

export function IntroProfilePanel() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { displayUrl, hasImage, isUploading, isRemoving, error, upload, remove } =
    useProfileImage()
  const busy = isUploading || isRemoving

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      await upload(file)
    } catch {
      // Error handled in hook
    } finally {
      event.target.value = ""
    }
  }

  return (
    <motion.div
      className="flex w-full flex-col items-center lg:items-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        className="sr-only"
        onChange={handleFileChange}
        disabled={busy || !cloudinaryReady}
        aria-label="Upload profile photo"
      />

      <div className="relative flex items-center justify-center py-4">
        {SPARKLES.map((sparkle, index) => (
          <motion.span
            key={index}
            className="intro-avatar-sparkle absolute rounded-full bg-cyan/40"
            style={{
              top: "top" in sparkle ? sparkle.top : undefined,
              left: "left" in sparkle ? sparkle.left : undefined,
              right: "right" in sparkle ? sparkle.right : undefined,
              bottom: "bottom" in sparkle ? sparkle.bottom : undefined,
              width: sparkle.size,
              height: sparkle.size,
            }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="intro-avatar-glow pointer-events-none absolute size-44 rounded-full sm:size-52 md:size-56" />

        <div className="intro-avatar-orbit pointer-events-none absolute size-48 sm:size-56 md:size-60" />

        <div className="group relative size-44 sm:size-52 md:size-56">
          <div className="intro-avatar-ring absolute -inset-1 rounded-full opacity-60 transition-all duration-500 group-hover:opacity-100" />

          <div className="relative size-full overflow-hidden rounded-full border border-cyan/25 bg-gradient-to-br from-cyan/10 via-card to-purple/10 p-[3px] shadow-[0_16px_48px_rgba(0,0,0,0.45)] transition-all duration-500 group-hover:scale-[1.05] group-hover:border-cyan/45 group-hover:shadow-[0_0_40px_rgba(0,212,255,0.12),0_0_50px_rgba(123,47,247,0.1)]">
            <div className="relative size-full overflow-hidden rounded-full border border-border/30 bg-card">
              {hasImage && displayUrl ? (
                <img
                  key={displayUrl}
                  src={displayUrl}
                  alt="Profile"
                  className="size-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-cyan/5 via-card to-purple/5">
                  <User className="size-10 text-cyan/30 sm:size-12" />
                  <ImagePlus className="size-5 text-muted-foreground/60" />
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-background/50 via-transparent to-cyan/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>

          {busy && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-sm">
              <Loader2 className="size-8 animate-spin text-cyan sm:size-10" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 w-full max-w-xs space-y-3 text-center">
        <div
          className="flex items-center justify-center gap-2"
          role="toolbar"
          aria-label="Profile photo actions"
        >
          <Button
            type="button"
            size="icon-xs"
            className="size-7 rounded-full border border-cyan/30 bg-cyan/10 text-cyan shadow-sm hover:border-cyan/50 hover:bg-cyan/20"
            disabled={busy || !cloudinaryReady}
            onClick={() => inputRef.current?.click()}
            aria-label={hasImage ? "Change photo" : "Upload photo"}
            title={hasImage ? "Change photo" : "Upload photo"}
          >
            {isUploading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Upload className="size-3.5" />
            )}
          </Button>

          {hasImage && !busy && (
            <Button
              type="button"
              size="icon-xs"
              className="size-7 rounded-full border border-destructive/35 bg-destructive/10 text-destructive shadow-sm hover:border-destructive/50 hover:bg-destructive/20"
              onClick={() => void remove()}
              aria-label="Remove photo"
              title="Remove photo"
            >
              <Trash2 className="size-3.5" />
            </Button>
          )}
        </div>

        {!cloudinaryReady && (
          <p className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 font-mono-ui text-[9px] leading-snug text-amber-200">
            Add Cloudinary env vars in .env.local to enable photo upload.
          </p>
        )}

        {error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}

        <p className="font-mono-ui text-[9px] tracking-wide text-muted-foreground">
          Saved to Cloudinary · portfolio-profile
        </p>
      </div>
    </motion.div>
  )
}
