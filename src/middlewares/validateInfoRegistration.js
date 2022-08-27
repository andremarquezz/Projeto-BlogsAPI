const joi = require('joi');
const { ErrorBadRequest } = require('../errors/ErrorBadRequest');
const { User } = require('../database/models');
const { ErrorConflict } = require('../errors/ErrorConflict');
require('express-async-errors');

const schemaRegistration = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  image: joi.required(),
});

const handleError = (error) => {
  const messageError = error.details[0].message;
  const typeError = error.details[0].type;
  switch (typeError) {
    case 'any.required':
      throw new ErrorBadRequest(messageError);
    case 'string.min':
      throw new ErrorBadRequest(messageError);
    default:
      throw new ErrorBadRequest(messageError);
  }
};

const checkUserExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) throw new ErrorConflict('User already registered');
  return false;
};

const validateInfoRegistration = async (req, _res, next) => {
  const validate = schemaRegistration.validate(req.body);
  const { error } = validate;
  if (error) handleError(error);
  await checkUserExists(req.body.email);
  next();
};

module.exports = { validateInfoRegistration };
