const fs = require('fs');
const path = require('path');

// Create the full path for output.txt.
const filePath = path.join(__dirname, 'output.txt');

// writeFileSync() creates a new file or overwrites an existing file.
fs.writeFileSync(filePath, 'Line 1 - written by Node.js');
console.log('File written');

// readFileSync() reads the file contents synchronously.
const content = fs.readFileSync(filePath, 'utf8');
console.log('Content:', content);

// appendFileSync() adds new content without deleting existing content.
fs.appendFileSync(filePath, '\nLine 2 - appended');
fs.appendFileSync(filePath, '\nLine 3 - appended again');

// Read the updated file.
const updated = fs.readFileSync(filePath, 'utf8');
console.log('Updated:\n', updated);

/*
Difference:
- writeFileSync() creates a new file or overwrites the existing file.
- appendFileSync() adds data to the end of an existing file without removing its current content.
*/

// Check whether missing.txt exists.
const checkPath = path.join(__dirname, 'missing.txt');

if (fs.existsSync(checkPath)) {
    console.log('File exists');
} else {
    console.log('File does not exist - creating it');
    fs.writeFileSync(checkPath, 'Created because it was missing');
}

/*
If readFileSync() is called on a file that does not exist,
Node.js throws an ENOENT error and the program stops.

To avoid this, we can:
1. Check if the file exists using fs.existsSync().
2. Use try...catch to handle the error gracefully.
*/