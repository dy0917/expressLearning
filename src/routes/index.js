const express = require('express');

const private = require('./privateRoute');
const public = require('./publicRoute');

const privateRouter = express.Router();
privateRouter
  .use('/private', (req, res, next) => {
    const token = req.headers.token;
    console.log('private token', token);
    if (token) next();
    else {
      res.sendStatus(401);
    }
  })
  .use('/private', private.router);
const publicRouter = express.Router();
publicRouter
  .use('/public', (req, res, next) => {
    console.log('public token', req.baseUrl, req.method);
    next();
  })
  .use('/public', public.router);

module.exports = [privateRouter, publicRouter];
