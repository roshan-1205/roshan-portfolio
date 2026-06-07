import { useState } from "react"
import { Plus, X } from "lucide-react"
import type { NewProjectInput } from "@/hooks/useProjectsList"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type AddProjectFormProps = {
  onAdd: (input: NewProjectInput) => void
}

const emptyForm: NewProjectInput = {
  title: "",
  category: "",
  description: "",
  techStack: "",
  features: "",
  liveUrl: "",
  githubUrl: "",
}

export function AddProjectForm({ onAdd }: AddProjectFormProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const update = (key: keyof NewProjectInput, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return

    onAdd(form)
    setForm(emptyForm)
    setOpen(false)
  }

  if (!open) {
    return (
      <Button
        type="button"
        variant="outline"
        className="w-full border-dashed border-cyan/30 font-mono-ui text-xs tracking-wider text-cyan uppercase hover:bg-cyan/10 sm:w-auto"
        onClick={() => setOpen(true)}
      >
        <Plus className="mr-2 size-4" />
        Add More Projects
      </Button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 rounded-2xl border border-cyan/20 bg-background/60 p-4 backdrop-blur-sm sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-light">Add New Project</h3>
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
          <Label htmlFor="project-title" className="font-mono-ui text-xs uppercase">
            Project Title *
          </Label>
          <Input
            id="project-title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="My Awesome App"
            required
            className="h-11 text-base sm:text-sm"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="project-category" className="font-mono-ui text-xs uppercase">
            Category
          </Label>
          <Input
            id="project-category"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            placeholder="FULL STACK · AI · 2026"
            className="h-11 text-base sm:text-sm"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label
            htmlFor="project-description"
            className="font-mono-ui text-xs uppercase"
          >
            Description *
          </Label>
          <Textarea
            id="project-description"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="What does this project do?"
            rows={3}
            required
            className="text-base sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-tech" className="font-mono-ui text-xs uppercase">
            Tech Stack
          </Label>
          <Input
            id="project-tech"
            value={form.techStack}
            onChange={(e) => update("techStack", e.target.value)}
            placeholder="React, Node.js, MongoDB"
            className="h-11 text-base sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-live" className="font-mono-ui text-xs uppercase">
            Live URL
          </Label>
          <Input
            id="project-live"
            value={form.liveUrl}
            onChange={(e) => update("liveUrl", e.target.value)}
            placeholder="https://..."
            className="h-11 text-base sm:text-sm"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label
            htmlFor="project-features"
            className="font-mono-ui text-xs uppercase"
          >
            Features (comma or new line)
          </Label>
          <Textarea
            id="project-features"
            value={form.features}
            onChange={(e) => update("features", e.target.value)}
            placeholder="Real-time chat, Auth, Deployed on Vercel"
            rows={3}
            className="text-base sm:text-sm"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="project-github" className="font-mono-ui text-xs uppercase">
            GitHub URL
          </Label>
          <Input
            id="project-github"
            value={form.githubUrl}
            onChange={(e) => update("githubUrl", e.target.value)}
            placeholder="https://github.com/..."
            className="h-11 text-base sm:text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="submit"
          className="bg-cyan/90 font-mono-ui text-xs tracking-wider text-background uppercase hover:bg-cyan"
        >
          <Plus className="mr-2 size-4" />
          Add Project
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
