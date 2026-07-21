interface ScoreBarProps {
  score: number
}

// This component visually represents the intern's score.
function ScoreBar({ score }: ScoreBarProps) {
  return (
    <div
      style={{
        background: "#eee",
        borderRadius: "4px",
        height: "8px",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          width: `${score}%`,
          background: score >= 50 ? "green" : "red",
          height: "8px",
          borderRadius: "4px",
        }}
      />
    </div>
  )
}

export default ScoreBar