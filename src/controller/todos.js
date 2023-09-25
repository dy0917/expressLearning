class TodoLib {
  #todos = [
    { id: 1, title: 'Anthony Albanese', completed: false, createdAt },
    { id: 2, title: 'Joe Biden', completed: false, createdAt },
    { id: 3, title: 'Chris Hipkins', completed: false, createdAt },
    { id: 4, title: 'Lee Hsien Loong', completed: false, createdAt },
  ];
  constructor(createdAt) {
    this.createdAt = createdAt;
  }

  getAllTodos() {
    return this.#todos;
  }
  createTodo(title) {
    const maxId = Math.max(...this.#todos.map((todo) => todo.id));
    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    };
    this.#todos.push(newTodo);
    console.log(this.#todos);
  }

  deleteTodo(id) {
    const todoIndex = this.#todos.findIndex((todo) => todo.id == id);
    if (todoIndex < 0) {
      throw new Error(`${id} is not existed`);
    }
    this.#todos.splice(todoIndex, 1);
  }
}

// const createdAt = new Date().toLocaleDateString();
// const todos = [
//   { id: 1, title: 'Anthony Albanese', completed: false, createdAt },
//   { id: 2, title: 'Joe Biden', completed: false, createdAt },
//   { id: 3, title: 'Chris Hipkins', completed: false, createdAt },
//   { id: 4, title: 'Lee Hsien Loong', completed: false, createdAt },
// ];

// const createTodo = (title) => {
//   const maxId = Math.max(...todos.map((todo) => todo.id));
//   const newTodo = {
//     id: maxId + 1,
//     title,
//     completed: false,
//     createdAt: new Date().toLocaleDateString(),
//   };
//   todos.push(newTodo);
// };

// const updateTodo = (id, incomingTodo) => {
//   const oldTodo = todos.find((todo) => todo.id == id);

//   if (!oldTodo) {
//     throw new Error(`${id} is not existed`);
//   }
//   // todowith updated data
//   const updatedTodo = { ...oldTodo, ...incomingTodo };
//   const todoIndex = todos.findIndex((todo) => todo.id == id);
//   todos.splice(todoIndex, 1, updatedTodo);
//   return updatedTodo;
// };

// const deleteTodo = (id) => {
//   const todoIndex = todos.findIndex((todo) => todo.id == id);
//   if (todoIndex < 0) {
//     throw new Error(`${id} is not existed`);
//   }
//   todos.splice(todoIndex, 1);
// };
const createdAt = new Date().toLocaleDateString();
module.exports = new TodoLib(createdAt);
