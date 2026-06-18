console.log("TypeScript is running");
const age: number = 30;
// use of tsc --noEmit?
// It checks TypeScript errors without generating JavaScript files.
// It is useful when we only want to verify that the code is correct.

function add(a: number, b: number): number {
    return a + b;
}

console.log(add(2, 3));

// Where did the type annotations go in the output .js file?
// The type annotations were removed during compilation.(number)

// What does this tell you about where TypeScript's type safety lives?
// TypeScript type safety exists only during development and compilation.
// JavaScript does not contain TypeScript types.