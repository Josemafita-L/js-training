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
    const { result } = renderHook(() => useInternForm())

    act(() => {
      result.current.isValid()
    })

    expect(result.current.error).toBe("Name is required")
  })

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

    expect(result.current.isValid()).toBe(true)
    expect(result.current.error).toBe("")
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