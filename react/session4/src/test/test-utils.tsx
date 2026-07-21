/* eslint-disable react-refresh/only-export-components */

import type { ReactNode, ReactElement } from "react"

import {
  render,
  type RenderOptions,
} from "@testing-library/react"

import { ThemeProvider } from "../contexts/theme-context"
import { InternProvider } from "../contexts/intern-context"

function AllProviders({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ThemeProvider>
      <InternProvider>
        {children}
      </InternProvider>
    </ThemeProvider>
  )
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  })
}

export * from "@testing-library/react"
export { customRender as render }