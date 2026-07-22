import "./App.css"

import Card from "./Card"
import Dashboard from "./Dashboard"
import InternCard from "./InternCard"
import InternProfile from "./InternProfile"
import type { Intern } from "./InternProfile"
import ProfileCard from "./ProfileCard"
import SelfLearning from "./SelfLearning"

function App() {
  const rahul: Intern = {
    id: 1,
    name: "Rahul",
    score: 92,
    isPresent: true,
    skills: ["HTML", "CSS", "TypeScript", "React"],
  }

  const priya: Intern = {
    id: 2,
    name: "Priya",
    score: 78,
    isPresent: true,
    skills: ["Node.js", "TypeScript"],
  }

  return (
    <div>
      <h1>Typed Props</h1>

      <InternCard
        name="Rahul"
        score={92}
        isPresent={true}
        role="Frontend"
      />

      <InternCard
        name="Priya"
        score={78}
        isPresent={true}
        role="Backend"
      />

      <InternCard
        name="Amit"
        score={45}
        isPresent={false}
        role="Full Stack"
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

      <InternProfile intern={priya} />

      <InternProfile intern={{ ...priya }} />

      <hr />

      <h1>Children Prop</h1>

      <Card title="Rahul">
        <p>Score: 92</p>
        <p>Status: Present</p>
        <button>View Profile</button>
      </Card>

      <Card title="Announcements">
        <ul>
          <li>Session 3 tomorrow at 10 AM</li>
          <li>Submit React assignment before Friday</li>
        </ul>
      </Card>

      <Card title="Empty Card" />

      <hr />

      <h1>Dashboard</h1>

      <Dashboard />

      <hr />

      <h1>Self Learning</h1>

      <SelfLearning />
    </div>
  )
}

export default App