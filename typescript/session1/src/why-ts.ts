type User = { fullName: string };

function getUserLabel(user: User): string {
    return user.fullName.toUpperCase();
}

// Key difference:
// In JavaScript the bug was discovered at runtime.
// In TypeScript the bug was discovered during compilation before the code ran.