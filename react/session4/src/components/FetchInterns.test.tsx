import React from "react"
import { render, screen, waitFor } from "../test/test-utils"
import { vi } from "vitest"

const mockInterns = [
  {
    id: 1,
    name: "Rahul",
    score: 90,
  },
  {
    id: 2,
    name: "Priya",
    score: 80,
  },
]

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockInterns),
  } as Response)
)

function FetchInterns() {
  const [interns, setInterns] = React.useState<
    typeof mockInterns
  >([])

  React.useEffect(() => {
    fetch("/api/interns")
      .then((res) => res.json())
      .then(setInterns)
  }, [])

  return (
    <div>
      {interns.map((intern) => (
        <p key={intern.id}>
          {intern.name}
        </p>
      ))}
    </div>
  )
}

describe("FetchInterns", () => {
  test("loads interns from mocked API", async () => {
    render(<FetchInterns />)

    await waitFor(() => {
      expect(
        screen.getByText("Rahul")
      ).toBeInTheDocument()

      expect(
        screen.getByText("Priya")
      ).toBeInTheDocument()
    })
  })
})