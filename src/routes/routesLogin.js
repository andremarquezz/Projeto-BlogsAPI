const express = require('express');
const loginController = require('../controllers/loginController');
const { validateInfoLogin } = require('../middlewares/validateInfoLogin');

const router = express.Router();

router.post('/', validateInfoLogin, loginController.login);

module.exports = router;
