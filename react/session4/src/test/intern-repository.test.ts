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
it("does nothing when removing a non-existent id", () => {
  const { result } = renderHook(() => useInternRepository());

  act(() => {
    result.current.add(RAHUL);
    result.current.remove(999);
  });

  expect(result.current.interns).toEqual([RAHUL]);
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
