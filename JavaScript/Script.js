const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const list = document.getElementById('list');

let users = [];

document.addEventListener('DOMContentLoaded', () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
        renderUsers();
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addUsers();
});

function addUsers() {
    const user = {
        id: Date.now(),
        name: nameInput.value,
        email: emailInput.value
    };
    users.push(user);
    saveUsers();
    renderUsers();
    form.reset();
}

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function renderUsers() {
    list.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Name : </strong>${user.name}<br><strong>Email : </strong>${user.email}<br><button onclick="deleteUser(${user.id})">Delete</button>`;
        list.appendChild(li);
    });
}

function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    saveUsers();
    renderUsers();
}