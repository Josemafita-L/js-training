import { useState } from 'react'

interface FormState {
  name: string
  score: number
  isPresent: boolean
  role: string
}

const initialForm: FormState = {
  name: '',
  score: 0,
  isPresent: true,
  role: 'Frontend',
}

function InternObjectForm() {
  const [form, setForm] = useState<FormState>(initialForm)

  function handleNameChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    // We create a new object using the previous state and
    // update only the "name" property.
    setForm(prev => ({
      ...prev,
      name: e.target.value,
    }))
  }

  function handleScoreChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setForm(prev => ({
      ...prev,
      score: Number(e.target.value),
    }))
  }

  function handlePresentChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setForm(prev => ({
      ...prev,
      isPresent: e.target.checked,
    }))
  }

  function handleRoleChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setForm(prev => ({
      ...prev,
      role: e.target.value,
    }))
  }

  function handleReset(): void {
    setForm(initialForm)
  }

  return (
    <div>
      <h2>Intern Object Form</h2>

      <input
        type="text"
        value={form.name}
        onChange={handleNameChange}
        placeholder="Name"
      />

      <br /><br />

      <input
        type="number"
        value={form.score}
        onChange={handleScoreChange}
        placeholder="Score"
      />

      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={form.isPresent}
          onChange={handlePresentChange}
        />
        Present
      </label>

      <br /><br />

      <select
        value={form.role}
        onChange={handleRoleChange}
      >
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      <p>
        Name: {form.name} |
        Score: {form.score} |
        Present: {form.isPresent ? 'Yes' : 'No'} |
        Role: {form.role}
      </p>

      <button onClick={handleReset}>
        Reset
      </button>

      {/* We use { ...prev, name: e.target.value } to create a new object
          while keeping all the existing properties. React state should
          not be mutated directly. If we forgot the spread operator,
          the new object would only contain the updated property and
          the other fields (score, role, isPresent) would be lost. */}
    </div>
  )
}

export default InternObjectForm