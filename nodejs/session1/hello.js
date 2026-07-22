// Running JavaScript in a browser allows access to the DOM (document, window)
// and is mainly used for building interactive web pages.
// Running JavaScript with Node.js executes code outside the browser,
// allowing access to the file system, operating system, and backend features.

// REPL stands for Read-Eval-Print Loop.
// It is an interactive environment where you can quickly test JavaScript code,
// experiment with functions, debug small snippets, and learn language features.

const message = "Hello from Node.js";
console.log(message);

const fruits = ["apple", "banana", "mango"];
const upper = fruits.map(f => f.toUpperCase());
console.log(upper);