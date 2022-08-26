const loginService = require('../services/loginServices');

const loginController = {
  login: async (req, res) => {
    const { email } = req.body;
    const token = await loginService.generateToken(email);
    res.status(200).json({ token });
  },
};
module.exports = loginController;
