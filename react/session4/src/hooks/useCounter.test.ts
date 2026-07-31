import { renderHook, act } from "@testing-library/react"
import useCounter from "./useCounter"

describe("useCounter", () => {
  test("starts with default value 0", () => {
    const { result } = renderHook(() => useCounter())

    expect(result.current.count).toBe(0)
  })

  test("starts with custom initial value", () => {
    const { result } = renderHook(() =>
      useCounter({
        initial: 10,
      })
    )

    expect(result.current.count).toBe(10)
  })

  test("increments by default step", () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  test("decrements by default step", () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.decrement()
    })

    expect(result.current.count).toBe(-1)
  })

  test("increments using custom step", () => {
    const { result } = renderHook(() =>
      useCounter({
        step: 5,
      })
    )

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(5)
  })

  test("decrements using custom step", () => {
    const { result } = renderHook(() =>
      useCounter({
        step: 5,
      })
    )

    act(() => {
      result.current.decrement()
    })

    expect(result.current.count).toBe(-5)
  })

  test("does not exceed maximum value", () => {
    const { result } = renderHook(() =>
      useCounter({
        initial: 9,
        max: 10,
      })
    )

    act(() => {
      result.current.increment()
      result.current.increment()
    })

    expect(result.current.count).toBe(10)
  })

  test("does not go below minimum value", () => {
    const { result } = renderHook(() =>
      useCounter({
        initial: 1,
        min: 0,
      })
    )

    act(() => {
      result.current.decrement()
      result.current.decrement()
    })

    expect(result.current.count).toBe(0)
  })

  test("reset restores initial value", () => {
    const { result } = renderHook(() =>
      useCounter({
        initial: 15,
      })
    )

    act(() => {
      result.current.increment()
      result.current.increment()
      result.current.reset()
    })

    expect(result.current.count).toBe(15)
  })
})