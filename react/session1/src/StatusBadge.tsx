function StatusBadge() {
    const isAdmin: boolean = true
    const hasWarning: boolean = false
    const isVerified: boolean = true
    const messages: string[] = ['Assignment submitted', 'PR created']

    // Use && when you want to render something only if a condition is true.
    // If the condition is false, React renders nothing.

    return (
        <div>
            {/* Show only if admin */}
            {isAdmin && <span>👑 Admin</span>}

            <br />

            {/* Show only if warning */}
            {hasWarning && (
                <p style={{ color: 'orange' }}>
                    Warning: Incomplete tasks
                </p>
            )}

            {/* Show only if verified */}
            {isVerified && <span>✅ Verified</span>}

            {/* Show empty state only when no messages */}
            {messages.length === 0 && <p>No messages yet</p>}

            {/* Show list only when messages exist */}
            {messages.length > 0 && (
                <ul>
                    {messages.map((msg: string, index: number) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default StatusBadge