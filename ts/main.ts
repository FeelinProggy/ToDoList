class Task {
    name: string;
    description: string;
    dueDate: Date;
    completed: boolean;
}
 window.onload = function() {
    let addTaskBtn = <HTMLElement>document.querySelector("#add-task") as HTMLButtonElement;
    addTaskBtn.onclick = addTask;
 }

 