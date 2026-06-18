function multiply(a: number, b: number): number {
    return a * b;
}

function formatName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`;
}

function isAdult(age: number): boolean {
    return age >= 18;
}

function getFirstElement(arr: number[]): number | undefined {
    return arr[0];
}
multiply(2, 3);

formatName("Alice", "Smith");

isAdult(20);

getFirstElement([1, 2, 3]);