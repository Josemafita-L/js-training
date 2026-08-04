// Silent Failure Audit — intern-context.tsx
//
// Pattern 1: None found (context access fails fast with an error)
// Pattern 2: None found (no silent default values)
// Pattern 3: None found (no swallowed exceptions)
// Pattern 4: None found (no empty collections returned on failure)
// Pattern 5: No validation is performed before adding external data to the repository.
// If data later comes from an API, malformed data could enter application state.


import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { useInternRepository } from "../repositories/intern-repository";
import { createIntern } from "../services/intern-service";

interface InternProviderProps {
  children: React.ReactNode
  generateId?: () => number
}

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface InternContextType {
  interns: Intern[]
  isLoading: boolean
 addIntern: (intern: Omit<Intern, "id">) => void
  removeIntern: (id: number) => void
}

const InternContext =
  createContext<InternContextType | null>(
    null
  )

function validateInternResponse(data: unknown): Intern[] {
  if (!Array.isArray(data)) {
    throw new Error(
      `validateInternResponse: expected an array, got ${typeof data}`
    );
  }

  return data.map((item, index) => {
    if (typeof item !== "object" || item === null) {
      throw new Error(
        `validateInternResponse: item[${index}] is not an object`
      );
    }

    const intern = item as Intern;

    if (
  typeof intern.name !== "string" ||
  !intern.name.trim()
) {
  throw new Error(
    `validateInternResponse: item[${index}].name is invalid`
  );
}

    if (
      typeof intern.score !== "number" ||
      intern.score < 0 ||
      intern.score > 100
    ) {
      throw new Error(
        `validateInternResponse: item[${index}].score is invalid, got: ${intern.score}`
      );
    }

    return intern;
  });
}
export function InternProvider({
  children,
  generateId = Date.now,
}: InternProviderProps) {
 const repo = useInternRepository();
  const [isLoading, setIsLoading] =
    useEffect(() => {
  setTimeout(() => {
    const data = [
      {
        id: 1,
        name: "Rahul",
        score: 92,
        role: "Frontend",
        isPresent: true,
      },
      {
        id: 2,
        name: "Priya",
        score: 78,
        role: "Backend",
        isPresent: true,
      },
      {
        id: 3,
        name: "Amit",
        score: 45,
        role: "Frontend",
        isPresent: false,
      },
      {
        id: 4,
        name: "Sneha",
        score: 95,
        role: "Fullstack",
        isPresent: true,
      },
    ];

    const interns = validateInternResponse(data);

    interns.forEach(repo.add);

    setIsLoading(false);
  }, 800);
}, []);
function addIntern(intern: Omit<Intern, "id">): void {
  const newIntern = createIntern(intern, generateId);
  repo.add(newIntern);
}

  function removeIntern(
    id: number
  ): void {
    repo.remove(id);
  }

  return (
    <InternContext.Provider
      value={{
        interns: repo.interns,
        isLoading,
        addIntern,
        removeIntern,
      }}
    >
      {children}
    </InternContext.Provider>
  )
}

export function useInterns() {
  const context =
    useContext(InternContext)

  if (!context) {
    throw new Error(
  "useInterns: expected to be called inside <InternProvider>, but no provider was found."
)
  }

  return context
}
// Job:
// This file manages the global intern data and provides it through React Context.

// Concerns mixed:
// - State management
// - Validation
// - ID generation
// - Average score calculation
// - Filtering interns


// Audit Summary
//
// Highest-risk pattern:
// Missing validation at the data entry boundary.
//
// Why?
// External data is trusted before being stored.
// If malformed data reaches the repository,
// the application may fail much later,
// making the source of the bug difficult to identify.