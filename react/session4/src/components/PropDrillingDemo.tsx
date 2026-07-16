interface User {
  name: string
  isAdmin: boolean
}

// Grandchild component.
// This component actually uses the user data.
function UserBadge({ user }: { user: User }) {
  return (
    <div>
      <p>Logged in as: {user.name}</p>

      {user.isAdmin && <span>Admin</span>}
    </div>
  )
}

// Middle component.
// PROBLEM:
// This component does not use the "user" object.
// It only receives it so it can pass it to UserBadge.
// This is called Prop Drilling.
// If the User interface gets new fields,
// this component still needs to receive and forward
// the updated object even though it never uses it.
function InternCard({ user }: { user: User }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "8px",
        marginBottom: "10px",
      }}
    >
      <p>Intern Card Content</p>

      <UserBadge user={user} />
    </div>
  )
}

// Parent component.
// PROBLEM:
// InternList also does not use the user object.
// It only passes the prop to its child.
// If User gets new fields,
// this component must also be updated even though
// it doesn't use those fields.
function InternList({ user }: { user: User }) {
  return (
    <div>
      <InternCard user={user} />
      <InternCard user={user} />
    </div>
  )
}

function PropDrillingDemo() {
  const user: User = {
    name: "Rahul",
    isAdmin: true,
  }

  return <InternList user={user} />
}

export default PropDrillingDemo