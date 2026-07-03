// require('dayjs') loads the installed dayjs package.
// Node.js first checks built-in modules, then looks inside
// the node_modules folder to find installed packages.
const dayjs = require("dayjs");

console.log("Today:", dayjs().format("DD MMM YYYY"));

console.log("Day of week:", dayjs().format("dddd"));

console.log(
    "Next week:",
    dayjs().add(7, "day").format("DD MMM YYYY")
);

console.log(
    "Is before 2030?",
    dayjs().isBefore("2030-01-01")
);