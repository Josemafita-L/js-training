//noImplicitAny
function greet(name: string) {
    return "Hello " + name;
}

// strictNullChecks 

let username: string | null = null;

// noImplicitAny:
// Prevents variables and parameters from automatically becoming 'any'.

// strictNullChecks:
// Treats null and undefined as separate types and prevents assigning them to incompatible types.