let rootNode = document.getElementById('task-list');
let mainSection = document.getElementById('main-page');
let addSection = document.getElementById('add-new-item');
let modifySection = document.getElementById('modify-item');
let addBtn = document.getElementById('add-btn');
let addTaskBtn = document.getElementById('add-task');
let modTaskBtn = document.getElementById('m-btn');
let aCancel = document.getElementById('a-cancel');
let mCancel = document.getElementById('m-cancel');
let span = document.getElementById('span');
let aInput = document.getElementById('add-input');
let mInput = document.getElementById('modify-input');
let tasks = [];

window.onload = (e) => {
    location.hash = '#/main';
}

window.onhashchange = checkHash;

addBtn.onclick = (e) => {
    location.hash = '#/add';
}
aCancel.onclick = (e) => {
    aInput.value = '';
    location.hash = '#/main';
}
mCancel.onclick = (e) => {
    mInput.value = '';
    location.hash = '#/main';
}
addTaskBtn.onclick = addTask;



function checkHash() {
    mainSection.classList.add('non-displayed');
    addSection.classList.add('non-displayed');
    modifySection.classList.add('non-displayed');
    if (location.hash === '#/main') {
        mainSection.classList.remove('non-displayed');
        if (tasks.length > 0) {
            document.getElementById('span').innerHTML = '';
        } else {
            document.getElementById('span').innerHTML = 'TODO is empty';
        }
    } else if (location.hash === '#/add') {
        addSection.classList.remove('non-displayed');
    } else if (location.hash === '#/modify') {
        modifySection.classList.remove('non-displayed');
    }
}

function addTask() {
    if (aInput.value === '') {} else {
        let item = '<div class="item"> ' +
            '<img class="check" onclick="checkTask(this)" src="assets/img/todo-s.png" alt="">' +
            '<div class="label" onclick="editTask(this)">' + aInput.value + '</div>' +
            '<img onclick="deleteTask(this)" src="assets/img/remove-s.jpg" alt="" class="del">' +
            '</div>';
        rootNode.innerHTML += item;
        tasks.push(rootNode.lastChild);
        aInput.value = '';
        location.hash = '#/main';
    }
}

function display() {
    rootNode.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        rootNode.innerHTML += tasks[i].outerHTML;
    }
}

function editTask(elem) {
    let two = 2;
    let todos = document.querySelectorAll('.item');
    let arr = Array.prototype.slice.call(todos);
    let t = arr.indexOf(elem.parentNode);
    location.hash = '#/modify';
    checkHash();
    modTaskBtn.onclick = (e) => {
        if (mInput.value === '') {} else {
            location.hash = '#/main';
            tasks[t].childNodes[two].innerHTML = mInput.value;
            display();
            mInput.value = '';
        }
    }
}

function checkTask(elem) {
    let todos = document.querySelectorAll('.item');
    let arr = Array.prototype.slice.call(todos);
    let t = arr.indexOf(elem.parentNode);
    let one = 1,
        two = 2;
    tasks[t].childNodes[one].src = "assets/img/done-s.png";
    tasks[t].childNodes[two].style.backgroundColor = 'grey';
    let q = tasks[t];
    tasks.splice(t, one);
    tasks.push(q);
    display();
}

function deleteTask(elem) {
    let todos = document.querySelectorAll('.item');
    let arr = Array.prototype.slice.call(todos);
    let t = arr.indexOf(elem.parentNode);
    let one = 1;
    tasks.splice(t, one);
    display();
    if (tasks.length > 0) {
        document.getElementById('span').innerHTML = '';
    } else {
        document.getElementById('span').innerHTML = 'TODO is empty';
    }
}