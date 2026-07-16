import Navbar from "./components/Navbar"
import ThemedCard from "./components/ThemedCard"
import CounterDemo from "./components/CounterDemo"

import { useInterns } from "./contexts/intern-context"

function App() {
  const { interns, isLoading } = useInterns()

  /*
  Theme and intern data are kept in separate contexts because
  they represent different responsibilities.

  ThemeContext manages only UI-related state (light/dark mode).

  InternContext manages application data (intern list, loading state, add/remove operations).

  Keeping them separate improves maintainability, keeps concerns isolated,
  and avoids unnecessary re-renders when unrelated state changes.
  */

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <Navbar />

      <div
        style={{
          padding: "16px",
        }}
      >
        {interns.map((intern) => (
          <ThemedCard
            key={intern.id}
            name={intern.name}
            score={intern.score}
          />
        ))}

        <CounterDemo />
      </div>
    </div>
  )
}

export default App