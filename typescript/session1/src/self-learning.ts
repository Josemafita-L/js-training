
let value: string | number;

value = "Alice";
value = 100;



function printId(id: string | number): void {
    console.log(id);
}



const mixedArray: (string | number)[] = ["A", 1, "B", 2];


function sendRequest(method: "GET" | "POST"): void {
    console.log(`Sending ${method} request`);
}

sendRequest("GET");
sendRequest("POST");


const numbers: readonly number[] = [1, 2, 3];
// readonly prevents modification of an array.
// It is useful when data should not be changed accidentally.

let nameOrNull: string | null = "Alice";

if (nameOrNull !== null) {
    console.log(nameOrNull.toUpperCase());
}