// Inferred — no annotation needed
let city = "Mumbai";
let year = 2024;

// Explicit — annotation required (no initial value)
let country: string;
let population: number;

country = "India";
population = 1400000000;

let mystery;

mystery = "hello";
mystery = 42;

// When TypeScript cannot infer a type, it assigns the type 'any'.