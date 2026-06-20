interface User {
    readonly id: string;
    name: string;
    email: string;
    age?: number;
    role: "admin" | "editor" | "viewer";
}

const adminUser: User = {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    role: "admin"
};

const editorUser: User = {
    id: "2",
    name: "Bob",
    email: "bob@example.com",
    role: "editor"
};

const viewerUser: User = {
    id: "3",
    name: "Charlie",
    email: "charlie@example.com",
    role: "viewer"
};