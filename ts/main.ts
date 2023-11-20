class Task {
    name: string;
    notes: string;
    completed: boolean;
}
 window.onload = function() {
    let addTaskBtn = document.querySelector("#add-task") as HTMLButtonElement;
    addTaskBtn.onclick = processTask;

    let clearTaskBtn = document.querySelector("#clear-task") as HTMLButtonElement;
    clearTaskBtn.onclick = clearForm;

    let clearListBtn = document.querySelector("#clear-list") as HTMLButtonElement;
    clearListBtn.onclick = clearList;
 }


function processTask() {
    let newTask = getTask();
    if (newTask != null) {
        addTask(newTask);
        clearForm();
    }
}

function getTask():Task | null {
    // Get all input elements from the form
    let nameTextBox = document.querySelector("#task-name") as HTMLInputElement;
    let notesTextBox = document.querySelector("#notes") as HTMLInputElement;

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

    let notes:string = notesTextBox.value.trim();

    if (isValidData) {
        let addedTask = new Task();
        addedTask.name = name;
        addedTask.notes = notes;
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

    let taskNotes = document.createElement("p");
    if (t.notes != "") {        
        taskNotes.textContent = `${t.notes}`;
        taskList.appendChild(taskNotes);
    }

    taskNameHeading.addEventListener("click", function () {
        toggleTaskCompleted(taskNameHeading, taskNotes);
    });

    let taskListDisplay = document.querySelector("#tasklist-display");
    taskListDisplay!.appendChild(taskList);

    
}



function toggleTaskCompleted(heading: HTMLLIElement, notes: HTMLParagraphElement) {
    heading.classList.toggle("completed");
    if (notes != null) {
        notes.classList.toggle("completed");
    }
}

function clearForm() {
    let nameTextBox = document.querySelector("#task-name") as HTMLInputElement;
    let notesTextBox = document.querySelector("#notes") as HTMLInputElement;

    nameTextBox.value= "";
    notesTextBox.value = "";
}

function clearList() {
    let taskListDisplay = document.querySelector("#tasklist-display");
    taskListDisplay!.innerHTML = "";

    let taskListHeading = document.createElement("h2");
    taskListHeading.textContent = "Task List";
    taskListDisplay.appendChild(taskListHeading);
}
 