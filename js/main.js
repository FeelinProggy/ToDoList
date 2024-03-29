class Task {
}
window.onload = function () {
    let addTaskBtn = document.querySelector("#add-task");
    addTaskBtn.onclick = processTask;
    let clearTaskBtn = document.querySelector("#clear-task");
    clearTaskBtn.onclick = clearTextBox;
    let clearListBtn = document.querySelector("#clear-list");
    clearListBtn.onclick = clearList;
    loadTasksFromLocalStorage();
};
function processTask() {
    let newTask = getTask();
    if (newTask != null) {
        addTaskToWebpage(newTask);
        updateTaskInStorage(newTask);
        clearTextBox();
    }
}
function getTask() {
    let nameTextBox = document.querySelector("#task-name");
    let notesTextBox = document.querySelector("#notes");
    let isValidData = true;
    let name = nameTextBox.value;
    if (name.trim() == "") {
        isValidData = false;
        nameTextBox.nextElementSibling.textContent = "Please enter a name for your task";
    }
    else {
        nameTextBox.nextElementSibling.textContent = "";
    }
    let notes = notesTextBox.value.trim();
    if (isValidData) {
        let addedTask = new Task();
        addedTask.name = name;
        addedTask.notes = notes;
        addedTask.completed = false;
        return addedTask;
    }
    else {
        return null;
    }
}
function addTaskToWebpage(t) {
    let taskListDisplay = document.querySelector("#tasklist-display");
    let taskNameHeading = document.createElement("li");
    taskNameHeading.textContent = `${t.name}`;
    taskListDisplay.appendChild(taskNameHeading);
    let taskNotes = document.createElement("p");
    if (t.notes != "") {
        taskNotes.textContent = `${t.notes}`;
        taskNameHeading.appendChild(taskNotes);
    }
    taskNameHeading.addEventListener("click", function () {
        toggleTaskCompleted(t, taskNameHeading, taskNotes);
    });
    if (t.completed) {
        taskNameHeading.classList.add("completed");
    }
}
function updateTaskInStorage(t) {
    const TaskStorageKey = "Tasks";
    let taskData = localStorage.getItem(TaskStorageKey);
    let tasks = taskData ? JSON.parse(taskData) : [];
    let index = tasks.findIndex(task => task.name === t.name);
    if (index !== -1) {
        tasks[index] = t;
    }
    else {
        tasks.push(t);
    }
    taskData = JSON.stringify(tasks);
    localStorage.setItem(TaskStorageKey, taskData);
}
function loadTasksFromLocalStorage() {
    const TaskStorageKey = "Tasks";
    let taskData = localStorage.getItem(TaskStorageKey);
    if (taskData !== null) {
        let tasks = JSON.parse(taskData);
        tasks.forEach(task => addTaskToWebpage(task));
    }
}
function toggleTaskCompleted(task, taskItem, notes) {
    task.completed = !task.completed;
    if (task.completed) {
        taskItem.classList.add("completed");
    }
    else {
        taskItem.classList.remove("completed");
    }
    updateTaskInStorage(task);
}
function clearTextBox() {
    let nameTextBox = document.querySelector("#task-name");
    let notesTextBox = document.querySelector("#notes");
    nameTextBox.value = "";
    notesTextBox.value = "";
    nameTextBox.nextElementSibling.textContent = "";
}
function clearList() {
    let taskListDisplay = document.querySelector("#tasklist-display");
    taskListDisplay.innerHTML = "";
    localStorage.clear();
}
