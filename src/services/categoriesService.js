const { Category } = require('../database/models');
require('express-async-errors');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');

const categoriesService = {
  addCategory: async (name) => {
    if (!name) throw new ErrorBadRequest('"name" is required');
    const { dataValues } = await Category.create({ name });
    return dataValues;
  },
};

module.exports = categoriesService;
