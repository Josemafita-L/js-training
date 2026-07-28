import { memo, useCallback } from "react"
import { useInterns } from "../contexts/intern-context"
import { useTheme } from "../contexts/theme-context"

interface InternRowProps {
  id: number
  name: string
  score: number
  onRemove: (id: number) => void
}

/*
React.memo prevents unnecessary re-renders.

InternRow will only re-render when one of its props changes.

When combined with useCallback, the onRemove function
keeps the same reference between renders,
allowing React.memo to skip unnecessary renders.
*/
const InternRow = memo(function InternRow({
  id,
  name,
  score,
  onRemove,
}: InternRowProps) {
  const { theme } = useTheme()

  console.log(`InternRow rendered: ${name}`)

  return (
    <div
      data-testid={`intern-${name}`}
      style={{
        background: theme === "light" ? "#ffffff" : "#2a2a2a",
        color: theme === "light" ? "#000000" : "#eeeeee",
        border: "1px solid #cccccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
      }}
    >
      <strong>{name}</strong>

      <p>Score: {score}</p>

      <button onClick={() => onRemove(id)}>
        Remove
      </button>
    </div>
  )
})

function InternListWithCallback() {
  const { interns, removeIntern } = useInterns()

  /*
  useCallback memoizes the function reference.

  Without useCallback,
  a new handleRemove function would be created
  every time this component renders.

  That new function reference would cause
  memoized child components to re-render
  unnecessarily.

  useCallback returns the same function
  until one of its dependencies changes.
  */
  const handleRemove = useCallback(
    (id: number): void => {
      removeIntern(id)
    },
    [removeIntern]
  )

  return (
    <div
      data-testid="intern-list"
      style={{ marginTop: "25px" }}
    >
      <h2>Intern List</h2>

      {interns.map((intern) => (
        <InternRow
          key={intern.id}
          id={intern.id}
          name={intern.name}
          score={intern.score}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
}

export default InternListWithCallback