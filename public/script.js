"use strict";
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
let tasks = [];
window.addEventListener("load", () => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
        tasks = JSON.parse(stored);
        renderTasks();
    }
});
addTaskBtn.addEventListener("click", addTask);
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Please enter a task!");
        return;
    }
    const newTask = { text, completed: false };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
}
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.style.textDecoration = "line-through";
        }
        li.appendChild(span);
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };
        li.appendChild(delBtn);
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };
        li.appendChild(doneBtn);
        taskList.appendChild(li);
    });
}
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
