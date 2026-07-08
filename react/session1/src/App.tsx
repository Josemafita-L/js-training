import SkillList from './SkillList'

function App() {
  return (
    <>
      <h1>React Skills</h1>
      <SkillList />
    </>
  )
}

export default App
// React requires a unique key for each list item.
// Keys help React identify which items have changed, been added, or removed.
// Without keys, React shows a warning because it cannot efficiently update the list.