const { User } = require('../database/models');
require('express-async-errors');
const { ErrorNotFound } = require('../errors/ErrorNotFound');

const userServices = {
  addUser: async ({ displayName, email, password, image }) => {
    await User.create({ displayName, email, password, image });
    return true;
  },
  getAll: async () => {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },
  getOne: async (id) => {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) throw new ErrorNotFound('User does not exist');
    return user;
  },
};

module.exports = userServices;
