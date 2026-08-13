import { AnimatePresence, motion } from "framer-motion"
import { createPortal } from "react-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { easeFilm } from "@/lib/animations"

type PortfolioSkeletonProps = {
  visible: boolean
}

function GhostPageLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b border-border/15 py-4">
          <Skeleton className="h-4 w-28 rounded-sm" />
          <div className="hidden gap-3 md:flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-16 rounded-sm" />
            ))}
          </div>
          <Skeleton className="size-9 rounded-md md:hidden" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center px-6 pt-24 pb-16">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          {/* Logo / Chat Widget Area - Centered */}
          <div className="mb-8 flex justify-center lg:mb-12">
            <div className="w-64">
              {/* Logo Card */}
              <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
          </div>

          {/* Hero Content - Centered */}
          <div className="mt-12 text-center lg:mt-16">
            {/* Name */}
            <div className="mx-auto space-y-3">
              <Skeleton className="mx-auto h-16 w-full max-w-2xl rounded-lg" />
            </div>

            {/* Divider */}
            <div className="mx-auto my-8 w-32">
              <Skeleton className="h-px w-full rounded-sm" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Skeleton className="h-12 w-36 rounded-lg" />
              <Skeleton className="h-12 w-40 rounded-lg" />
              <Skeleton className="h-12 w-44 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="relative border-t border-border/20 bg-card py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          {/* Section Label */}
          <Skeleton className="mb-12 h-3 w-64 rounded-sm" />

          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Content */}
            <div>
              {/* Heading */}
              <div className="mb-10 space-y-3">
                <Skeleton className="h-12 w-64 rounded-lg" />
                <Skeleton className="h-12 w-48 rounded-lg" />
              </div>

              {/* Paragraphs with left border */}
              <div className="space-y-6 border-l border-cyan/20 pl-6 md:pl-10">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-sm" />
                  <Skeleton className="h-4 w-[95%] rounded-sm" />
                  <Skeleton className="h-4 w-[90%] rounded-sm" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-sm" />
                  <Skeleton className="h-4 w-[92%] rounded-sm" />
                  <Skeleton className="h-4 w-[88%] rounded-sm" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-sm" />
                  <Skeleton className="h-4 w-[94%] rounded-sm" />
                </div>
              </div>
            </div>

            {/* Right: Profile Panel */}
            <div className="flex items-start justify-center lg:justify-end">
              <Skeleton className="h-[400px] w-full max-w-sm rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Find Me On Section */}
      <section className="relative border-t border-border/20 bg-background py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6">
          {/* Heading */}
          <Skeleton className="mx-auto h-12 w-64 rounded-lg" />

          {/* Description */}
          <Skeleton className="mx-auto mt-4 h-5 w-80 rounded-sm" />

          {/* Social Icons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="size-12 rounded-full" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export function PortfolioSkeleton({ visible }: PortfolioSkeletonProps) {
  const overlay = (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="portfolio-skeleton"
          className="fixed inset-0 z-[100000] bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: easeFilm }}
        >
          <GhostPageLayout />
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (typeof document !== "undefined") {
    return createPortal(overlay, document.body)
  }

  return overlay
}
