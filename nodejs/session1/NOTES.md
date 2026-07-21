# Node.js Session 1 Notes

## package.json Fields

### name
The name of the project.

### version
The current version of the project.

### description
A short summary describing the project.

### main
The default entry file of the application.

### scripts
Custom commands that can be run using npm.

### keywords
Words that describe the project for searching.

### author
The person who created the project.

### license
Specifies how others are allowed to use the project.

---

## Why npm Scripts are Useful

npm scripts provide simple shortcuts for running commands.

Instead of remembering long commands, every team member can run the same script using commands like:

npm start

npm run dev

npm test

This keeps projects consistent and makes complex commands easier to use.

---

## __dirname and __filename

### __dirname

Returns the absolute path of the directory where the current JavaScript file is located.

Example:

C:\Users\Josemafita\Desktop\js-training\nodejs\session1

### __filename

Returns the absolute path of the current JavaScript file.

Example:

C:\Users\Josemafita\Desktop\js-training\nodejs\session1\report.js

### Why are they not available in ES Modules?

When using ES Modules (`import`/`export`), Node.js does not provide `__dirname` and `__filename`.

Instead, developers use:

```javascript
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

---

## npm install vs npm ci

### npm install

- Installs dependencies from package.json.
- Updates package-lock.json if required.
- Used during normal application development.
- Installs any missing packages.

### npm ci

- Installs dependencies exactly as listed in package-lock.json.
- Removes node_modules before installation.
- Faster than npm install.
- Used in CI/CD pipelines to ensure consistent builds.