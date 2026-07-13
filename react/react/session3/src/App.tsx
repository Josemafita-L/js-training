import './App.css'
import Counter from './Counter'
import StateTypes from './StateTypes'
import InternForm from "./InternForm"
import TogglePanel from "./TogglePanel"
import InternObjectForm from "./InternObjectForm"
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
    </>
  )
}


export default App