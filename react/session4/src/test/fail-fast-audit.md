# Silent Failure Priority List

1. Missing precondition validation in `src/services/intern-service.ts`
   - Risk: Invalid input types can cause generic runtime errors instead of meaningful fail-fast errors.

2. Missing validation at the data boundary in `src/contexts/intern-context.tsx`
   - Risk: Malformed external data could be stored in application state before being detected.

3. `handleSubmit()` in `src/hooks/useInternForm.ts` returns `false` on validation failure.
   - Risk: Callers may ignore the return value and incorrectly assume the submission succeeded.

## Exception Handling Audit

No swallowed exceptions were found in the intern-dashboard.

The current codebase does not contain try/catch blocks
that hide failures by only logging errors or returning
undefined.

Future asynchronous operations should rethrow errors
with meaningful context to maintain fail-fast behavior.

## Task 2.2 Reflection

No swallowed exception was found.

Therefore, no caller was receiving an undefined return
from a failed operation.

If such a pattern existed, the caller could either crash later when using undefined data or silently display missing data, making the original failure difficult to diagnose.

## Guard Clause Order — validateInternForm

Before:

1. name.trim() validation
2. score range validation

After:

1. null/undefined check
2. type check
3. name format check
4. score range check

Reason for reordering:

The original function attempted to process the name value
before confirming that the input was valid.

Moving guards to the top ensures invalid data fails
immediately and prevents unnecessary work.

## Error Message Audit

| File                 | Current message                                                   | Answers all 3 questions? | Improved message                                                                        |
| -------------------- | ----------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------- |
| intern-context.tsx   | useInterns must be used inside InternProvider                     | Partially                | useInterns: expected to be called inside `<InternProvider>`, but no provider was found. |
| intern-repository.ts | removeIntern: no intern found with id=${id}                       | Yes                      | No change required                                                                      |
| intern-service.ts    | createIntern: name is required, got: ${form.name}                 | Yes                      | No change required                                                                      |
| intern-service.ts    | createIntern: score must be between 0 and 100, got: ${form.score} | Yes                      | No change required                                                                      |

## Task 4.2 Reflection

Improving the error messages did not require changing the function
signatures because the invalid values were already available within
the functions.

Including the received value makes debugging easier because the error
message immediately shows what caused the failure.

## 2am Test — removeIntern

Error message:
"removeIntern: no intern found with id=999"

What I know from this message alone:

- Which function failed: removeIntern
- What was expected: An existing intern ID
- What was actually received: 999

What I would do next:

- Check where id 999 originated.
- Verify whether the caller passed an incorrect ID.
- Check whether the intern was already deleted.

Would the original message
"Intern not found"
have been enough?

No.

It would not identify which function failed or which ID caused the
failure, making debugging slower.

## Assertion Helper

The assert helper provides a reusable way to enforce
programming assumptions.

Instead of allowing invalid program state to continue,
it throws immediately with a clear message, making bugs
easier to detect during development and testing.

## Precondition Assertions

The assertion checks verify programmer assumptions before
any business validation begins.

If a programmer passes values of the wrong type, the
assertion throws immediately because the function has been
used incorrectly.

The validation logic checks user input and returns friendly
validation messages instead of throwing, allowing the user
to correct their input.

## Postcondition Assertion

The postcondition verifies that `filterInterns`
returns an array before the value leaves the function.

In this case the assertion is mostly documentation because
JavaScript guarantees that `Array.filter()` returns an array.

However, postconditions become valuable when functions perform
complex calculations or transformations where incorrect results
are possible. They help detect bugs immediately instead of
allowing invalid data to spread through the application.

## Configuration Check

The configuration validation runs when `config.ts` is imported during application startup.

Running the check at import time follows the Fail Fast principle because configuration problems are detected immediately before the application begins executing.

If the configuration were checked only when first used, the application could run for some time before failing, making the error harder to diagnose.
