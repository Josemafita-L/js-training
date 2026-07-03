// Node.js provides built-in objects like process for accessing runtime information.
// Browser-specific objects like document are not available because Node.js
// does not have a web page or DOM.

// Three things Node.js can do that browser JavaScript cannot:
// 1. Read and write files using the fs module.
// 2. Access operating system information using the os module.
// 3. Run backend servers and execute system-level operations.

// One thing browser JavaScript can do that Node.js cannot:
// - Access and manipulate HTML elements using the DOM (document object).

console.log("Node version:", process.version);
console.log("Platform:", process.platform);

// Uncomment the line below to observe the error.
// console.log(document.querySelector("h1"));