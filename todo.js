const todos = document.getElementById('todos');
const newTodoBtn = document.getElementById('newTodoBtn');

function createTodo(event) { //새 TODO 리스트 생성
    const todo = document.createElement('div');
    todo.className = 'todo';

    const title = document.createElement('input');
    title.placeholder = 'Todo Title';
    title.id = 'todoTitle';
    title.addEventListener('change', saveChange);

    const deleteTodoBtn = document.createElement('button');
    deleteTodoBtn.id = 'deleteTodoBtn';
    deleteTodoBtn.addEventListener('click', deleteTodo);
    deleteTodoBtn.innerText = 'X';

    todo.appendChild(title);
    todo.appendChild(deleteTodoBtn);

    const list = document.createElement('div');
    list.id = 'list';

    const value = document.createElement('input');
    value.id = 'itemValue';
    value.placeholder = 'what to do';

    const newItemBtn = document.createElement('button');
    newItemBtn.id = 'newItemBtn';
    newItemBtn.innerText = 'confirm';
    newItemBtn.addEventListener('click', createItem);

    list.appendChild(value);
    list.appendChild(newItemBtn);

    todo.appendChild(list);
    todos.appendChild(todo);
    saveChange();
}

function createItem(event) {
    const list = event.target.parentElement;
    const value = list.childNodes[0].value;
    console.log(value);

    const item = document.createElement('div');
    item.className = 'item';
    item.innerText = value;

    const deleteItemBtn = document.createElement('button');
    deleteItemBtn.id = 'deleteItemBtn';
    deleteItemBtn.addEventListener('click', deleteItem);
    deleteItemBtn.innerText = 'X';
    item.appendChild(deleteItemBtn);

    list.appendChild(item);
    saveChange();
}

function deleteTodo(event) {
    event.target.parentElement.parentElement.removeChild(event.target.parentElement);
    saveChange();
}

function deleteItem(event) {
    event.target.parentElement.parentElement.removeChild(event.target.parentElement);
    saveChange();
}

function saveChange() {
    var todoJSON = [];
    // for(i = 0; i < todos.childNodes.length; i++){

    // }
    todos.childNodes.forEach(element => {
        const todo = {};
        todo.title = element.childNodes[0].value;

        todo.items = [];
        items = element.childNodes[2].childNodes;
        for (i = 2; i < element.childNodes[2].childNodes.length; i++) {
            const val = items[i].childNodes[0].data;
            todo.items.push(val);
        }

        todoJSON.push(todo);
    });

    localStorage.setItem('jtj-todos', JSON.stringify(todoJSON));
}

function loadTodo() {
    if (localStorage.getItem('jtj-todos')) {
        const todoArr = JSON.parse(localStorage.getItem('jtj-todos'));
        console.log(todoArr);
        todoArr.forEach(element => {
            const todo = document.createElement('div');
            todo.className = 'todo';

            const title = document.createElement('input');
            title.placeholder = 'Todo Title';
            title.id = 'todoTitle';
            title.value = element.title;

            const deleteTodoBtn = document.createElement('button');
            deleteTodoBtn.id = 'deleteTodoBtn';
            deleteTodoBtn.addEventListener('click', deleteTodo);
            deleteTodoBtn.innerText = 'X';

            todo.appendChild(title);
            todo.appendChild(deleteTodoBtn);

            const list = document.createElement('div');
            list.id = 'list';

            const value = document.createElement('input');
            value.id = 'itemValue';
            value.placeholder = 'what to do';

            const newItemBtn = document.createElement('button');
            newItemBtn.id = 'newItemBtn';
            newItemBtn.innerText = 'confirm';
            newItemBtn.addEventListener('click', createItem);

            list.appendChild(value);
            list.appendChild(newItemBtn);

            element.items.forEach(element => {
                const item = document.createElement('div');
                item.className = 'item';
                item.innerText = element;


                const deleteItemBtn = document.createElement('button');
                deleteItemBtn.id = 'deleteItemBtn';
                deleteItemBtn.addEventListener('click', deleteItem);
                deleteItemBtn.innerText = 'X';
                item.appendChild(deleteItemBtn);

                list.appendChild(item);
            });

            todo.appendChild(list);
            todos.appendChild(todo);
        });
    }
    else {
        console.log('empty');
    }
}

newTodoBtn.addEventListener('click', createTodo);
loadTodo();

/*
<div class="todo">

    <input type="text" id="todoTitle" placeholder="title">
    <button id="deleteTodoBtn">X</button>

    <div id="list">

        <input type="text" placeholder="value" id="itemValue">
        <button id="newItemBtn">confirm</button><br>

        <div class="item">
            blah
            <button id="deleteItemBtn">X</button>
        </div>

    </div>

</div> --></div>
*/

/*
todoJSON structure

[
    {
        title : string,
        items : string[]
    },
    {...},...
]
*/