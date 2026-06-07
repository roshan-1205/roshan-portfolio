import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { personal } from "@/data/portfolio"
import { usePageTitle } from "@/hooks/usePageTitle"
import { Button } from "@/components/ui/button"
import { easeFilm, fadeUp } from "@/lib/animations"

export function ResumePage() {
  usePageTitle("Resume")

  const pdfSrc = `${personal.cvUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`

  return (
    <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20">
      <div className="bg-starfield pointer-events-none absolute inset-0 opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,47,247,0.1)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[min(100%,42rem)] flex-col items-center px-5 sm:px-6">
        <motion.div
          className="w-full overflow-hidden rounded-md bg-white shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeFilm }}
        >
          <iframe
            src={pdfSrc}
            title={`${personal.name} — Resume`}
            className="h-[min(72dvh,720px)] w-full min-h-[420px] border-0 bg-white sm:h-[min(75dvh,780px)]"
          />
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col items-center gap-3"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Button
            asChild
            size="lg"
            className="h-11 rounded-lg bg-purple px-8 font-sans text-sm font-medium text-white shadow-[0_4px_24px_rgba(123,47,247,0.35)] hover:bg-purple/90"
          >
            <a href={personal.cvUrl} download={personal.cvFileName}>
              <Download className="mr-2 size-4" />
              Download Resume
            </a>
          </Button>

          <a
            href={personal.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-ui text-[10px] tracking-wider text-muted-foreground uppercase transition-colors hover:text-cyan"
          >
            Open in new tab
          </a>
        </motion.div>
      </div>
    </section>
  )
}
