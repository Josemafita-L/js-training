// Code Smell Audit — intern-validation.ts
//
// Smell 1: Magic Numbers — The values 0 and 100 are hardcoded instead of using named constants.
// Smell 2: Hardcoded Error Messages — Validation messages are written directly in the function, making future changes or localization more difficult.
// Smell 3: Validation Rules Coupled to Implementation — Business rules are embedded inside the function instead of using reusable constants.

import { assert } from "./assert";
const MIN_SCORE = 0;
const MAX_SCORE = 100;

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

  if (score < MIN_SCORE || score > MAX_SCORE) {
  return "Score must be between 0 and 100";
}

  return null;
}

// Refactoring Priority:
//
// I would first extract the score limits into named constants because they represent business rules. This improves readability and ensures the same limits can be reused consistently throughout the application.

// Magic Number Refactoring
//
// The magic numbers 0 and 100 represent the minimum and maximum valid score allowed for an intern. Extracting them into MIN_SCORE and MAX_SCORE makes the business rule explicit, improves readability, and ensures the score limits can be updated in one place if the requirements change.

/*
Task 4.1 Comment

The valid score range was duplicated in multiple validation functions using the hardcoded values 0 and 100. I replaced the duplicated values with shared constants so the business rule is defined in one place.

Leaving the duplication could cause inconsistent behaviour if the valid score range changes in the future. Using shared constants makes the application easier to maintain because the score limits only need to be updated once.
*/