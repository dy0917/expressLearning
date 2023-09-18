const express = require('express');
const router = express.Router();
router.use('/test*', (req, res, next) => {
  console.log('test permissions');
  next();
});

router.get('/test', (req, res) => {
  res.send('Hello World!');
});

router.get('/test1', (req, res) => {
  res.send('index!');
});
router.get('/test/:id', (req, res) => {
  res.send('index!');
});
router.get('/test2', (req, res) => {
  res.send('Second test');
});

module.exports = { type: 'private', router };
