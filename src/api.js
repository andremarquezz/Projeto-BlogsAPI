const express = require('express');
const routesLogin = require('./routes/routesLogin');
const routesUser = require('./routes/routesUser');
const routesCategories = require('./routes/routesCategories');
const routesBlogPosts = require('./routes/routesBlogPosts');
require('express-async-errors');

const app = express();

app.use(express.json());

app.use('/login', routesLogin);
app.use('/user', routesUser);
app.use('/categories', routesCategories);
app.use('/post', routesBlogPosts);

app.use((err, _req, res, _next) =>
  res.status(err.code).json({ message: `${err.message}` }));

module.exports = app;
