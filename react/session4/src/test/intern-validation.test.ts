import { describe, expect, test } from "vitest"
import { validateInternForm } from "../utils/intern-validation"

describe("validateInternForm", () => {
  test("returns 'Name is required' when name is empty", () => {
    expect(validateInternForm("", 90)).toBe("Name is required")
  })

  test("returns 'Name is required' when name is only whitespace", () => {
    expect(validateInternForm("   ", 90)).toBe("Name is required")
  })

  test("returns score error when score is greater than 100", () => {
    expect(validateInternForm("Rahul", 101)).toBe(
      "Score must be between 0 and 100"
    )
  })

  test("returns score error when score is less than 0", () => {
    expect(validateInternForm("Rahul", -1)).toBe(
      "Score must be between 0 and 100"
    )
  })

  test("returns null for a valid intern", () => {
    expect(validateInternForm("Rahul", 92)).toBeNull()
  })

  test("accepts score 0", () => {
    expect(validateInternForm("Rahul", 0)).toBeNull()
  })

  test("accepts score 100", () => {
    expect(validateInternForm("Rahul", 100)).toBeNull()
  })
})
/*
Arrange Phase Observation:

Each test only required a single function call with the required inputs.
No React components, hooks, providers, or mocks were needed.

Compared to testing the validation through useInternForm with renderHook,
these tests require much less setup and are easier to read, maintain,
and execute because validateInternForm is a pure function.
*/


/*
Task 3.2 Comment

Each test required only one line of Arrange because validateInternForm() is a pure function that accepts simple input values and returns a predictable result.
Compared to testing the same validation through useInternForm with renderHook, these tests are much simpler because they do not require rendering a hook, setting up React state, or mocking dependencies.
Testing the extracted function is faster, easier to understand, and focuses only on the validation logic.
*/