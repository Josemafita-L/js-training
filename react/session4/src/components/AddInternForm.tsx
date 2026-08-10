import useInternForm from "../hooks/useInternForm"
import { useInterns } from "../contexts/intern-context"

function AddInternForm() {
  const { addIntern } = useInterns();

const {
  form,
  error,
  handleChange,
  handleReset,
  handleSubmit,
} = useInternForm(addIntern);



  return (
    <div
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

      <button onClick={handleSubmit}>
        Add Intern
      </button>

      <button
        onClick={handleReset}
        style={{
          marginLeft: "10px",
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default AddInternForm

// Job:
// This component displays the intern form.

// Concerns mixed:
// - UI rendering
// - Event handling