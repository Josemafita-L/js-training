# Section 1 — Spot the Violations

export class InternTracker {
// Violation: callers should not directly modify the intern list.
// Should be private (#interns).
interns: Intern[] = [];

// Violation: API URL is an implementation detail.
// Should be private (#apiUrl).
apiUrl: string = '/api/interns';

// Violation: cache timestamp is internal state.
// Should be private (#lastFetchedAt).
lastFetchedAt: Date = new Date(0);

// Violation: cache should never be visible outside.
// Should be private (#localCache).
\_localCache: Map<number, Intern> = new Map();

async loadAll(): Promise<void> {
...
}

// Internal helper.
// Should be private.
\_buildUrl(id: number): string {
...
}

// Internal helper.
// Should be private.
\_updateCache(intern: Intern): void {
...
}
}

// Implementation detail.
// Should not be exported.
export const API_KEY = 'intern-tracker-v1';

// Implementation detail.
// Should not be exported.
export const DEFAULT_LIMIT = 50;

## Question 1

**Which fields would a caller legitimately need to read? Which should never be visible?**

### Answer

**Callers should not read these fields directly:**

- `interns` → Should be private (`#interns`) because callers should not directly modify the intern list.
- `apiUrl` → Should be private (`#apiUrl`) because it is an implementation detail.
- `lastFetchedAt` → Should be private (`#lastFetchedAt`) because it is internal state used by the class.
- `_localCache` → Should be private (`#localCache`) because the cache is an internal implementation detail.

**Callers should access data only through the public interface:**

- `loadAll()`
- `getAll()`
- `getById(id)`

---

## Question 2

**Which methods are internal helpers that callers should never call directly?**

### Answer

The following methods are internal helper methods and should be private:

- `_buildUrl(id)` → Used only to build API URLs internally.
- `_updateCache(intern)` → Used only to update the internal cache.

These methods should be implemented as private methods (`#buildUrl()` and `#updateCache()`).

---

## Question 3

**Which module-level exports are implementation details that should not be exported?**

### Answer

The following exports are implementation details and should not be exported:

- `API_KEY`
- `DEFAULT_LIMIT`

Since they are only used internally by the module, removing the `export` keyword hides them from external callers.

---

## Question 4

**If you moved from a REST API to a local JSON file, which lines would change, and would any callers break?**

### Answer

Only the internal implementation of `loadAll()` would change.

For example:

**Before**

```ts
const res = await fetch(this.#apiUrl);
this.#interns = await res.json();
```

**After**

```ts
const data = await loadFromJsonFile();
this.#interns = data;
```

The public methods (`loadAll()`, `getAll()`, and `getById()`) remain the same.

No callers would break because they interact only with the public interface, not with the internal implementation.

---

# Section 2 — Refactor a Class

## Check 1

**Can you write `tracker.interns` from outside the class?**

**Answer:**

No. The `#interns` field is private, so attempting to access `tracker.interns` results in an error. The intern list can only be accessed through the public `getAll()` method.

---

## Check 2

**Can you write `tracker.apiUrl = '/fake'`?**

**Answer:**

No. The `#apiUrl` field is private and cannot be modified from outside the class. This prevents external code from changing the API endpoint.

---

## Explanation

The `InternTracker` class now follows encapsulation by:

- Making all internal fields private using the `#` syntax.
- Exposing only the required public methods:
  - `loadAll()`
  - `getAll()`
  - `getById(id)`
- Keeping helper methods (`#buildUrl()` and `#updateCache()`) private.
- Returning a `readonly Intern[]` from `getAll()` to prevent callers from modifying the internal array.
- Hiding implementation details such as the API URL, cache, and last fetched timestamp from external code.

# Section 3 — Add a Validated Setter

## Validation Rules

The `updateScore()` method validates input before updating an intern's score.

### Validation Performed

1. If the score is less than 0 or greater than 100, a `RangeError` is thrown.
2. If the specified intern does not exist, an `Error("Intern not found")` is thrown.
3. The score is updated only through the private `#interns` field.
4. Callers never access or modify the internal storage directly.

---

## Tests Written

### Test 1

**Purpose:** Verify that invalid scores are rejected.

**Expected Result:**

- `updateScore(1, -10)` throws `RangeError`.
- `updateScore(1, 101)` throws `RangeError`.

---

### Test 2

**Purpose:** Verify that updating a non-existent intern throws an error.

**Expected Result:**

Calling `updateScore(999, 80)` throws:

```text
Error: Intern not found
```

---

### Test 3

**Purpose:** Verify that the score is updated using only the public interface.

**Expected Result:**

- Call `updateScore(1, 95)`.
- Verify the update using `getById(1)`.
- No private fields are accessed.

---

## Encapsulation Verification

The tests interact only with the public methods:

- `updateScore()`
- `getById()`
- `getAll()`

The tests never access private fields such as `#interns` or use `(tracker as any)`.

This confirms that the class maintains encapsulation while still allowing its behavior to be tested.

# Section 4 — Encapsulate a Module

## Task 4.1 — Audit utils.ts

The helper functions in `utils.ts` are internal implementation details.

Since they are only used within the `services` module, they do not need to be exported.

Removed unnecessary `export` keywords to improve encapsulation.

---

## Task 4.2 — Barrel File

Created:

```text
src/services/index.ts
```

The barrel file re-exports only the public services required by callers.

Internal helper functions from `utils.ts` are not exported.

---

## Task 4.3 — Updated Imports

Updated imports from

```ts
import { InternTracker } from "../services/intern-tracker";
```

to

```ts
import { InternTracker } from "../services";
```

This provides a single public entry point for the services module.
# Section 5 — Design the Public Interface First

## Question 1

**Could you switch from `Set<number>` to `Map<number, Date>` without changing the public interface?**

### Answer

Yes.

The callers interact only with the public methods (`record`, `isPresent`, `getCount`, and `getAttendeeIds`).

The internal storage can be changed from `Set<number>` to `Map<number, Date>` without affecting callers.

---

## Question 2

**What would happen if you exposed the raw `Set`?**

### Answer

Callers could directly modify the internal collection by calling methods such as:

- `add()`
- `delete()`
- `clear()`

This would bypass validation and break encapsulation.

Keeping the `Set` private ensures that all modifications go through the public interface.