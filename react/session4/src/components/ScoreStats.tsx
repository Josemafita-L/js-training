import { useMemo } from "react"
import { useInterns } from "../contexts/intern-context"

interface ScoreStatsProps {
  highest: number
  lowest: number
  average: number
  passing: number
  total: number
}

export function ScoreStats({
  highest,
  lowest,
  average,
  passing,
  total,
}: ScoreStatsProps) {
  return (
    <div
      style={{
        background: "#f9f9f9",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>Score Statistics</h2>

      <p>Highest Score : {highest}</p>

      <p>Lowest Score : {lowest}</p>

      <p>Average Score : {average}</p>

      <p>
        Passing Interns : {passing} / {total}
      </p>
    </div>
  )
}
export function ScoreStatsContainer() {
  const { interns } = useInterns()

  const stats = useMemo(() => {
    const scores = interns.map((intern) => intern.score)

    return {
      highest:
        scores.length > 0
          ? Math.max(...scores)
          : 0,

      lowest:
        scores.length > 0
          ? Math.min(...scores)
          : 0,

      average:
        scores.length > 0
          ? Math.round(
              scores.reduce(
                (sum, score) => sum + score,
                0
              ) / scores.length
            )
          : 0,

      passing: interns.filter(
        (intern) => intern.score >= 50
      ).length,
    }
  }, [interns])

  return (
    <ScoreStats
      highest={stats.highest}
      lowest={stats.lowest}
      average={stats.average}
      passing={stats.passing}
      total={interns.length}
    />
  )
}

export default ScoreStatsContainer

// ScoreStats.tsx
// Job:
// This component displays score-related statistics for the interns.

// Concerns mixed (if any):
// ScoreStats.tsx
// Job:
// This component displays score-related statistics for the interns.

// Concerns mixed (if any):
// - UI rendering
// - Business logic (score calculations)