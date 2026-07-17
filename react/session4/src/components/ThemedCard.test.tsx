import { render, screen } from "../test/test-utils"
import ThemedCard from "./ThemedCard"

// We import render from test-utils instead of directly from
// @testing-library/react because test-utils automatically wraps
// components with ThemeProvider, allowing components that use
// useTheme() to work correctly in tests.
test("renders intern name", () => {
  render(
    <ThemedCard
      name="Rahul"
      score={92}
    />
  )

  expect(
    screen.getByText("Rahul")
  ).toBeInTheDocument()
})

test("renders score", () => {
  render(
    <ThemedCard
      name="Rahul"
      score={92}
    />
  )

  expect(
    screen.getByText("Score: 92")
  ).toBeInTheDocument()
})

test("shows Pass when score is 50 or above", () => {
  render(
    <ThemedCard
      name="Rahul"
      score={92}
    />
  )

  expect(
    screen.getByText("Pass")
  ).toBeInTheDocument()
})

test("shows Fail when score is below 50", () => {
  render(
    <ThemedCard
      name="Amit"
      score={40}
    />
  )

  expect(
    screen.getByText("Fail")
  ).toBeInTheDocument()
})

// getBy throws an error if an element is not found.
// queryBy returns null instead of throwing, making it the
// correct choice when verifying that an element is absent.
test("does not show Fail when score is passing", () => {
  render(
    <ThemedCard
      name="Rahul"
      score={92}
    />
  )

  expect(
    screen.queryByText("Fail")
  ).not.toBeInTheDocument()
})

test("does not show Pass when score is failing", () => {
  render(
    <ThemedCard
      name="Amit"
      score={20}
    />
  )

  expect(
    screen.queryByText("Pass")
  ).not.toBeInTheDocument()
})

test("renders score 0 correctly", () => {
  render(
    <ThemedCard
      name="Neha"
      score={0}
    />
  )

  expect(
    screen.getByText("Score: 0")
  ).toBeInTheDocument()

  expect(
    screen.getByText("Fail")
  ).toBeInTheDocument()
})

test("renders score 100 correctly", () => {
  render(
    <ThemedCard
      name="Neha"
      score={100}
    />
  )

  expect(
    screen.getByText("Score: 100")
  ).toBeInTheDocument()

  expect(
    screen.getByText("Pass")
  ).toBeInTheDocument()
})