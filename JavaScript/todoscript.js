const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const dueDateInput = document.getElementById('dueDate');
const prioritySelect = document.getElementById('prioritySelect');
const taskNotes = document.getElementById('taskNotes');
const taskList = document.getElementById('taskList');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

function addTask() {
    const task = {
        id: Date.now(),
        name: taskInput.value,
        category: categorySelect.value,
        dueDate: dueDateInput.value,
        priority: prioritySelect.value,
        notes: taskNotes.value,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskForm.reset();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            <div class="task-info">
                <div>
                    <span>${task.name}</span>
                    <span class="task-category">${task.category}</span>
                    <span class="task-due">${task.dueDate}</span>
                    <span class="task-priority">${task.priority}</span>
                    <span class="task-notes">${task.notes}</span>
                </div>
                <div class="task-buttons">
                    <button onclick="toggleTaskCompletion(${task.id})">Complete</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task
