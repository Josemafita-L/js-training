import { useMemo, useState } from "react"

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface UseInternSearchReturn {
  search: string
  setSearch: (value: string) => void
  filtered: Intern[]
  stats: {
    total: number
    present: number
    avg: number
  }
}

function useInternSearch(
  interns: Intern[]
): UseInternSearchReturn {
  const [search, setSearch] = useState("")

  /*
  Explore Finding:

  Without useMemo, the filtering logic runs on every render,
  even if the interns list and search text have not changed.
  Adding useMemo caches the previous result and recalculates
  only when interns or search changes, reducing unnecessary work.
  */

  const filtered = useMemo(() => {
    console.log("Filtering interns...")

    return interns.filter((intern) =>
      intern.name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [interns, search])

  const stats = useMemo(() => {
    return {
      total: interns.length,

      present: interns.filter(
        (i) => i.isPresent
      ).length,

      avg:
        interns.length > 0
          ? Math.round(
              interns.reduce(
                (sum, intern) => sum + intern.score,
                0
              ) / interns.length
            )
          : 0,
    }
  }, [interns])

  return {
    search,
    setSearch,
    filtered,
    stats,
  }
}

export default useInternSearch