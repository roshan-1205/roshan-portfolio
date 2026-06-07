export function IntroLoadingShell() {
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="size-12 animate-spin rounded-full border-2 border-cyan/30 border-t-cyan" />
        <p className="font-mono-ui text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          Initializing robot guide
        </p>
      </div>
    </div>
  )
}
