import "./App.css"
import InternCard from "./InternCard"
import ProfileCard from "./ProfileCard"

function App() {
  return (
    <div>

      <h1>Typed Props</h1>

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

      <hr />

      <h1>Default Props</h1>

<ProfileCard
  name="Rahul"
  role="Frontend Developer"
  score={92}
  skills={["HTML", "CSS", "React", "TypeScript"]}
/>

<ProfileCard
  name="Priya"
  skills={["Node.js", "Express"]}
/>

<ProfileCard />

    </div>
  )
}

export default App