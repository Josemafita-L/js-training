import useInternForm from "../hooks/useInternForm"
import { useInterns } from "../contexts/intern-context"

function AddInternForm() {
  const { form, error, handleChange, handleReset, isValid } =
    useInternForm()

  const { addIntern, interns } = useInterns()

  function handleSubmit(): void {
    if (!isValid()) return

    addIntern({
      id: interns.length + 1,
      ...form,
    })

    handleReset()
  }

  return (
    <form
      data-testid="add-intern-form"
      aria-label="Add Intern"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "8px",
      }}
    >
      <h2>Add Intern</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          name="name"
          placeholder="Intern Name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          name="score"
          placeholder="Score"
          value={form.score}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          <input
            type="checkbox"
            name="isPresent"
            checked={form.isPresent}
            onChange={handleChange}
          />

          Present
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <select
  aria-label="Role"
  name="role"
  value={form.role}
  onChange={handleChange}
>
          <option value="Frontend">
            Frontend
          </option>

          <option value="Backend">
            Backend
          </option>

          <option value="Fullstack">
            Fullstack
          </option>
        </select>
      </div>

      <button type="submit">
        Add Intern
      </button>

      <button
        type="button"
        onClick={handleReset}
        style={{
          marginLeft: "10px",
        }}
      >
        Reset
      </button>
    </form>
  )
}

export default AddInternForm