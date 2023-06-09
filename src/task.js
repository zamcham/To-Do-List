import './styles.css';
import AddCheckBox, { tasks } from './completion.js';

export const taskObj = tasks;

function updateIndexes() {
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function updateTaskValue(task, label) {
  task.description = label.value;
  saveTasks();
}

export function deleteTask(index, taskObj) {
  if (index !== undefined) {
    taskObj.splice(index, 1);
  } else {
    for (let i = taskObj.length - 1; i >= 0; i -= 1) {
      if (taskObj[i].completed) {
        taskObj.splice(i, 1);
      }
    }
  }
  updateIndexes(); // Update task indexes after deleting task
  saveTasks(); // Update localStorage when task is deleted
  /* eslint-disable no-use-before-define */
  renderTasks(); // Re-render the list after deleting task
  /* eslint-enable no-use-before-define */
}

export function renderTasks() {
  const tasksList = document.getElementById('tasks');
  tasksList.innerHTML = ''; // Clear the list before re-rendering

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');

    AddCheckBox(checkbox, task, listItem);

    const label = document.createElement('input');
    label.type = 'text';
    label.value = task.description;
    label.addEventListener('dblclick', () => {
      label.disabled = false;
      label.focus();
    });

    label.addEventListener('blur', () => {
      updateTaskValue(task, label);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(tasks.indexOf(task), taskObj);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    listItem.classList.add(task.completed ? 'completed' : 'incomplete');

    tasksList.appendChild(listItem);
  });
}

export function addTask(description) {
  const task = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(task);
  saveTasks(); // Update localStorage when new task is added
  renderTasks(); // Re-render the list after adding task
}

export function editTask(index, newDescription) {
  tasks[index].description = newDescription;
  saveTasks(); // Update localStorage when task description is edited
  renderTasks(); // Re-render the list after editing task description
}
