# Silent Failure Priority List

1. Missing precondition validation in `src/services/intern-service.ts`
   - Risk: Invalid input types can cause generic runtime errors instead of meaningful fail-fast errors.

2. Missing validation at the data boundary in `src/contexts/intern-context.tsx`
   - Risk: Malformed external data could be stored in application state before being detected.

3. `handleSubmit()` in `src/hooks/useInternForm.ts` returns `false` on validation failure.
   - Risk: Callers may ignore the return value and incorrectly assume the submission succeeded.
