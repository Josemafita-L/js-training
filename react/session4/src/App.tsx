import Navbar from "./components/Navbar"
import ScoreStats from "./components/ScoreStats"
import AddInternForm from "./components/AddInternForm"
import CounterDemo from "./components/CounterDemo"
import InternSearch from "./components/InternSearch"
import ThemedCard from "./components/ThemedCard"

import { useInterns } from "./contexts/intern-context"

function App() {
  const { interns, isLoading } = useInterns()

  /*
  Application Layers

  Contexts:
  Store shared application state.

  Custom Hooks:
  Store reusable business logic.

  Components:
  Display UI using contexts and hooks.
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
        <ScoreStats />

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