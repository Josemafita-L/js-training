import { describe, it, expect } from "vitest";

import {
  createIntern,
  validateInternForm,
  calculateAverageScore,
  getScoreLabel,
  filterInterns,
} from "../services/intern-service";

import type { InternFormState, Intern } from "../types/intern";

it("generates an id", () => {
  const form: InternFormState = {
    name: "Rahul",
    score: 80,
    isPresent: true,
    role: "Frontend",
  };

  const intern = createIntern(form, () => 100);

  expect(intern.id).toBe(100);
});
it("trims the name", () => {
  const form: InternFormState = {
    name: "   Rahul   ",
    score: 80,
    isPresent: true,
    role: "Frontend",
  };

  const intern = createIntern(form, () => 1);

  expect(intern.name).toBe("Rahul");
});
it("rounds the score", () => {
  const form: InternFormState = {
    name: "Rahul",
    score: 89.6,
    isPresent: true,
    role: "Frontend",
  };

  const intern = createIntern(form, () => 1);

  expect(intern.score).toBe(90);
});
it("returns error for empty name", () => {
  const form: InternFormState = {
    name: "",
    score: 80,
    isPresent: true,
    role: "Frontend",
  };

  expect(validateInternForm(form)).not.toBeNull();
});
it("returns error when score is greater than 100", () => {
  const form: InternFormState = {
    name: "Rahul",
    score: 110,
    isPresent: true,
    role: "Frontend",
  };

  expect(validateInternForm(form)).not.toBeNull();
});
it("returns null for a valid form", () => {
  const form: InternFormState = {
    name: "Rahul",
    score: 90,
    isPresent: true,
    role: "Frontend",
  };

  expect(validateInternForm(form)).toBeNull();
});
it("returns 0 for an empty list", () => {
  expect(calculateAverageScore([])).toBe(0);
});
it("returns the correct average", () => {
  const interns: Intern[] = [
    {
      id: 1,
      name: "Rahul",
      score: 80,
      isPresent: true,
      role: "Frontend",
    },
    {
      id: 2,
      name: "Priya",
      score: 100,
      isPresent: true,
      role: "Backend",
    },
  ];

  expect(calculateAverageScore(interns)).toBe(90);
});
it("rounds the average correctly", () => {
  const interns: Intern[] = [
    {
      id: 1,
      name: "Rahul",
      score: 80,
      isPresent: true,
      role: "Frontend",
    },
    {
      id: 2,
      name: "Priya",
      score: 81,
      isPresent: true,
      role: "Backend",
    },
  ];

  expect(calculateAverageScore(interns)).toBe(81);
});
it("returns Pass for 50", () => {
  expect(getScoreLabel(50)).toBe("Pass");
});

it("returns Fail for 49", () => {
  expect(getScoreLabel(49)).toBe("Fail");
});

it("returns Pass for 100", () => {
  expect(getScoreLabel(100)).toBe("Pass");
});
const interns: Intern[] = [
  {
    id: 1,
    name: "Rahul",
    score: 90,
    isPresent: true,
    role: "Frontend",
  },
  {
    id: 2,
    name: "Priya",
    score: 80,
    isPresent: true,
    role: "Backend",
  },
];
it("returns all interns when query is empty", () => {
  expect(filterInterns(interns, "")).toHaveLength(2);
});
it("matches by name", () => {
  expect(filterInterns(interns, "rahul")).toHaveLength(1);
});
it("matches by role", () => {
  expect(filterInterns(interns, "backend")).toHaveLength(1);
});
it("is case insensitive", () => {
  expect(filterInterns(interns, "FRONTEND")).toHaveLength(1);
});
