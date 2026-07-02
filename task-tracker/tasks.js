export class TaskManager {
    constructor() {
        this.tasks = [];
        this.load();
    }
    add(data) {
        const task = {
            id: Date.now(),
            name: data.name,
            priority: data.priority,
            dueDate: data.dueDate,
            done: false
        };
        this.tasks.push(task);
        this.save();
        return task;
    }
    getAll() {
        return [...this.tasks];
    }
    toggle(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.done = !task.done;
            this.save();
        }
    }
    filter(status) {
        switch (status) {
            case "done":
                return this.tasks.filter(task => task.done);
            case "pending":
                return this.tasks.filter(task => !task.done);
            default:
                return [...this.tasks];
        }
    }
    sortBy(field) {
        const sorted = [...this.tasks];
        if (field === "priority") {
            const order = {
                High: 1,
                Medium: 2,
                Low: 3
            };
            sorted.sort((a, b) => order[a.priority] - order[b.priority]);
        }
        else {
            sorted.sort((a, b) => new Date(a.dueDate).getTime() -
                new Date(b.dueDate).getTime());
        }
        return sorted;
    }
    clear() {
        this.tasks = [];
        this.save();
    }
    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    load() {
        const data = localStorage.getItem("tasks");
        if (data) {
            this.tasks = JSON.parse(data);
        }
    }
}
export function groupBy(items, key) {
    return items.reduce((groups, item) => {
        const group = String(item[key]);
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(item);
        return groups;
    }, {});
}
