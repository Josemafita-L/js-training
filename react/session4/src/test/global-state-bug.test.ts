import { test, expect } from 'vitest'

// Global mutable state — the bug
const cart: string[] = []

function addItem(item: string) {
  cart.push(item)
  return cart
}

function removeItem(item: string) {
  const index = cart.indexOf(item)
  if (index > -1) cart.splice(index, 1)
  return cart
}

test('cart starts empty', () => {
  expect(cart).toHaveLength(0)
})

test('can add an item', () => {
  const result = addItem('Rahul')
  expect(result).toHaveLength(1)
})

test('can add two items', () => {
  addItem('Rahul')
  addItem('Priya')
  expect(cart).toHaveLength(2)
})

test('cart is empty again', () => {
  expect(cart).toHaveLength(0)   // FAILS — previous tests left items behind
})