const userRecord: [string, number, boolean] = ["Alice", 30, true];
console.log(userRecord[0].toUpperCase());
console.log(userRecord[1].toFixed(2));
console.log(userRecord[2].toString());

//const wrongOrder: [string, number, boolean] = [30, "Alice", true];

const correctOrder: [string, number, boolean] = ["Alice", 30, true];

const coordinates: [number, number] = [19.076, 72.877];
userRecord.push("extra");

// A tuple defines fixed positions and types.
// Although push() may be allowed, accessing elements beyond the defined positions
// is not type-safe and should generally be avoided.