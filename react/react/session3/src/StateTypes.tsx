import { useState } from 'react'

interface Intern {
  id: number
  name: string
  isPresent: boolean
}

function StateTypes() {
  // TypeScript infers these types from the initial values.
  const [name, setName] = useState('')
  const [score, setScore] = useState(0)
  const [isActive, setIsActive] = useState(false)

  // Explicit types are needed because the initial values are ambiguous.
  const [selected, setSelected] = useState<Intern | null>(null)
  const [interns, setInterns] = useState<Intern[]>([])

  // Explore:
  // 1. Try: setScore("92")
  //    TypeScript Error:
  //    Argument of type 'string' is not assignable to parameter of type 'SetStateAction<number>'.
  //
  // 2. Try:
  //    setSelected({ id: 1, name: "Rahul" })
  //    TypeScript Error:
  //    Property 'isPresent' is missing because it is required in the Intern interface.

  return (
    <div>
      <h2>State Types Example</h2>

      <p>Name: {name || '(none)'}</p>
      <p>Score: {score}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
      <p>Selected: {selected ? selected.name : '(none)'}</p>
      <p>Intern Count: {interns.length}</p>

      <button onClick={() => setName('Rahul')}>
        Set Name
      </button>

      <button onClick={() => setScore(92)}>
        Set Score
      </button>

      <button onClick={() => setIsActive(true)}>
        Activate
      </button>

      <button
        onClick={() =>
          setSelected({
            id: 1,
            name: 'Rahul',
            isPresent: true,
          })
        }
      >
        Select Intern
      </button>

      <button
        onClick={() =>
          setInterns([
            {
              id: 1,
              name: 'Rahul',
              isPresent: true,
            },
            {
              id: 2,
              name: 'Priya',
              isPresent: false,
            },
          ])
        }
      >
        Load Interns
      </button>
    </div>
  )
}

export default StateTypes