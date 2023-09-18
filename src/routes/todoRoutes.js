const express = require('express');
const router = express.Router();

const todos = [
  { id: 1, title: 'Anthony Albanese', completed: false },
  { id: 2, title: 'Joe Biden', completed: false },
  { id: 3, title: 'Chris Hipkins', completed: false },
  { id: 4, title: 'Lee Hsien Loong', completed: false },
];
router.get('/todos', (req, res) => {
  res.json(todos);
});
router.post('/todos', (req, res) => {
  const newTodo = {
    ...{
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    },
    ...req.body,
  };
  todos.push(newTodo);
  res.sendStatus(204);
});

router.delete('/todos/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    const index = todos.findIndex((todo) => todo.id == id);
    if (index < 0) throw new Error('Id not found');
    todos.splice(index, 1);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
