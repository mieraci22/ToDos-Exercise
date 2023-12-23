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
//suggestions and future improvements
//1. Input Validation:While there's a check for an empty todoText, additional input validation, such as checking for maximum length or disallowing certain characters.
//2.The function addTodo and the event listener for form submission use different naming conventions for the todo text (text vs todoText). Consistency in naming conventions improves code readability.
//3.The function addTodo both adds a new todo to the DOM and saves todos to localStorage. Consider separating these concerns into distinct functions for better code organization and reusability.
//4.Implement error handling for scenarios where localStorage is not available or when there are issues with storing/retrieving data.
//5.Consider providing visual feedback to the user when an action is successfully completed (e.g., displaying a message when a todo is added).
