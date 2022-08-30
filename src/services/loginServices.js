const jwt = require('jsonwebtoken');
require('express-async-errors');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const loginService = {
  findUser: async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    if (!user) throw new ErrorBadRequest('Invalid fields');
    return true;
  },
  generateToken: async (email) => {
    const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);
    return token;
  },
};

module.exports = loginService;
