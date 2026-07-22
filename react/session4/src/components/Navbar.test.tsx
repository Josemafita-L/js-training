import { render, screen } from "../test/test-utils"
import { render as rtlRender } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Navbar from "./Navbar"
import { ThemeProvider } from "../contexts/theme-context"

describe("Navbar", () => {
  test("renders the dashboard title", () => {
    render(<Navbar />)

    expect(
      screen.getByText("Intern Dashboard")
    ).toBeInTheDocument()
  })

  test("theme toggle button is visible", () => {
    render(<Navbar />)

    expect(
      screen.getByRole("button", {
        name: /switch to dark mode/i,
      })
    ).toBeInTheDocument()
  })

  test("theme toggle button label changes after click", async () => {
    const user = userEvent.setup()

    render(<Navbar />)

    await user.click(
      screen.getByRole("button", {
        name: /switch to dark mode/i,
      })
    )

    expect(
      screen.getByRole("button", {
        name: /switch to light mode/i,
      })
    ).toBeInTheDocument()
  })

  /*
  If we import render directly from
  @testing-library/react, Navbar will not
  receive ThemeProvider.

  Since Navbar uses useTheme(), React throws:

  "useTheme must be used inside ThemeProvider"

  test-utils wraps every component with
  ThemeProvider automatically.
  */

  test("renders correctly when wrapped manually in ThemeProvider", () => {
    rtlRender(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    )

    expect(
      screen.getByText("Intern Dashboard")
    ).toBeInTheDocument()
  })

  /*
  This test is equivalent to using the custom
  render helper.

  customRender automatically wraps components
  with ThemeProvider, avoiding repetitive code
  and making tests easier to maintain.
  */
})