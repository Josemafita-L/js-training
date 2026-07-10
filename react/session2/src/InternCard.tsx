interface InternCardProps {
  name: string
  score: number
  isPresent: boolean
}

// Props should never be modified because they are read-only.
// Changing props directly breaks React's one-way data flow and can
// lead to inconsistent UI updates.
function InternCard({
  name,
  score,
  isPresent,
}: InternCardProps) {

  // ❌ Wrong
  // score = score + 10

  // ✅ Correct
  const adjustedScore: number =
    score >= 90 ? score : score + 5

  return (
    <div className="card">
      <h2>{name}</h2>

      <p>
        Original Score : {score}
      </p>

      <p>
        Adjusted Score : {adjustedScore}
      </p>

      <p>
        {isPresent ? "Present" : "Absent"}
      </p>
    </div>
  )
}

export default InternCard