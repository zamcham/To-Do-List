let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

const clearCompletedButton = document.getElementById('clearButton');
clearCompletedButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

export { tasks };