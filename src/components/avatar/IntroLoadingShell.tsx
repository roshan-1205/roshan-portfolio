import { ScanOverlay } from "@/components/effects/ScanOverlay"
import { Skeleton } from "@/components/ui/skeleton"

export function IntroLoadingShell() {
  return (
    <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-border/30 bg-card/40">
      <ScanOverlay progress={42} status="LOADING ROBOT GUIDE" />
      <div className="relative z-10 flex flex-col items-center gap-5 px-6">
        <Skeleton className="size-20 rounded-full" />
        <Skeleton className="h-3 w-48 rounded-sm" />
        <Skeleton className="h-3 w-32 rounded-sm" />
        <p className="font-mono-ui text-[10px] tracking-[0.3em] text-cyan/70 uppercase">
          Initializing robot guide
        </p>
      </div>
    </div>
  )
}
