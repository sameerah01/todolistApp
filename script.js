const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener('DOMContentLoaded', getTodoFromLocal);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', removeItem);
filterOption.addEventListener('click', filterItem);

function addTodo(event){
    event.preventDefault();
    if(todoInput.value === ''){
        return;
    }
    todoMarkup(todoInput.value);
    saveTodosToLocal(todoInput.value);
    todoInput.value = '';
}

function removeItem(e){
    const item = e.target;
    const todo = item.parentElement;
    switch(item.classList[0]){
        case 'trash-btn' :
            todo.remove();
            deleteTodoFromLocal(todo);
            break;

        case 'complete-btn' :
            todo.classList.toggle('completed');
            break;
    }
}

function filterItem(e){
    const todos = todoList.childNodes;
    todos.forEach((item) => {
        switch(e.target.value){
            case 'all': 
                item.style.display = 'flex';
                break;
            case 'completed': 
                if(item.classList.contains('completed')){
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;
            case 'uncompleted': 
                if(!item.classList.contains('completed')){
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;
        }
    })
}

function saveTodosToLocal(todo){
    let todos = getData();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodoFromLocal(){
    let todos = getData();
    todos.forEach((todo) => {
        todoMarkup(todo);
    })
}

function deleteTodoFromLocal(todo){
    let todos = getData();
    let currItem = todo.children[0].innerText;
    let deletedList = todos.filter((item) => {
        return item !== currItem;
    });
    localStorage.setItem('todos', JSON.stringify(deletedList));
}

function getData(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}


function todoMarkup(todoValue){
    const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todoValue;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');
        completeButton.innerHTML = '<i class="fas fa-check">';
        todoDiv.appendChild(completeButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash">';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
}