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

export function InternProvider({
  children,
  generateId = Date.now,
}: InternProviderProps) {
 const repo = useInternRepository();
  const [isLoading, setIsLoading] =
    useState(true)

  useEffect(() => {
    setTimeout(() => {
      [
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
].forEach(repo.add);

setIsLoading(false);
    }, 800)
  }, [])
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
      "useInterns must be used inside InternProvider"
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