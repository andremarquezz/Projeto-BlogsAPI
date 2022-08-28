const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, categoriesController.getAll);

router.post('/', validateToken, categoriesController.addCategory);

module.exports = router;
