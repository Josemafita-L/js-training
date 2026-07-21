function TsxRules() {
    return (
        <div>
            {/* input is a void element in HTML, so in TSX it must be self-closing */}
            <input type="text" />

            {/* TSX uses className because class is a reserved keyword in JavaScript/TypeScript */}
            <p className="highlight">Styled paragraph</p>

            {/* TSX uses htmlFor instead of for because for is a JavaScript keyword */}
            <label htmlFor="email">Email</label>

            {/* Self-closing input */}
            <input id="email" type="email" />

            {/* Inline styles use a JavaScript object with camelCase property names */}
            <p style={{ color: 'red', fontSize: '16px' }}>
                Red text
            </p>

            {/* TSX comments use curly braces and JavaScript comment syntax */}
            {/* This is a TSX comment */}
        </div>
    )
}

export default TsxRules