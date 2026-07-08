import StatusBadge from './StatusBadge'

function App() {
  return (
    <>
      <h1>Status Badge</h1>
      <StatusBadge />
    </>
  )
}

export default App

// Using messages.length directly can render 0 when the array is empty.
// Checking messages.length > 0 returns true or false,
// preventing React from displaying 0.