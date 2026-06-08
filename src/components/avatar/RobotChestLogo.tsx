export function RobotChestLogo() {
  return (
    <div
      className="robot-chest-logo pointer-events-none absolute left-1/2 z-[4] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <div className="flex size-11 items-center justify-center overflow-hidden rounded-full border border-cyan/30 bg-card/85 shadow-[0_0_20px_rgba(0,212,255,0.2)] backdrop-blur-sm md:size-12">
        <img
          src="/favicon.png"
          alt=""
          className="size-6 rounded-full md:size-7"
          decoding="async"
        />
      </div>
    </div>
  )
}
