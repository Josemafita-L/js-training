import { render, screen } from "../test/test-utils"
import { vi } from "vitest"
import userEvent from "@testing-library/user-event"

describe("Mock Function Examples", () => {
  test("mock function is called once", async () => {
    const user = userEvent.setup()

    const handleClick = vi.fn()

    render(
      <button onClick={handleClick}>
        Click Me
      </button>
    )

    await user.click(
      screen.getByRole("button", {
        name: "Click Me",
      })
    )

    expect(handleClick).toHaveBeenCalled()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test("mock function receives arguments", async () => {
    const user = userEvent.setup()

    const handleRemove = vi.fn()

    render(
      <button
        onClick={() => handleRemove(10)}
      >
        Remove
      </button>
    )

    await user.click(
      screen.getByRole("button", {
        name: "Remove",
      })
    )

    expect(handleRemove).toHaveBeenCalledWith(10)
  })

  test("mock function can be called multiple times", async () => {
    const user = userEvent.setup()

    const mockFn = vi.fn()

    render(
      <button onClick={mockFn}>
        Press
      </button>
    )

    const button =
      screen.getByRole("button", {
        name: "Press",
      })

    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(mockFn).toHaveBeenCalledTimes(3)
  })

  test("mock function is not called before interaction", () => {
    const mockFn = vi.fn()

    render(
      <button onClick={mockFn}>
        Save
      </button>
    )

    expect(mockFn).not.toHaveBeenCalled()
  })
})