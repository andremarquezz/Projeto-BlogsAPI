const loginService = require('../services/loginServices');

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    await loginService.validateUser(email, password);
    const token = await loginService.generateToken(email);
    res.status(200).json({ token });
  },
};
module.exports = loginController;
