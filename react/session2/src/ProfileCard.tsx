interface ProfileCardProps {
  name?: string
  role?: string
  score?: number
  skills?: string[]
}

// The '?' makes props optional. Default values ensure the component
// always has safe data to work with.
// Giving skills a default empty array prevents errors when using
// array methods like .length or .map().
function ProfileCard({
  name = "Unknown",
  role = "Intern",
  score = 0,
  skills = [],
}: ProfileCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>

      <p>
        <strong>Role:</strong> {role}
      </p>

      <p>
        <strong>Score:</strong> {score}
      </p>

      {skills.length > 0 && (
        <>
          <h4>Skills</h4>

          <ul>
            {skills.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </>
      )}

      {/* If skills = [] is removed, TypeScript reports:
          'skills' is possibly 'undefined'.
          This shows why array props should have safe default values
          before calling methods like .length or .map(). */}
    </div>
  )
}

export default ProfileCard