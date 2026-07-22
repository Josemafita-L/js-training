
import { test, expect } from 'vitest'

const interns: { id: number; name: string }[] = []

test('can add first intern', () => {
  interns.push({ id: 1, name: 'Rahul' })
  expect(interns).toHaveLength(1)
})

test('can add second intern', () => {
  interns.push({ id: 2, name: 'Priya' })
  expect(interns).toHaveLength(2)
})

/*
FIRST Principle Violated: Independent

Reason:
The second test depends on state created by the first test.
Both tests share the same interns array.

If you run only the second test using:
npx vitest run src/test/violations/violation-1.test.ts --reporter verbose

the array starts empty.
After pushing Priya, the length becomes 1 instead of 2,
so the test fails.
*/