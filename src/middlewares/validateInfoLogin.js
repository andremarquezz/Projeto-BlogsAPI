const { ErrorBadRequest } = require('../errors/ErrorBadRequest');

const validateInfoLogin = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ErrorBadRequest('Some required fields are missing');
  next();
};

module.exports = { validateInfoLogin };
