export type Certification = {
  id: string
  title: string
  issuer: string
  instructor?: string
  year: string
  credential: string
  skills: string[]
  imageUrl?: string
  isCustom?: boolean
}
