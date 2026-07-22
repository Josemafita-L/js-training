import { useState, useEffect, useRef } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

const internData: Intern[] = [
  { id: 1, name: 'Rahul', score: 92, role: 'Frontend', isPresent: true },
  { id: 2, name: 'Priya', score: 78, role: 'Backend', isPresent: true },
  { id: 3, name: 'Amit', score: 45, role: 'Frontend', isPresent: false },
  { id: 4, name: 'Sneha', score: 95, role: 'Fullstack', isPresent: true },
]

function Dashboard() {
  const [interns, setInterns] = useState<Intern[]>([])
  const [search, setSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setInterns(internData)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus()
    }
  }, [isOpen])

  const filteredInterns = interns.filter(intern =>
    intern.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return <p>Loading dashboard...</p>
  }

  return (
    <div>
      <h2>Intern Dashboard</h2>

      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Hide Search' : 'Show Search'}
      </button>

      {isOpen && (
        <div style={{ marginTop: '15px' }}>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search Intern..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      <p>
        Showing {filteredInterns.length} of {interns.length} interns
      </p>

      {filteredInterns.map(intern => (
        <div
          key={intern.id}
          style={{
            border: '1px solid gray',
            padding: '12px',
            marginBottom: '10px',
            borderRadius: '6px',
          }}
        >
          <h3>{intern.name}</h3>

          <p>Role: {intern.role}</p>

          <p>Score: {intern.score}</p>

          <span
            style={{
              padding: '5px 10px',
              borderRadius: '5px',
              color: 'white',
              backgroundColor: intern.score >= 50 ? 'green' : 'red',
            }}
          >
            {intern.score >= 50 ? 'Pass' : 'Fail'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Dashboard