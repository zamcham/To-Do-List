import 'jest-localstorage-mock';
import { addTask } from './task.js';

global.TextEncoder = require('text-encoding').TextEncoder;
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

document.body.innerHTML = `
  <body>
    <div class="container">
      <div class="taskTime">
        <p>Today's To Do</p>
      </div>
      <div class="addTaskField">
        <input type="text" id="new-task" placeholder="Add to your list...">
      </div>
      <div class="taskList">
        <ul id="tasks"></ul>
      </div>
      <div class="completedButton">
        <button id="clearButton" type="button">Clear All Completed</button>
      </div>
    </div>
  </body>
`;

describe('addTask', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  test('adds a new task to the tasks array and localStorage', () => {
    const newTask = 'New Task';
    addTask(newTask);

    // import completion.js after setting the HTML content
    /* eslint-disable global-require */
    require('./completion.js');
    /* eslint-enable global-require */

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe(newTask);
  });
});

describe('deleteTask', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  test('removes a task from the tasks array and localStorage by index', () => {
    const task1 = { description: 'Task 1', completed: false, index: 0 };
    const task2 = { description: 'Task 2', completed: true, index: 1 };
    const task3 = { description: 'Task 3', completed: false, index: 2 };
    localStorage.setItem('tasksObject', JSON.stringify([task1, task2, task3]));

    // import completion.js after setting the localStorage
    /* eslint-disable global-require */
    const { deleteTask } = require('./task.js');
    /* eslint-enable global-require */

    const tasks = JSON.parse(localStorage.getItem('tasksObject'));
    deleteTask(1, tasks); // delete task2 by index

    expect(tasks).toHaveLength(2);
    expect(tasks[0]).toEqual(task1);
    expect(tasks[1]).toEqual(task3);
  });
});