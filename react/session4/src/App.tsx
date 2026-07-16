import Navbar from "./components/Navbar"
import ThemedCard from "./components/ThemedCard"
import CounterDemo from "./components/CounterDemo"
import AddInternForm from "./components/AddInternForm"
import InternSearch from "./components/InternSearch"

import { useInterns } from "./contexts/intern-context"

function App() {
  const { interns, isLoading } = useInterns()

  /*
  ThemeContext:
  Responsible for UI appearance like Light and Dark mode.

  InternContext:
  Responsible for managing intern data.

  Components:
  Responsible only for displaying UI.

  Custom Hooks:
  Responsible for reusable business logic like
  searching, forms and counters.
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

        <InternSearch />
      </div>
    </div>
  )
}

export default App