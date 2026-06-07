import { motion } from "framer-motion"
import { personal } from "@/data/portfolio"
import { useGitHubContributions } from "@/hooks/useGitHubContributions"
import { fadeUp } from "@/lib/animations"
import {
  buildContributionWeeks,
  CELL_GAP_CLASS,
  CELL_SIZE_CLASS,
  contributionLevelClass,
  DAY_LABEL_WIDTH_CLASS,
  getMonthLabels,
  parseGitHubUsername,
  WEEKDAY_LABELS,
} from "@/lib/github-contributions"
import { cn } from "@/lib/utils"

const githubUsername = parseGitHubUsername(personal.github)

function ContributionCell({
  count,
  date,
  level,
}: {
  count?: number
  date?: string
  level: number
}) {
  return (
    <div
      title={
        date
          ? `${count ?? 0} contribution${count === 1 ? "" : "s"} on ${date}`
          : undefined
      }
      className={cn(
        "rounded-[3px]",
        CELL_SIZE_CLASS,
        contributionLevelClass[level] ?? contributionLevelClass[0],
      )}
    />
  )
}

function CalendarSkeleton() {
  return (
    <div className="flex justify-center overflow-x-auto pb-2">
      <div className="inline-block min-w-max animate-pulse">
        <div className="mb-2 flex">
          <div className={cn("shrink-0", DAY_LABEL_WIDTH_CLASS)} />
          <div className={cn("flex", CELL_GAP_CLASS)}>
            {Array.from({ length: 53 }).map((_, index) => (
              <div key={index} className="h-3 w-3 rounded-sm bg-muted/30" />
            ))}
          </div>
        </div>
        <div className="flex">
          <div
            className={cn(
              "mr-1 flex shrink-0 flex-col",
              DAY_LABEL_WIDTH_CLASS,
              CELL_GAP_CLASS,
            )}
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className={cn("rounded-sm bg-muted/20", CELL_SIZE_CLASS)} />
            ))}
          </div>
          <div className={cn("flex", CELL_GAP_CLASS)}>
            {Array.from({ length: 53 }).map((_, weekIndex) => (
              <div key={weekIndex} className={cn("flex flex-col", CELL_GAP_CLASS)}>
                {Array.from({ length: 7 }).map((__, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={cn("rounded-sm bg-muted/30", CELL_SIZE_CLASS)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CodingActivityCalendar() {
  const { data, loading, error } = useGitHubContributions(githubUsername)

  const weeks = data ? buildContributionWeeks(data.contributions) : []
  const monthLabels = getMonthLabels(weeks)
  const totalContributions = data?.total.lastYear ?? 0

  return (
    <motion.div
      className="space-y-8"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h3 className="text-center font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light">
        <span className="text-foreground">Days I </span>
        <span className="text-purple">Code</span>
      </h3>

      {loading && <CalendarSkeleton />}

      {!loading && error && (
        <p className="text-center text-sm text-muted-foreground">
          {error}.{" "}
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:underline"
          >
            View on GitHub
          </a>
        </p>
      )}

      {!loading && !error && data && (
        <div className="flex justify-center overflow-x-auto pb-2">
          <div className="inline-block min-w-max scale-100 sm:scale-105">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl transition-opacity hover:opacity-90"
              aria-label={`${totalContributions} GitHub contributions in the last year`}
            >
            <div className="mb-3 flex">
              <div className={cn("shrink-0", DAY_LABEL_WIDTH_CLASS)} />
              <div className={cn("flex", CELL_GAP_CLASS)}>
                {weeks.map((_, weekIndex) => {
                  const monthLabel = monthLabels.find(
                    (label) => label.weekIndex === weekIndex,
                  )?.month

                  return (
                    <div
                      key={weekIndex}
                      className={cn("relative shrink-0", CELL_SIZE_CLASS)}
                    >
                      {monthLabel && (
                        <span className="absolute top-0 left-0 font-mono-ui text-[11px] whitespace-nowrap text-muted-foreground sm:text-xs">
                          {monthLabel}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex">
              <div
                className={cn(
                  "mr-1 flex shrink-0 flex-col",
                  DAY_LABEL_WIDTH_CLASS,
                  CELL_GAP_CLASS,
                )}
              >
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={cn(
                      "flex items-center",
                      CELL_SIZE_CLASS,
                    )}
                  >
                    <span className="font-mono-ui text-[10px] text-muted-foreground sm:text-[11px]">
                      {WEEKDAY_LABELS[dayIndex] ?? ""}
                    </span>
                  </div>
                ))}
              </div>

              <div className={cn("flex", CELL_GAP_CLASS)}>
                {weeks.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className={cn("flex flex-col", CELL_GAP_CLASS)}
                  >
                    {week.map((day, dayIndex) => (
                      <ContributionCell
                        key={`${weekIndex}-${dayIndex}`}
                        count={day?.count}
                        date={day?.date}
                        level={day?.level ?? 0}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            </a>

            <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                <a
                  href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cyan"
                >
                  Learn how we count contributions
                </a>
              </p>

              <div className="flex items-center gap-1.5">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "rounded-[3px]",
                      CELL_SIZE_CLASS,
                      contributionLevelClass[level],
                    )}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
