const express = require('express');
const routesLogin = require('./routes/routesLogin');
const routesUser = require('./routes/routesUser');
require('express-async-errors');

const app = express();

app.use(express.json());

app.use('/login', routesLogin);
app.use('/user', routesUser);

app.use((err, _req, res, _next) =>
  res.status(err.code).json({ message: `${err.message}` }));

module.exports = app;
