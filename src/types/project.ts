export type FeaturedProject = {
  id: string
  number: string
  category: string
  title: string
  description: string
  techStack: string[]
  features: string[]
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  isCustom?: boolean
}

export type StoredProjectImage = {
  url: string
  publicId: string
  updatedAt: string
}
