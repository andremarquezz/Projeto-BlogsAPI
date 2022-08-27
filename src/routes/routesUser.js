const express = require('express');
const userController = require('../controllers/userController');
const { validateInfoRegistration } = require('../middlewares/validateInfoRegistration');

const router = express.Router();

router.post('/', validateInfoRegistration, userController.addUser);

module.exports = router;
