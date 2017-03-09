
var todoItem = document.querySelector('#todoItem')
var todoButton = document.querySelector('#todoButton')
var categoryItem = document.querySelector('#category')
var dueDate = document.querySelector('#dueDate')

getTodos()

todoItem.addEventListener('keypress', handleKeyPressOnTodoItem)
todoButton.addEventListener('click', addTodo)

function handleKeyPressOnTodoItem(e) {
    if (e.key === 'Enter') {
        addTodo()
    }
}

function addTodo() {
    var todoTask = todoItem.value
    var todoCategory = categoryItem.value
    var addDueDate = dueDate.value

    var body = {
        todo: todoTask,
        completed: false,
        category: todoCategory,
        due_date: addDueDate,
    }

    fetch('http://localhost:3000/api/v1/todos', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(showTodo)
}

function getTodos() {

fetch('http://localhost:3000/api/v1/todos')
        .then(response => response.json()) 
        .then(loopTodos);
}

function loopTodos(todos) {
    document.querySelector('#todos').innerHTML = ''
    todos.forEach(showTodo)
}

function showTodo(todo) {
    var todo = `<li class="list-group-item">
                    ${todo.todo} 
                    <span class="badge badge-category">${todo.category}</span>
                     <span class="badge badge-due-date">${todo.due_date} </span>
                      <input type="checkbox" aria-label="...">
                </li>`;
  document.querySelector('#todos').innerHTML = todo + document.querySelector('#todos').innerHTML
}

