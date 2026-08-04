## Task 1.2

### Snippet A

Current Layer:

- Context

Should Be:

- Validation → Service
- ID generation → Service
- Score rounding → Service
- State update → Repository

Reason:

- Validation, ID generation, and score rounding are business logic.
- Updating React state belongs to the repository layer.

**Comment:**
There are 4 distinct concerns:

1. Validation
2. ID generation
3. Score processing
4. State management

The concern that requires the most test setup is state management because it depends on React state.

---

### Snippet B

Current Layer:

- UI Component

Should Be:

- Repository

Reason:

- Data fetching should be handled by the repository, not the UI component.

---

### Snippet C

Current Layer:

- Utility

Should Be:

- Service + UI

Reason:

- The service should return "Pass" or "Fail".
- The UI component should render the JSX.

---

### Snippet D

Current Layer:

- Context

Should Be:

- Service

Reason:

- Filtering interns is business logic and should be a reusable pure function.

## Section 3

### Task 3.1

**Q1. Does any test in `intern-repository.test.ts` use `vi.mock`? Why not?**

Answer:
No. The repository only manages React state using `useState`. It can be tested directly using `renderHook` and `act`, so no mocking is required.

---

**Q2. What is the difference between testing the repository and testing the service? Which is simpler to set up?**

Answer:
The service layer contains pure business logic and can be tested by calling functions directly. The repository layer manages React state, so it requires `renderHook` and `act`. Therefore, service tests are simpler to set up because they do not depend on React.

### Task 3.2

**1. Does `useInternRepository` validate anything?**

No. Validation is handled by the service layer.

---

**2. Does `useInternRepository` generate any IDs?**

No. ID generation is handled by the service layer.

---

**3. Does `useInternRepository` calculate any averages?**

No. Average calculations are handled by the service layer.

## Section 4

### Task 4.2

**Should a presentational component import from the service layer directly?**

No. A presentational component should receive data through props. The container or wiring layer should call the service and pass the result to the presentational component.

---

**What is the test consequence of each choice? Which is easier to test?**

If the presentational component calls the service directly, it depends on business logic and is harder to test in isolation. Passing the result as a prop keeps the component focused on rendering, making it easier to test with different inputs.

## Section 5

### Task 5.1

| File                                  | Expected layer    | Actual concerns                        | Correct? |
| ------------------------------------- | ----------------- | -------------------------------------- | -------- |
| src/components/SummaryBar.tsx         | UI                | Displays summary information           | Yes      |
| src/components/AddInternForm.tsx      | UI                | Form rendering and user input          | Yes      |
| src/components/InternCard.tsx         | UI                | Displays intern details                | Yes      |
| src/hooks/useInternForm.ts            | Coordination Hook | Coordinates validation and addIntern   | Yes      |
| src/hooks/useInternSearch.ts          | Coordination Hook | Coordinates search state and filtering | Yes      |
| src/contexts/intern-context.tsx       | Wiring            | Connects repository and service        | Yes      |
| src/services/intern-service.ts        | Service           | Business logic                         | Yes      |
| src/repositories/intern-repository.ts | Repository        | React state management                 | Yes      |


**Question:** After the refactor, does `useInternForm.ts` belong in the service layer, the UI layer, or is it wiring? It uses both `validateInternForm` (service) and `addIntern` (context). What would you name this layer?

**Answer:**

`useInternForm.ts` does not belong to the service layer or the repository layer. It acts as a **coordination hook** (or **wiring layer**) because it coordinates the interaction between the UI, the service layer, and the context. It calls the `validateInternForm()` function from the service layer and the injected `addIntern()` function, but it does not contain business logic or manage data storage itself.

### Task 5.2

#### 1. Does `useInternForm` call `validateInternForm` from `intern-service.ts`?

**Answer:**
Yes. The hook imports and calls `validateInternForm` from `src/services/intern-service.ts` instead of implementing validation logic itself.

---

#### 2. Does `useInternForm` call the injected `addIntern` parameter instead of importing the context directly?

**Answer:**
Yes. The hook uses the injected `addIntern` function, making it independent of the context and easier to test.

---

#### 3. Does `useInternForm` contain any fetch calls or direct writes to the interns list?

**Answer:**
No. The hook does not perform any API requests or modify the intern list directly. It only coordinates form state, validation, and calls the injected `addIntern` function.

---

#### Comment

`useInternForm` belongs to the **coordination hook** layer. It coordinates communication between the UI, the service layer, and the context without containing business logic or repository logic.

## Section 6

### Task 6.1 – Dependency Diagram

```text
AddInternForm.tsx
    └── calls useInternForm (coordination hook)
          ├── calls validateInternForm (service)
          ├── calls addIntern (injected from context)
          │      └── InternProvider
          │             ├── calls createIntern (service)
          │             └── calls repo.add (repository)
          └── resets the form

InternProvider
    ├── uses useInternRepository (repository)
    │      ├── manages interns state
    │      ├── add()
    │      ├── remove()
    │      └── update()
    │
    └── uses intern-service
           ├── createIntern()
           ├── calculateAverageScore()
           ├── filterInterns()
           └── getScoreLabel()

ScoreStats.tsx
    └── receives interns (or calculated values) as props
         and displays score statistics
```

### Comment

No dependency points upward. The UI depends on the coordination hook, which depends on the service layer and repository layer. The service layer does not depend on the repository, and the repository does not depend on the service.
### Task 6.2 – One-Sentence Test (After Refactor)

#### src/contexts/intern-context.tsx
**After:** Wires the service and repository layers together and provides the intern context.

#### src/hooks/useInternForm.ts
**After:** Coordinates form state, validation, and intern submission.

#### src/hooks/useInternSearch.ts
**After:** Coordinates search state and filtering.

#### src/components/AddInternForm.tsx
**After:** Displays the intern form and forwards user actions to the coordination hook.

#### src/components/ScoreStats.tsx
**After:** Displays score statistics based on the data it receives.

### Comment

Every file now has a single responsibility. `useInternForm.ts` is the hardest to describe because it coordinates multiple layers, but it no longer contains business logic or repository logic.