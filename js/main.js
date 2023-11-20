class Task {
}
window.onload = function () {
    let addTaskBtn = document.querySelector("#add-task");
    addTaskBtn.onclick = processTask;
};
function processTask() {
    let newTask = getTask();
    if (newTask != null) {
        addTask(newTask);
    }
}
function getTask() {
    let nameTextBox = document.querySelector("#task-name");
    let descriptionTextBox = document.querySelector("#description");
    let isValidData = true;
    let name = nameTextBox.value;
    if (name.trim() == "") {
        isValidData = false;
        nameTextBox.nextElementSibling.textContent = "Please enter a name fo your task";
    }
    else {
        nameTextBox.nextElementSibling.textContent = "";
    }
    let description = descriptionTextBox.value.trim();
    if (isValidData) {
        let addedTask = new Task();
        addedTask.name = name;
        addedTask.description = description;
        addedTask.completed = false;
        return addedTask;
    }
    else {
        return null;
    }
}
function addTask(t) {
    console.log(t);
    let taskList = document.createElement("ul");
    let taskNameHeading = document.createElement("li");
    taskNameHeading.textContent = `${t.name}`;
    taskList.appendChild(taskNameHeading);
    if (t.description != "") {
        let taskDescription = document.createElement("p");
        taskDescription.textContent = `${t.description}`;
        taskList.appendChild(taskDescription);
    }
    let taskListDisplay = document.querySelector("#tasklist-display");
    taskListDisplay.appendChild(taskList);
}
