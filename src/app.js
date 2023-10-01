const express = require('express');
const userLib = require('./controller/user');
const todoLib = require('./controller/todos');
const cors = require('cors');
const cal = require('./controller/calculator');
const controllers = require('./controller');
const routers = require('./routes');
const app = express();
app.use(cors());
app.use(express.json());

const asyncFunction = (a) =>
  new Promise((resolve) => {
    resolve(a);
  });

const main = async () => {
  const a = await asyncFunction(30);
  const ports = [8080];

  routers.forEach((thisRouters) => app.use('/', thisRouters));
  const createdAt = new Date().toLocaleDateString();
  const todos = [
    { id: 1, title: 'Anthony Albanese', completed: false, createdAt },
    { id: 2, title: 'Joe Biden', completed: false, createdAt },
    { id: 3, title: 'Chris Hipkins', completed: false, createdAt },
    { id: 4, title: 'Lee Hsien Loong', completed: false, createdAt },
  ];

  app.use((req, res, next) => {
    if (!userLib.verifyUser(1, 22)) {
      res.sendStatus(403);
    } else {
      next();
    }
  });

  app.get('/calculator/add', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    const result = cal.add(num1, num2);
    res.status(200).json({ result });
  });

  app.get('/', (req, res) => {
    res.send('hello world');
  });

  app.get('/todos', (req, res) => {
    controllers.calculator.add(1, 3);
    res.json(todoLib.getAllTodos());
  });

  app.post('/todos', (req, res) => {
    const title = req.body.title;
    const newTodo = todoLib.createTodo(title);
    res.status(200).json(newTodo);
  });

  app.put('/todos/:id', (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedTodo = todoLib.updateTodo(id, req.body.todo);
      res.status(200).json(updatedTodo);
    } catch (error) {
      next(error);
    }
  });

  app.delete('/todos/:id', (req, res, next) => {
    try {
      const id = req.params.id;
      todoLib.deleteTodo(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  app.use((err, req, res, next) => {
    res.status(500).send(err.message);
  });

  ports.forEach((port) => {
    app.listen(port, () => {
      console.log(`Example app listening
  at http://localhost:${port}`);
    });
  });
};

main();
