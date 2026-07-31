import { renderHook, act } from "@testing-library/react"
import useInternForm from "./useInternForm"

describe("useInternForm", () => {
  test("initializes with default form values", () => {
    const { result } = renderHook(() => useInternForm())

    expect(result.current.form).toEqual({
      name: "",
      score: 0,
      isPresent: true,
      role: "Frontend",
    })

    expect(result.current.error).toBe("")
  })

  test("updates name field", () => {
    expect.hasAssertions()
    const { result } = renderHook(() => useInternForm())

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Rahul",
          type: "text",
        },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.form.name).toBe("Rahul")
  })

  test("updates score field", () => {
    expect.hasAssertions()
    const { result } = renderHook(() => useInternForm())

    act(() => {
      result.current.handleChange({
        target: {
          name: "score",
          value: "95",
          type: "number",
        },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.form.score).toBe(95)
  })

  test("updates checkbox field", () => {
    const { result } = renderHook(() => useInternForm())

    act(() => {
      result.current.handleChange({
        target: {
          name: "isPresent",
          checked: false,
          type: "checkbox",
        },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.form.isPresent).toBe(false)
  })

  test("updates role field", () => {
    const { result } = renderHook(() => useInternForm())

    act(() => {
      result.current.handleChange({
        target: {
          name: "role",
          value: "Backend",
          type: "select-one",
        },
      } as React.ChangeEvent<HTMLSelectElement>)
    })

    expect(result.current.form.role).toBe("Backend")
  })

  test("fails validation when name is empty", () => {
  // Arrange
  const { result } = renderHook(() => useInternForm())

  // Act
  act(() => {
    result.current.isValid()
  })

  // Assert
  expect(result.current.error).toBe("Name is required")
})
/*
Arrange creates the hook with its initial state.
Act calls isValid() to perform validation.
Assert verifies that the expected validation error is produced.
Each phase is clearly separated.
*/

  test("fails validation when score is greater than 100", () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: {
        name: "name",
        value: "Rahul",
        type: "text",
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: {
        name: "score",
        value: "120",
        type: "number",
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.isValid()
  })

  expect(result.current.error).toBe(
    "Score must be between 0 and 100"
  )
})

  test("passes validation with valid data", () => {
    expect.hasAssertions()
    const { result } = renderHook(() => useInternForm())

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Rahul",
          type: "text",
        },
      } as React.ChangeEvent<HTMLInputElement>)

      result.current.handleChange({
        target: {
          name: "score",
          value: "90",
          type: "number",
        },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    let isValid = false

act(() => {
  isValid = result.current.isValid()
})

expect(isValid).toBe(true)
expect(result.current.error).toBe("")
/*
Improved Test:
The validation call is now wrapped in act() because
isValid() updates React state by calling setError().

This removes React warnings and better follows testing
best practices.
*/
  })

  test("reset restores initial form values", () => {
    const { result } = renderHook(() => useInternForm())

    act(() => {
      result.current.handleChange({
        target: {
          name: "name",
          value: "Rahul",
          type: "text",
        },
      } as React.ChangeEvent<HTMLInputElement>)

      result.current.handleReset()
    })

    expect(result.current.form).toEqual({
      name: "",
      score: 0,
      isPresent: true,
      role: "Frontend",
    })

    expect(result.current.error).toBe("")
  })
})

test("returns true when name is Sneha and score is 88", () => {
  // Arrange
  const { result } = renderHook(() => useInternForm())

  // Act
  act(() => {
    result.current.handleChange({
      target: {
        name: "name",
        value: "Sneha",
        type: "text",
      },
    } as React.ChangeEvent<HTMLInputElement>)

    result.current.handleChange({
      target: {
        name: "score",
        value: "88",
        type: "number",
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  const isValid = result.current.isValid()

  // Assert
  expect(isValid).toBe(true)
})

test("updates the name field when handleChange is called with a name event", () => {
  // Arrange
  const { result } = renderHook(() => useInternForm())

  // Act
  act(() => {
    result.current.handleChange({
      target: {
        name: "name",
        value: "Sneha",
        type: "text",
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  // Assert
  expect(result.current.form.name).toBe("Sneha")
})