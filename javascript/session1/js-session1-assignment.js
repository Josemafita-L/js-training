console.log("Hello");
//section 1
const name="Josemafita";
let age=21;
const role="Developer";
let isAvail=true;

console.log(`name is a type of ${typeof name}`);
console.log(`age is a type of ${typeof age}`);
console.log(`role is a type of ${typeof role}`);
console.log(`isAvail is a type of ${typeof isAvail}`);

//role="tester";

//section 2
console.log(`I am ${name} and i am a ${role}`);

console.log(`Available: ${isAvail}`);

console.log(`My name has ${name.length} characters.`);

//section 3
const fullname=(first,last)=>{return `Hello ,${first} ${last}`};
console.log(fullname("Jose","Mafita"));

const isAdult=(age)=>{
return age>=18;
};
console.log(isAdult(15));
console.log(isAdult(21));

const formatuser=(user)=>{
return `${user.name}-${user.role}`};

console.log(formatuser(
{name:"Jose",
role:"Dev"}));

//section 4
const user={
name1:"Josemafita",
id:1,
role1:"developer",
active:true,
address:{
city:"coimbatore",
country:"Tamilnadu"}
};

const {name1,role1,active}=user;
console.log(name1);
console.log(role1);
console.log(active);

const {
    address: { city }
} = user;

console.log(city);

const updatedUser = {
    ...user,
    active: false
};

console.log(updatedUser);



// Section 5

const devs = ["Alice", "Carol"];
const designers = ["Bob", "Dan"];

const team = [...devs, ...designers];

console.log(team);

const updatedTeam = [...team, "Eve"];

console.log(updatedTeam);

const [firstMember, secondMember] = team;

console.log(firstMember);
console.log(secondMember);



// Section 6

const users = [
    { id: 1, name: "Alice", role: "dev", active: true },
    { id: 2, name: "Bob", role: "design", active: false },
    { id: 3, name: "Carol", role: "dev", active: true },
    { id: 4, name: "Dan", role: "design", active: true },
    { id: 5, name: "Eve", role: "dev", active: false }
];

const activeUsers = users.filter(
    user => user.active
);

console.log(activeUsers);

const developers = users.filter(
    user => user.role === "dev"
);

console.log(developers);

const descriptions = users.map(
    user => `${user.name} is a ${user.role}`
);

console.log(descriptions);

const activeDevs = users
    .filter(user => user.active && user.role === "dev")
    .map(user => user.name);

console.log(activeDevs);



// Section 7

const roleCount = users.reduce((accumulator, user) => {
    accumulator[user.role] = (accumulator[user.role] || 0) + 1;
    return accumulator;
}, {});

console.log(roleCount);

const firstActiveDesigner = users.find(
    user => user.active && user.role === "design"
);

console.log(firstActiveDesigner);

const hasInactiveUsers = users.some(
    user => !user.active
);

console.log(hasInactiveUsers);

const allUsersHaveRole = users.every(
    user => user.role
);

console.log(allUsersHaveRole);


// Section 8

// Bug 1
const input = "5";
const score = 5;

if (input === score) {
    console.log("match");
}

// === compares value and datatype.

// Bug 2
const doubled = [1, 2, 3].map(n => {
    return n * 2;
});

console.log(doubled);

// Missing return caused undefined values.

// Bug 3
const original = [1, 2, 3];

const newArray = [...original, 4];

console.log(original);
console.log(newArray);

// Spread creates a new array without modifying original.

// Bug 4
const userObj = {
    name: "Jose",
    active: true
};

userObj.active = false;

console.log(userObj);

// Modifying object properties is allowed.

// userObj = { name: "mafi" };
// TypeError: Assignment to constant variable.


// Section 9

// Case sensitivity
const Username = "Jose";
const username = "mafita";

console.log(Username);
console.log(username);

// undefined vs null
const a = null;
const b = undefined;

console.log(typeof a);
console.log(typeof b);

// null means intentionally empty.
// undefined means no value assigned.
// typeof null returns "object" because of an old JavaScript quirk.

// Call order matters
const greet = (name) => `Hello, ${name}`;

console.log(greet("Josemafita"));

// Arrow functions are not hoisted like normal functions.
// Define them before calling them.

// Semicolon style
const x = 10;
const y = 20;

console.log(x + y);