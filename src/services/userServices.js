const { User } = require('../database/models');
require('express-async-errors');

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
};

module.exports = userServices;
