const fs = require("fs");

// writeFileSync() creates a new file or overwrites an existing file.
// Use it when you want to replace the entire contents of a file.
fs.writeFileSync(
    "nodejs/session1/output.txt",
    "Hello from Node.js file system!"
);

// readFileSync() reads the contents of a file synchronously.
const content = fs.readFileSync("nodejs/session1/output.txt", "utf8");

console.log("File content:", content);

// appendFileSync() adds new content to the end of an existing file
// without deleting the previous contents.
fs.appendFileSync(
    "nodejs/session1/output.txt",
    "\nThis line was appended."
);

// Read again after appending
const updated = fs.readFileSync("nodejs/session1/output.txt", "utf8");

console.log("Updated content:", updated);