function greetUser(name: string, title?: string): string {
    return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}

greetUser("Alice");
greetUser("Alice", "Dr.");

function createAccount(email: string, role: string = "user"): object {
    return { email, role };
}

createAccount("alice@example.com");
createAccount("bob@example.com", "admin");

// Optional parameter (name?: string):
// The parameter may be omitted and its value will be undefined.

// Default parameter (name: string = "Guest"):
// If no value is provided, TypeScript automatically uses the default value.

// Use an optional parameter when the parameter is truly optional.
// Use a default parameter when you want a fallback value.