interface BadgeProps {
  label: string
  color: string
}

// This component displays a reusable colored badge.
function Badge({ label, color }: BadgeProps) {
  return (
    <span
      style={{
        background: color,
        color: "white",
        padding: "2px 10px",
        borderRadius: "4px",
        fontSize: "12px",
      }}
    >
      {label}
    </span>
  )
}

export default Badge