const fs = require("fs");

// Read the JSON file as text
const raw = fs.readFileSync("nodejs/session1/data.json", "utf8");

// JSON.parse() converts a JSON string into a JavaScript object.
// If the JSON has invalid syntax (such as a missing comma or unclosed bracket),
// JSON.parse() throws a SyntaxError and the program stops.
const data = JSON.parse(raw);

console.log("All users:", data.users);

console.log("First user:", data.users[0].name);

const interns = data.users.filter((u) => u.role === "intern");

console.log("Interns:", interns.map((u) => u.name));