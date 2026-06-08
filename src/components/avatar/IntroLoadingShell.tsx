import { BrandedLoadingOverlay } from "@/components/layout/BrandedLoadingOverlay"

export function IntroLoadingShell() {
  return (
    <div className="relative h-[min(52vw,400px)] min-h-[320px] overflow-hidden rounded-xl border border-cyan/20 bg-card/50">
      <BrandedLoadingOverlay
        visible
        mode="absolute"
        status="Initializing robot guide"
        simulateProgress
        showScanOverlay={false}
      />
    </div>
  )
}
