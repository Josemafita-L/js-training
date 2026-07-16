import { useMemo } from "react"
import { useInterns } from "../contexts/intern-context"

function ScoreStats() {
  const { interns } = useInterns()

  /*
  Why useMemo here?

  Without useMemo, the statistics would be recalculated
  every time this component renders, even if the interns
  array has not changed.

  useMemo caches the calculated result and only recalculates
  when the interns dependency changes, improving performance
  for expensive computations.
  */
  const stats = useMemo(() => {
    console.log("Recalculating stats...")

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
    <div
      style={{
        background: "#f9f9f9",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>Score Statistics</h2>

      <p>
        Highest Score : {stats.highest}
      </p>

      <p>
        Lowest Score : {stats.lowest}
      </p>

      <p>
        Average Score : {stats.average}
      </p>

      <p>
        Passing Interns : {stats.passing} / {interns.length}
      </p>
    </div>
  )
}

export default ScoreStats