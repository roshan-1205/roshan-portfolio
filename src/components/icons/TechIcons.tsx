type TechSkill = {
  label: string
  devicon?: string
  iconFile?: string
  iconUrl?: string
  logoClass?: string
}

const DEVICON_CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons"

export function getDeviconUrl(devicon: string, iconFile?: string) {
  const file = iconFile ?? `${devicon}-original`
  return `${DEVICON_CDN}/${devicon}/${file}.svg`
}

export function getTechIconUrl(skill: TechSkill) {
  if (skill.iconUrl) return skill.iconUrl
  if (!skill.devicon) return ""
  return getDeviconUrl(skill.devicon, skill.iconFile)
}

export function TechBrandLogo({
  skill,
  className,
}: {
  skill: TechSkill
  className?: string
}) {
  const src = getTechIconUrl(skill)

  return (
    <img
      src={src}
      alt=""
      className={skill.logoClass ?? className}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  )
}

/** Matches GitHub README skillicons row 1 */
export const professionalSkillset: TechSkill[] = [
  { label: "Python", devicon: "python" },
  {
    label: "Hugging Face",
    iconUrl: "/icons/huggingface.svg",
    logoClass: "size-11 object-contain sm:size-12",
  },
  { label: "React", devicon: "react" },
  { label: "Next.js", devicon: "nextjs" },
  { label: "Node.js", devicon: "nodejs" },
  {
    label: "Express",
    iconUrl: "/icons/express.svg",
    logoClass: "size-10 object-contain sm:size-11",
  },
  { label: "FastAPI", devicon: "fastapi" },
  { label: "TypeScript", devicon: "typescript" },
]

/** Matches GitHub README skillicons row 2 */
export const toolsUsed: TechSkill[] = [
  { label: "MongoDB", devicon: "mongodb" },
  { label: "PostgreSQL", devicon: "postgresql" },
  { label: "Redis", devicon: "redis" },
  {
    label: "AWS",
    iconUrl: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
    logoClass: "size-10 object-contain sm:size-11",
  },
  { label: "Docker", devicon: "docker" },
  {
    label: "Kubernetes",
    devicon: "kubernetes",
    iconFile: "kubernetes-plain",
  },
  { label: "Terraform", devicon: "terraform" },
  {
    label: "GitHub Actions",
    devicon: "githubactions",
    iconFile: "githubactions-plain",
  },
]
