// Silent Failure Audit — intern-service.ts
//
// Pattern 1: validateInternForm() returns null when validation succeeds.
// This is acceptable for expected user validation but relies on callers
// checking the return value.
//
// Pattern 2: None found (no silent default values masking errors)
//
// Pattern 3: None found (no swallowed exceptions)
//
// Pattern 4: None found (no empty collections returned because of errors)
//
// Pattern 5: Missing precondition validation.
// Functions assume callers provide valid input types before processing.

import type { Intern, InternFormState } from "../types/intern";
export function createIntern(
  form: InternFormState,
  generateId: () => number = Date.now
): Intern {

  // Guard clauses
  if (!form.name || typeof form.name !== "string") {
    throw new Error(
      `createIntern: expected a non-empty string for name, got: ${JSON.stringify(form.name)}`
    );
  }

  if (
    typeof form.score !== "number" ||
    form.score < 0 ||
    form.score > 100
  ) {
    throw new Error(
      `createIntern: expected score between 0 and 100, got: ${form.score}`
  )}

  return {
    id: generateId(),
    name: form.name.trim(),
    score: Math.round(form.score),
    isPresent: form.isPresent,
    role: form.role,
  };
}
export function validateInternForm(
  form: InternFormState
): string | null {

  // 1. Null / undefined check
  if (!form.name) {
    return "Name is required";
  }

  // 2. Type check
  if (typeof form.name !== "string") {
    return "Name must be a string";
  }

  // 3. Format check
  if (!form.name.trim()) {
    return "Name is required";
  }

  // 4. Range check
  if (
    typeof form.score !== "number" ||
    form.score < 0 ||
    form.score > 100
  ) {
    return "Score must be between 0 and 100";
  }

  return null;
}
export function calculateAverageScore(interns: Intern[]): number {
  if (interns.length === 0) {
    return 0;
  }

  const total = interns.reduce((sum, intern) => sum + intern.score, 0);

  return Math.round(total / interns.length);
}
export function getScoreLabel(
  score: number
): "Pass" | "Fail" {
  return score >= 50 ? "Pass" : "Fail";
}
export function filterInterns(
  interns: Intern[],
  query: string
): Intern[] {
  if (!query.trim()) {
    return interns;
  }

  const search = query.toLowerCase();

  return interns.filter(
    intern =>
      intern.name.toLowerCase().includes(search) ||
      intern.role.toLowerCase().includes(search)
  );
}

// Guard Clause Reflection:
//
// Before:
// createIntern() performed transformations like trim()
// and Math.round() before validating input.
//
// Risk:
// Invalid input could cause unclear runtime errors.
//
// After:
// Validation runs first, so invalid data fails immediately
// with a meaningful error message.




// Audit Summary
//
// Highest-risk pattern:
// Missing precondition validation in createIntern()
// and validateInternForm().
//
// Why?
// Invalid input types would produce generic runtime errors
// instead of clear fail-fast messages identifying
// the actual problem.