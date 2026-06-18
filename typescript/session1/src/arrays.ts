const fruits: string[] = ["apple", "banana", "cherry"];
const temperatures: number[] = [22.5, 19.0, 30.1];
const flags: boolean[] = [true, false, true];

fruits.push("Mango");
temperatures.push(42);

const mixed: (string | number)[] = ["Alice", 1, "Bob", 2];
mixed.push("Jose");

// string[] and Array<string> mean the same thing.
// They are interchangeable and represent an array of strings.