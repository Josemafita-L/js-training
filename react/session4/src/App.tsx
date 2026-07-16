import Navbar from "./components/Navbar"
import ScoreStats from "./components/ScoreStats"
import CounterDemo from "./components/CounterDemo"
import AddInternForm from "./components/AddInternForm"
import InternSearch from "./components/InternSearch"
import InternListWithCallback from "./components/InternListWithCallback"

import { useInterns } from "./contexts/intern-context"

function App() {
  const { isLoading } = useInterns()

  /*
  Application Layers

  Contexts
  ----------
  Store global shared state like theme and intern data.

  Custom Hooks
  -------------
  Store reusable business logic such as counters,
  form handling and searching.

  Components
  ----------
  Responsible only for rendering the UI.
  */

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <Navbar />

      <div style={{ padding: "16px" }}>
        <ScoreStats />

        <AddInternForm />

        <CounterDemo />

        <InternSearch />

        <InternListWithCallback />
      </div>
    </div>
  )
}

export default App