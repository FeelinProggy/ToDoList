class Task {
    name: string;
    description: string;
    completed: boolean;
}
 window.onload = function() {
    let addTaskBtn = document.querySelector("#add-task") as HTMLButtonElement;
    addTaskBtn.onclick = processTask;
 }


function processTask() {
    let newTask = getTask();
    if (newTask != null) {
        addTask(newTask);
    }
}

function getTask():Task | null {
    // Get all input elements from the form
    let nameTextBox = document.querySelector("#task-name") as HTMLInputElement;
    let descriptionTextBox = document.querySelector("#description") as HTMLInputElement;

    // Validate data
    let isValidData:boolean = true;

    //Validate name
    let name:string = nameTextBox.value;
    if (name.trim() == "") {
        isValidData = false;
        nameTextBox.nextElementSibling!.textContent = "Please enter a name for your task"
    }
    else {
        nameTextBox.nextElementSibling!.textContent = "";
    }

    let description:string = descriptionTextBox.value.trim();

    if (isValidData) {
        let addedTask = new Task();
        addedTask.name = name;
        addedTask.description = description;
        addedTask.completed = false;
        return addedTask;
    }
    else{
        return null;
    }
}

function addTask(t:Task):void {
    console.log(t);

    let taskList:HTMLUListElement = document.createElement("ul");
    
    let taskNameHeading = document.createElement("li");
    taskNameHeading.textContent = `${t.name}`;
    taskList.appendChild(taskNameHeading);
    if (t.description != "") {
        let taskDescription = document.createElement("p");
        taskDescription.textContent = `${t.description}`;
        taskList.appendChild(taskDescription);
    }

    let taskListDisplay = document.querySelector("#tasklist-display");
    taskListDisplay!.appendChild(taskList);
}
 