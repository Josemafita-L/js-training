# Debugging Log

## Bug 1 — Validation rejects valid score

### Reproduce

1. Open the Add Intern form.
2. Enter:
   - Name: Rahul
   - Score: 85
   - Role: Frontend
3. Click Submit.

The form displays "Score must be between 0 and 100" and does not add the intern.

### Isolate

**File:** src/services/intern-service.ts

**Function:** validateInternForm()

### Root Cause

The validation logic incorrectly compares the score against 10 instead of 100, so any score greater than 10 is treated as invalid.

### Fix

Change the validation condition from `score > 10` back to `score > 100`.

### Verify

- Score 85 is accepted.
- Score 100 is accepted.
- Score 101 is rejected.
- No other validation behavior changed.

---

## Expected vs Actual — Add Intern Form

### Scenario 1 (Working)

**Input:**

- Name: Rahul
- Score: 85
- Role: Frontend

**Expected:**
The intern is successfully added to the dashboard with the correct details.

**Actual:**
The intern is added successfully and appears in the intern list.

---

### Scenario 2 (Hypothetical Bug)

**Input:**

- Name: (empty)
- Score: 85
- Role: Frontend

**Expected:**
The form should display "Name is required" and should not submit.

**Actual (if this bug existed):**
The form submits even though the name field is empty.

---

### Comment

Writing the expected and actual behavior separately made me think more carefully about what the feature is supposed to do. It helped me define the correct behavior before debugging.

## Bug 2 — Stack Trace Reading

### Error type and message

TypeError: Cannot read properties of undefined (reading 'value')

### First YOUR-code line in the trace

File: src/contexts/intern-context.tsx

Line: (your line number)

### What that line does

It tries to access the `value` property of `nonExistentNested`, which does not exist on the intern object.

### The caller (next YOUR-code line)

InternProvider in src/contexts/intern-context.tsx (or whatever your stack trace shows).

### Root cause

The code tries to access `intern.nonExistentNested.value`, but `nonExistentNested` is undefined.

### Did you need to add any console.log to find this? Why or why not?

No. The stack trace clearly identified the file and line where the error occurred.

## Task 2.2 — Root Cause Without Running Code

### What does the stack trace error say if this throws?

TypeError: Cannot read properties of undefined (reading 'name')

### Under what exact condition does it throw?

When the `interns` array is empty, so `sorted[0]` is `undefined`.

### Which line is the root cause line?

```ts
return top.name.toUpperCase();
```

### Fix (one line)

```ts
if (!top) return "";
```

## Task 3.1 — Console Panel

### Error message shown

TypeError: Cannot read properties of undefined (reading 'value')

### File and line number from the clickable link

src/contexts/intern-context.tsx: (your line number)

### Did the line match what you expected from reading the stack trace?

Yes. Clicking the error opened the same line identified in the stack trace.

## Task 3.2 — Network Panel

**Successful request URL and status:**
https://jsonplaceholder.typicode.com/users — 200 OK

**Response (first item or summary):**
The response is a JSON array of user objects. The first object contains fields such as `id`, `name`, `username`, `email`, and `address`.

**Failed URL and status:**
https://jsonplaceholder.typicode.com/userrrrrr — 404 Not Found

**What the Console shows when the fetch fails:**
The Network panel shows a failed request with status 404 because the endpoint does not exist.

## Task 3.3 — Elements Panel

**Element inspected:**

Intern card / intern row

**CSS class applied:**

intern-card

**Property changed and what happened:**

Changed the `background-color` property temporarily in the Styles panel. The background color of the intern card changed immediately in the browser.

**Did the source file change? Why not?**

No. The change was made only to the live DOM and CSS inside Chrome DevTools. It was not saved to the source code, so refreshing the page restored the original styling.

## Task 4.1 — Line Breakpoint

**File and line where breakpoint was set:**

src/utils/intern-utils.ts — `const result = interns.filter(...)`

**Variables in scope at pause:**

interns, query, search

**Value of search term:**

"Rahul"

**Number of interns in the array:**

4

**What changed after two Step Overs:**

The filter operation executed and the `result` variable contained the interns matching the search term. Execution then moved to the next statement.

## Task 4.2 — Conditional Breakpoint

**Condition used:**

intern.name === "Rahul"

**How many times did the breakpoint fire?**

1

**How many times would a line breakpoint have fired?**

4

**Why is a conditional breakpoint better for this scenario?**

A conditional breakpoint allows execution to pause only for the specific intern I am investigating. This avoids stopping for every intern processed by the filter and makes debugging faster and more focused.

## Task 4.3 — Step Controls

**Line where you started (file:line):**

src/hooks/useInternForm.ts — `const validationError = validateInternForm(form);`

**Function you stepped into:**

validateInternForm()

**What did you see inside the function (variables, logic):**

I could inspect the form name and score and follow the validation checks for the name and score range.

**After Step Out — where did execution return to:**

Execution returned to `useInternForm.ts`, to the line that called `validateInternForm()`.

## Task 4.4 — Watch Expressions

**Expressions added:**

interns.length
query
search

**Values at pause:**

interns.length = 4
query = "Rahul"
search = "rahul"

**Did any expression change value as you stepped? Which one and how:**

The watched values did not change because the filter function only reads the interns and search values; it does not modify them.

**When is a watch expression more useful than hovering over a variable:**

A watch expression continuously displays a value while stepping through execution, making it easier to monitor a value across multiple lines without repeatedly hovering over the variable.

## Task 5.1 — VS Code Debugger

**launch.json URL used:**

http://localhost:5173

**File and line where you set the breakpoint:**

src/utils/intern-utils.ts — `const result = interns.filter(...)`

**What inline values appeared when paused:**

`query` was `"Rahul"`, `search` was `"rahul"`, and `interns` contained 4 interns.

**One thing the VS Code debugger shows that console.log cannot:**

The VS Code debugger can pause execution at a specific line and allows me to step through the program line by line while inspecting variables and the call stack.

## Task 6.2 — Grouped Logging

**Where you added it:**

src/hooks/useInternForm.ts — handleSubmit()

**What the Console output looks like:**

A collapsed `submit()` group containing the submitted form data and validation result.

**Is the guard important? What would happen without it in production?**

Yes. The `import.meta.env.DEV` guard prevents development debugging information from being logged in production. Without the guard, the logs would also execute in production and could expose unnecessary application or user data in the browser Console.

## Explore 2 — Call Stack

I opened the Call Stack panel while paused inside `filterInterns()`. It showed the current function and the callers that led to it, including React/framework execution before reaching my application code.

The useful part was being able to move between stack frames and inspect where the function was called from.

## Explore 3 — console.trace()

I temporarily used `console.trace()` inside `filterInterns()`.

It printed the call stack in the Console without pausing execution.

A breakpoint provides more interactive debugging because I can pause execution, inspect variables, use Watch expressions, and move between Call Stack frames. `console.trace()` mainly provides a printed call-stack snapshot.

## Explore 4 — Wrong Output Without an Error

A bug can produce incorrect output without throwing an exception or writing anything to the Console.

I would first reproduce the incorrect result consistently. Then I would isolate the feature and inspect the input, intermediate values, and output. I would use breakpoints and Watch expressions to find where the actual value differs from the expected value. After identifying the root cause, I would make the smallest fix and verify both the original scenario and related scenarios.
