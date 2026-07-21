const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, 'promise-output.txt');

async function fileOperations() {
    try {
        // Write to the file
        await fs.writeFile(filePath, 'Line 1 - written using fs.promises');
        console.log('File written successfully.');

        // Read the file
        const content = await fs.readFile(filePath, 'utf8');
        console.log('Content:', content);

        // Append new content
        await fs.appendFile(filePath, '\nLine 2 - appended using fs.promises');

        // Read again
        const updated = await fs.readFile(filePath, 'utf8');
        console.log('Updated Content:\n', updated);

    } catch (err) {
        console.error('Error:', err.message);
    }
}

fileOperations();

const fsSync = require('fs');

console.log('\nJavaScript files in the session2 folder:\n');

const files = fsSync.readdirSync(__dirname);

files.forEach(file => {

    if (file.endsWith('.js')) {

        const stats = fsSync.statSync(path.join(__dirname, file));

        const sizeKB = (stats.size / 1024).toFixed(2);

        console.log(`${file} - ${sizeKB} KB`);
    }

});