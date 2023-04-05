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