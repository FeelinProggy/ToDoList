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
    let nameInput = document.querySelector("#task-name") as HTMLInputElement;
    let descriptionInput = document.querySelector("#description") as HTMLInputElement;

    // Validate data
    let isValidData:boolean = true;

    //Validate name
    let name:string = nameInput.value;
    if (name.trim() == "") {
        isValidData = false;
        nameInput.nextElementSibling!.textContent = "Please enter a name fo your task";
    }
    else {
        nameInput.nextElementSibling!.textContent = "";
    }

    let description:string = descriptionInput.value.trim();

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
}
 