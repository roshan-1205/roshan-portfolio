import { useEffect, useState } from "react"
import {
  fetchGitHubContributions,
  type GitHubContributionsResponse,
} from "@/lib/github-contributions"

export function useGitHubContributions(username: string) {
  const [data, setData] = useState<GitHubContributionsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetchGitHubContributions(username)
        if (!cancelled) setData(response)
      } catch {
        if (!cancelled) {
          setError("Could not load coding activity")
          setData(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (username) {
      void load()
    } else {
      setLoading(false)
      setError("GitHub username missing")
    }

    return () => {
      cancelled = true
    }
  }, [username])

  return { data, loading, error }
}
