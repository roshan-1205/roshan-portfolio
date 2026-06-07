export type ContributionDay = {
  date: string
  count: number
  level: number
}

export type GitHubContributionsResponse = {
  total: { lastYear: number }
  contributions: ContributionDay[]
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

export type ContributionWeek = (ContributionDay | null)[]

export function parseGitHubUsername(githubUrl: string) {
  try {
    const pathname = new URL(githubUrl).pathname.replace(/^\/|\/$/g, "")
    return pathname.split("/")[0] ?? ""
  } catch {
    return githubUrl.replace(/^https?:\/\/(www\.)?github\.com\//, "").split("/")[0]
  }
}

export async function fetchGitHubContributions(
  username: string,
): Promise<GitHubContributionsResponse> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
  )

  if (!response.ok) {
    throw new Error("Unable to load GitHub activity")
  }

  return response.json() as Promise<GitHubContributionsResponse>
}

export function buildContributionWeeks(
  contributions: ContributionDay[],
): ContributionWeek[] {
  if (contributions.length === 0) return []

  const firstDate = new Date(`${contributions[0].date}T00:00:00`)
  const padded: (ContributionDay | null)[] = Array.from(
    { length: firstDate.getDay() },
    () => null,
  )

  padded.push(...contributions)

  while (padded.length % 7 !== 0) {
    padded.push(null)
  }

  const weeks: ContributionWeek[] = []
  for (let index = 0; index < padded.length; index += 7) {
    weeks.push(padded.slice(index, index + 7))
  }

  return weeks
}

export function getMonthLabels(weeks: ContributionWeek[]) {
  const labels: { month: string; weekIndex: number }[] = []
  let lastMonth = -1

  weeks.forEach((week, weekIndex) => {
    const firstDay = week.find((day) => day !== null)
    if (!firstDay) return

    const month = new Date(`${firstDay.date}T00:00:00`).getMonth()
    if (month !== lastMonth) {
      labels.push({ month: MONTHS[month], weekIndex })
      lastMonth = month
    }
  })

  return labels
}

export const contributionLevelClass: Record<number, string> = {
  0: "border border-purple/20 bg-secondary",
  1: "bg-purple/30",
  2: "bg-purple/50",
  3: "bg-purple/75",
  4: "bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.4)]",
}

export const WEEKDAY_LABELS: Partial<Record<number, string>> = {
  1: "Mon",
  3: "Wed",
  5: "Fri",
}

export const CELL_SIZE_CLASS = "size-[14px] sm:size-[16px]"
export const CELL_GAP_CLASS = "gap-1"
export const DAY_LABEL_WIDTH_CLASS = "w-11"
