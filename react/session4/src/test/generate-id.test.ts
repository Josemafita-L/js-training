import { describe, expect, test } from "vitest"
import { generateInternId } from "../utils/generate-id"

describe("generateInternId", () => {
  test("returns predictable ID using injected dependencies", () => {
    const id = generateInternId(
      () => 1000,
      () => 0.5
    )

    expect(id).toBe("intern-1000-0.5")
  })

  test("returns identical IDs with same injected values", () => {
    const id1 = generateInternId(
      () => 1234,
      () => 0.25
    )

    const id2 = generateInternId(
      () => 1234,
      () => 0.25
    )

    expect(id1).toBe(id2)
  })
})