import { describe, expect, test } from "vitest"
import { filterInterns } from "../utils/intern-utils"

const makeIntern = (overrides = {}) => ({
  id: 1,
  name: "Rahul",
  score: 95,
  role: "Frontend",
  isPresent: true,
  ...overrides,
});

const interns = [
  makeIntern(),
  makeIntern({
    id: 2,
    name: "Priya",
    score: 88,
    role: "Backend",
  }),
  makeIntern({
    id: 3,
    name: "John",
    score: 75,
    isPresent: false,
  }),
];

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

/*
Task 4.2 Comment

Three test objects shared the same structure, with only a few properties differing between them. Introducing a makeIntern() factory removed the repeated object setup.
The test factory makes the tests easier to read because each test only specifies the properties that are relevant, while the common defaults are defined in one place. It also makes future updates easier because changes to the default Intern object only need to be made once.
*/

/*
Task 5.1 Comment

I reviewed the project for nested if/else statements but did not find any functions with two or more levels of nesting.
Most validation logic already uses guard clauses or early returns from previous refactoring work.
Therefore, no additional guard clause refactoring was required.
*/

/*
Task 5.2 Comment

I searched the project for long if/else chains but did not find any suitable candidates. The existing code does not use large conditional chains, so no lookup object refactoring was required.
If a role-mapping function is added in the future, using a lookup object would be a better approach because new roles can be added by inserting a new entry instead of modifying multiple conditional statements.
*/