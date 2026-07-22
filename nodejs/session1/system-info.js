const os = require("os");

// Platform information can be used to run different logic
// for Windows, Linux, or macOS.

// Memory information helps applications monitor resource usage,
// avoid crashes, or decide whether enough memory is available
// before performing large operations.

console.log("Platform:", os.platform());

console.log("Architecture:", os.arch());

console.log("Hostname:", os.hostname());

console.log("Home directory:", os.homedir());

console.log("CPUs:", os.cpus().length);

console.log(
    "Total memory (MB):",
    Math.round(os.totalmem() / 1024 / 1024)
);

console.log(
    "Free memory (MB):",
    Math.round(os.freemem() / 1024 / 1024)
);