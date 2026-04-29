// Stores all tasks as objects with a text label and due date
let tasks = [];

// Tracks whether each task is done (true) or not (false)
let completed = [];

// Adds a new task when the "Add Task!" button is clicked
document.getElementById('addTaskBtn').addEventListener('click', function () {

  // Gets the text from the input field and removes extra spaces
  const taskInput = document.getElementById('taskInput').value.trim();

  // Stops here if the input is empty
  if (!taskInput) return;

  // Saves the new task with an empty due date by default
  tasks.push({ text: taskInput, dueDate: '' });
  completed.push(false);

  // Clears the input field after adding
  document.getElementById('taskInput').value = '';

  displayTasks();
});

// Lets the user press Enter instead of clicking the Add button
document.getElementById('taskInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.getElementById('addTaskBtn').click();
  }
});

// Removes all tasks when "Clear All Tasks" is clicked
document.getElementById('clearTasksBtn').addEventListener('click', function () {
  tasks = [];
  completed = [];
  displayTasks();
});

// Builds and renders the task list on screen from the tasks array
function displayTasks() {
  const taskList = document.getElementById('taskList');

  // Clears the current list before re-drawing it
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    const isDone = completed[index];

    // Adds a green highlight to the row if the task is completed
    if (isDone) li.classList.add('completed');

    // Strikes through the text if the task is done, normal style if not
    const textClass = isDone ? 'text-decoration-line-through text-muted task-completed' : 'task-text';

    // Builds the task row: task text, a due date picker, and action buttons
    li.innerHTML = `
      <span class="${textClass}">${task.text}</span> <input type="date" class="task-due-date" value="${task.dueDate}" title="Due date" onchange="updateDueDate(${index}, this.value)"/>

      <div class="task-actions">
        <button class="btn btn-success btn-sm mark-btn"   onclick="markAsDone(${index})">✓</button>
        <button class="btn btn-danger  btn-sm delete-btn" onclick="removeTask(${index})">✕</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats();
}

// Updates the Total / Completed / Remaining counts above the list
function updateStats() {
  const total     = tasks.length;
  const done      = completed.filter(Boolean).length;
  const remaining = total - done;

  document.getElementById('stats').innerHTML = `Total Tasks: ${total} | Completed: ${done} | Remaining: ${remaining}`;
}

// Toggles a task between complete and incomplete
function markAsDone(index) {
  completed[index] = !completed[index];
  displayTasks();
}

// Deletes a task and its completion status from both arrays
function removeTask(index) {
  tasks.splice(index, 1);
  completed.splice(index, 1);
  displayTasks();
}

// Saves the due date the user picked for a task
function updateDueDate(index, value) {
  tasks[index].dueDate = value;
}

// Shows zeroed-out stats when the page first loads
updateStats();