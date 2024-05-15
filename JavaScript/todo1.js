const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        const task = {
            id: Date.now(),
            name: taskName,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    } else {
        alert('Please enter a task name.');
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id, checkbox.checked));
        li.appendChild(checkbox);
        const taskNameSpan = document.createElement('span');
        taskNameSpan.textContent = task.name;
        taskNameSpan.classList.toggle('completed', task.completed);
        taskNameSpan.addEventListener('click', () => toggleTaskCompletion(task.id, !task.completed));
        li.appendChild(taskNameSpan);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        });
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

function toggleTaskCompletion(taskId, completed) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = completed;
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
});
