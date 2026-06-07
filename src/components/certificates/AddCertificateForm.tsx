import { useState } from "react"
import { Plus, X } from "lucide-react"
import type { NewCertificateInput } from "@/hooks/useCertificatesList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AddCertificateFormProps = {
  onAdd: (input: NewCertificateInput) => void
}

const emptyForm: NewCertificateInput = {
  title: "",
  issuer: "",
  instructor: "",
  year: String(new Date().getFullYear()),
  credential: "",
  skills: "",
}

export function AddCertificateForm({ onAdd }: AddCertificateFormProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const update = (key: keyof NewCertificateInput, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.issuer.trim()) return

    onAdd(form)
    setForm(emptyForm)
    setOpen(false)
  }

  if (!open) {
    return (
      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed border-purple/30 font-mono-ui text-xs tracking-wider text-purple uppercase hover:bg-purple/10 sm:w-auto"
        onClick={() => setOpen(true)}
      >
        <Plus className="mr-2 size-4" />
        Add More Certificates
      </Button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 rounded-2xl border border-purple/20 bg-background/60 p-4 backdrop-blur-sm sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-light">Add New Certificate</h3>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Close form"
          onClick={() => setOpen(false)}
        >
          <X className="size-4" />
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="cert-title" className="font-mono-ui text-xs uppercase">
            Certificate Title *
          </Label>
          <Input
            id="cert-title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Cloud Computing Fundamentals"
            required
            className="h-11 text-base sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cert-issuer" className="font-mono-ui text-xs uppercase">
            Issuer *
          </Label>
          <Input
            id="cert-issuer"
            value={form.issuer}
            onChange={(e) => update("issuer", e.target.value)}
            placeholder="Coursera / University"
            required
            className="h-11 text-base sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="cert-instructor"
            className="font-mono-ui text-xs uppercase"
          >
            Instructor
          </Label>
          <Input
            id="cert-instructor"
            value={form.instructor}
            onChange={(e) => update("instructor", e.target.value)}
            placeholder="Optional"
            className="h-11 text-base sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cert-year" className="font-mono-ui text-xs uppercase">
            Year
          </Label>
          <Input
            id="cert-year"
            value={form.year}
            onChange={(e) => update("year", e.target.value)}
            placeholder="2025"
            className="h-11 text-base sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="cert-credential"
            className="font-mono-ui text-xs uppercase"
          >
            Credential ID
          </Label>
          <Input
            id="cert-credential"
            value={form.credential}
            onChange={(e) => update("credential", e.target.value)}
            placeholder="UC-XXXXXX"
            className="h-11 text-base sm:text-sm"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="cert-skills" className="font-mono-ui text-xs uppercase">
            Skills (comma separated)
          </Label>
          <Input
            id="cert-skills"
            value={form.skills}
            onChange={(e) => update("skills", e.target.value)}
            placeholder="AWS, Docker, Kubernetes"
            className="h-11 text-base sm:text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          className="bg-purple/80 font-mono-ui text-xs tracking-wider text-white uppercase hover:bg-purple"
        >
          <Plus className="mr-2 size-4" />
          Add Certificate
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="font-mono-ui text-xs uppercase"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
