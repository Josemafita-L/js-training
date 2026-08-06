# Refactoring Audit

## Refactoring Priority List

1. Mixed Responsibilities in `src/contexts/intern-context.tsx` — The Context Provider manages state, validation, data loading, ID generation, and repository updates. Separating these responsibilities will improve readability, maintainability, and testability.

2. Conditional Complexity in `src/hooks/useInternForm.ts` — The nested ternary operator in `handleChange()` makes the value conversion logic difficult to understand. Extracting it into a helper function will improve readability.

3. Magic Numbers in `src/utils/intern-validation.ts` — The hardcoded score limits (`0` and `100`) hide business rules. Replacing them with named constants will make the validation easier to understand and maintain.

## Full Refactoring Log — useInternForm.ts

Step 1: Renamed the filter callback variable `i` to `intern` in `useInternSearch.ts` → tests green

Step 2: Extracted the magic numbers `0` and `100` into `MIN_SCORE` and `MAX_SCORE` constants in `intern-validation.ts` → tests green

Step 3: Extracted the statistics calculation into `calculateInternStats()` to separate responsibilities from `useInternSearch.ts` → tests green

Step 4: Replaced duplicated test object creation with a `makeIntern()` factory in `intern-utils.test.ts` → tests green

Final: 4 refactoring changes completed with tests passing after each change.

### Task 6.1 Comment

I performed four separate test runs during the refactoring process.
Each refactoring change was followed by `npm run test:run` to ensure
that the application behaviour remained unchanged.

No refactoring step caused the tests to fail, so no changes needed
to be undone. Running the tests after every small change provided
confidence that the refactoring was safe.

### Task 6.2 Comment

Coverage increased after the refactoring because the extracted
pure functions could be tested directly without rendering React
hooks. This made it easier to write focused unit tests for edge
cases that were previously hidden inside larger functions.