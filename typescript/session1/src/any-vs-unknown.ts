//any

let dangerousValue: any = "hello";

dangerousValue = 42;
dangerousValue = { name: "Alice" };

console.log(dangerousValue.foo.bar);

// unknown

let safeValue: unknown = "hello";
if (typeof safeValue === "string") {
    console.log(safeValue.toUpperCase());
}

// console.log(safeValue.toUpperCase());


// Type narrowing means reducing a broader type into a more specific type
// using checks such as typeof, instanceof, or comparisons.