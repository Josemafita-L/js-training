import { test } from 'vitest'

test('calculates average score', () => {
  const scores = [92, 78, 45, 95]

  const avg =
    scores.reduce((a, b) => a + b, 0) / scores.length

  console.log('Average:', avg)
})

/*
FIRST Principle Violated: Self-validating

Reason:
The test has no assertions.

It only prints the result to the console.

Even if the average calculation is wrong,
the test will still pass, making it dangerous because
bugs cannot be detected automatically.
*/