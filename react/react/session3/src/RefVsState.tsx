import { useState, useRef } from 'react'

function RefVsState() {
  const [stateCount, setStateCount] = useState<number>(0)
  const refCount = useRef<number>(0)

  function incrementState(): void {
    setStateCount(prev => prev + 1)
  }

  function incrementRef(): void {
    refCount.current += 1
    console.log('Ref value:', refCount.current)
  }

  return (
    <div>
      <h2>Ref vs State</h2>

      <p>State count (shown in UI): {stateCount}</p>
      <p>Ref count (shown after state re-render): {refCount.current}</p>

      <button onClick={incrementState}>
        Increment State
      </button>

      <button onClick={incrementRef}>
        Increment Ref
      </button>

      {/* useState triggers a re-render whenever its value changes,
          so the updated value appears immediately in the UI.
          useRef stores a mutable value that persists across renders,
          but changing ref.current does not trigger a re-render.
          Use useState for values that affect the UI and useRef for
          mutable values like DOM references, timers, or previous values. */}
    </div>
  )
}

export default RefVsState