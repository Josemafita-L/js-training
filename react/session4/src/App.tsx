import Navbar from "./components/Navbar"
import ThemedCard from "./components/ThemedCard"
import CounterDemo from "./components/CounterDemo"
import AddInternForm from "./components/AddInternForm"

import { useInterns } from "./contexts/intern-context"

function App() {
  const { interns, isLoading } = useInterns()

  /*
  Theme and intern data are kept in separate contexts because
  they represent different responsibilities.

  ThemeContext manages UI appearance.

  InternContext manages application data.

  Keeping them separate makes the application
  easier to maintain and avoids unnecessary
  re-renders.
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

        <AddInternForm />
      </div>
    </div>
  )
}

export default App