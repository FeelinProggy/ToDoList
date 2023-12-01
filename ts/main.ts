class Task {
    name: string;
    notes: string;
    completed: boolean;
}
window.onload = function () {
    

    let addTaskBtn = document.querySelector("#add-task") as HTMLButtonElement;
    addTaskBtn.onclick = processTask;

    // Clears the form text boxes
    let clearTaskBtn = document.querySelector("#clear-task") as HTMLButtonElement;
    clearTaskBtn.onclick = clearTextBox;

    // Clears the list of tasks submitted
    let clearListBtn = document.querySelector("#clear-list") as HTMLButtonElement;
    clearListBtn.onclick = clearList;
}

function processTask() {
    let newTask = getTask();
    if (newTask != null) {
        addTaskToWebpage(newTask);
        addTaskToStorage(newTask);
        clearTextBox();
    }
}

function getTask(): Task | null {
    // Get all input elements from the form
    let nameTextBox = document.querySelector("#task-name") as HTMLInputElement;
    let notesTextBox = document.querySelector("#notes") as HTMLInputElement;

    // Validate data
    let isValidData: boolean = true;

    //Validate name
    let name: string = nameTextBox.value;
    if (name.trim() == "") {
        isValidData = false;
        nameTextBox.nextElementSibling!.textContent = "Please enter a name for your task"
    }
    else {
        nameTextBox.nextElementSibling!.textContent = "";
    }
    // Saving notes to a variable. Notes are optional so no validation is needed.
    let notes: string = notesTextBox.value.trim();

    // Create the new task object if the data is valid
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

// Adds the task object to the Task List 
// to be displayed on the webpage.
function addTaskToWebpage(t: Task): void {
    
    // The UL that will contain the task name and notes
    let taskListDisplay = document.querySelector("#tasklist-display");

    // Create a new li for each new task and append it to the ul
    let taskNameHeading = document.createElement("li");
    taskNameHeading.textContent = `${t.name}`;
    taskListDisplay.appendChild(taskNameHeading);

    // If the task has notes, create a p element and append it to the li
    let taskNotes = document.createElement("p");
    if (t.notes != "") {
        taskNotes.textContent = `${t.notes}`;
        taskNameHeading.appendChild(taskNotes);
    }

    // Add the event listener to toggle the completed status of the task when clicked
    taskNameHeading.addEventListener("click", function () {
        toggleTaskCompleted(taskNameHeading, taskNotes);
    });
}

function addTaskToStorage(t: Task): void {
    const TaskStorageKey = "Tasks";

    // Read existing tasks from storage
    let taskData = localStorage.getItem(TaskStorageKey);

    // if taskData is null, there are no tasks in storage
    if (taskData == null) {
        // If there are no tasks, create a new list and add current task.
        let  tasks:Task[] = [];
        tasks.push(t);

        // Convert Task object to JSON string and update taskData
        taskData = JSON.stringify(tasks);
        // Store string in local storage
        localStorage.setItem(TaskStorageKey, taskData);
    }
    else {
        // Parse the JSON string back into a list of Task objects
        let tasks: Task[] = JSON.parse(taskData);
        // Add the new Task objects to the list
        tasks.push(t);

        // Convert Task object to JSON string and update taskData
        taskData = JSON.stringify(tasks);
        // Store string in local storage
        localStorage.setItem(TaskStorageKey, taskData);
    }
}

// Toggles the completed: boolean status on the task item
function toggleTaskCompleted(taskItem: HTMLLIElement, notes: HTMLParagraphElement) {
    taskItem.classList.toggle("completed");
}

// Clears the form text boxes
function clearTextBox() {
    let nameTextBox = document.querySelector("#task-name") as HTMLInputElement;
    let notesTextBox = document.querySelector("#notes") as HTMLInputElement;

    nameTextBox.value = "";
    notesTextBox.value = "";
    nameTextBox.nextElementSibling!.textContent = "";
}

// Empties the tasklist ul of preciously submitted tasks
function clearList() {
    let taskListDisplay = document.querySelector("#tasklist-display");
    taskListDisplay!.innerHTML = "";
}

