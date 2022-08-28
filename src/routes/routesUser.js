const express = require('express');
const userController = require('../controllers/userController');
const { validateInfoRegistration } = require('../middlewares/validateInfoRegistration');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateInfoRegistration, userController.addUser);
router.get('/', validateToken, userController.getAll);

module.exports = router;
