export interface Task {
    id: number;
    name: string;
    priority: "Low" | "Medium" | "High";
    dueDate: string;
    done: boolean;
}

export class TaskManager {
    private tasks: Task[] = [];

    constructor() {
        this.load();
    }

    add(data: Omit<Task, "id" | "done">): Task {
        const task: Task = {
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

    getAll(): Task[] {
        return [...this.tasks];
    }

    toggle(id: number): void {
        const task = this.tasks.find(task => task.id === id);

        if (task) {
            task.done = !task.done;
            this.save();
        }
    }

    filter(status: "all" | "done" | "pending"): Task[] {
        switch (status) {
            case "done":
                return this.tasks.filter(task => task.done);

            case "pending":
                return this.tasks.filter(task => !task.done);

            default:
                return [...this.tasks];
        }
    }

    sortBy(field: keyof Pick<Task, "priority" | "dueDate">): Task[] {
        const sorted = [...this.tasks];

        if (field === "priority") {
            const order: Record<Task["priority"], number> = {
                High: 1,
                Medium: 2,
                Low: 3
            };

            sorted.sort((a, b) => order[a.priority] - order[b.priority]);
        } else {
            sorted.sort(
                (a, b) =>
                    new Date(a.dueDate).getTime() -
                    new Date(b.dueDate).getTime()
            );
        }

        return sorted;
    }

    clear(): void {
        this.tasks = [];
        this.save();
    }

    private save(): void {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    load(): void {
        const data = localStorage.getItem("tasks");

        if (data) {
            this.tasks = JSON.parse(data);
        }
    }
}

export function groupBy<T>(
    items: T[],
    key: keyof T
): Record<string, T[]> {

    return items.reduce((groups, item) => {

        const group = String(item[key]);

        if (!groups[group]) {
            groups[group] = [];
        }

        groups[group].push(item);

        return groups;

    }, {} as Record<string, T[]>);
}