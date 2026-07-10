import "./App.css"

import InternCard from "./InternCard"
import ProfileCard from "./ProfileCard"
import InternProfile from "./InternProfile"
import type { Intern } from "./InternProfile"

function App() {

  const rahul: Intern = {
    id: 1,
    name: "Rahul",
    score: 92,
    isPresent: true,
    skills: ["HTML", "CSS", "TypeScript", "React"],
  }

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
        role="Frontend"
        score={92}
        skills={["HTML", "CSS", "React"]}
      />

      <ProfileCard
        name="Priya"
        skills={["Node.js", "Express"]}
      />

      <ProfileCard />

      <hr />

      <h1>Object as Props</h1>

      <InternProfile intern={rahul} />

    </div>
  )
}

export default App