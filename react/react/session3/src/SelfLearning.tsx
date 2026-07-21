import { useState, useEffect } from 'react'

function LiveTimer() {
  const [seconds, setSeconds] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    // Cleanup is important because it clears the interval
    // when the component unmounts, preventing memory leaks
    // and multiple intervals from running simultaneously.
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h3>Live Timer</h3>
      <p>Seconds: {seconds}</p>
    </div>
  )
}

function SelfLearning() {
  return (
    <div>
      <h2>Self Learning Tasks</h2>

      <LiveTimer />

      {/*

1. React.StrictMode

React.StrictMode is a development-only feature that helps detect
potential problems in React applications. In development mode,
React intentionally renders components and runs useEffect cleanup
twice to help identify side effects that are not written correctly.
This behavior does not happen in production builds.

------------------------------------------------------------

2. useLayoutEffect vs useEffect

useEffect runs after the browser has painted the screen.
It is mainly used for data fetching, timers, API calls,
and event listeners.

useLayoutEffect runs synchronously after the DOM is updated
but before the browser paints the screen.
It is used when measuring DOM elements, scrolling,
or preventing layout flickering.

------------------------------------------------------------

3. Updating State inside useEffect without Dependency Array

If useEffect has no dependency array, it runs after every render.
If the effect updates state, React re-renders the component,
which runs the effect again, causing another state update.
This creates an infinite render loop.

Example:

useEffect(() => {
  setCount(count + 1)
})

Render → Effect → State Update → Render → Effect → Infinite Loop

------------------------------------------------------------

4. useReducer vs useState

useState is best for simple state like counters,
input fields, loading flags, or toggles.

useReducer is better for complex state with multiple related values
or when state updates depend on different actions.
It centralizes update logic in a reducer function,
making the code easier to maintain in larger applications.

------------------------------------------------------------

5. Cleanup Function in useEffect

The cleanup function is returned from useEffect.
It executes before the effect runs again or when the component
unmounts.

Cleanup is important for:
- Removing event listeners
- Clearing timers
- Cancelling subscriptions
- Preventing memory leaks

In the LiveTimer component above, clearInterval(interval)
stops the timer when the component is removed.
If the cleanup is removed, multiple intervals continue running,
causing the timer to increase faster and wasting memory.

      */}
    </div>
  )
}

export default SelfLearning