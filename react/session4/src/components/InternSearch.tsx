import { useInterns } from "../contexts/intern-context"
import useInternSearch from "../hooks/useInternSearch"

function InternSearch() {
  const { interns } = useInterns()

  const {
    search,
    setSearch,
    filtered,
    stats,
  } = useInternSearch(interns)

  return (
    <div
      style={{
        marginTop: "25px",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>Search Intern</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <hr />

      <h3>Statistics</h3>

      <p>Total Interns : {stats.total}</p>

      <p>Present : {stats.present}</p>

      <p>Average Score : {stats.avg}</p>

      <hr />

      <h3>Filtered Results</h3>

      {filtered.length === 0 ? (
        <p>No Intern Found</p>
      ) : (
        filtered.map((intern) => (
          <div
            key={intern.id}
            style={{
              border: "1px solid gray",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h4>{intern.name}</h4>

            <p>Role : {intern.role}</p>

            <p>Score : {intern.score}</p>

            <p>
              Status :
              {intern.isPresent
                ? " Present"
                : " Absent"}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default InternSearch