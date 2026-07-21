import { expect, test, vi } from 'vitest'

test('loads interns from mocked API', async () => {
  const mockInterns = [
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Priya' },
    { id: 3, name: 'Amit' },
    { id: 4, name: 'Sneha' },
  ]

  global.fetch = vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue(mockInterns),
  } as Response)

  const response = await fetch('http://localhost:5173/api/interns')
  const data = await response.json()

  expect(data).toHaveLength(4)
})