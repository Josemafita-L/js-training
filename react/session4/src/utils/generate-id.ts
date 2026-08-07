
//task 4.1
/*
snippet A
Pattern:
Hard-coded dependency

FIRST Principle Violated:
Repeatable

Fix:
Inject the time source and random source instead of calling
Date.now() and Math.random() directly.

snippet B
Pattern:
Hard-coded dependency

FIRST Principle Violated:
Independent

Fix:
Inject the analytics client so tests can replace it with a fake implementation.

Snippet C
Pattern:
Does too many things and has side effects

FIRST Principle Violated:
Independent

Fix:
Extract request preparation into a pure function.
Inject fetch.
Keep navigation and localStorage in the caller.

SnippetD
Pattern:
Global mutable state

FIRST Principle Violated:
Independent

Fix:
Remove the module-level variable.
Pass the log as a parameter and return a new array.
*/

export function generateInternId(
  now: () => number = Date.now,
  random: () => number = Math.random
): string {
  return `intern-${now()}-${random()}`
}