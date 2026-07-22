import { useState } from 'react'

interface Intern {
  id: number
  name: string
}

function InternList() {
  const [interns, setInterns] = useState<Intern[]>([])
  const [inputName, setInputName] = useState<string>('')
  const [nextId, setNextId] = useState<number>(1)

  function handleAdd(): void {
    if (!inputName.trim()) return

    setInterns(prev => [
      ...prev,
      {
        id: nextId,
        name: inputName.trim(),
      },
    ])

    setNextId(prev => prev + 1)
    setInputName('')
  }

  function handleRemove(id: number): void {
    setInterns(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div>
      <h2>Intern List</h2>

      <input
        type="text"
        value={inputName}
        onChange={e => setInputName(e.target.value)}
        placeholder="Intern name"
      />

      <button onClick={handleAdd}>
        Add
      </button>

      <p>Total Interns: {interns.length}</p>

      <ul>
        {interns.map(i => (
          <li key={i.id}>
            {i.name}

            <button
              onClick={() => handleRemove(i.id)}
              style={{ marginLeft: '10px' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* React state should never be mutated directly.
          [...prev, newIntern] creates a new array with the existing interns
          plus the new intern. filter() creates a new array without the
          removed intern. Using push() or splice() would modify the original
          array, which React may not detect correctly, leading to UI issues. */}
    </div>
  )
}

export default InternList