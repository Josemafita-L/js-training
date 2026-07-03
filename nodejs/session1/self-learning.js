const fs = require("fs").promises;
const path = require("path");

async function fileOperations() {
    try {
        const filePath = path.join(__dirname, "async-output.txt");

        // Write to file
        await fs.writeFile(filePath, "Hello from fs.promises!");

        // Read the file
        const content = await fs.readFile(filePath, "utf8");
        console.log("File content:", content);

        // Append new content
        await fs.appendFile(filePath, "\nThis line was appended asynchronously.");

        // Read again
        const updated = await fs.readFile(filePath, "utf8");
        console.log("Updated content:\n", updated);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

fileOperations();