import { useRef } from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFocus(): void {
    inputRef.current?.focus()
  }

  function handleClear(): void {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <h2>Focus Input</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Type something..."
      />

      <br />
      <br />

      <button onClick={handleFocus}>
        Focus Input
      </button>

      <button onClick={handleClear}>
        Clear and Focus
      </button>

      {/* Optional chaining (?.) is used because inputRef.current
          is null before the input is mounted. It safely calls
          focus() only when the input element exists. */}
    </div>
  )
}

export default FocusInput