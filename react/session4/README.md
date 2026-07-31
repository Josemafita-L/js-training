# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

| Test                       | Fast? | Independent? | Repeatable? | Self-validating? | Timely? |
| -------------------------- | ----- | ------------ | ----------- | ---------------- | ------- |
| `validateInternForm` tests | Yes   | Yes          | Yes         | Yes              | Yes     |
| `useInternForm` hook tests | Yes   | Yes          | Yes         | Yes              | Yes     |
| `ScoreStats` tests         | Yes   | Yes          | Yes         | Yes              | Yes     |
| `filterInterns` tests      | Yes   | Yes          | Yes         | Yes              | Yes     |

## Section 6.2 – FIRST Audit

### Comment

The validateInternForm tests benefited the most from the refactoring because the validation logic was extracted into a pure function. These tests no longer require React hooks, renderHook, or component setup, making them much simpler and faster.

The useInternForm hook tests also became easier because the validation logic was separated, leaving the hook responsible only for managing state.

The ScoreStats component is now easier to test because it receives values as props instead of reading directly from context. This eliminates the need for mocking or wrapping the component with a Provider.

The remaining hook tests still require React testing utilities since hooks depend on React state management, so they are not as simple as testing pure functions.
