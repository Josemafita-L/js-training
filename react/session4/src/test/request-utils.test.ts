import { describe, expect, test } from "vitest"
import { prepareInternPayload } from "../utils/request-utils"

describe("prepareInternPayload", () => {
  test("returns JSON string", () => {
    const payload = prepareInternPayload({
      name: "Rahul",
      score: 90,
      role: "Frontend",
      isPresent: true,
    })

    expect(payload).toBe(
      JSON.stringify({
        name: "Rahul",
        score: 90,
        role: "Frontend",
        isPresent: true,
      })
    )
  })
})