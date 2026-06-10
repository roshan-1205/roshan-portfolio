import { motion } from "framer-motion"

type ScanOverlayProps = {
  progress?: number
  status?: string
  showHud?: boolean
}

export function ScanOverlay({
  progress = 0,
  status = "SCANNING",
  showHud = true,
}: ScanOverlayProps) {
  const clamped = Math.min(100, Math.max(0, progress))
  const displayPercent = Math.floor(clamped)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="scan-grid absolute inset-0 opacity-40" />

      <motion.div
        className="scan-line-h absolute left-0 w-full"
        animate={{ top: ["-2%", "94%"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="scan-beam absolute left-0 w-full"
        style={{ top: `${clamped}%` }}
      />

      <motion.div
        className="scan-line-v absolute top-0 h-full"
        animate={{ left: ["-4%", "104%"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="scan-reveal-mask absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(0,212,255,0.04) 0%, rgba(0,212,255,0.04) ${clamped}%, transparent ${clamped + 2}%)`,
        }}
      />

      <div className="scan-corner scan-corner-tl" />
      <div className="scan-corner scan-corner-tr" />
      <div className="scan-corner scan-corner-bl" />
      <div className="scan-corner scan-corner-br" />

      {showHud && (
        <>
          <div className="absolute top-6 left-6 font-mono-ui text-[9px] tracking-[0.35em] text-cyan/80 uppercase sm:top-8 sm:left-8">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
            <span className="ml-2">{status}</span>
          </div>

          <div className="absolute top-6 right-6 font-mono-ui text-[10px] tracking-widest text-cyan/70 tabular-nums sm:top-8 sm:right-8">
            SYS.{displayPercent.toString().padStart(3, "0")}
          </div>

          <div className="absolute right-8 bottom-8 left-8">
            <div className="mb-2 flex justify-between font-mono-ui text-[8px] tracking-[0.25em] text-cyan/50 uppercase">
              <span>Scan progress</span>
              <span className="tabular-nums text-cyan/90">
                {displayPercent}%
              </span>
            </div>
            <div className="scan-progress-track">
              <div
                className="scan-progress-fill"
                style={{ width: `${clamped}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between font-mono-ui text-[7px] text-cyan/35 tabular-nums">
              {[0, 25, 50, 75, 100].map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
