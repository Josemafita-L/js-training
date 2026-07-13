import { useState } from 'react'

function TogglePanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Functional update:
  // Using prev => !prev is safer because React always provides the latest
  // state value. This avoids bugs when multiple state updates are queued
  // or happen asynchronously. Using setIsOpen(!isOpen) may use a stale
  // value in those situations.
  // Both setIsOpen(!isOpen) and setIsOpen(prev => !prev) work here.
// The functional update is safer because React always passes the
// latest state value, avoiding stale state issues when multiple
// updates are queued or happen asynchronously.

  return (
    <div>
      <h2>Toggle Panel</h2>

      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Hide Details' : 'Show Details'}
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: '10px',
            border: '1px solid gray',
            padding: '10px',
          }}
        >
          <p>Name: Rahul</p>
          <p>Score: 92</p>
          <p>Role: Frontend</p>
        </div>
      )}
    </div>
  )
}

export default TogglePanel