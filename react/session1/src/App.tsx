import Greeting from './Greeting'

// A React component is a reusable function that returns TSX to display UI.
// React Fragments group multiple elements without adding an extra HTML element to the DOM.
// Use a Fragment when you only need to group elements and don't need styling or attributes.
// Use a <div> when you need styling, layout, className, id, or event handlers.

function App() {
  return (
    <>
      <h1>Hello React</h1>
      <Greeting />
    </>
  )
}

export default App