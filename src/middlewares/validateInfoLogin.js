require('express-async-errors');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');
const loginService = require('../services/loginServices');

const validateInfoLogin = async (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ErrorBadRequest('Some required fields are missing');
  await loginService.findUser(email, password);
  next();
};

module.exports = { validateInfoLogin };
