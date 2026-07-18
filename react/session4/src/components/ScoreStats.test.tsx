import { render, screen } from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import ScoreStats from "./ScoreStats"

vi.mock("../contexts/intern-context", () => ({
  useInterns: () => ({
    interns: [
      {
        id: 1,
        name: "Rahul",
        score: 92,
        isPresent: true,
        role: "Frontend",
      },
      {
        id: 2,
        name: "Priya",
        score: 78,
        isPresent: true,
        role: "Backend",
      },
      {
        id: 3,
        name: "Amit",
        score: 45,
        isPresent: false,
        role: "Frontend",
      },
    ],
  }),
}))
test("shows the highest score", () => {
  render(<ScoreStats />)

  expect(
    screen.getByText(/Highest Score : 92/i)
  ).toBeInTheDocument()
})
test("shows the lowest score", () => {
  render(<ScoreStats />)

  expect(
    screen.getByText(/Lowest Score : 45/i)
  ).toBeInTheDocument()
})
test("shows the average score", () => {
  render(<ScoreStats />)

  expect(
    screen.getByText(/Average Score : 72/i)
  ).toBeInTheDocument()
})
test("shows the number of passing interns", () => {
  render(<ScoreStats />)

  expect(
    screen.getByText(/Passing Interns : 2 \/ 3/i)
  ).toBeInTheDocument()
})

/*
Section 4.1

Dependencies:
1. useInterns() - provides the interns data from context.
2. useMemo() - memoizes the calculated statistics.

The useInterns context is an external dependency. Using the real
InternProvider would make the test depend on application state.
To keep the test isolated, useInterns is mocked.

useMemo is not mocked because it is a built-in React hook whose
behavior is already tested by React.
*/

/* section 4.3
No.

I did not mock useState or useMemo because they are built-in
React hooks whose behavior is already tested by React.

The goal is to mock only external dependencies.

ScoreStats does not call addIntern or removeIntern.

Therefore they do not need to be mocked.
If the component started calling them unexpectedly,
the test would fail and reveal an unintended dependency.

If the Intern interface gains a new required field,
TypeScript will report errors in the mock,
helping keep the test data synchronized with the interface.
*/