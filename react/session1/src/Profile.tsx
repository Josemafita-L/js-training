function Profile() {
    const name: string = 'Rahul'
    const role: string = 'Intern'
    const score: number = 92
    const joinDate: string = '2026-06-30'

    // TSX expressions use {} to evaluate JavaScript values.
    // Only expressions are allowed inside {}.
    // Statements like if, for, and while cannot be written directly in TSX.

    return (
        <div>
            <h2>{name}</h2>

            <p>Role: {role}</p>

            <p>Score: {score} / 100</p>

            <p>Name uppercase: {name.toUpperCase()}</p>

            <p>Score doubled: {score * 2}</p>

            <p>Joined: {new Date(joinDate).toDateString()}</p>
        </div>
    )
}

export default Profile