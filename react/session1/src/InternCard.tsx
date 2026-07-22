function InternCard() {
    const name: string = 'Amit'
    const score: number = 45
    const isPresent: boolean = false

    // Use && when you only want to show something if the condition is true.
    // Use a ternary when there are two possible outcomes.

    return (
        <div className="intern-card">
            <h2>{name}</h2>

            <p style={{ color: score >= 50 ? 'green' : 'red' }}>
                Score: {score} — {score >= 50 ? 'Pass' : 'Fail'}
            </p>

            {score >= 90 && <span>🏆 Top Performer</span>}

            {isPresent
                ? <p>Present today</p>
                : <p>Absent today</p>
            }
        </div>
    )
}

export default InternCard