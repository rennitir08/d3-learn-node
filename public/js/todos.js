// Variables
var todosContainer = document.querySelector('#todos')
var todoItem = document.querySelector('#todoItem')
var todoButton = document.querySelector('#todoButton')
var categoryItem = document.querySelector('#category')
var dueDate = document.querySelector('#dueDate')
var datePickerUI
// Logic
getTodos()

todoItem.addEventListener('keypress', handleKeyPressOnTodoItem)
todoButton.addEventListener('click', addTodo)

// Date Picker goes here
datePickerUI = new Pikaday(
    {
        field: document.querySelector('#dueDate'),
    })
    
todosContainer.addEventListener('click', handleClickOnCheckBox)
// Functions

dueDate.value = moment().add(1, 'day').format('YYYY-MM-DD')
dueDate.focus()

function handleKeyPressOnTodoItem(e) {
    if (e.key === 'Enter') {
        addTodo()
    }
}

function handleClickOnCheckBox(e) {
    if (e.target.type === 'checkbox') {
        toggleTodoComplete(e.target.dataset.id, e.target.checked)
    }
}

function toggleTodoComplete(todoId, isComplete) {

    if(isComplete) {
        fetch('/api/v1/todos/' + todoId + '/complete')
        .then(getTodos)
    }

    else {
        fetch('/api/v1/todos/' + todoId + '/incomplete')
        .then(getTodos) 
    }
}

function addTodo() {
    var todoTask = todoItem.value.trim()
    var todoCategory = categoryItem.value.trim()
    var addDueDate = dueDate.value.trim()

// begin form validation
    if(todoTask !== '' && todoCategory !== '' && addDueDate !== '') {

        // resets input fields
        todoItem.value = ''
        categoryItem.value = ''
        dueDate.value = ''

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
else {
    alert('Category, due date, and task are required')
    addDueDate.focus()
    }
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
    var colorCategory

    switch(todo.category) {
        case 'important':
            colorCategory = 'red';
            break;
        case 'personal':
            colorCategory = 'orange';
            break;
        case 'school':
            colorCategory = 'yellow';
            break;
         case 'work':
            colorCategory = 'green';
            break;
         case 'other':
            colorCategory = 'blue';
            break;
    }

    var todo = `<li class="list-group-item">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" data-id="${todo.id}" ${todo.completed === 'yes' ? 'checked' : ''}/>
                            <span class="${todo.completed === 'yes' ? 'done' : ''}">${todo.todo}</span>
                        </label>
                            <span class="badge color-category ${colorCategory}">${todo.category.toUpperCase()}</span>
                            <span class="badge badge-category">${moment(todo.due_date).format('MM/DD/YYYY')} </span>
                    </div>
                </li>`;

    todosContainer.innerHTML = todo + todosContainer.innerHTML;
}



