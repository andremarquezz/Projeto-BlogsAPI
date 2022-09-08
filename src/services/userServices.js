const { User } = require('../database/models');
const { ErrorNotFound } = require('../errors/ErrorNotFound');
const blogPostService = require('./blogPostService');

const userServices = {
  addUser: async ({
    displayName, email, password, image,
  }) => {
    await User.create({
      displayName, email, password, image,
    });
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
  deleteUser: async (email) => {
    const { id } = await blogPostService.findUser(email);
    await User.destroy({
      where: { id },
    });
    return true;
  },
};

module.exports = userServices;
