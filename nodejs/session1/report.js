const fs = require("fs");
const dayjs = require("dayjs");

// Read the JSON file
const path = require("path");

const raw = fs.readFileSync(
    path.join(__dirname, "data.json"),
    "utf8"
);

// Convert JSON string into a JavaScript object
const data = JSON.parse(raw);

// Read the role from the command line
const role = process.argv[2];

// Filter users based on the given role
const users = data.users.filter(user => user.role === role);

// Display report
console.log("Report generated on:", dayjs().format("DD MMM YYYY"));
console.log("Role:", role);
console.log("-------------------------");

// Display matching users
users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name} (ID: ${user.id})`);
});

console.log("-------------------------");
console.log(`Total: ${users.length} user(s) found`);