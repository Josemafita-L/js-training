const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');

// Synchronous Example

console.log('1 - before sync read');

const data = fs.readFileSync(filePath, 'utf8');

console.log('2 - sync read done:', data.split('\n').length, 'lines');

console.log('3 - after sync read');

console.log('----------------');


// Asynchronous Example

console.log('4 - before async read');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;

    console.log('6 - async read done:', data.split('\n').length, 'lines');
});

console.log('5 - after async read (does not wait)');

/*
Why does the order matter?

Synchronous operations block the program until the file operation finishes.
Asynchronous operations allow the program to continue executing other tasks
while waiting for the file operation to complete. This helps a server handle
multiple users efficiently without making everyone wait.
*/