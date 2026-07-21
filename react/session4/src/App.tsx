import Navbar from "./components/Navbar"
import ScoreStats from "./components/ScoreStats"
import AddInternForm from "./components/AddInternForm"
import InternSearch from "./components/InternSearch"
import InternListWithCallback from "./components/InternListWithCallback"
import SelfLearning from "./SelfLearning"
import { useInterns } from "./contexts/intern-context"

function App() {
  const { isLoading } = useInterns()

  /*
  Application Architecture

  Contexts
  --------
  Store shared application state that is needed by multiple
  components, such as theme and intern data.

  Custom Hooks
  ------------
  Encapsulate reusable business logic like form handling,
  searching and counters while keeping components clean.

  Components
  ----------
  Responsible only for rendering the UI and interacting
  with contexts or custom hooks.
  */

  if (isLoading) {
    return (
      <div
        style={{
          padding: "30px",
          fontSize: "22px",
        }}
      >
        Loading Intern Data...
      </div>
    )
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

        <AddInternForm />

        <InternSearch />

        <InternListWithCallback />
        <SelfLearning />
      </div>
    </div>
  )
}

export default App