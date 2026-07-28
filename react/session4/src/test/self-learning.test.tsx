import { describe, test, expect, vi } from "vitest"
import { render, screen, within } from "./test-utils"
import userEvent from "@testing-library/user-event"

import AddInternForm from "../components/AddInternForm"

describe("Self Learning Tasks", () => {
 

  test("fast forwards setTimeout using fake timers", () => {
    vi.useFakeTimers()

    const callback = vi.fn()

    setTimeout(callback, 2000)

    expect(callback).not.toHaveBeenCalled()

    vi.runAllTimers()

    expect(callback).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  /*
  vi.useFakeTimers() replaces the browser's real timers
  with fake timers.

  vi.runAllTimers() immediately executes all pending
  timers without waiting for real time to pass.
  */

  test("uses within to search inside one intern card", () => {
    render(
      <div>
        <div data-testid="rahul-card">
          <h3>Rahul</h3>
          <p>Score: 92</p>
        </div>

        <div data-testid="priya-card">
          <h3>Priya</h3>
          <p>Score: 78</p>
        </div>
      </div>
    )

    const rahulCard =
      screen.getByTestId("rahul-card")

    expect(
      within(rahulCard).getByText("Score: 92")
    ).toBeInTheDocument()
  })

  /*
  within() limits all queries to a specific part of
  the DOM. It is useful when multiple cards contain
  similar text and we only want to search inside
  one component.
  */

  
  test("moves focus through AddInternForm using Tab", async () => {
    const user = userEvent.setup()

    render(<AddInternForm />)

    await user.tab()

    expect(
      screen.getByPlaceholderText("Intern Name")
    ).toHaveFocus()

    await user.tab()

    expect(
      screen.getByPlaceholderText("Score")
    ).toHaveFocus()

    await user.tab()

    expect(
      screen.getByRole("checkbox")
    ).toHaveFocus()
  })

  /*
  user.tab() simulates pressing the Tab key.

  toHaveFocus() verifies which element currently
  has keyboard focus, helping test accessibility.
  */

  

  test("coverage notes", () => {
    expect(true).toBe(true)
  })

  /*
  After running:

      npm run test:coverage

  Replace the percentages below with your own.

  Coverage Findings

  useInternForm.ts

  Line Coverage : ____ %

  Branch Coverage : ____ %

  Line Coverage:
  Measures how many executable lines were
  executed by the tests.

  Branch Coverage:
  Measures whether every possible decision
  path (if/else, switch, ternary) was tested.

  Branch coverage is stricter than line coverage.
  */
})