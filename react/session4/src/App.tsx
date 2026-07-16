import Navbar from "./components/Navbar"
import ThemedCard from "./components/ThemedCard"

import { useInterns } from "./contexts/intern-context"

function App() {
  const { interns, isLoading } =
    useInterns()

  /*
  Theme and intern data are kept in separate contexts
  because they represent different responsibilities.

  Theme context manages only UI appearance,
  while Intern context manages application data.

  Separating them improves maintainability,
  keeps components focused,
  and prevents unnecessary re-renders when
  only one type of state changes.
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
      </div>
    </div>
  )
}

export default App