import './styles.css';

// Get tasks from localStorage, or create an empty array if it doesn't exist
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

export function renderTasks() {
  const tasksList = document.getElementById("tasks");
  tasksList.innerHTML = ""; // Clear the list before re-rendering

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const listItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks(); // Update localStorage when task is checked/unchecked
      listItem.classList.toggle("completed");
    });

    const label = document.createElement("label");
    label.textContent = task.description;
    label.addEventListener("dblclick", () => {
      const newDescription = prompt("Enter new description:", task.description);
      if (newDescription) {
        task.description = newDescription;
        saveTasks(); // Update localStorage when task description is edited
        label.textContent = newDescription;
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTask(tasks.indexOf(task));
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    listItem.classList.add(task.completed ? "completed" : "incomplete");

    tasksList.appendChild(listItem);
  });
}

export function addTask(description) {
  const task = {
    description: description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(task);
  saveTasks(); // Update localStorage when new task is added
  renderTasks(); // Re-render the list after adding task
}

export function deleteTask(index) {
  if (index !== undefined) {
    tasks.splice(index, 1);
  } else {
    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i].completed) {
        tasks.splice(i, 1);
      }
    }
  }
  updateIndexes(); // Update task indexes after deleting task
  saveTasks(); // Update localStorage when task is deleted
  renderTasks(); // Re-render the list after deleting task
}

export function editTask(index, newDescription) {
  tasks[index].description = newDescription;
  saveTasks(); // Update localStorage when task description is edited
  renderTasks(); // Re-render the list after editing task description
}

function updateIndexes() {
    for (let i = 0; i < tasks.length; i++) {
      tasks[i].index = i + 1;
    }
};

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};