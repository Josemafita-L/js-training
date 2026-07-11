import "./App.css"
import Card from "./Card"
import InternCard from "./InternCard"
import ProfileCard from "./ProfileCard"
import InternProfile from "./InternProfile"
import type { Intern } from "./InternProfile"
import Dashboard from "./Dashboard"

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
      <hr />

<h1>Children Prop</h1>

<Card title="Rahul">
  <p>Score : 92</p>

  <p>Status : Present</p>

  <button>View Profile</button>
</Card>
<hr />

<h1>Dashboard</h1>

<Dashboard />

<Card title="Announcements">
  <ul>
    <li>Session 3 tomorrow at 10 AM</li>
    <li>Submit React assignment before Friday</li>
  </ul>
</Card>
<Card title="Empty Card" />

    </div>
  )
}

export default App