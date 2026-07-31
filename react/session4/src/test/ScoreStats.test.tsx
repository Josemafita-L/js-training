import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"
import { ScoreStats } from "../components/ScoreStats"

describe("ScoreStats", () => {
  test("shows highest score", () => {
    render(
      <ScoreStats
        highest={95}
        lowest={45}
        average={78}
        passing={3}
        total={4}
      />
    )

    expect(
      screen.getByText(/Highest Score : 95/i)
    ).toBeTruthy()
  })

  test("shows lowest score", () => {
    render(
      <ScoreStats
        highest={95}
        lowest={45}
        average={78}
        passing={3}
        total={4}
      />
    )

    expect(
      screen.getByText(/Lowest Score : 45/i)
    ).toBeTruthy()
  })

  test("shows average score", () => {
    render(
      <ScoreStats
        highest={95}
        lowest={45}
        average={78}
        passing={3}
        total={4}
      />
    )

    expect(
      screen.getByText(/Average Score : 78/i)
    ).toBeTruthy()
  })

  test("shows passing interns", () => {
    render(
      <ScoreStats
        highest={95}
        lowest={45}
        average={78}
        passing={3}
        total={4}
      />
    )

    expect(
      screen.getByText(/Passing Interns : 3 \/ 4/i)
    ).toBeTruthy()
  })
})

/*
Observation:

The presentational component is much easier to test because it only
receives props and renders UI. It does not depend on React Context,
so no Provider or vi.mock() is required.

The container component handles data fetching from Context, while the
presentational component focuses only on displaying the data. This
separation improves testability and follows the Single Responsibility Principle.
*/