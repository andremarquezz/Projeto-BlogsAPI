const { Category } = require('../database/models');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');

const categoriesService = {
  checkCategoryExists: async (categoryId) => {
    const response = await Category.findAll({
      where: {
        id: categoryId,
      },
    });
    if (response.length > 0) {
      return true;
    }
    return false;
  },
  addCategory: async (name) => {
    if (!name) throw new ErrorBadRequest('"name" is required');
    const { dataValues } = await Category.create({ name });
    return dataValues;
  },
  getAll: async () => {
    const categories = await Category.findAll();
    return categories;
  },
};

module.exports = categoriesService;
