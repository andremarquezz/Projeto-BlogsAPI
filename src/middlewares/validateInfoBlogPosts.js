require('express-async-errors');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');
const categoriesService = require('../services/categoriesService');

const validateInfoBlogPosts = async (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    throw new ErrorBadRequest('Some required fields are missing');
  }
  const responses = await Promise.all(
    categoryIds.map((categoryId) => {
      const category = categoriesService.checkCategoryExists(categoryId);
      return category;
    }),
  );
  const categoriesNotExists = responses.every((response) => response === false);
  if (categoriesNotExists) throw new ErrorBadRequest('"categoryIds" not found');
  next();
};

module.exports = { validateInfoBlogPosts };
