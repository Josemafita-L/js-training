import { ReactNode, ReactElement } from "react"

/*
React.FC:
- React.FC is a generic type for function components.
- It can automatically include the children prop (older React versions).
- Today, most developers prefer typing the props directly because it is simpler
  and avoids adding children when they are not needed.
*/

// React.FC Example
interface GreetingProps {
  name: string
}

const Greeting = ({ name }: GreetingProps) => {
  return <h2>Hello, {name}!</h2>
}

/*
PropsWithChildren:
- PropsWithChildren automatically adds a children prop to your interface.
- It is useful when every component should accept children.
- Manually writing children: ReactNode gives more control over whether
  children are required or optional.
*/

/*
Key Prop:
- The key prop helps React identify which list items changed,
  were added, or removed.
- React uses key internally for efficient updates.
- key is NOT passed to the component as a normal prop,
  so props.key is always undefined.
*/

interface PageLayoutProps {
  header: ReactNode
  children: ReactNode
  footer: ReactNode
}

// Named slots allow different content in different positions.
function PageLayout({
  header,
  children,
  footer,
}: PageLayoutProps) {
  return (
    <div style={{ border: "1px solid gray", margin: "20px", padding: "10px" }}>
      <header
        style={{
          background: "#f0f0f0",
          padding: "10px",
        }}
      >
        {header}
      </header>

      <main
        style={{
          padding: "15px",
        }}
      >
        {children}
      </main>

      <footer
        style={{
          background: "#f0f0f0",
          padding: "10px",
        }}
      >
        {footer}
      </footer>
    </div>
  )
}

/*
children vs named props

children:
<Card>
   Content
</Card>

Named props:
<PageLayout
   header={<Header />}
   footer={<Footer />}
/>

Use children for the main content.
Use named slots when the layout has fixed regions like header,
sidebar, and footer.
*/

interface WrapperProps {
  content: ReactNode
}

function Wrapper({ content }: WrapperProps) {
  return <div>{content}</div>
}

interface IconButtonProps {
  icon: ReactElement
  label: string
}

function IconButton({
  icon,
  label,
}: IconButtonProps) {
  return (
    <button>
      {icon} {label}
    </button>
  )
}

interface TooltipProps {
  trigger: JSX.Element
  tip: string
}

function Tooltip({
  trigger,
  tip,
}: TooltipProps) {
  return (
    <span title={tip}>
      {trigger}
    </span>
  )
}

/*
ReactNode vs ReactElement vs JSX.Element

ReactNode
- Accepts everything React can render:
  strings, numbers, JSX, arrays, null, undefined.

ReactElement
- Accepts only a JSX element.
- Rejects strings and numbers.

JSX.Element
- Similar to ReactElement.
- Also rejects null and undefined.
- Used when a component must receive exactly one JSX element.
*/

function SelfLearning() {
  return (
    <div>

      <Greeting name="Jose" />

      <PageLayout
        header={<h1>Intern Dashboard</h1>}
        footer={<p>© 2026 Aarvihsolutions</p>}
      >
        <p>Main content goes here as children.</p>

        <p>
          Any JSX works — text, elements, or other
          components.
        </p>
      </PageLayout>

      <Wrapper content="This is ReactNode content." />

      <Wrapper
        content={<strong>ReactNode accepts JSX too.</strong>}
      />

      <IconButton
        icon={<span>⭐</span>}
        label="Star"
      />

      <br />
      <br />

      <Tooltip
        trigger={<button>Hover Me</button>}
        tip="This is a tooltip"
      />

    </div>
  )
}

export default SelfLearning