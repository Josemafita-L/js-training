# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: intern-dashboard.spec.ts >> Add Intern Journey >> form clears after successful submission
- Location: tests\intern-dashboard.spec.ts:252:3

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for getByPlaceholder('Intern Name')

```

```
Error: browserContext.close: Target page, context or browser has been closed
```