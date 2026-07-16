import { useState } from "react"

interface UseCounterOptions {
  initial?: number
  min?: number
  max?: number
  step?: number
}

interface UseCounterReturn {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

/*
Why is this a Custom Hook instead of a regular function?

- It starts with the prefix "use", which follows React's Hook naming convention.
- It uses React Hooks (useState) internally.
- It encapsulates reusable stateful logic that can be shared across multiple components.
- It must follow the Rules of Hooks:
  1. Hooks can only be called at the top level.
  2. Hooks cannot be called inside loops, conditions, or nested functions.
  3. Hooks can only be called inside React function components or other custom hooks.
*/

function useCounter({
  initial = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
}: UseCounterOptions = {}): UseCounterReturn {
  const [count, setCount] = useState<number>(initial)

  function increment(): void {
    setCount((prev) => Math.min(prev + step, max))
  }

  function decrement(): void {
    setCount((prev) => Math.max(prev - step, min))
  }

  function reset(): void {
    setCount(initial)
  }

  return {
    count,
    increment,
    decrement,
    reset,
  }
}

export default useCounter