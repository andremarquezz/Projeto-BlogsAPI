const express = require('express');
const userController = require('../controllers/userController');
const { validateInfoRegistration } = require('../middlewares/validateInfoRegistration');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', validateInfoRegistration, userController.addUser);
router.get('/', validateToken, userController.getAll);
router.get('/:id', validateToken, userController.getOne);
router.delete('/me', validateToken, userController.deleteUser);

module.exports = router;
