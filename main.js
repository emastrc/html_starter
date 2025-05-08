const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const taskList = document.querySelector("#tasks");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Ohne event.preventDefault() wird die Standardaktion des Browsers ausgeführt, die mit dem jeweiligen Ereignis verbunden ist. Im Fall deines Formulars (submit-Ereignis) bedeutet dies ein GET request
  const enteredTask = input.value;
  console.log(enteredTask);
  if (enteredTask === "") {
    alert("Bitte gebe einen Task ein!");
  } else {
    createNewTask(enteredTask);
    input.value = "";
  }
});

function createNewTask(enteredTask) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  const taskInputElement = document.createElement("input");
  taskInputElement.classList.add("text");
  taskInputElement.type = "text";
  taskInputElement.value = enteredTask;
  taskInputElement.readOnly = true;

  const taskActionsElement = document.createElement("div");
  taskActionsElement.classList.add("task-actions");

  const taskEditButton = document.createElement("button");
  const taskDeleteButton = document.createElement("button");

  taskEditButton.classList.add("edit");
  taskDeleteButton.classList.add("delete");

  taskEditButton.innerHTML = "Bearbeiten";
  taskDeleteButton.innerHTML = "Löschen";

  taskActionsElement.appendChild(taskEditButton);
  taskActionsElement.appendChild(taskDeleteButton);

  addEditListener(taskEditButton, taskInputElement);
  addDeleteListener(taskDeleteButton, taskElement);

  taskElement.appendChild(taskInputElement);
  taskElement.appendChild(taskActionsElement);

  taskList.appendChild(taskElement);
}

function addEditListener(taskEditButton, taskInputElement) {
  let isInEditMode = false;
  taskEditButton.addEventListener("click", () => {
    if (isInEditMode) {
      taskInputElement.readOnly = true;
      taskEditButton.innerHTML = "Bearbeiten";
      isInEditMode = false;
    } else {
      taskInputElement.readOnly = false;
      taskInputElement.focus();
      taskEditButton.innerHTML = "Speichern";
      isInEditMode = true;
    }
  });
}

function addDeleteListener(taskDeleteButton, taskElement) {
  taskDeleteButton.addEventListener("click", () => {
    taskList.removeChild(taskElement);
  });
}