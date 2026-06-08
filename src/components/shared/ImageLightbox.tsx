import { X, ZoomIn } from "lucide-react"
import { useEffect } from "react"
import { createPortal } from "react-dom"

type ImageLightboxProps = {
  open: boolean
  onClose: () => void
  src: string
  title: string
  subtitle?: string
}

export function ImageLightbox({
  open,
  onClose,
  src,
  title,
  subtitle,
}: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  if (typeof document === "undefined" || !open) return null

  return createPortal(
    <div
      className="image-lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="image-lightbox-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="image-lightbox-header">
          <button
            type="button"
            onClick={onClose}
            className="image-lightbox-close"
            aria-label="Close"
          >
            <X className="size-5 shrink-0" strokeWidth={2} />
          </button>
        </div>

        <div className="image-lightbox-image-wrap">
          <img
            src={src}
            alt={title}
            className="image-lightbox-image"
            decoding="async"
          />
        </div>

        <div className="image-lightbox-footer">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan/10">
              <ZoomIn className="size-4 text-cyan" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg font-light text-foreground sm:text-xl">
                {title}
              </p>
              {subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
