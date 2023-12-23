document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    // Load todos from localStorage
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach(todo => addTodo(todo.text, todo.completed));

    // Add a new todo
    todoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText === "") return;
        addTodo(todoText, false);
        todoInput.value = "";
    });

    // Add todo function
    function addTodo(text, completed) {
        const todoItem = document.createElement("li");
        todoItem.textContent = text;

        if (completed) {
            todoItem.classList.add("completed");
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("remove-checkbox");
        deleteButton.addEventListener('click', function(e) {
            e.stopPropagation();
            todoItem.remove();
            saveTodos();
        });

        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);

        saveTodos();
    }

    // Save todos to localStorage
    function saveTodos() {
        const todos = [];
        document.querySelectorAll("#todo-list li").forEach(todoItem => {
            todos.push({ 
                text: todoItem.firstChild.textContent,
                completed: todoItem.classList.contains("completed")
            });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Toggle completed status
    todoList.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("completed");
            saveTodos();
        }
    });
});

