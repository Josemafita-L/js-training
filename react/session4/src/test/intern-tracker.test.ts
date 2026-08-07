import { describe, it, expect } from "vitest";
import { InternTracker } from "../services";
describe("InternTracker.updateScore", () => {
  it("throws RangeError if score is out of 0–100 range", () => {
    const tracker = new InternTracker();

    expect(() => tracker.updateScore(1, -10)).toThrow(RangeError);

    expect(() => tracker.updateScore(1, 101)).toThrow(RangeError);
  });

  it("throws if the intern does not exist", () => {
    const tracker = new InternTracker();

    expect(() => tracker.updateScore(999, 80)).toThrow(
      "Intern not found"
    );
  });

  it("updates the score without exposing internal state", async () => {
    const tracker = new InternTracker();

    await tracker.loadAll();

    tracker.updateScore(1, 95);

    expect(tracker.getById(1)?.score).toBe(95);
  });
});