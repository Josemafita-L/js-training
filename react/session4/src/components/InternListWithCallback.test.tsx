import { render, screen } from "../test/test-utils"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import InternListWithCallback from "./InternListWithCallback"

/*
Mock as little as possible.

We mock only the intern context because loading interns is outside
the scope of this component's responsibility.

Mock your own code only when it introduces dependencies such as
contexts, API calls, or timers that are not being tested.

If another module is part of the behaviour you want to verify,
prefer using its real implementation instead of mocking it.
*/

const mockRemoveIntern = vi.fn()

vi.mock("../contexts/intern-context", async () => {
  const actual = await vi.importActual(
    "../contexts/intern-context"
  )

  return {
    ...actual,

    useInterns: () => ({
      interns: [
        {
          id: 1,
          name: "Rahul",
          score: 92,
          role: "Frontend",
          isPresent: true,
        },
        {
          id: 2,
          name: "Priya",
          score: 78,
          role: "Backend",
          isPresent: true,
        },
        {
          id: 3,
          name: "Amit",
          score: 45,
          role: "Fullstack",
          isPresent: false,
        },
      ],

      isLoading: false,

      addIntern: vi.fn(),

      removeIntern: mockRemoveIntern,
    }),
  }
})

describe("InternListWithCallback", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test("renders all interns from context", () => {
    render(<InternListWithCallback />)

    expect(screen.getByText("Rahul")).toBeInTheDocument()
    expect(screen.getByText("Priya")).toBeInTheDocument()
    expect(screen.getByText("Amit")).toBeInTheDocument()
  })

  test("renders correct number of intern cards", () => {
    render(<InternListWithCallback />)

    const buttons = screen.getAllByRole("button", {
      name: "Remove",
    })

    expect(buttons).toHaveLength(3)
  })

  test("calls removeIntern with correct id", async () => {
    const user = userEvent.setup()

    render(<InternListWithCallback />)

    const buttons = screen.getAllByRole("button", {
      name: "Remove",
    })

    await user.click(buttons[0])

    expect(mockRemoveIntern).toHaveBeenCalledTimes(1)
    expect(mockRemoveIntern).toHaveBeenCalledWith(1)
  })
})