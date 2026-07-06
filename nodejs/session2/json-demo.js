const fs = require('fs');
const path = require('path');

// Build the full path to data.json.
const filePath = path.join(__dirname, 'data.json');

// Read the JSON file as text.
const raw = fs.readFileSync(filePath, 'utf8');

// Convert the JSON string into a JavaScript array of objects.
const users = JSON.parse(raw);

console.log('All users:', users);
console.log('Total:', users.length);

// Find users with a score of 90 or above.
const top = users.filter(u => u.score >= 90);
console.log('Top scorers:', top.map(u => u.name));

// Calculate the average score.
const avg = users.reduce((sum, u) => sum + u.score, 0) / users.length;
console.log('Average score:', avg.toFixed(1));

/*
JSON.parse() converts a JSON string into a JavaScript object or array.

Without JSON.parse(), the file content would remain a plain string,
so we could not use array methods like filter(), map(), or reduce().
*/

// Add a new user.
const newUser = {
    id: 5,
    name: 'Vikram',
    role: 'intern',
    score: 88
};

users.push(newUser);

// Convert the JavaScript array back into formatted JSON.
const updated = JSON.stringify(users, null, 2);

// Write the updated JSON back to the file.
fs.writeFileSync(filePath, updated);

console.log('User added and file updated');

// Verify the updated file.
const verify = JSON.parse(fs.readFileSync(filePath, 'utf8'));
console.log('Total after update:', verify.length);

/*
JSON.stringify(users, null, 2)

null -> no custom replacer function.
2    -> indent each level with 2 spaces to make the JSON readable.

Without "null, 2", the JSON would be written as a single long line,
making it difficult to read.
*/

// Read the latest data from the JSON file.
const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Find the index of the user named "Amit".
const index = currentData.findIndex(u => u.name === 'Amit');

if (index !== -1) {

    currentData[index].score = 90;

    fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));

    console.log('Amit score updated to 90');
}

/*
Difference between find() and findIndex():

find()
- Returns the actual object that matches the condition.

findIndex()
- Returns the index (position) of the matching object.

Use findIndex() when you want to update or replace an element
inside an array because the index lets you modify that element directly.
*/