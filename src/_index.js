const express = require('express');
const cors = require('cors');
const testRoute = require('./routes/privateRoute');
const todoRoute = require('./routes/todoRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/public', express.static('src/static'));
const ports = [3000, 3001];
// app.get('/', (req, res) => {
//   res.send('Hello world!');
// });

app.use('/myTest', testRoute);

app.use((req, res, next) => {
  const token = req.headers.token;
  console.log('token', token);
  next();
});

app.use('/', todoRoute);
app.get('/hi', (req, res) => {
  res.send('Hi!');
});

app.get('/hi/:id', (req, res) => {
  console.log(req);
  res.send('Hi!test');
});

app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  res.json({ result: num1 + num2 });
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
