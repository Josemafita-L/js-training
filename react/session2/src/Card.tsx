import { ReactNode } from "react"

interface CardProps {
  title: string
  children?: ReactNode
}

// Required children force every Card to contain content.
// Optional children allow empty cards that can still render.
function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>

      {children && (
        <div className="card-body">
          {children}
        </div>
      )}
    </div>
  )
}

export default Card