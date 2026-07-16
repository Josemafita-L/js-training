import { useReducer } from "react"

/*
==========================================================
Self Learning Task 1
React.memo
==========================================================

React.memo is a Higher Order Component (HOC) that memoizes
a React component.

Normally, when a parent component re-renders,
all of its child components also re-render.

React.memo prevents unnecessary re-renders by comparing
the current props with the previous props.

If the props have not changed,
React reuses the previous rendered component.

React.memo works very well with useCallback.

Without useCallback:

Parent renders
↓

Creates a new function

↓

Child receives a different function reference

↓

React.memo thinks props changed

↓

Child renders again

With useCallback:

Parent renders

↓

Same function reference is reused

↓

React.memo sees identical props

↓

Child rendering is skipped.

==========================================================
Task 2
When NOT to use useMemo and useCallback
==========================================================

These hooks should not be used everywhere.

Example 1

const total = a + b

This calculation is extremely cheap.

Adding useMemo here adds unnecessary complexity
and can even be slower than recalculating.

----------------------------------------------------------

Example 2

const handleClick = () => {
    console.log("Clicked")
}

If this function is not passed to memoized children,
using useCallback provides no benefit and only makes
the code harder to read.

----------------------------------------------------------

Only optimize when you have measured a performance issue.

Premature optimization often makes code harder to maintain.

==========================================================
Task 3
useReducer
==========================================================

useReducer is another Hook used for managing state.

Unlike useState,
state changes happen through actions and a reducer function.

It is useful when

• multiple state updates depend on one another

• state transitions become complex

• many useState calls are needed

• logic needs to be centralized

Below is a useReducer version of useCounter.

==========================================================
*/

interface CounterState {
  count: number
}

type CounterAction =
  | { type: "increment"; step: number; max: number }
  | { type: "decrement"; step: number; min: number }
  | { type: "reset"; initial: number }

function reducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case "increment":
      return {
        count: Math.min(
          state.count + action.step,
          action.max
        ),
      }

    case "decrement":
      return {
        count: Math.max(
          state.count - action.step,
          action.min
        ),
      }

    case "reset":
      return {
        count: action.initial,
      }

    default:
      return state
  }
}

function useCounterReducer(
  initial = 0,
  min = -Infinity,
  max = Infinity,
  step = 1
) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      count: initial,
    }
  )

  function increment() {
    dispatch({
      type: "increment",
      step,
      max,
    })
  }

  function decrement() {
    dispatch({
      type: "decrement",
      step,
      min,
    })
  }

  function reset() {
    dispatch({
      type: "reset",
      initial,
    })
  }

  return {
    count: state.count,
    increment,
    decrement,
    reset,
  }
}

/*
==========================================================
Task 4
Context API vs Zustand vs Redux Toolkit
==========================================================

Context API

• Built into React
• No external library
• Good for small and medium applications
• Suitable for themes, authentication,
  language settings and simple shared state

----------------------------------------------------------

Zustand

• Lightweight state management library
• Very little boilerplate
• Easy to learn
• Faster updates using selectors
• Excellent for medium and large applications

----------------------------------------------------------

Redux Toolkit

• Official Redux solution
• Best for very large enterprise applications
• Predictable state management
• Excellent DevTools support
• Good for complex business logic
• More boilerplate than Zustand

----------------------------------------------------------

Comparison

Context + useState

✔ Simple
✔ Built into React
✔ No dependencies

Zustand

✔ Cleaner API
✔ Better performance
✔ Less boilerplate

Redux Toolkit

✔ Best for enterprise projects
✔ Predictable architecture
✔ Powerful debugging
✔ Better for large teams

==========================================================
*/

function SelfLearning() {
  const counter = useCounterReducer(5, 0, 10, 2)

  return (
    <div
      style={{
        padding: "20px",
        marginTop: "20px",
        border: "1px solid gray",
      }}
    >
      <h2>Self Learning Demo</h2>

      <p>Counter : {counter.count}</p>

      <button onClick={counter.increment}>
        +
      </button>

      <button onClick={counter.decrement}>
        -
      </button>

      <button onClick={counter.reset}>
        Reset
      </button>

      <p>
        Check the comments in SelfLearning.tsx
        for all research answers.
      </p>
    </div>
  )
}

export default SelfLearning