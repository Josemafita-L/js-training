import Greeting from './Greeting'

// A React component is a reusable function that returns TSX to display UI elements.
function App() {
  return (
    <div>
      <h1>Hello React</h1>

      <Greeting />
      <Greeting />
      <Greeting />
    </div>
  )
}

export default App

// Reusing components avoids duplicating code, making applications easier to maintain and update.