import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  test: {
    environment: "jsdom",
    globals: true,

    include: ["src/test/**/*.{test,spec}.{ts,tsx}"],
    exclude: [
      "tests/**",
      "node_modules/**",
       "src/test/global-state-bug.test.ts"
    ],
  },
});