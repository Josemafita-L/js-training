function SkillList() {
    const skills: string[] = [
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'Node.js',
        'React'
    ]

    // React uses map() to convert an array into multiple UI elements.
    // Every item should have a unique key so React can efficiently update the DOM.

    return (
        <div>
            <h3>Skills Covered</h3>

            <ul>
                {skills.map((skill: string, index: number) => (
                    <li key={index}>
                        {skill}
                    </li>
                ))}
            </ul>

            <p>Total: {skills.length} skills</p>
        </div>
    )
}

export default SkillList