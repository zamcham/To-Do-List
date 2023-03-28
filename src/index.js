import './styles.css';

// Array of tasks objects
const tasks = [
    {
      description: "Buy milk",
      completed: false,
      index: 1,
    },
    {
      description: "Take out the trash",
      completed: false,
      index: 2,
    },
    {
      description: "Do laundry",
      completed: false,
      index: 3,
    },
  ];

  function renderTasks() {
    const tasksList = document.getElementById("tasks");
    // Sort the tasks array based on the values of the index property of each task object
    tasks.sort((a, b) => a.index - b.index);
  
    tasks.forEach((task) => {
      const listItem = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      const label = document.createElement("label");
      label.textContent = task.description;
      listItem.appendChild(checkbox);
      listItem.appendChild(label);

      listItem.classList.add(task.completed ? "completed" : "incomplete");

      tasksList.appendChild(listItem);
    });
  }
  
  renderTasks();