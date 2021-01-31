import "./style.css";

//selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("click", filterTodo);

//functions

function addTodo(event) {
  //preventing
  event.preventDefault();

  //to-do div

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // create li

  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);

  //complete button

  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";

  todoDiv.appendChild(completedButton);

  //trash button

  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";

  todoDiv.appendChild(trashButton);

  //append to todo list

  todoList.appendChild(todoDiv);

  //clearing input value

  todoInput.value = "";
}

function deletecheck(e) {
  const item = e.target;

  //delete todo

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    //animation
    todo.classList.add("fall");
    //removed todo

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check mark

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//filtering function

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
