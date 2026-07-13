import './App.css'
import Counter from './Counter'
import StateTypes from './StateTypes'
import InternForm from "./InternForm"
import TogglePanel from "./TogglePanel"
import InternObjectForm from "./InternObjectForm"
import InternList from "./InternList"
import InternLoader from "./InternLoader"
import FilteredInterns from "./FilteredInterns"
import EscapeHandler from "./EscapeHandler"
import FocusInput from "./FocusInput"
import RefVsState from "./RefVsState"
import StopwatchRef from "./StopwatchRef"

function App() {
  return (
    <>
      <h1>React Hooks - Session 3</h1>

      <Counter />

      <hr />

      <StateTypes />

      <hr />

      <InternForm />
      <TogglePanel />
      <InternObjectForm />
      <InternList />
      <InternLoader />
      <FilteredInterns />
      <EscapeHandler />
      <FocusInput />
      <FocusInput />
      <hr />

      <RefVsState />
      <RefVsState />
      <hr />

      <StopwatchRef />
    </>
  )
}


export default App