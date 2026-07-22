const path = require('path');

// __dirname returns the absolute path of the folder where this file is located.
console.log('Current directory:', __dirname);

// __filename returns the absolute path of the current file including its name.
console.log('Current file:     ', __filename);

// path.join() safely combines folder names into one complete path.
const filePath = path.join(__dirname, 'data', 'users.json');
console.log('Joined path:', filePath);

// path.basename() returns only the file name from a full path.
console.log('Basename:', path.basename('/home/user/notes.txt'));

// path.extname() returns the file extension.
console.log('Extension:', path.extname('index.html'));

// path.dirname() returns the directory portion of a path.
console.log('Dirname:  ', path.dirname('/home/user/notes.txt'));

// Manual string concatenation can break on different operating systems.
const manual = __dirname + '/data/users.json';
console.log('Manual:    ', manual);

// path.join() creates the correct path for any operating system.
const joined = path.join(__dirname, 'data', 'users.json');
console.log('path.join: ', joined);

// path.resolve() returns an absolute path by resolving the given path.
const resolved = path.resolve('data', 'users.json');
console.log('Resolved:  ', resolved);

/*
Difference between path.join() and path.resolve():

path.join():
- Combines path segments into a single path.
- Does not automatically convert relative paths to absolute paths unless one of the segments is already absolute.
- Commonly used to build file and folder paths.

path.resolve():
- Resolves the path and always returns an absolute path.
- Starts from the current working directory if no absolute path is provided.
- Useful when an application needs the full absolute location of a file.
*/