// Code Smell Audit
// Smell 1: Mixed Responsibilities — This hook manages form state, validation, submission, and form reset instead of focusing on one responsibility.
// Smell 2: Conditional Complexity — handleChange() contains nested ternary operators, making the logic harder to read.
// Smell 3: Hardcoded Values — The initial role "Frontend" and score 0 are hardcoded instead of using named constants.



// Silent Failure Audit — useInternForm.ts

// Pattern 1: None found (no null/undefined error returns)
// Pattern 2: None found (no silent default values using || or ??)
// Pattern 3: None found (no swallowed exceptions)
// Pattern 4: None found (no empty collections returned on failure)
// Pattern 5: handleSubmit() returns false when validation fails.
// This is acceptable for expected form validation but requires callers to check the returned boolean.



// Testability Audit — useInternForm.ts
//
// Q1. Predictable output?
// PARTIALLY — Validation is predictable, but the hook manages React state,
// so the output depends on the current state.
//
// Q2. Can it run without external dependencies?
// YES — It does not use a server, database, timer, or API.
//
// Q3. Can dependencies be replaced?
// NO — The validation logic is tightly coupled to the hook's internal state.
//
// Verdict:
// MODERATELY TESTABLE
import { ChangeEvent, useState } from "react"
import { validateInternForm } from "../services/intern-service"
interface InternFormState {
  name: string
  score: number
  isPresent: boolean
  role: string
}

interface UseInternFormReturn {
  form: InternFormState;
  error: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleReset: () => void;
  handleSubmit: () => boolean;
  isValid: () => boolean;
}

const initialForm: InternFormState = {
  name: "",
  score: 0,
  isPresent: true,
  role: "Frontend",
}

function useInternForm(
  addIntern: (intern: InternFormState) => void
) {
  const [form, setForm] = useState<InternFormState>(initialForm)
  const [error, setError] = useState<string>("")

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value, type } = e.target

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "score"
          ? Number(value)
          : value,
    }))
  }

  function handleReset(): void {
    setForm(initialForm)
    setError("")
  }
  function handleSubmit(): boolean {
  if (!isValid()) {
    return false;
  }

  addIntern(form);
  handleReset();

  return true;
}

  function isValid(): boolean {
  const validationError = validateInternForm(form);

  if (validationError) {
    setError(validationError);
    return false;
  }

  setError("");
  return true;
}

  return {
    form,
    error,
    handleChange,
    handleReset,
    handleSubmit,
    isValid,
  }
}

export default useInternForm
/*
Why define a return type interface?

The UseInternFormReturn interface clearly defines everything
the custom hook returns. This improves type safety,
provides better IntelliSense and autocomplete,
makes the hook easier to understand and maintain,
and ensures components use the returned values correctly.
*/
// Job:
// This hook manages the Add Intern form.

// Concerns mixed:
// - Form state
// - Validation
// - Calling addIntern
// - Resetting the form


// Audit Summary
//
// Highest-risk pattern:
// handleSubmit() returns false instead of throwing.
//
// Why?
// If a caller ignores the boolean result,
// they may assume the submission succeeded.
// In this hook it is acceptable because
// validation failures are expected user input errors,
// not unexpected application failures.



// Refactoring Priority:
// I would first simplify handleChange() because the nested ternary operator is the hardest part of the hook to read. Extracting the value conversion into a helper function would improve readability without changing behavior.