import { motion } from "framer-motion"

type ScanOverlayProps = {
  progress?: number
  status?: string
}

export function ScanOverlay({ progress = 0, status = "SCANNING" }: ScanOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="scan-grid absolute inset-0 opacity-30" />

      <motion.div
        className="scan-line-h absolute left-0 w-full"
        animate={{ top: ["-4%", "104%"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="scan-line-v absolute top-0 h-full"
        animate={{ left: ["-4%", "104%"] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
      />

      <div className="scan-corner scan-corner-tl" />
      <div className="scan-corner scan-corner-tr" />
      <div className="scan-corner scan-corner-bl" />
      <div className="scan-corner scan-corner-br" />

      <div className="absolute top-8 left-8 font-mono-ui text-[9px] tracking-[0.35em] text-cyan/70 uppercase">
        <span className="inline-block size-1.5 animate-pulse rounded-full bg-cyan" />
        <span className="ml-2">{status}</span>
      </div>

      <div className="absolute top-8 right-8 font-mono-ui text-[9px] tracking-widest text-cyan/60 tabular-nums">
        {Math.min(100, Math.round(progress)).toString().padStart(3, "0")}%
      </div>

      <div className="absolute bottom-8 left-8 right-8">
        <div className="h-px w-full bg-cyan/15" />
        <div
          className="scan-progress-bar -mt-px h-px bg-gradient-to-r from-cyan via-purple to-cyan transition-[width] duration-300 ease-out"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  )
}
