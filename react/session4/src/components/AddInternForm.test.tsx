import { render, screen } from "../test/test-utils"
import userEvent from "@testing-library/user-event"
import AddInternForm from "./AddInternForm"

describe("AddInternForm", () => {
  /*
    userEvent simulates real browser interactions such as typing,
    clicking, selecting options, etc.

    It is preferred over fireEvent because it more closely
    resembles how a real user interacts with the application.
  */

  test("renders Add Intern heading", () => {
    render(<AddInternForm />)

    expect(
      screen.getByRole("heading", {
        name: "Add Intern",
      })
    ).toBeInTheDocument()
  })

  test("updates intern name when user types", async () => {
    const user = userEvent.setup()

    render(<AddInternForm />)

    const nameInput =
      screen.getByPlaceholderText("Intern Name")

    await user.type(nameInput, "Rahul")

    expect(nameInput).toHaveValue("Rahul")
  })

  test("updates score when user types", async () => {
    const user = userEvent.setup()

    render(<AddInternForm />)

    const scoreInput =
      screen.getByPlaceholderText("Score")

    await user.clear(scoreInput)

    await user.type(scoreInput, "92")

    expect(scoreInput).toHaveValue(92)
  })

 test("checks Present checkbox", async () => {
  const user = userEvent.setup()

  render(<AddInternForm />)

  const checkbox =
    screen.getByRole("checkbox")

  expect(checkbox).toBeChecked()

  await user.click(checkbox)

  expect(checkbox).not.toBeChecked()
})

  test("changes intern role", async () => {
    const user = userEvent.setup()

    render(<AddInternForm />)

    const role =
      screen.getByRole("combobox")

    expect(role).toHaveValue("Frontend")

    await user.selectOptions(role, "Backend")

    expect(role).toHaveValue("Backend")
  })

  test("reset button clears the form", async () => {
    const user = userEvent.setup()

    render(<AddInternForm />)

    const name =
      screen.getByPlaceholderText("Intern Name")

    const score =
      screen.getByPlaceholderText("Score")

    const checkbox =
      screen.getByRole("checkbox")

    const role =
      screen.getByRole("combobox")

    await user.type(name, "Rahul")
    await user.clear(score)
    await user.type(score, "95")
    await user.click(checkbox)
    await user.selectOptions(role, "Backend")

    await user.click(
      screen.getByRole("button", {
        name: "Reset",
      })
    )

   expect(name).toHaveValue("")
expect(score).toHaveValue(0)
expect(checkbox).toBeChecked()
expect(role).toHaveValue("Frontend")
  })

  test("renders Add Intern button", () => {
    render(<AddInternForm />)

    expect(
      screen.getByRole("button", {
        name: "Add Intern",
      })
    ).toBeInTheDocument()
  })

  test("renders Reset button", () => {
    render(<AddInternForm />)

    expect(
      screen.getByRole("button", {
        name: "Reset",
      })
    ).toBeInTheDocument()
  })

  test("shows validation error when submitting an empty form", async () => {
    const user = userEvent.setup()

    render(<AddInternForm />)

    await user.click(
      screen.getByRole("button", {
        name: "Add Intern",
      })
    )

    // Update this text if your hook returns a different validation message.
    expect(
      screen.getByText(/required|error|name/i)
    ).toBeInTheDocument()
  })
})