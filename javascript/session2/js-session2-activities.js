console.log("1");

setTimeout(() => {
    console.log("2");
}, 1000);

console.log("3");

//console.log("1");

//setTimeout(() => {
    //console.log("2");
//}, 0);

//console.log("3");

console.log("Fetching data...");

setTimeout(() => {
    console.log("Data received!");
}, 2000);


//Activity 2

const getData = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;

    setTimeout(() => {
        if (success)
            resolve("Data loaded!");
        else
            reject("Something went wrong");
    }, 1000);
});

getData
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });

const startValue = new Promise((resolve) => {
    resolve(5);
});

startValue
    .then(number => number * 2)
    .then(number => number + 10)
    .then(result => {
        console.log(result);
    });

const promise1 = new Promise((resolve) =>
    setTimeout(() => resolve("User loaded"), 1000)
);

const promise2 = new Promise((resolve) =>
    setTimeout(() => resolve("Orders loaded"), 1500)
);

Promise.all([promise1, promise2])
    .then(results => {
        console.log(results);
    });


//Activity 3

async function fetchUser() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const user = await response.json();
        console.log(user.name);
    } catch (error) {
        console.log(error);
    }
}

fetchUser();

const getUserById = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await response.json();

    return {
        name: user.name,
        email: user.email
    };
};

getUserById(3)
    .then(result => {
        console.log(result);
    });

const getAllUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    return users.map(user => ({
        name: user.name,
        email: user.email
    }));
};

getAllUsers()
    .then(result => {
        console.log(result);
    });

//Activity 4

const fetchUserWithErrorHandling = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
};

fetchUserWithErrorHandling();

const fetchMissing = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/2");

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log("Caught:", error.message);
    }
};

fetchMissing();

Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/users/1"),
    fetch("https://invalid-url.com")
])
.then(results => {
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Promise ${index + 1} succeeded`);
        } else {
            console.log(`Promise ${index + 1} failed`);
        }
    });
});

//Activity 5

document.getElementById("title").textContent = "Hello, Intern!";

document.getElementById("subtitle").style.color = "blue";

const counter = Number(document.getElementById("counter").textContent);

document.getElementById("counter").textContent = counter + 1;

const names = ["Alice", "Bob", "Carol"];

let output = "";

names.forEach(name => {
    output += `<li>${name}</li>`;
});


document.getElementById("user-list").innerHTML = output;


//Activity 6

document.getElementById("greet-btn")
    .addEventListener("click", () => {

        const name = document.getElementById("name-input").value;

        if (name === "") {
            document.getElementById("greeting").textContent =
                "Please enter a name";
        }
        else {
            document.getElementById("greeting").textContent =
                `Hello, ${name}!`;
        }

    });

let count = 0;

document.getElementById("add-btn")
    .addEventListener("click", () => {

        count++;

        document.getElementById("click-count").textContent =
            `Clicks: ${count}`;

    });

document.getElementById("reset-btn")
    .addEventListener("click", () => {

        count = 0;

        document.getElementById("click-count").textContent =
            "Clicks: 0";

    });

document.getElementById("name-input")
    .addEventListener("input", (event) => {

        document.getElementById("greeting").textContent =
            `Hello, ${event.target.value}!`;

    });

document.getElementById("name-input")
    .addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            document.getElementById("greet-btn").click();

        }

    });


//Activity 7

let allUsers = [];

document.getElementById("load-btn")
    .addEventListener("click", async () => {

        try {

            document.getElementById("status").textContent =
                "Loading...";

            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );

            const users = await response.json();

            allUsers = users;

            renderUsers(users);

            document.getElementById("status").textContent =
                `${users.length} users loaded`;

        }

        catch (error) {

            document.getElementById("status").textContent =
                "Failed to load users. Try again.";

            document.getElementById("users-container").innerHTML =
                "";

        }

    });

function renderUsers(users) {

    let html = "";

    users.forEach(user => {

        html += `
            <div>
                <h3>${user.name}</h3>
                <p>${user.email}</p>
                <p>${user.address.city}</p>
            </div>
            <hr>
        `;

    });

    document.getElementById("users-container").innerHTML =
        html;

}

document.getElementById("search")
    .addEventListener("input", (event) => {

        const searchText =
            event.target.value.toLowerCase();

        const filteredUsers =
            allUsers.filter(user =>
                user.name.toLowerCase()
                    .includes(searchText)
            );

        renderUsers(filteredUsers);

    });


//Activity 8

// Task 1

async function getUserAndPosts() {

    const [userResponse, postsResponse] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users/1"),
        fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
    ]);

    const user = await userResponse.json();
    const posts = await postsResponse.json();

    console.log(`${user.name} has ${posts.length} posts`);

}

getUserAndPosts();


// Task 2

async function renderUsersWithCreateElement() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const users = await response.json();

    const userList = document.getElementById("user-list");

    userList.innerHTML = "";

    users.forEach(user => {

        const li = document.createElement("li");

        li.textContent = user.name;

        userList.appendChild(li);

    });

}

renderUsersWithCreateElement();


// Task 3

async function saveUsersToLocalStorage() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const users = await response.json();

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    console.log("Users saved to localStorage");

}

saveUsersToLocalStorage();

const savedUsers = JSON.parse(
    localStorage.getItem("users")
);

console.log(savedUsers);


// Task 4

const controller = new AbortController();

document.getElementById("load-btn")
    .addEventListener("click", async () => {

        try {

            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users",
                {
                    signal: controller.signal
                }
            );

            const users = await response.json();

            console.log(users);

        }

        catch (error) {

            console.log("Fetch cancelled");

        }

    });



document.getElementById("cancel-btn")
    .addEventListener("click", () => {

        controller.abort();

    });