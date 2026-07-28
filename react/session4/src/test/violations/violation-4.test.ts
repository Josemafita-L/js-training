import { test, expect } from 'vitest'

test.skip('loads interns from API', async () => {
  const response = await fetch('http://localhost:5173/api/interns')
  const data = await response.json()

  expect(data).toHaveLength(4)
})

/*
FIRST Principles Violated:

1. Fast
2. Repeatable

Reason:
The test depends on a real API running on localhost.

In CI or on another developer's machine,
the server may not be running.

Network delays, server downtime,
or changing API data can cause the test to fail,
making it both slow and non-repeatable.
*/