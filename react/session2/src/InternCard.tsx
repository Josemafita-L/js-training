import Avatar from "./Avatar"
import Badge from "./Badge"
import ScoreBar from "./ScoreBar"

interface InternCardProps {
  name: string
  score: number
  isPresent: boolean
  role: string
}

// Badge is reused multiple times with different data.
// This avoids duplicate code, keeps styling consistent,
// and makes future changes easier.
function InternCard({
  name,
  score,
  isPresent,
  role,
}: InternCardProps) {
  return (
    <div className="card">
      <Avatar name={name} />

      <h2>{name}</h2>

      <ScoreBar score={score} />

      <div
        style={{
          display: "flex",
          gap: "6px",
          marginTop: "10px",
          flexWrap: "wrap",
        }}
      >
        <Badge
          label={role}
          color="#4f46e5"
        />

        <Badge
          label={isPresent ? "Present" : "Absent"}
          color={isPresent ? "green" : "#e53e3e"}
        />

        {score >= 90 && (
          <Badge
            label="Top Performer"
            color="#d97706"
          />
        )}
      </div>
    </div>
  )
}

export default InternCard