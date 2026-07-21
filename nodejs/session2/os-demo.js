const os = require('os');

// Returns the operating system platform (win32, linux, darwin).
console.log('Platform:     ', os.platform());

// Returns the CPU architecture (x64, arm64, etc.).
console.log('Architecture: ', os.arch());

// Returns the computer's network hostname.
console.log('Hostname:     ', os.hostname());

// Returns the current user's home directory.
console.log('Home dir:     ', os.homedir());

// Returns an array of CPU information.
// .length gives the total number of CPU cores.
console.log('CPU cores:    ', os.cpus().length);

// Convert memory from bytes to MB.
const totalMB = Math.round(os.totalmem() / 1024 / 1024);
const freeMB = Math.round(os.freemem() / 1024 / 1024);

// Displays available and total system memory.
console.log(`Memory: ${freeMB}MB free of ${totalMB}MB`);

const platform = os.platform();

// Check which operating system the application is running on.
if (platform === 'win32') {
    console.log('Running on Windows');
} else if (platform === 'darwin') {
    console.log('Running on Mac');
} else {
    console.log('Running on Linux');
}

// Calculate the percentage of free memory.
const freePercent = Math.round((os.freemem() / os.totalmem()) * 100);

// Display a warning if free memory is below 20%.
if (freePercent < 20) {
    console.log('Warning: Low memory —', freePercent + '% free');
} else {
    console.log('Memory OK —', freePercent + '% free');
}

/*
Real-world example:
A Node.js application may check the operating system at runtime
to use different file paths, execute OS-specific commands,
or load platform-specific dependencies. For example, a backup
application might use Windows commands on Windows and Linux
commands on Linux.
*/