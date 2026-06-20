type UserId = string;
type ProductId = string;
type Timestamp = number;

type Status = "active" | "inactive" | "pending";

type Direction = "north" | "south" | "east" | "west";



function getUserById(id: UserId): void {
    console.log(`Fetching user with ID: ${id}`);
}

function updateStatus(id: UserId, status: Status): void {
    console.log(`Updating user ${id} to ${status}`);
}

function move(direction: Direction, steps: number): void {
    console.log(`Moving ${steps} steps towards ${direction}`);
}


const user1: UserId = "U101";
const product1: ProductId = "P501";

getUserById(user1);

updateStatus(user1, "active");

move("north", 10);


// Observation:
// TypeScript uses structural typing, so UserId and ProductId are both
// treated as strings. Passing a ProductId where a UserId is expected
// does not produce an error because both are aliases of string.

getUserById(product1);


