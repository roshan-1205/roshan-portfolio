import { ImagePlus } from "lucide-react"
import { cn } from "@/lib/utils"

type PortfolioImageDisplayProps = {
  title: string
  imageUrl?: string
  aspectClass?: string
  imageFit?: "cover" | "contain"
  placeholder?: React.ReactNode
}

export function PortfolioImageDisplay({
  title,
  imageUrl,
  aspectClass = "aspect-[4/3]",
  imageFit = "cover",
  placeholder,
}: PortfolioImageDisplayProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-cyan/10 via-card to-purple/10",
        aspectClass,
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className={cn(
            "absolute inset-0 size-full bg-background/80",
            imageFit === "contain" ? "object-contain p-2" : "object-cover",
          )}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
          {placeholder ?? (
            <>
              <ImagePlus className="size-10 text-cyan/40" />
              <p className="font-mono-ui text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                Image coming soon
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
