export interface Intern {
  id: number
  name: string
  score: number
  isPresent: boolean
  skills: string[]
}

interface InternProfileProps {
  intern: Intern
}

// Using a separate Intern interface avoids repeating the same fields
// in multiple components and keeps the application's data model consistent.
function InternProfile({ intern }: InternProfileProps) {
  return (
    <div className="card">
      <h2>{intern.name}</h2>

      <p>
        <strong>Score:</strong> {intern.score}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {intern.isPresent ? "Present" : "Absent"}
      </p>

      <h4>Skills</h4>

      <ul>
        {intern.skills.map((skill: string, index: number) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

export default InternProfile