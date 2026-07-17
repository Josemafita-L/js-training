import { render, screen } from "../test/test-utils"
import { vi } from "vitest"
import InternListWithCallback from "./InternListWithCallback"


/*
vi.mock() replaces a real module with a controlled fake version.

Here we mock the intern-context because we do not want this test
to depend on:
- InternProvider
- initial async loading
- real context state

Mocking allows us to control exactly what data the component receives.

Rule: "Mock as little as possible."

Mock your own code when:
- The dependency is external or slow.
- The dependency performs API calls.
- The dependency creates unpredictable behaviour.

Let your own components and logic run normally when possible,
because mocking everything can hide real bugs.
*/
vi.mock("../contexts/intern-context", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../contexts/intern-context")>()

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

      removeIntern: vi.fn(),
    }),
  }
})


test("renders all interns from context", () => {

  render(
    <InternListWithCallback />
  )


  expect(
    screen.getByText("Rahul")
  ).toBeInTheDocument()


  expect(
    screen.getByText("Priya")
  ).toBeInTheDocument()


  expect(
    screen.getByText("Amit")
  ).toBeInTheDocument()
})


test("renders correct number of intern cards", () => {

  render(
    <InternListWithCallback />
  )


  const removeButtons =
    screen.getAllByRole(
      "button",
      {
        name: "Remove",
      }
    )


  expect(removeButtons)
    .toHaveLength(3)
})