const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.send('index!');
});
router.get('/test2', (req, res) => {
  res.send('Second test');
});
router.post('/test', (req, res) => {
  res.send('Second test');
});

module.exports = { type: 'public', router };
