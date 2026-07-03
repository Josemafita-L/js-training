// process.version returns the installed Node.js version.
// Useful for checking compatibility with packages or features.
console.log("Node version:", process.version);

// process.platform returns the operating system platform.
// Useful when writing code that behaves differently on Windows, Linux, or macOS.
console.log("Platform:", process.platform);

// process.cwd() returns the current working directory from which the script is executed.
// Useful for locating files relative to where the application is started.
console.log("Current directory:", process.cwd());

// process.memoryUsage() returns memory statistics of the current Node.js process.
// Useful for monitoring memory consumption and debugging performance issues.
console.log("Memory usage:", process.memoryUsage());


// process.argv is an array containing the command-line arguments.
// It is useful for accepting user input when running scripts.

const args = process.argv;

console.log("All arguments:", args);

// args[2] contains the first custom argument provided by the user.
console.log("Your input:", args[2]);

// Real-world example:
// Command-line arguments are useful for scripts that accept filenames,
// user IDs, roles, or configuration options without modifying the code.


// Environment variables store configuration values separately from the code.
// Sensitive information like API keys and database URLs are stored here
// to improve security and allow different configurations for development,
// testing, and production environments.

console.log("NODE_ENV:", process.env.NODE_ENV);

// Displays the user's home directory.
// USERPROFILE is used on Windows, HOME is used on Linux/macOS.
console.log("HOME:", process.env.HOME || process.env.USERPROFILE);