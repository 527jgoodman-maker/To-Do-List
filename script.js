let tasks = [] //Empty array to store tasks

document.getElementById('addTaskBtn').addEventListener('click', function () {
  //Get the value from INput field
  let taskInput = document.getElementById('taskInput').value
  //check if Input is empty
  if (taskInput) {
    //add new task to task array
    tasks.push(taskInput)
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
    //Set innerHTML of the LI with a task and remove btn
    li.innerHTML = `${task} <button class='btn btn-success btn-sm' onclick='removeTask(${index})'>✔</button>`
    //Append the new task list to the HTML
    taskList.appendChild(li)
  })
  
}

function removeTask(index){
  tasks.splice(index,1)
  displayTasks()
}


document.getElementById('clearTasksBtn').addEventListener('click', function () {
  tasks = []
  displayTasks()
})


// Enter key inside the input box
// this allows the player to press Enter to submit their guess instead of clicking the button
document.getElementById('taskInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('addTaskBtn').click();
  }
});