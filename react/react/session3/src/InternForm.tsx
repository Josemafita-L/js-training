import { useState } from 'react'

function InternForm() {
  const [name, setName] = useState<string>('')
  const [score, setScore] = useState<number>(0)

  function handleNameChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setName(e.target.value)
  }

  function handleScoreChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    // Even though the input type is "number", the browser always provides
// e.target.value as a string. Number() converts it into a number so
// the state remains of type number.
    setScore(Number(e.target.value))
  }

  function handleReset(): void {
    setName('')
    setScore(0)
  }

  return (
    <div>
      <h2>Intern Form</h2>

      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Intern name"
      />

      <br /><br />

      <input
        type="number"
        value={score}
        onChange={handleScoreChange}
        placeholder="Score"
      />

      <br /><br />

      <p>
        Name: {name} | Score: {score}
      </p>

      <button onClick={handleReset}>
        Reset
      </button>

      {/* Controlled Input:
          A controlled input gets its value from React state.
          Every time the user types, onChange updates the state,
          and React re-renders the input with the latest value.
          This keeps the UI and state synchronized. */}
    </div>
  )
}

export default InternForm