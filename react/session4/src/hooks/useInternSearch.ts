// Code Smell Audit — useInternSearch.ts
//
// Smell 1: Mixed Responsibilities — The hook manages search state while also calculating dashboard statistics.
// Smell 2: Complex Calculation — The average score calculation inside useMemo() reduces readability and could be extracted into a utility function.
// Smell 3: Anonymous Callback Functions — Inline filter() and reduce() callbacks make the statistics calculation harder to scan and reuse.


// Silent Failure Audit — useInternSearch.ts
//
// Pattern 1: None found (no null/undefined error returns)
// Pattern 2: None found (no silent defaults masking errors)
// Pattern 3: None found (no swallowed exceptions)
// Pattern 4: None found (no empty collections returned on failure)
// Pattern 5: None found (hook assumes a valid interns array)


// Testability Audit — useInternSearch.ts
//
// Q1. Predictable output?
// YES — Given the same interns and search text, it always returns the same filtered list.
//
// Q2. Can it run without external dependencies?
// YES — It does not require a server, database, browser API, or timer.
//
// Q3. Can dependencies be replaced?
// YES — Interns are passed as a parameter, making the filtering logic reusable.
//
// Verdict:
// HIGHLY TESTABLE
import { useMemo, useState } from "react"
import { filterInterns } from "../utils/intern-utils"
import { calculateInternStats } from "../utils/intern-stats";
interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface UseInternSearchReturn {
  search: string
  setSearch: (value: string) => void
  filtered: Intern[]
  stats: {
    total: number
    present: number
    avg: number
  }
}

function useInternSearch(
  interns: Intern[]
): UseInternSearchReturn {
  const [search, setSearch] = useState("")

  /*
  Explore Finding:

  Without useMemo, the filtering logic runs on every render,
  even if the interns list and search text have not changed.
  Adding useMemo caches the previous result and recalculates
  only when interns or search changes, reducing unnecessary work.
  */

  const filtered = useMemo(() => {
  return filterInterns(interns, search)
}, [interns, search])
  const stats = useMemo(() => {
  return calculateInternStats(interns);
}, [interns]);

  return {
    search,
    setSearch,
    filtered,
    stats,
  }
}

export default useInternSearch

// Job:
// This hook manages searching interns.

// Concerns mixed:
// - Search input state
// - Filtering interns



// Audit Summary
//
// Highest-risk assumption:
// The hook assumes the interns parameter is always a valid array.
//
// Why?
// If an invalid value is passed,
// filterInterns() will fail.
// A precondition assertion could make this fail earlier
// with a clearer error message.


// Refactoring Priority:
// I would first extract the statistics calculation into a separate utility function because it simplifies the hook, improves readability, and allows the calculation to be tested independently.

// Rename Refactoring
//
// Old name: i
// New name: intern
//
// The new name clearly indicates that each item represents an Intern object, making the filtering logic easier to understand without tracing the code.


/*
Task 3.3 Comment

Before refactoring, the original code performed two responsibilities: managing the search state and calculating dashboard statistics.
After extraction, useInternSearch() manages the search state, while calculateInternStats() is responsible only for calculating the statistics. This improves readability, reusability, and makes the statistics calculation easier to test independently.
*/