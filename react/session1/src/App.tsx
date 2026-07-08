import Profile from './Profile'

function App() {
  return (
    <>
      <h1>Profile</h1>
      <Profile />
    </>
  )
}

export default App

// TSX expressions inside {} return a value and can be rendered.
// Statements like if, for, and while perform actions but do not return values,
// so they cannot be written directly inside TSX.