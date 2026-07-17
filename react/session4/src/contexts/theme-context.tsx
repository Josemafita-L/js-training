import {
  createContext,
  useContext,
  useState,
} from "react"
import type { ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

/*
Why createContext is initialized with null?

Initially there is no ThemeProvider supplying a value.
Using null makes it easy to detect when a component
tries to access the context outside the provider.

Why throw an error instead of returning a default value?

Throwing an error immediately tells the developer
that the component is not wrapped inside ThemeProvider.
Returning a fake default value would hide this mistake
and could cause unexpected behavior.
*/
const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [theme, setTheme] = useState<Theme>("light")

  function toggleTheme(): void {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    )
  }

  return context
}