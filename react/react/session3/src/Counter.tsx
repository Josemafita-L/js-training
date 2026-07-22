import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

  // We must use the setter function because React state is immutable.
  // Directly writing count = count + 1 only changes the local variable
  // and does not trigger a re-render. setCount() updates the state and
  // tells React to re-render the component with the new value.

  return (
    <div>
      <h2>Counter Example</h2>

      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  )
}

export default Counter