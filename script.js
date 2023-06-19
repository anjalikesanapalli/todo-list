const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const completedTasksList = document.getElementById("completedTasks");
const newMessage = document.querySelector(".new");
const deleteAllButton = document.getElementById("deleteAllButton");
let savedTasks = localStorage.getItem("tasks")
  ? localStorage.getItem("tasks").split(",")
  : [];

function makeTasks() {
  taskList.innerHTML = "";
  completedTasksList.innerHTML = "";

  for (let i = 0; i < savedTasks.length; i++) {
    const task = savedTasks[i].split("|");
    const taskName = task[0];
    const checked = task[1] === "true";

    if (!checked) {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = checked;
      checkbox.addEventListener("change", function () {
        savedTasks[i] = `${taskName}|${this.checked}`;
        saveTasks();
        makeTasks();
        checkAllTasks();
      });

      const taskNameElement = document.createElement("span");
      taskNameElement.textContent = taskName;

      li.appendChild(checkbox);
      li.appendChild(taskNameElement);
      taskList.appendChild(li);
    } else {
      const completedTask = document.createElement("li");
      completedTask.textContent = taskName;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete";
      deleteButton.addEventListener("click", function () {
        savedTasks.splice(i, 1);
        saveTasks();
        makeTasks();
        checkAllTasks();
      });

      const addButton = document.createElement("button");
      addButton.textContent = "Add to Todo";
      addButton.className = "addback";
      addButton.addEventListener("click", function () {
        savedTasks[i] = `${taskName}|false`;
        addTask();
        saveTasks();
        makeTasks();
        checkAllTasks();
      });

      completedTask.appendChild(deleteButton);
      completedTask.appendChild(addButton);
      completedTasksList.appendChild(completedTask);
    }
  }
  if (completedTasksList.childElementCount > 0) {
    deleteAllButton.style.display = "block";
  } else {
    deleteAllButton.style.display = "none";
  }
}

function addTask() {
  newMessage.classList.add("hidden");
  const taskName = taskInput.value.trim();

  if (taskName !== "") {
    savedTasks.push(`${taskName}|false`);
    saveTasks();
    makeTasks();
    checkAllTasks();
    taskInput.value = "";
  }
}

function saveTasks() {
  localStorage.setItem("tasks", savedTasks.join(","));
}

function checkAllTasks() {
  const allTasksChecked = savedTasks.every(
    (task) => task.split("|")[1] === "true"
  );
  if (allTasksChecked) {
    newMessage.classList.remove("hidden");
  }
}
deleteAllButton.addEventListener("click", function () {
  savedTasks = savedTasks.filter((task) => task.split("|")[1] !== "true");
  saveTasks();
  makeTasks();
  checkAllTasks();
});

makeTasks();
