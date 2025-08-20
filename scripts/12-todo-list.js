const todoList = [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22'
}];

document.querySelector('.js-addbutton').addEventListener('click', addTodo);

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    // name: name,
    // dueDate: dueDate
    name,
    dueDate
  });

  inputElement.value = '';

  renderList();
}

function renderList() {
  let todoListHTML = '';

  todoList.forEach(function(todoObject, index) {
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
          todoList.splice(${index}, 1);
          renderList();
      " class="delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}