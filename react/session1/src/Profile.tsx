function Profile() {
    const name: string = 'Rahul'
    const role: string = 'Intern'
    const score: number = 92
    const joinDate: string = '2026-06-30'

    const avatarUrl: string = 'https://i.pravatar.cc/100'
    const altText: string = `Avatar of ${name}`

    // TSX expressions inside {} return a value and can be rendered.
    // Statements like if, for, and while do not return values,
    // so they cannot be written directly inside TSX.

    // width={100} passes a number to the width prop.
    // width="100" passes a string. Use {} when passing numbers,
    // variables, booleans, or JavaScript expressions.

    return (
        <div>
            <img src={avatarUrl} alt={altText} width={100} />

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