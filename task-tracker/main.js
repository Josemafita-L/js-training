import { TaskManager, groupBy } from "./tasks.js";

const manager = new TaskManager();

const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const clearAll = document.querySelector("#clear-all");

const filterAll = document.querySelector("#filter-all");
const filterPending = document.querySelector("#filter-pending");
const filterDone = document.querySelector("#filter-done");

const sortBy = document.querySelector("#sort-by");

const counter = document.querySelector("#task-counter");
const summaryBody = document.querySelector("#summary-body");

let currentFilter = "all";

function renderSummary(tasks) {

    const grouped = groupBy(tasks, "priority");

    summaryBody.innerHTML = "";

    ["High", "Medium", "Low"].forEach(priority => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${priority}</td>
            <td>${grouped[priority] ? grouped[priority].length : 0}</td>
        `;

        summaryBody.appendChild(row);

    });

}

function render() {

    let tasks = manager.filter(currentFilter);

    if (sortBy.value === "priority") {

        tasks = [...tasks].sort((a, b) => {

            const order = {
                High: 1,
                Medium: 2,
                Low: 3
            };

            return order[a.priority] - order[b.priority];

        });

    }

    if (sortBy.value === "dueDate") {

        tasks = [...tasks].sort((a, b) =>
            new Date(a.dueDate) - new Date(b.dueDate)
        );

    }

    taskList.innerHTML = "";

    tasks.map(task => {

        const li = document.createElement("li");

        const info = document.createElement("div");
        info.className = "task-info";

        info.innerHTML = `
            <strong>${task.name}</strong><br>
            Priority: ${task.priority}<br>
            Due Date: ${task.dueDate}
        `;

        if (task.done) {
            li.classList.add("done");
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);

        if (due <= today) {
            li.classList.add("overdue");
        }

        const buttonGroup = document.createElement("div");
        buttonGroup.className = "task-buttons";

        const doneBtn = document.createElement("button");
        doneBtn.type = "button";
        doneBtn.textContent = "Done";

        doneBtn.addEventListener("click", () => {

            manager.toggle(task.id);

            render();

        });

        buttonGroup.appendChild(doneBtn);

        li.appendChild(info);
        li.appendChild(buttonGroup);

        taskList.appendChild(li);

    });

    counter.textContent =
        `Showing ${tasks.length} of ${manager.getAll().length} tasks`;

    renderSummary(manager.getAll());

}

taskForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = document.querySelector("#task-name").value.trim();
    const priority = document.querySelector("#priority").value;
    const dueDate = document.querySelector("#due-date").value;

    if (!name || !dueDate) {
        alert("Please fill all fields.");
        return;
    }

    manager.add({
        name,
        priority,
        dueDate
    });

    taskForm.reset();

    render();

});

clearAll.addEventListener("click", () => {

    manager.clear();

    render();

});

filterAll.addEventListener("click", () => {

    currentFilter = "all";

    render();

});

filterPending.addEventListener("click", () => {

    currentFilter = "pending";

    render();

});

filterDone.addEventListener("click", () => {

    currentFilter = "done";

    render();

});

sortBy.addEventListener("change", render);

render();