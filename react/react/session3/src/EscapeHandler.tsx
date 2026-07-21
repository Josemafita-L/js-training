import { useState, useEffect } from 'react'

function EscapeHandler() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent): void {
      console.log('keydown fired')

      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup:
    // Remove the event listener when the panel closes or
    // before the effect runs again. This prevents duplicate
    // listeners and memory leaks.
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div>
      <h2>Escape Handler</h2>

      <button onClick={() => setIsOpen(true)}>
        Open Panel
      </button>

      {isOpen && (
        <div
          style={{
            border: '1px solid gray',
            padding: '16px',
            marginTop: '10px',
          }}
        >
          <p>Panel is open.</p>
          <p>Press Escape to close.</p>

          <button onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default EscapeHandler