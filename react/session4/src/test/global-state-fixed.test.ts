import { test, expect } from "vitest"

// Pure function - does not modify the original cart
function addItem(cart: string[], item: string): string[] {
  return [...cart, item]
}

// Pure function - returns a new cart without the item
function removeItem(cart: string[], item: string): string[] {
  return cart.filter((i) => i !== item)
}

test("cart starts empty", () => {
  const cart: string[] = []

  expect(cart).toHaveLength(0)
})

test("can add an item", () => {
  const cart: string[] = []

  const result = addItem(cart, "Rahul")

  expect(result).toHaveLength(1)
  expect(result).toEqual(["Rahul"])

  // Original cart remains unchanged
  expect(cart).toHaveLength(0)
})

test("can add two items", () => {
  const cart: string[] = []

  const cartWithOne = addItem(cart, "Rahul")
  const cartWithTwo = addItem(cartWithOne, "Priya")

  expect(cartWithTwo).toHaveLength(2)
  expect(cartWithTwo).toEqual(["Rahul", "Priya"])

  // Original cart is still unchanged
  expect(cart).toHaveLength(0)
})

test("can remove an item", () => {
  const cart = ["Rahul", "Priya"]

  const result = removeItem(cart, "Rahul")

  expect(result).toEqual(["Priya"])

  // Original cart is still unchanged
  expect(cart).toEqual(["Rahul", "Priya"])
})

test("cart is empty again", () => {
  const cart: string[] = []

  expect(cart).toHaveLength(0)
})
/*
FIRST Principles satisfied:

1. Independent
   - Each test creates its own cart, so no test affects another.

2. Repeatable
   - Running the tests in any order always produces the same result.

3. Fast
   - The functions run entirely in memory without external dependencies.

4. Self-validating
   - The assertions automatically determine whether the tests pass or fail.

The functions are now pure because they depend only on their inputs
and return new arrays instead of modifying shared global state.
*/