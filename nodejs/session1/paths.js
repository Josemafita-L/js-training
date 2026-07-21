const path = require("path");

console.log("Directory name:", __dirname);

console.log("File name:", __filename);

// path.join() safely joins file paths using the correct separator
// for the current operating system.
// It is preferred over manually concatenating strings because it
// automatically handles "/" and "\" differences across platforms.
const joined = path.join(__dirname, "data", "users.json");

console.log("Joined path:", joined);

console.log("Extension:", path.extname("index.html"));

console.log("Basename:", path.basename("/users/rahul/notes.txt"));

console.log("Dirname:", path.dirname("/users/rahul/notes.txt"));