import { assert } from "./assert";
interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

export function filterInterns(
  interns: Intern[],
  query: string
): Intern[] {

  if (!query.trim()) {
    return interns;
  }

  const search = query.toLowerCase();

  const result = interns.filter(
    intern =>
      intern.name.toLowerCase().includes(search) ||
      intern.role.toLowerCase().includes(search)
  );

  assert(
    Array.isArray(result),
    "filterInterns: expected filter() to return an array"
  );

  return result;
}