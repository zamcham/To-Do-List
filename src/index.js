import './styles.css';
import {
  renderTasks, addTask, deleteTask,
} from './task.js';

// Call renderTasks when the page loads to display existing tasks
document.addEventListener('DOMContentLoaded', renderTasks);

// Add event listener for form submission to add a new task
const input = document.getElementById('new-task');
input.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) { // 13 is the key code for Enter
    event.preventDefault(); // prevent the default form submission
    // do something, like call a function to add the task
    const description = input.value;
    if (description) {
      addTask(description);
      input.value = '';
    }
  }
});

// Add event listener for "Clear All Completed" button to delete all completed tasks
const clearCompletedButton = document.querySelector('.completedButton');
clearCompletedButton.addEventListener('click', () => {
  deleteTask();
});