import { describe, expect, test } from "vitest"
import { filterInterns } from "../utils/intern-utils"

const interns = [
  {
    id: 1,
    name: "Rahul",
    score: 95,
    role: "Frontend",
    isPresent: true,
  },
  {
    id: 2,
    name: "Priya",
    score: 88,
    role: "Backend",
    isPresent: true,
  },
  {
    id: 3,
    name: "John",
    score: 75,
    role: "Frontend",
    isPresent: false,
  },
]

describe("filterInterns", () => {
  test("returns all interns when search term is empty", () => {
    expect(filterInterns(interns, "")).toEqual(interns)
  })

  test("returns interns matching name (case-insensitive)", () => {
    expect(filterInterns(interns, "rah")).toEqual([interns[0]])
  })

  test("returns interns matching role (case-insensitive)", () => {
    expect(filterInterns(interns, "backend")).toEqual([interns[1]])
  })

  test("returns empty array when no intern matches", () => {
    expect(filterInterns(interns, "manager")).toEqual([])
  })

  test("returns interns matching either name or role", () => {
    expect(filterInterns(interns, "frontend")).toEqual([
      interns[0],
      interns[2],
    ])
  })
})