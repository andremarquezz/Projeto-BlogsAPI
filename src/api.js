const express = require('express');
require('express-async-errors');
const routesLogin = require('./routes/routesLogin');

const app = express();

app.use(express.json());

app.use('/login', routesLogin);

app.use((err, _req, res, _next) =>
  res.status(err.code).json({ message: `${err.message}` }));

module.exports = app;
