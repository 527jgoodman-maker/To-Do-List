let tasks = [] //Empty array to store tasks
let completed = [] //Empty array to track completed status

document.getElementById('addTaskBtn').addEventListener('click', function () {
  //Get the value from INput field
  let taskInput = document.getElementById('taskInput').value
  //check if Input is empty
  if (taskInput) {
    //add new task to task array
    tasks.push(taskInput)
    //add false (not completed) to completed array
    completed.push(false)
    //clear input field value
    document.getElementById('taskInput').value = ''
    //update Task List Display
    displayTasks()
  }
})

function displayTasks () {
  //Select our TaskList in the HTML
  let taskList = document.getElementById('taskList')
  //Clear the existing HTML List
  taskList.innerHTML = ''
  //loop through each Task in the array and create a list item for each
  tasks.forEach((task, index) => {
    //Create <li> element for each task
    let li = document.createElement('li')

    //add Styling
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center'
    )
    if (completed[index]) {
      li.classList.add('completed');
    }
    //Set innerHTML of the LI with a task and remove btn
    let taskClass = completed[index] ? 'text-decoration-line-through text-muted task-completed' : 'task-text';
    li.innerHTML = `<span class="${taskClass}">${task}</span> <div class="task-actions"><button class='btn btn-success btn-sm mark-btn' onclick='markAsDone(${index})'>✓</button><button class='btn btn-success btn-sm' onclick='removeTask(${index})'>✕</button></div>`;
    //Append the new task list to the HTML
    taskList.appendChild(li)
  })
  //Update task count
  let completedCount = completed.filter(c => c).length;
  document.getElementById('stats').innerHTML = `Total Tasks: ${tasks.length} | Completed: ${completedCount} | Remaining: ${tasks.length - completedCount}`
}

function removeTask(index){
  tasks.splice(index,1)
  completed.splice(index,1)
  displayTasks()
}

document.getElementById('clearTasksBtn').addEventListener('click', function () {
  tasks = []
  completed = []
  displayTasks()
})


// Enter key inside the input box
// this allows the player to press Enter to submit their guess instead of clicking the button
document.getElementById('taskInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('addTaskBtn').click();
  }
});

//Initialize task count on page load
document.getElementById('stats').innerHTML = `Total Tasks: 0 | Completed: 0 | Remaining: 0`

function markAsDone(index) {
  completed[index] = !completed[index] // Toggle the completed status
  displayTasks() // Refresh the task list display
}