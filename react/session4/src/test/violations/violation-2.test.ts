import { test, expect } from 'vitest'

test("score report has today's date", () => {
  const report = {
    date: new Date().toISOString().slice(0, 10),
  }

  expect(report.date).toBe('2026-07-18')
})



/*
FIRST Principle Violated: Repeatable

Reason:
The test depends on the current system date.
It will only pass on 2024-11-15.

The next day (2024-11-16) and every day after,
the expected value will no longer match,
causing the test to fail.
*/