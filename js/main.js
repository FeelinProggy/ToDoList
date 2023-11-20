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
    let nameInput = document.querySelector("#task-name");
    let descriptionInput = document.querySelector("#description");
    let isValidData = true;
    let name = nameInput.value;
    if (name.trim() == "") {
        isValidData = false;
        nameInput.nextElementSibling.textContent = "Please enter a name fo your task";
    }
    else {
        nameInput.nextElementSibling.textContent = "";
    }
    let description = descriptionInput.value.trim();
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
}
