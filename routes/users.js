const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUser,
} = require('../controllers/users');

usersRouter.get('/me', celebrate({
  params: Joi.object.keys({
    userId: Joi.string().hex().length(24).required(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
}), getCurrentUser);

module.exports = usersRouter;
