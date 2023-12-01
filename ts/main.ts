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
        updateTaskInStorage(newTask);
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
        toggleTaskCompleted(t, taskNameHeading, taskNotes);
    });
}

function updateTaskInStorage(t: Task): void {
    const TaskStorageKey = "Tasks";

    // Read existing tasks from storage or initialize a new array if none exist.
    let taskData = localStorage.getItem(TaskStorageKey);
    let tasks: Task[] = taskData ? JSON.parse(taskData) : [];

    // To update when the user toggles task completed status...
    // Find the index of the task if it already exists.
    let index = tasks.findIndex(task => task.name === t.name);
    
    if (index !== -1) {
        // Update the existing task
        tasks[index] = t;
    } else {
        // Add the new Task object to the list
        tasks.push(t);
    }

    // Convert the task array to a JSON string and store it
    taskData = JSON.stringify(tasks);
    localStorage.setItem(TaskStorageKey, taskData);
}

// Toggles the completed: boolean status on the task item and updates the class for CSS
function toggleTaskCompleted(task: Task, taskItem: HTMLLIElement, notes: HTMLParagraphElement) {
    // Toggle the completed status of the task
    task.completed = !task.completed;
    // Update the task item's class
    taskItem.classList.toggle("completed");
    //console.log(JSON.stringify(task));

    // Call the function to update completion status in storage
    updateTaskInStorage(task);
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

