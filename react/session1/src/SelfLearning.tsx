function SelfLearning() {
    /*
    1. React.StrictMode
    React.StrictMode is a development tool that helps identify potential problems in a React application.
    It performs extra checks and may intentionally render components twice in development to detect side effects.
    It does not affect the production build.
  
    2. Controlled vs Uncontrolled Components
    Controlled components store form data in React state and update it using event handlers.
    Uncontrolled components store form data in the DOM and are accessed using refs.
  
    3. key Prop
    The key prop uniquely identifies list items so React can efficiently update the UI.
    Using the array index as a key is not recommended for dynamic lists because indexes can change.
    A stable unique ID from the data should be used instead.
  
    4. Fragments
    React Fragments group multiple elements without adding an extra DOM node.
    The shorthand syntax <>...</> cannot receive a key.
    If a Fragment needs a key, use:
    <React.Fragment key={id}>...</React.Fragment>
    */

    return (
        <div>
            <h2>Self Learning Completed</h2>
            <p>Research notes are included as comments.</p>
        </div>
    )
}

export default SelfLearning