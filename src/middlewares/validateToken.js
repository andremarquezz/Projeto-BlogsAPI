require('express-async-errors');
const jwt = require('jsonwebtoken');
const { ErrorUnauthorized } = require('../errors/ErrorUnauthorized');

const { JWT_SECRET } = process.env;

const validateToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) throw new ErrorUnauthorized('Token not found');
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.locals.email = user.email;
  } catch (error) {
    throw new ErrorUnauthorized('Expired or invalid token');
  }
  next();
};

module.exports = { validateToken };
