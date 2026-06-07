import { PageShell } from "@/components/layout/PageShell"
import { ContactSection } from "@/components/sections/ContactSection"
import { usePageTitle } from "@/hooks/usePageTitle"

export function ContactPage() {
  usePageTitle("Contact")

  return (
    <PageShell className="pt-16 md:pt-20">
      <ContactSection />
    </PageShell>
  )
}
