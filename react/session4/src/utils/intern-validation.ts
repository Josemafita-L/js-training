import { assert } from "./assert";

export function validateInternForm(
  name: string,
  score: number
): string | null {

  // Preconditions
  assert(
    typeof name === "string",
    `validateInternForm: expected name to be a string, got: ${typeof name}`
  );

  assert(
    typeof score === "number",
    `validateInternForm: expected score to be a number, got: ${typeof score}`
  );

  // Business validation
  if (!name.trim()) {
    return "Name is required";
  }

  if (score < 0 || score > 100) {
    return "Score must be between 0 and 100";
  }

  return null;
}