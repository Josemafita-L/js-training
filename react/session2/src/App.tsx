import './App.css'
import InternCard from './InternCard'

function App() {
  return (
    <div>
      <h1>Intern Details</h1>

      <InternCard
        name="Rahul"
        score={92}
        isPresent={true}
      />

      <InternCard
        name="Priya"
        score={78}
        isPresent={true}
      />

      <InternCard
        name="Amit"
        score={45}
        isPresent={false}
      />
    </div>
  )
}

export default App
// TypeScript reports an error because score expects a number,
// not a string. Catching this during development prevents runtime bugs.
// TypeScript prevents passing a string where a boolean is required,
// helping ensure the component receives the correct data type.
// Required props cannot be omitted. TypeScript ensures all required
// data is provided before the component is rendered.
// TypeScript rejects unknown props, preventing accidental or
// unsupported data from being passed to the component.