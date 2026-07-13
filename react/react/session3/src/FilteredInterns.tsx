import { useState, useEffect } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
}

const allInterns: Intern[] = [
  { id: 1, name: 'Rahul', score: 92, role: 'Frontend' },
  { id: 2, name: 'Priya', score: 78, role: 'Backend' },
  { id: 3, name: 'Amit', score: 45, role: 'Frontend' },
  { id: 4, name: 'Sneha', score: 95, role: 'Fullstack' },
]

function FilteredInterns() {
  const [role, setRole] = useState<string>('all')
  const [filtered, setFiltered] = useState<Intern[]>(allInterns)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      const result =
        role === 'all'
          ? allInterns
          : allInterns.filter(i => i.role === role)

      setFiltered(result)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [role])

  return (
    <div>
      <h2>Filtered Interns</h2>

      <select
        value={role}
        onChange={e => setRole(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      {isLoading ? (
        <p>Updating...</p>
      ) : (
        <ul>
          {filtered.map(i => (
            <li key={i.id}>
              {i.name} — {i.role}
            </li>
          ))}
        </ul>
      )}

      {/* Explore:
          1. Remove [role] completely:
             useEffect runs after every render. Since it updates state,
             it can repeatedly re-render and may cause an infinite loop.

          2. Change [role] to []:
             useEffect runs only once when the component mounts.
             Changing the dropdown updates the role state,
             but the effect does not run again, so the list never changes.

          3. Using [role]:
             useEffect runs on mount and whenever the role changes,
             which is the correct behavior for filtering interns.
      */}
    </div>
  )
}

export default FilteredInterns