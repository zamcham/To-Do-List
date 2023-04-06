/* eslint-disable import/no-mutable-exports */
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
/* eslint-enable import/no-mutable-exports */
// Disabled because it gives error as a const since it's changed on line 23

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export default function AddCheckBox(checkbox, task, listItem) {
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks(); // Update localStorage when task is checked/unchecked
    listItem.classList.toggle('completed');
  });
}

export function ClearCompletedTasks(tasksToCheck) {
  tasksToCheck = tasksToCheck.filter((task) => !task.completed);
  localStorage.setItem('tasksToCheck', JSON.stringify(tasksToCheck));
  console.log(tasksToCheck);
}

const clearCompletedButton = document.getElementById('clearButton');
if (clearCompletedButton != null) {
  clearCompletedButton.addEventListener('click', () => {
    ClearCompletedTasks(tasks);
  });
}


export { tasks, clearCompletedButton };