const categoriesService = require('../services/categoriesService');

const categoriesController = {
  addCategory: async (req, res) => {
    const { name } = req.body;
    const categoryCreated = await categoriesService.addCategory(name);
    res.status(201).json(categoryCreated);
  },
  getAll: async (_req, res) => {
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  },
};
module.exports = categoriesController;
