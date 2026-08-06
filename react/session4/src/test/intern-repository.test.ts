import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useInternRepository } from "../repositories/intern-repository";
import type { Intern } from "../types/intern";

const RAHUL: Intern = {
  id: 1,
  name: "Rahul",
  score: 92,
  isPresent: true,
  role: "Frontend",
};

const PRIYA: Intern = {
  id: 2,
  name: "Priya",
  score: 78,
  isPresent: false,
  role: "Backend",
};
it("starts with an empty list", () => {
  const { result } = renderHook(() => useInternRepository());

  expect(result.current.interns).toEqual([]);
});
it("adds an intern", () => {
  const { result } = renderHook(() => useInternRepository());

  act(() => {
    result.current.add(RAHUL);
  });

  expect(result.current.interns).toEqual([RAHUL]);
});
it("adds two interns", () => {
  const { result } = renderHook(() => useInternRepository());

  act(() => {
    result.current.add(RAHUL);
    result.current.add(PRIYA);
  });

  expect(result.current.interns).toHaveLength(2);
});
it("removes an intern by id", () => {
  const { result } = renderHook(() => useInternRepository());

  act(() => {
    result.current.add(RAHUL);
    result.current.remove(1);
  });

  expect(result.current.interns).toEqual([]);
});
it("throws when removing a non-existent id", () => {
  const { result } = renderHook(() => useInternRepository());

  act(() => {
    result.current.add(RAHUL);
  });

  expect(() => {
    act(() => {
      result.current.remove(999);
    });
  }).toThrow(
    "removeIntern: no intern found with id=999"
  );
});
it("updates an existing intern", () => {
  const { result } = renderHook(() => useInternRepository());

  act(() => {
    result.current.add(RAHUL);

    result.current.update({
      ...RAHUL,
      score: 100,
    });
  });

  expect(result.current.interns[0].score).toBe(100);
});
it("updates only the matching intern", () => {
  const { result } = renderHook(() => useInternRepository());

  act(() => {
    result.current.add(RAHUL);
    result.current.add(PRIYA);

    result.current.update({
      ...RAHUL,
      score: 100,
    });
  });

  expect(result.current.interns[0].score).toBe(100);
  expect(result.current.interns[1]).toEqual(PRIYA);
});
// Task 2.1 Reflection:
//
// Number of null checks removed:
// 0
//
// Reason:
// The original remove() function did not return null or undefined.
// It silently ignored invalid IDs instead.
//
// Impact:
// No callers had null checks to remove, which shows that the failure
// was not being handled at all. The missing validation allowed invalid
// operations to continue silently.