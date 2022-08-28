const userServices = require('../services/userServices');
const loginService = require('../services/loginServices');

const userController = {
  addUser: async (req, res) => {
    const { displayName, email, password, image } = req.body;
    await userServices.addUser({ displayName, email, password, image });
    const token = await loginService.generateToken(email);
    res.status(201).json({ token });
  },
  getAll: async (_req, res) => {
    const users = await userServices.getAll();
    res.status(200).json(users);
  },
};
module.exports = userController;
