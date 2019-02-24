let rootNode = document.getElementById('task-list');
let button = document.getElementById('submit');
let input = document.getElementById('newTask');
let check = false;
let tasks = [];
let max = 10;

setInterval(function() {
    if (tasks.length < max) {
        document.getElementById('info').innerHTML = '';
        input.removeAttribute('disabled');
    } else {
        input.setAttribute('disabled', '');
    }

    if (tasks.length < max && !(input.value === '')) {
        button.style.color = '#000';
        check = true;
        button.onmouseover = function() {
            button.style.cursor = 'pointer';
        }
    } else {
        button.style.color = 'rgba(0,0,0,0.5)';
        check = false;
        button.onmouseover = function() {
            button.style.cursor = 'default';
        }
    }
}, max);

function addNewTask() {
    if (check) {
        let elem = '<li class=\'list-item draggable\'  draggable=\'true\'' +
            '>	\n<div class=\'checkbox\'><i onclick=\'changeCheckbox(this)\' ' +
            'class=\'material-icons\'>check_box_outline_blank</i></div>\n   ' +
            '<div class=\'label\' >' + input.value + '</div>   ' +
            ' 	\n	<div class=\'delete\'><i onclick=\'deleteTask(this)\' class=\'material-icons\'>' +
            'delete</i></div>\n        	</li>';
        rootNode.innerHTML += elem;
        tasks.push(rootNode.lastChild);
        input.value = '';
        if (tasks.length === max) {
            document.getElementById('info').innerHTML = 'Maximum item per list are created’ is displayed';
        }
        let last = 1;
        addEventsDragAndDrop(tasks[tasks.length - last]);
    }
}

function display() {
    rootNode.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        rootNode.innerHTML += tasks[i].outerHTML;
    }
}

function changeCheckbox(elem) {
    let todos = document.querySelectorAll('.list-item');
    let arr = Array.prototype.slice.call(todos);
    let t = arr.indexOf(elem.parentNode.parentNode);
    let one = 1,
        zero = 0;
    tasks[t].childNodes[one].childNodes[zero].innerHTML = 'check_box';
    display();
}

function deleteTask(elem) {
    let todos = document.querySelectorAll('.list-item');
    let arr = Array.prototype.slice.call(todos);
    let t = arr.indexOf(elem.parentNode.parentNode);
    let one = 1;
    tasks.splice(t, one);
    display();
}


button.addEventListener('click', addNewTask);

let remove = document.querySelector('.draggable');
let dragElement = null;

function dragStart(elem) {
    this.style.opacity = '0.5';
    let dragElement = this;
    elem.dataTransfer.effectAllowed = 'move';
    elem.dataTransfer.setData('text/html', this.innerHTML);
}

function dragEnter(elem) {
    this.classList.add('over');
}

function dragLeave(elem) {
    elem.stopPropagation();
    this.classList.remove('over');
}

function dragOver(elem) {
    elem.preventDefault();
    elem.dataTransfer.dropEffect = 'move';
    return false;
}

function dragDrop(elem) {
    if (dragElement !== this) {
        dragElement.innerHTML = this.innerHTML;
        this.innerHTML = elem.dataTransfer.getData('text/html');
    }
    return false;
}

function dragEnd(elem) {
    let listItens = document.querySelectorAll('.draggable');
    [].forEach.call(listItens, function(item) {
        item.classList.remove('over');
    });
    this.style.opacity = '1';
}

function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragenter', dragEnter, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false);
}

let listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
    addEventsDragAndDrop(item);
});