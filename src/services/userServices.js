const { User } = require('../database/models');
require('express-async-errors');

const userServices = {
  addUser: async ({ displayName, email, password, image }) => {
    await User.create({ displayName, email, password, image });
    return true;
  },
};

module.exports = userServices;
