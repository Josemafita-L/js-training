import { useState, useEffect } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
}

function InternLoader() {
  const [interns, setInterns] = useState<Intern[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // useEffect runs after the component renders.
  // The empty dependency array [] means it runs only once,
  // when the component is first mounted.
  // Data fetching belongs here because fetching data is a side effect.
  // If we fetched data directly inside the component body,
  // it would run on every render and could cause an infinite loop.

  useEffect(() => {
    //setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      setInterns([
        { id: 1, name: 'Rahul', score: 92, role: 'Frontend' },
        { id: 2, name: 'Priya', score: 78, role: 'Backend' },
        { id: 3, name: 'Amit', score: 45, role: 'Frontend' },
        { id: 4, name: 'Sneha', score: 95, role: 'Fullstack' },
      ])

      setIsLoading(false)
    }, 1500)
  }, [])

  if (isLoading) {
    return <p>Loading interns...</p>
  }

  return (
    <div>
      <h2>Intern Loader</h2>

      <ul>
        {interns.map(i => (
          <li key={i.id}>
            {i.name} — {i.role} — {i.score}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InternLoader