import ScoreCard from './ScoreCard'

function App() {
  return (
    <>
      <h1>Conditional Rendering</h1>
      <ScoreCard />
    </>
  )
}

export default App

// Use a ternary when you need to choose between two values or UI elements.
// Ternary is an expression, so it can be used directly inside TSX.
// An if statement is a statement and cannot be written directly inside TSX.