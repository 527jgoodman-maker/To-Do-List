let tasks = []

document.getElementById("addTaskBtn").addEventListener("click", function() {

    let taskInput = document.getElementById("taskInput").value 
    
    if (taskInput) {
        tasks.push(taskInput)

        document.getElementById("taskInput").value = ""

        displayTasks()
    }
})

function displayTasks() {
    let taskList = document.getElementById("taskList")
    
    taskList.innerHTML = ""
    
    tasks.forEach((task, index) => {
        let li = document.createElement("li")
        li.classList.add(
            "list-group-item", 
            "d-flex", 
            "justify-content-between", 
            "align-items-center"
        )
        li.innerHTML = `${task}` + `<button class="btn btn-success btn-sm" onclick="removeTask('${index}')">✓</button>`
        
        taskList.appendChild(li)
    })
}