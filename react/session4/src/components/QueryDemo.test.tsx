import { render, screen } from "../test/test-utils"
import ThemedCard from "./ThemedCard"


/*
getBy:
Used when the element must exist.
Throws an error if it is not found.

queryBy:
Used when checking that an element is absent.
Returns null instead of throwing an error.

getAllBy:
Returns all matching elements as an array.
Useful when multiple elements are expected.
*/

test("getByText finds the intern name", () => {
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

test("queryByText returns null when text is missing", () => {
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

test("getAllByText finds multiple Pass labels", () => {
  render(
    <>
      <ThemedCard
        name="Rahul"
        score={92}
      />

      <ThemedCard
        name="Priya"
        score={78}
      />
    </>
  )

  const passLabels =
    screen.getAllByText("Pass")

  expect(passLabels).toHaveLength(2)
})