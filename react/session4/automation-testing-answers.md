# Engineering Principles — Automation Testing (Session 1)

---

# Section 1 — Understanding the Test Pyramid

## Task 1.1 — Count Your Tests by Layer

| Layer | Tool | # Tests | Duration |
|-------|------|---------:|---------:|
| Unit / Hook | Vitest | 24 | 9.89 s |
| Component (RTL) | Vitest + RTL | 4 | 9.89 s |
| End-to-end | Playwright | 202 | 11.7 min |
| **Total** | | **230** | |

### Comment

My current test suite does not follow the ideal Test Pyramid. I have significantly more End-to-End (E2E) tests than Unit and Component tests. Ideally, the project should contain many Unit tests, a smaller number of Component tests, and only a few critical E2E tests. Increasing the number of Unit and Component tests would make the test suite faster, easier to maintain, and provide quicker feedback.

---

## Task 1.2 — Classify Existing Tests

| Test File | Type | Reason |
|-----------|------|--------|
| generate-id.test.ts | Unit | Tests ID generation logic |
| intern-utils.test.ts | Unit | Tests utility functions |
| intern-validation.test.ts | Unit | Tests validation logic |
| request-utils.test.ts | Unit | Tests request utility functions |
| global-state-fixed.test.ts | Unit | Tests isolated business logic |
| ScoreStats.test.tsx | Component | Renders a React component and verifies DOM output |
| actions.spec.ts | E2E | Tests complete browser interactions |
| intern-dashboard.spec.ts | E2E | Tests dashboard behavior in a browser |
| locators-actions.spec.ts | E2E | Tests Playwright locator actions |
| page-object.spec.ts | E2E | Tests using the Page Object Model |
| user-journeys.spec.ts | E2E | Tests complete user journeys |

### Comment

Several E2E tests could be replaced with Unit or Component tests. Unit and Component tests are much faster, easier to maintain, and provide quicker feedback during development. E2E tests should primarily be reserved for validating complete user workflows.

---

# Section 2 — Coverage as a Quality Signal

## Task 2.1 — Coverage Report

### Observations

- `ScoreStats.tsx` has the lowest coverage.
- Only a small portion of the component is currently executed.
- Most branches remain uncovered.
- Conditional rendering paths are not fully tested.
- Additional tests are required to improve Statement, Branch, Function, and Line coverage.

The presentation component (`ScoreStats`) is covered by existing tests.

However, the `ScoreStatsContainer` component is not executed during testing.

The uncovered logic includes:

- `useInterns()` hook
- `useMemo()` calculations
- Highest score calculation
- Lowest score calculation
- Average score calculation
- Passing intern calculation

### Missing Test

**Test Name**

```
ScoreStatsContainer calculates statistics correctly for multiple interns
```

### Comment

To improve coverage, I would add integration tests for the `ScoreStatsContainer` component to verify statistics calculation under different scenarios, including empty data, all interns passing, no interns passing, and mixed scores.

---

## Task 2.3 — Coverage Threshold

After adding coverage thresholds to `vitest.config.ts`, the coverage check fails because the project does not yet meet the required percentages.

### Comment

The Branch coverage is below the required threshold.

A useful additional test would be:

```
ScoreStatsContainer handles an empty intern list correctly
```

The temporary threshold configuration should be removed after completing this activity.

---

# Section 3 — Making the Quality Gate Work

## Task 3.1 — Deliberately Break a Unit Test

### Observation

After intentionally changing the validation logic, the related Unit test failed immediately.

The failure clearly showed:

- Expected value
- Actual received value
- Exact file
- Exact line number

The issue was detected within a few seconds.

### Comment

Without automated tests, finding the same bug manually would require opening the application, navigating to the form, entering data, and verifying the result, which would take considerably longer.

---

## Task 3.2 — Break an E2E Test

### Which test failed?

```
adds a new intern using the form
```

### Which step failed?

Playwright attempted to locate the **"Add Intern"** button, but it could not find it because the button text had been changed to **"Submit Intern"**.

### What does the screenshot show?

The page loads correctly, but the button label has changed from **Add Intern** to **Submit Intern**, causing the locator to fail.

### Comment

Unit test failures clearly identify the incorrect value and the exact source code location.

E2E failures provide screenshots, browser state, and detailed interaction logs, making it easier to understand what the user experienced when the failure occurred.

---

## Task 3.3 — Simulated Pull Request Quality Check

### Branch Created

```
feature/add-score-badge
```

### Feature Added

Added a visual **Pass / Fail** badge based on whether the intern score is greater than or equal to 50.

### Quality Checks

Executed:

```
npm run test:run
npm run test:coverage
npx playwright test
```

### Comment

No existing tests required modification because the new badge did not change existing functionality. A new component test was added to verify that the Pass badge renders correctly.

### Definition of Done

A feature is complete only when:

- It functions correctly.
- Unit tests pass.
- Component tests pass.
- Coverage requirements are satisfied.
- End-to-End tests pass successfully.

---

# Section 4 — Understanding CI/CD

## Task 4.1 — Pipeline Stages

| Stage | What runs | What it checks | Blocks merge if? |
|-------|-----------|---------------|-----------------|
| On every push | Unit tests | Code correctness | Yes |
| On every pull request | Unit tests, Coverage, E2E tests | Full application quality | Yes |
| Before merge to main | Entire CI pipeline | Overall application stability | Yes |

### Comment

Unit tests run on every push because they execute quickly and provide immediate feedback. E2E tests are slower since they interact with a real browser, so they are typically executed during Pull Requests to verify complete user workflows.

---

## Task 4.2 — GitHub Actions Pipeline

### Answers

**1. What triggers the pipeline?**

The pipeline runs on every push and every Pull Request targeting the `main` branch.

**2. Why does `needs: unit-tests` exist?**

The E2E job depends on successful completion of the Unit Test job. If Unit tests fail, E2E tests are skipped.

**3. What commands run in the Unit Test job?**

```
npm ci
npm run test:run
npm run test:coverage
```

These commands install dependencies, execute Unit and Component tests, and verify code coverage.

**4. If coverage fails, can E2E tests still run?**

No. The E2E job depends on the successful completion of the Unit Test job.

**5. How would you block merges below 80% coverage?**

Configure coverage thresholds inside `vitest.config.ts` and require the CI pipeline to pass before allowing a Pull Request to be merged.

---

## Task 4.3 — Pipeline Health Audit

| Risk | Yes / No | File or Test |
|------|----------|--------------|
| Any `test.skip`? | No | None |
| Any `console.log` not asserted? | No | None |
| Any `fetch` without mocking? | No | None |
| Any `new Date()` inline? | No | None |
| Any test over 500ms? | No | None |
| Any flaky test? | No | None |

### Comment

No significant pipeline health risks were identified. Skipped tests should be completed or removed, slow tests should be optimized, network requests should be mocked, and flaky tests should be stabilized before inclusion in the CI pipeline.

---

# Section 5 — Putting It All Together

## Task 5.1 — Missing Test Pyramid Layer

| Feature | Unit | Component | E2E | Missing |
|---------|------|-----------|-----|---------|
| Score validation | ✓ | ✓ | ✓ | None |
| Attendance toggle | ✓ | ✗ | ✓ | Component |
| Search filtering | ✓ | ✓ | ✓ | None |
| Add intern form | ✓ | ✓ | ✓ | None |

### Most Valuable Additional Test

A Component test verifying the Attendance Toggle because it provides high confidence with relatively low setup cost.

---

## Task 5.2 — Automation Audit

### Coverage

Branch coverage remains below the desired threshold.

The file with the worst branch coverage is:

```
ScoreStats.tsx
```

### Speed

The slowest tests are the Playwright E2E tests because they launch a real browser and simulate user interactions.

### Pyramid Shape

The project currently contains more E2E tests than Unit tests.

Increasing Unit and Component tests would improve the overall pyramid structure.

### Critical User Journeys

1. Add an intern
2. Search interns
3. Remove an intern

These workflows are covered by Playwright tests.

### What Breaks Silently?

If `intern-context.tsx` changes the order of interns, Component and E2E tests that verify displayed order would detect the regression, while isolated Unit tests would not.

---

# Section 6 — Reflection

## Before vs After

| | Before Testing Sessions | After Testing Sessions |
|---|------------------------|-----------------------|
| How do you know a change didn't break anything? | Manual testing | Automated tests verify changes immediately |
| How long does verification take? | Several minutes | A few seconds |
| Confidence while refactoring | Low | High |
| How are regressions detected? | Manual testing | Automated test suite |

### Comment

Unit tests proved to be the most valuable during this training because they execute quickly, precisely identify failures, and provide immediate feedback during development.

---

# Overall Learning

Throughout this session I learned:

- Test Pyramid principles
- Unit vs Component vs E2E testing
- FIRST testing principles
- Code coverage analysis
- Coverage thresholds
- Quality gates
- CI/CD pipeline concepts
- Playwright debugging
- Pipeline health auditing
- Definition of Done for production-quality software