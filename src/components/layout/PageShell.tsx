import { cn } from "@/lib/utils"

type PageShellProps = {
  children: React.ReactNode
  className?: string
  fullHeight?: boolean
}

export function PageShell({
  children,
  className,
  fullHeight = true,
}: PageShellProps) {
  return (
    <main
      className={cn(
        fullHeight && "min-h-screen",
        className,
      )}
    >
      {children}
    </main>
  )
}
